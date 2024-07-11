import { Handlers, PageProps } from "$fresh/server.ts";
import { DownloadEditField } from "../../../../islands/Download.tsx";
import { Download, getDownload } from "../../../../server/downloads.ts";

export const handler: Handlers<Download | null> = {
    async GET(_req, ctx) {
        const id = Number(ctx.params.id);
        return ctx.render(await getDownload(id));
    },
};

export default function View(props: PageProps<Download | null>) {
    return (
        <div class="glow-text">
            {props.data
                ? <DownloadEditField data={props.data} />
                : <p>Page not found</p>}
        </div>
    );
}
