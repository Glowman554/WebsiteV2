import { Handlers } from "$fresh/server.ts";
import { adminOnly } from "../../../server/trpc/server.ts";
import { upload } from "../../../server/uploadthing.ts";

export interface Result {
    url: string;
}

export const handler: Handlers = {
    async POST(req, ctx) {
        const searchParams = new URL(req.url).searchParams;
        if (!searchParams.has("token")) {
            throw new Error("Missing token");
        }

        await adminOnly(searchParams.get("token")!);

        const url = await upload(await req.blob(), ctx.params.name);
        return new Response(JSON.stringify({ url } satisfies Result));
    },
};
