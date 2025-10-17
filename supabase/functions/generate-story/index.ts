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

Format de sortie :
Titre
Texte de l'histoire
Questions à poser à la fin`;

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