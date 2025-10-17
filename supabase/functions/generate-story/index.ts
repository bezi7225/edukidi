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

    const userPrompt = `Écris une histoire originale en français selon ces données :
- Prénom : {{prenom}}
- Âge : {{age}} ans
- Durée souhaitée : {{duree}}  (Courte ≈ 2 min, Moyenne ≈ 5 min, Longue ≈ 8 min)
- Valeur à transmettre : {{valeur}}  (ex: partage, honnêteté, patience...)
- Situation (optionnelle) : {{situation}}

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

Génère l'histoire maintenant.`;

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