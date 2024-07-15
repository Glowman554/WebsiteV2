import OpenAI from "openai";

let openai: OpenAI;
let chatModel: string;
let imageModel: string;

export function openaiInit() {
    const key = Deno.env.get("OPENAI_KEY");
    if (!key) {
        throw new Error("Missing OPENAI_KEY");
    }

    openai = new OpenAI({ apiKey: key });
    chatModel = Deno.env.get("OPENAI_CHAT_MODEL") || "gpt-4o";
    imageModel = Deno.env.get("OPENAI_IMAGE_MODEL") || "dall-e-3";
}

export async function generate(system: string, prompt: string) {
    const completion = await openai.chat.completions.create({
        messages: [
            { role: "system", content: system },
            { role: "user", content: prompt },
        ],
        model: chatModel,
    });

    return completion.choices[0].message.content;
}

export async function generateImage(prompt: string) {
    const image = await openai.images.generate({
        prompt,
        model: imageModel,
        response_format: "url",
    });

    return image.data[0].url;
}
