import { DownloadEntry } from "../islands/Download.tsx";
import { getDownloads } from "../server/downloads.ts";

export default async function Downloads() {
    const downloads = await getDownloads();

    return (
        <div class="glow-text">
            <div class="glow-field">
                <div class="glow-center">
                    <h1>Downloads</h1>
                </div>
                {downloads.map((download) => <DownloadEntry data={download} />)}
            </div>
        </div>
    );
}
