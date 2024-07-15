import {
    useInput,
    useQueryState,
    useTextarea,
    withQuery,
} from "../client/helper.ts";
import { useIsAdmin, useToken } from "../client/token.ts";
import { Query } from "../components/Query.tsx";
import { Post } from "../server/posts.ts";
import { trpc } from "../server/trpc/client.ts";
import { CompletionBox } from "./Completion.tsx";
import { EditButton } from "./EditButtons.tsx";
import { UploadButton } from "./UploadButton.tsx";
import { useState } from "preact/hooks";

function Common(props: {
    initialTitle: string;
    initialContent: string;
    submitText: string;
    callback: (title: string, content: string, token: string) => void;
}) {
    const q = useQueryState(true);
    const token = useToken(q);
    const [title, setTitle] = useInput(props.initialTitle);
    const [content, setContent, setContentRaw] = useTextarea(
        props.initialContent,
    );
    const isAdmin = useIsAdmin(token, q);
    const [showCompletionBox, setShowCompletionBox] = useState(false);

    return (
        <Query q={q}>
            {token
                ? (isAdmin
                    ? (
                        <div class="editor-container">
                            <input
                                class="editor-title-input"
                                onInput={setTitle}
                                type="text"
                                value={title}
                            />
                            <textarea
                                class="editor-content-textfield"
                                onInput={setContent}
                                value={content}
                            >
                            </textarea>
                            <div class="editor-center">
                                <button
                                    class="editor-fancy-button"
                                    onClick={() =>
                                        props.callback(
                                            title,
                                            content,
                                            token,
                                        )}
                                >
                                    {props.submitText}
                                </button>
                                <button
                                    class="editor-fancy-button"
                                    onClick={setShowCompletionBox.bind(
                                        null,
                                        true,
                                    )}
                                >
                                    AI Completion
                                </button>
                                <UploadButton
                                    callback={(url) =>
                                        setContentRaw(
                                            content + "\n" + `![image](${url})`,
                                        )}
                                />
                            </div>
                            {showCompletionBox
                                ? (
                                    <CompletionBox
                                        reset={setShowCompletionBox.bind(
                                            null,
                                            false,
                                        )}
                                        result={setContentRaw}
                                        system="You are an ai assistant generating thechnical blog posts written in markdown."
                                    />
                                )
                                : <></>}
                        </div>
                    )
                    : <p>You need to be an admin to use this page</p>)
                : <p>You need to be logged in to use this page</p>}
        </Query>
    );
}

export function CreatePostField() {
    const q = useQueryState(false);

    const callback = (title: string, content: string, token: string) => {
        withQuery(
            () => trpc.posts.create.mutate({ token, title, content }),
            q,
            (id) => {
                location.href = `/blog/${id}`;
            },
        );
    };
    return (
        <Query q={q}>
            <Common
                initialTitle="Default title"
                initialContent=""
                submitText="Create post"
                callback={callback}
            />
        </Query>
    );
}

export function EditPostField(props: { post: Post }) {
    const q = useQueryState(false);

    const callback = (title: string, content: string, token: string) => {
        withQuery(
            () =>
                trpc.posts.update.mutate({
                    token,
                    title,
                    content,
                    id: props.post.id,
                }),
            q,
            () => {
                location.href = `/blog/${props.post.id}`;
            },
        );
    };

    return (
        <Query q={q}>
            <Common
                initialTitle={props.post.title}
                initialContent={props.post.content}
                submitText="Update post"
                callback={callback}
            />
        </Query>
    );
}

export function PostEditButton(props: { id: number }) {
    return (
        <EditButton
            deleteWarning="You are about to delete this blog post!"
            delete={(token, q) => {
                withQuery(
                    () => trpc.posts.delete.mutate({ token, id: props.id }),
                    q,
                    () => location.href = "/",
                );
            }}
            edit={() => location.href = "/internal/post/edit/" + props.id}
        />
    );
}
