import { useState } from "preact/hooks";
import { useInput, useQueryState, withQuery } from "../client/helper.ts";
import { useToken } from "../client/token.ts";
import { Query } from "../components/Query.tsx";
import { trpc } from "../server/trpc/client.ts";
import { OverlayViewReset, useOverlayViewReset } from "./OverlayView.tsx";
import { AdminOnly } from "./AdminOnly.tsx";

export function ImageGenerationBox(props: {
    result: (url: string) => void;
}) {
    const q = useQueryState(true);
    const token = useToken(q);
    const reset = useOverlayViewReset();

    const [url, setUrl] = useState<string | undefined>(undefined);

    const [prompt, promptChange] = useInput("");

    return (
        <Query q={q}>
            <AdminOnly token={token}>
                <div class="editor-container">
                    <div class="glow-center">
                        {url
                            ? (
                                <img
                                    style={{
                                        maxHeight: "40vh",
                                        minWidth: "0",
                                    }}
                                    src={url}
                                />
                            )
                            : <p>No image generated yet!</p>}
                    </div>

                    <div class="glow-section">
                        Prompt
                        <input
                            class="editor-general-input"
                            type="text"
                            value={prompt}
                            onInput={promptChange}
                        />
                    </div>

                    <div class="editor-center">
                        <button
                            class="editor-fancy-button"
                            disabled={!url}
                            onClick={() =>
                                withQuery(
                                    () =>
                                        trpc.upload.fromUrl
                                            .mutate({
                                                token: token!,
                                                url: url!,
                                            }),
                                    q,
                                    (url) => {
                                        props.result(url);
                                        reset();
                                    },
                                )}
                        >
                            Use
                        </button>
                        <button
                            class="editor-fancy-button"
                            onClick={() =>
                                withQuery(
                                    () =>
                                        trpc.openai.image.query(
                                            {
                                                token: token!,
                                                prompt,
                                            },
                                        ),
                                    q,
                                    setUrl,
                                )}
                        >
                            Generate
                        </button>
                        <OverlayViewReset />
                    </div>
                </div>
            </AdminOnly>
        </Query>
    );
}
