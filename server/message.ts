import { Embed, Webhook } from "@hyunsdev/discord-webhook";

export async function sendWebHook(message: string) {
    if (message.trim() == "") {
        return;
    }

    const webhookUrl = Deno.env.get("MESSAGE_WEBHOOK");
    if (!webhookUrl) {
        throw new Error("Missing MESSAGE_WEBHOOK");
    }

    const client = new Webhook(webhookUrl, "Website");
    const embed = new Embed({
        title: "Message",
        description: message,
    });
    await client.send("", [embed]);
}
