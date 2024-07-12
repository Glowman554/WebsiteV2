import { PageProps } from "fresh";
import { DownloadEntry } from "../../../../islands/Download.tsx";
import { getDownload } from "../../../../server/downloads.ts";

export default async function View(props: PageProps) {
    const id = Number(props.params.id);
    const download = await getDownload(id);

    return (
        <div class="glow-text">
            <head>
                <title>
                    {download
                        ? "Glowman554 - " + download.name
                        : "Glowman554 - error"}
                </title>
            </head>
            {download
                ? (
                    <div class="glow-field">
                        <DownloadEntry data={download} />
                    </div>
                )
                : <p>Page not found</p>}
        </div>
    );
}
