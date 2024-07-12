import { adminOnly } from "../../../server/trpc/server.ts";
import { upload } from "../../../server/uploadthing.ts";
import { define } from "../../../utils.ts";

export interface Result {
    url: string;
}

export const handler = define.handlers({
    async POST(req) {
        const searchParams = new URL(req.url).searchParams;
        if (!searchParams.has("token")) {
            throw new Error("Missing token");
        }

        await adminOnly(searchParams.get("token")!);

        const url = await upload(await req.req.blob(), req.params.name);
        return new Response(JSON.stringify({ url } satisfies Result));
    },
});
