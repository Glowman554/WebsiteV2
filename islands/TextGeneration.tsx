import { useQueryState, useTextarea, withQuery } from "../client/helper.ts";
import { useIsAdmin, useToken } from "../client/token.ts";
import { Query } from "../components/Query.tsx";
import { trpc } from "../server/trpc/client.ts";
import { useOverlayViewReset } from "./OverlayView.tsx";

export function TextGenerationBox(
    props: {
        result: (result: string) => void;
        system: string;
    },
) {
    const q = useQueryState(true);
    const token = useToken(q);
    const isAdmin = useIsAdmin(token, q);
    const reset = useOverlayViewReset();

    const [text, textChange] = useTextarea("");

    return (
        <Query q={q}>
            {token
                ? (isAdmin
                    ? (
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
                                <button
                                    onClick={reset}
                                    class="glow-fancy-button"
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
