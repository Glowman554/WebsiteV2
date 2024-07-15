import { useQueryState, useTextarea, withQuery } from "../client/helper.ts";
import { useIsAdmin, useToken } from "../client/token.ts";
import { Query } from "../components/Query.tsx";
import { trpc } from "../server/trpc/client.ts";

export function CompletionBox(
    props: {
        reset: () => void;
        result: (result: string) => void;
        system: string;
    },
) {
    const q = useQueryState(true);
    const token = useToken(q);
    const isAdmin = useIsAdmin(token, q);

    const [text, textChange] = useTextarea("");

    return (
        <div class="glow-confirm-bg">
            <div class="glow-confirm">
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
                                            style={{ width: "40%" }}
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
                                                        props.reset();
                                                    },
                                                );
                                            }}
                                            class="glow-fancy-button"
                                        >
                                            Generate
                                        </button>
                                        <button
                                            style={{ width: "40%" }}
                                            onClick={props.reset}
                                            class="glow-fancy-button"
                                        >
                                            Cancle
                                        </button>
                                    </div>
                                </div>
                            )
                            : <p>You need to be an admin to use this page</p>)
                        : <p>You need to be logged in to use this page</p>}
                </Query>
            </div>
        </div>
    );
}
