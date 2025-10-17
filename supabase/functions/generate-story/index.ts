import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // remplace par ton domaine en prod
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface StoryRequest {
  prenom: string;
  age: number;
  duree: string;
  valeur: string;
  situation?: string;
}

// Helper : extrait et retire uniquement les blocs de "questions" qui suivent explicitement un header
function extractQuestionBlocksAndClean(text: string) {
  // Normalisation
  let t = text.replace(/\r\n/g, "\n");

  const questionsFound: string[] = [];

  // Regex pour trouver les headers (case-insensitive)
  const headerRegex = /(^|\n)\s*(Questions?(?:\s+à\s+discuter)?|À\s+discuter)\s*[:\-]?\s*(\n|$)/ig;

  // On parcourt toutes les occurrences du header
  let match;
  // Pour éviter complications avec indices lors des remplacements successifs,
  // on construira un nouveau texte en enlevant les blocs détectés.
  // Stratégie : split le texte en segments autour des headers et analyser chaque segment.
  const parts = t.split(headerRegex); // split garde aussi les groupes capturés
  // parts structure: [before, sep1, header1, newline?, after1, sep2, header2, ...]
  // On va reconstruire en sautant les blocs de question capturés

  let rebuilt = "";
  let i = 0;
  while (i < parts.length) {
    const part = parts[i];
    // The split will produce sequences: preText, (separator groups...), so detect header by regex group positions.
    // Safer: check if next group matches a header (we can inspect parts[i+1] and parts[i+2] etc.)
    if (i + 2 < parts.length && typeof parts[i+1] === "string" && /Questions?(?:\s+à\s+discuter)?|À\s+discuter/i.test(parts[i+1])) {
      // parts[i] is text before header
      rebuilt += parts[i];
      // parts[i+1] is header text, parts[i+2] is the following (likely newline)
      // The "body" after header is parts[i+3] (if exists) up to the next header.
      const potentialBlock = parts[i+3] ?? "";
      // We extract candidate questions from potentialBlock by taking up to the first double newline
      const idxDoubleNL = potentialBlock.search(/\n\s*\n/);
      let block = "";
      if (idxDoubleNL >= 0) {
        block = potentialBlock.slice(0, idxDoubleNL);
        // keep the remainder in parts[i+3] so it will be appended after the loop
        parts[i+3] = potentialBlock.slice(idxDoubleNL + 2);
      } else {
        // no double newline; take the whole potentialBlock as block and clear parts[i+3]
        block = potentialBlock;
        parts[i+3] = "";
      }

      // From the block, extract lines that look like questions (end with '?') or numbered/dash list
      const lines = block.split("\n").map(l => l.trim()).filter(Boolean);
      for (const ln of lines) {
        // consider list items starting with digits or dash as potential questions
        const cleaned = ln.replace(/^[-•\d\.\)\s]*/, "").trim();
        if (cleaned.length === 0) continue;
        if (/\?$/.test(cleaned)) {
          questionsFound.push(cleaned);
        } else if (/^\d+\./.test(ln) || /^[-•]/.test(ln)) {
          // If list item but doesn't end with ?, keep it only if it contains a '?'
          if (/\?/.test(ln)) questionsFound.push(cleaned);
        } else {
          // Some models place prose after header; try to capture sentences that contain '?' inside
          const maybeQs = cleaned.split(/(?<=[\?\!])\s+/).filter(s => s.trim().endsWith('?'));
          for (const q of maybeQs) {
            const qClean = q.trim();
            if (qClean.length > 2) questionsFound.push(qClean);
          }
        }
      }

      // we've consumed parts[i], parts[i+1], parts[i+2], parts[i+3] (but parts[i+3] has been adjusted)
      i += 3; // will advance to parts[i+3] next loop iteration (which now contains the remainder)
    } else {
      // normal segment without header
      rebuilt += part;
      i += 1;
    }
  }

  // After reconstruction, remove any remaining isolated headers anywhere (safe)
  rebuilt = rebuilt.replace(/(^|\n)\s*(?:Questions?(?:\s+à\s+discuter)?|À\s+discuter)\s*[:\-]?\s*(\n|$)/ig, "\n");

  // Clean repeated blank lines
  rebuilt = rebuilt.replace(/\n{3,}/g, "\n\n").trim();

  // Unique questions, trimmed, limit to 4
  const unique = Array.from(new Set(questionsFound.map(q => q.trim()))).slice(0, 4);

  return { cleanedText: rebuilt, questions: unique };
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { prenom, age, duree, valeur, situation }: StoryRequest = await req.json();

    const openaiApiKey = Deno.env.get("OPENAI_API_KEY");
    if (!openaiApiKey) {
      throw new Error("OPENAI_API_KEY not configured");
    }

    // System prompt (optionnel : tu peux améliorer ou remplacer)
   const systemPrompt = `Tu es un auteur professionnel spécialisé dans la littérature pour enfants.
Tu écris des histoires courtes, douces et éducatives adaptées à chaque âge.
Ton style est bienveillant, imagé et accessible, jamais moralisateur.`;

    // User prompt : stricter instruction to keep questions only at the end
    const userPrompt = `Tu es un **auteur expert de littérature jeunesse** et un **pédagogue sensible**. 
Ta mission est d’écrire une **histoire inédite, bienveillante et captivante**, faite sur mesure pour un enfant et l'éduquer face à des situations où il aurait mal agit.

Voici les informations fournies :
- Prénom de l’enfant : ${prenom}
- Âge : ${age} ans
- Durée de lecture souhaitée : ${duree}
- Valeur ou thème éducatif à illustrer : ${valeur}
${situation ? `- Situation personnelle ou contexte à prendre en compte : ${situation}` : ''}


Contraintes :
- Le héros doit être ${prenom}.
- Utilise des phrases courtes et un vocabulaire adapté à l'âge.
- Ne jamais écrire la phrase "Questions à discuter" nulle part dans le corps de l'histoire, sauf une unique fois à la toute fin.
- Structure EXACTE demandée : 
  Ligne 1 : Titre (court)
  Ensuite : l'histoire en paragraphes
  À la fin : une section intitulée exactement "Questions à discuter :" suivi de 2 à 4 questions, chaque question sur sa propre ligne et se terminant par un point d'interrogation.
- Ne pas encadrer le texte dans des blocs de code ou ajouter des métadonnées.
Rédige en français, ton bienveillant et rassurant.`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${openaiApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        max_tokens: 700,
        temperature: 0.75,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`OpenAI API error: ${error}`);
    }

    const data = await response.json();
    const raw = (data.choices?.[0]?.message?.content || "").toString();

    // Post-processing: extract question blocks inserted by the model and remove them from the body
    const { cleanedText, questions } = extractQuestionBlocksAndClean(raw);

    // If no questions found from header blocks, try to find a final block of questions manually:
    let finalQuestions = questions.slice();
    if (finalQuestions.length === 0) {
      // search for a final "Questions" block at the end even if header not exact
      const endMatch = cleanedText.match(/(?:Questions\s*(?:à\s*discuter)?\s*[:\-]?\s*)([\s\S]{0,400})$/i);
      if (endMatch && endMatch[1]) {
        // extract lines with question marks from this tail
        const tailLines = endMatch[1].split("\n").map(l => l.trim()).filter(Boolean);
        for (const ln of tailLines) {
          const cleaned = ln.replace(/^[-•\d\.\)\s]*/, "").trim();
          if (cleaned.endsWith("?")) finalQuestions.push(cleaned);
        }
        // remove the tail block from cleanedText
        const cleanedWithoutTail = cleanedText.replace(endMatch[0], "").trim();
        // update cleanedText
        (cleanedText as any) = cleanedWithoutTail;
      }
    }

    // Guarantee at least 3 fallback questions based on prenom/valeur if still none
    if (finalQuestions.length === 0) {
      finalQuestions = [
        `Qu'est-ce que ${prenom} a appris dans cette histoire ?`,
        `As-tu déjà ressenti la même chose que ${prenom} ?`,
        `Que pourrais-tu faire si tu étais à la place de ${prenom} ?`
      ];
    }

    // Limit to 4
    finalQuestions = Array.from(new Set(finalQuestions)).slice(0, 4);

    // Build final output: ensure single block of questions at the end
    const questionBlock = "\n\nQuestions à discuter :\n" + finalQuestions.map((q, i) => `${i+1}. ${q.trim()}`).join("\n");

    const finalStory = cleanedText.trim() + questionBlock;

    return new Response(JSON.stringify({ story: finalStory }), {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error generating story:", error);

    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Failed to generate story",
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
