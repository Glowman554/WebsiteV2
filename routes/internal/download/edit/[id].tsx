import { PageProps } from "fresh";
import { DownloadEditField } from "../../../../islands/Download.tsx";
import { getDownload } from "../../../../server/downloads.ts";

export default async function View(props: PageProps) {
    const id = Number(props.params.id);
    const download = await getDownload(id);

    return (
        <div class="glow-text">
            {download
                ? <DownloadEditField data={download} />
                : <p>Page not found</p>}
        </div>
    );
}
