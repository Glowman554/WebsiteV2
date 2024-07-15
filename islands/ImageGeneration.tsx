import { useState } from "preact/hooks";
import { useInput, useQueryState, withQuery } from "../client/helper.ts";
import { useIsAdmin, useToken } from "../client/token.ts";
import { Query } from "../components/Query.tsx";
import { trpc } from "../server/trpc/client.ts";
import { useOverlayViewReset } from "./OverlayView.tsx";

export function ImageGenerationBox(props: {
    result: (url: string) => void;
}) {
    const q = useQueryState(true);
    const token = useToken(q);
    const isAdmin = useIsAdmin(token, q);
    const reset = useOverlayViewReset();

    const [url, setUrl] = useState<string | undefined>(undefined);
    const [prompt, promptChange] = useInput("");

    return (
        <Query q={q}>
            {token
                ? (isAdmin
                    ? (
                        <div class="editor-container">
                            {url ? <img src={url} /> : (
                                <div class="glow-center">
                                    No image generated yet!
                                </div>
                            )}
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
                                                        token,
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
                                                        token,
                                                        prompt,
                                                    },
                                                ),
                                            q,
                                            setUrl,
                                        )}
                                >
                                    Generate
                                </button>
                                <button
                                    onClick={reset}
                                    class="editor-fancy-button"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )
                    : <p>You need to be an admin to use this page</p>)
                : <p>You need to be logged in to use this page</p>}
        </Query>
    );
}
