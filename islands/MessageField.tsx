import { useState } from "preact/hooks";
import { useQueryState, useTextarea, withQuery } from "../client/helper.ts";
import { Query } from "../components/Query.tsx";
import { trpc } from "../server/trpc/client.ts";

export function MessageField() {
    const q = useQueryState(false);
    const [message, messageChange] = useTextarea("");
    const [messageSent, setMessageSent] = useState(false);

    return (
        <Query q={q}>
            <div
                class="glow-field"
                style={{ display: "flex", flexDirection: "column" }}
            >
                {messageSent
                    ? (
                        <div class="glow-center">
                            <h2>Message successfully sent!</h2>
                        </div>
                    )
                    : (
                        <>
                            <div class="glow-center">
                                <h4>Send me a message</h4>
                            </div>
                            <textarea
                                class="editor-content-textfield"
                                style={{ height: "10rem" }}
                                value={message}
                                onInput={messageChange}
                            >
                            </textarea>
                            <button
                                class="glow-fancy-button"
                                onClick={() => {
                                    withQuery(
                                        () => trpc.message.mutate(message),
                                        q,
                                        () => setMessageSent(true),
                                    );
                                }}
                            >
                                Send
                            </button>
                        </>
                    )}
            </div>
        </Query>
    );
}
