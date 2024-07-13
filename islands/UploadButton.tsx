import { useRef, useState } from "preact/hooks";
import { JSX } from "preact";
import { useQueryState } from "../client/helper.ts";
import { Query } from "../components/Query.tsx";
import { Result } from "../routes/api/upload/[name].ts";
import { useToken } from "../client/token.ts";

export function UploadButton(props: { callback: (url: string) => void }) {
    const q = useQueryState(true);
    const token = useToken(q);
    const fileInput = useRef<HTMLInputElement | null>(null);

    const handleFileChange = async (
        e: JSX.TargetedEvent<HTMLInputElement, Event>,
    ) => {
        const files = e.currentTarget.files;
        if (!files) {
            return;
        }

        q.setIsLoading(true);
        try {
            for (let i = 0; i < files.length; i++) {
                const file = files.item(i)!;
                const res = await fetch(
                    "/api/upload/" + file.name + "?token=" + token,
                    {
                        method: "POST",
                        body: file,
                    },
                );
                const json = await res.json() as Result;
                props.callback(json.url);
            }
        } catch (e) {
            q.setError(String(e));
        } finally {
            q.setIsLoading(false);
        }
    };

    return (
        <Query q={q}>
            <button
                class="editor-fancy-button"
                onClick={() => fileInput.current?.click()}
            >
                Upload
            </button>
            <input
                type="file"
                ref={fileInput}
                style={{ display: "none" }}
                onInput={handleFileChange}
            />
        </Query>
    );
}

export default function UploadField() {
    const [url, setUrl] = useState<string | undefined>(undefined);
    return (
        <div class="glow-section">
            <p>{url ? url : "Please upload a file"}</p>
            <UploadButton callback={setUrl} />
        </div>
    );
}
