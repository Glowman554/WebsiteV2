import OpenAI from "openai";

let openai: OpenAI;
let model: string;

export function openaiInit() {
    const key = Deno.env.get("OPENAI_KEY");
    if (!key) {
        throw new Error("Missing OPENAI_KEY");
    }

    openai = new OpenAI({ apiKey: key });
    model = Deno.env.get("OPENAI_MODEL") || "gpt-4o";
}

export async function generate(system: string, prompt: string) {
    const completion = await openai.chat.completions.create({
        messages: [
            { role: "system", content: system },
            { role: "user", content: prompt },
        ],
        model,
    });

    console.log(completion);

    return completion.choices[0].message.content;
}
