import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
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

    const systemPrompt = "Tu es un conteur bienveillant qui écrit des histoires éducatives pour enfants. Tes histoires sont adaptées à l'âge et à la durée demandée, et toujours positives.";

    const userPrompt = `Écris une histoire pour un enfant nommé ${prenom}, âgé de ${age} ans.
L'histoire doit pouvoir être lue en ${duree}.
Elle doit l'aider à comprendre la valeur de ${valeur}.
${situation ? `Situation facultative : ${situation}.` : ""}

L'histoire doit être :
- adaptée à l'âge, simple et fluide
- bienveillante et sans ton moralisateur
- se conclure par 2 ou 3 questions que le parent peut poser pour discuter

Contraintes précises :
1. Le héros doit être {{prenom}} (utilise "il" ou "elle" selon le prénom si nécessaire).
2. Style : phrases courtes, vocabulaire adapté à l'âge, images concrètes (sons, couleurs, objets), dialogues courts si utile.
3. Structure demandée (format de sortie) :
   - Ligne 1 : **# Titre accrocheur**
   - Ensuite : **Histoire** divisée en paragraphes courts (2-6 phrases chacun).
   - À la fin : section **"Questions à discuter :"** avec exactement 2 à 4 questions simples et ouvertes, adaptées à l'âge.
4. Durée/longueur : respecte la longueur demandée (utilise le mapping suivant : Courte ≈ 180–260 mots, Moyenne ≈ 300–500 mots, Longue ≈ 600–900 mots).
5. Ton : jamais menaçant, pas de punitions explicites ; montrer la conséquence naturelle et la solution bienveillante.
6. Ne pas inclure de métadonnées techniques, ne pas encadrer le texte dans des balises de code, ne pas ajouter d'explications à la fin : uniquement le titre, le texte et la section "Questions à discuter :".
7. Evite les noms de marques, les références politiques, et tout contenu inapproprié pour les enfants.
8. Contraintes :
- Le texte doit être fluide, adapté à l'âge, sans phrases trop longues.
- L'histoire doit comporter un début, un milieu et une fin clairs.
- Elle ne doit PAS contenir de sous-titres ni de sections intermédiaires nommées "Questions à discuter" au milieu du récit.
- Les **questions doivent apparaître uniquement à la fin**, sous la forme d’une liste numérotée.

📄 Format de sortie exact :
Titre de l’histoire
(paragraphe)
(paragraphe)
(paragraphe)
…
Questions à discuter :
1. …
2. …
3. …

Rédige tout en français, dans un ton bienveillant et engageant. `;

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
        max_tokens: 600,
        temperature: 0.8,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`OpenAI API error: ${error}`);
    }

    const data = await response.json();
    const story = data.choices[0].message.content;

    return new Response(
      JSON.stringify({ story }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error generating story:", error);
    
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Failed to generate story" 
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