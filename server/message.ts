import { Embed, Webhook } from "@teever/ez-hook";

export async function sendWebHook(message: string) {
    if (message.trim() == "") {
        return;
    }

    const webhookUrl = Deno.env.get("MESSAGE_WEBHOOK");
    if (!webhookUrl) {
        throw new Error("Missing MESSAGE_WEBHOOK");
    }

    await new Webhook(webhookUrl)
        .setUsername("Website")
        .addEmbed(
            new Embed()
                .setTitle("Message")
                .setDescription(message),
        ).send();
}
