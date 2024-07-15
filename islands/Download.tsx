import { useInput, useQueryState, withQuery } from "../client/helper.ts";
import { useToken } from "../client/token.ts";
import { Query } from "../components/Query.tsx";
import { Download } from "../server/downloads.ts";
import { trpc } from "../server/trpc/client.ts";
import { AdminOnly } from "./AdminOnly.tsx";
import { EditButton } from "./EditButtons.tsx";
import { UploadButton } from "./UploadButton.tsx";

function Common(props: {
    initialName: string;
    initialLink: string;
    submitText: string;
    callback: (
        name: string,
        link: string,
        token: string,
    ) => void;
}) {
    const q = useQueryState(true);
    const token = useToken(q);

    const [name, nameChange] = useInput(props.initialName);
    const [link, linkChange, setLink] = useInput(props.initialLink);

    return (
        <Query q={q}>
            <AdminOnly token={token}>
                <div class="editor-container">
                    <div class="glow-section">
                        Download name
                        <input
                            class="editor-general-input"
                            type="text"
                            onInput={nameChange}
                            value={name}
                        />
                    </div>
                    <div class="glow-section">
                        Download link

                        <input
                            class="editor-general-input"
                            type="text"
                            onInput={linkChange}
                            value={link}
                        />
                    </div>
                    <div class="editor-center">
                        <button
                            class="editor-fancy-button"
                            onClick={() =>
                                props.callback(
                                    name,
                                    link,
                                    token!,
                                )}
                        >
                            {props.submitText}
                        </button>
                        <UploadButton callback={setLink} />
                    </div>
                </div>
            </AdminOnly>
        </Query>
    );
}

export function DownloadCreateField() {
    const q = useQueryState(false);

    const callback = (
        name: string,
        link: string,
        token: string,
    ) => {
        withQuery(
            () => trpc.downloads.create.mutate({ token, link, name }),
            q,
            (id) => {
                location.href = "/internal/download/view/" + id;
            },
        );
    };

    return (
        <Query q={q}>
            <Common
                initialName=""
                initialLink=""
                submitText="Create download"
                callback={callback}
            >
            </Common>
        </Query>
    );
}

export function DownloadEditField(props: { data: Download }) {
    const q = useQueryState(false);

    const callback = (
        name: string,
        link: string,
        token: string,
    ) => {
        withQuery(
            () =>
                trpc.downloads.update.mutate({
                    token,
                    link,
                    name,
                    id: props.data.id,
                }),
            q,
            () => {
                location.href = "/internal/download/view/" + props.data.id;
            },
        );
    };

    return (
        <Query q={q}>
            <Common
                initialName={props.data.name}
                initialLink={props.data.link}
                submitText="Update download"
                callback={callback}
            >
            </Common>
        </Query>
    );
}

export function DownloadEntry(props: { data: Download }) {
    return (
        <div
            class="glow-section"
            style={{
                backgroundColor: "#333333ff",
                padding: ".5rem",
                borderRadius: "7px",
            }}
        >
            <a href={props.data.link}>{props.data.name}</a>
            <EditButton
                deleteWarning="You are about to delete this download!"
                delete={(token, q) => {
                    withQuery(
                        () =>
                            trpc.downloads.delete.mutate(
                                {
                                    id: props.data.id,
                                    token,
                                },
                            ),
                        q,
                        () => {
                            location.href = "/";
                        },
                    );
                }}
                edit={() =>
                    location.href = "/internal/download/edit/" +
                        props.data.id}
            />
        </div>
    );
}
