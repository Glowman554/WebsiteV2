import { useQueryState, useTextarea, withQuery } from "../client/helper.ts";
import { useToken } from "../client/token.ts";
import { Query } from "../components/Query.tsx";
import { trpc } from "../server/trpc/client.ts";
import { AdminOnly } from "./AdminOnly.tsx";
import { OverlayViewReset, useOverlayViewReset } from "./OverlayView.tsx";

export function TextGenerationBox(
    props: {
        result: (result: string) => void;
        system: string;
    },
) {
    const q = useQueryState(true);
    const token = useToken(q);
    const reset = useOverlayViewReset();

    const [text, textChange] = useTextarea("");

    return (
        <Query q={q}>
            <AdminOnly token={token}>
                <div class="editor-container">
                    <div>
                        <h3>Ai generation</h3>
                    </div>

                    <textarea
                        class="editor-content-textfield"
                        value={text}
                        onInput={textChange}
                    />

                    <div class="glow-section">
                        <button
                            onClick={() => {
                                withQuery(
                                    () =>
                                        trpc.openai.complete
                                            .query({
                                                token: token!,
                                                system: props
                                                    .system,
                                                prompt: text,
                                            }),
                                    q,
                                    (result) => {
                                        if (result) {
                                            props.result(
                                                result,
                                            );
                                        }
                                        reset();
                                    },
                                );
                            }}
                            class="glow-fancy-button"
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
