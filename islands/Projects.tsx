import { useInput, useQueryState, withQuery } from "../client/helper.ts";
import { useIsAdmin, useToken } from "../client/token.ts";
import { Query } from "../components/Query.tsx";
import { Project } from "../server/projects.ts";
import { trpc } from "../server/trpc/client.ts";
import { EditButton } from "./EditButtons.tsx";

function Common(props: {
    initialName: string;
    initialLink: string;
    initialDescription: string;
    submitText: string;
    callback: (
        name: string,
        link: string,
        description: string,
        token: string,
    ) => void;
}) {
    const q = useQueryState(true);
    const token = useToken(q);
    const isAdmin = useIsAdmin(token, q);

    const [name, nameChange] = useInput(props.initialName);
    const [link, linkChange] = useInput(props.initialLink);
    const [description, descriptionChange] = useInput(props.initialDescription);

    return (
        <Query q={q}>
            {token
                ? (isAdmin
                    ? (
                        <div class="editor-container">
                            <div class="glow-section">
                                Project name
                                <input
                                    class="editor-general-input"
                                    type="text"
                                    onChange={nameChange}
                                    value={name}
                                />
                            </div>
                            <div class="glow-section">
                                Project link

                                <input
                                    class="editor-general-input"
                                    type="text"
                                    onChange={linkChange}
                                    value={link}
                                />
                            </div>
                            <div class="glow-section">
                                Project description
                                <input
                                    class="editor-general-input"
                                    type="text"
                                    onChange={descriptionChange}
                                    value={description}
                                />
                            </div>
                            <div class="editor-center">
                                <button
                                    class="editor-fancy-button"
                                    onClick={() =>
                                        props.callback(
                                            name,
                                            link,
                                            description,
                                            token,
                                        )}
                                >
                                    {props.submitText}
                                </button>
                            </div>
                        </div>
                    )
                    : <p>You need to be an admin to use this page</p>)
                : <p>You need to be logged in to use this page</p>}
        </Query>
    );
}

export function ProjectCreateField() {
    const q = useQueryState(false);

    const callback = (
        name: string,
        link: string,
        description: string,
        token: string,
    ) => {
        withQuery(
            () =>
                trpc.projects.create.mutate({ name, link, description, token }),
            q,
            (id) => {
                location.href = "/internal/project/view/" + id;
            },
        );
    };

    return (
        <Query q={q}>
            <Common
                initialName=""
                initialLink=""
                initialDescription=""
                submitText="Create project"
                callback={callback}
            >
            </Common>
        </Query>
    );
}

export function ProjectEditField(props: { project: Project }) {
    const q = useQueryState(false);

    const callback = (
        name: string,
        link: string,
        description: string,
        token: string,
    ) => {
        withQuery(
            () =>
                trpc.projects.update.mutate({
                    name,
                    link,
                    description,
                    token,
                    id: props.project.id,
                }),
            q,
            () => {
                location.href = "/internal/project/view/" + props.project.id;
            },
        );
    };

    return (
        <Query q={q}>
            <Common
                initialName={props.project.name}
                initialLink={props.project.link}
                initialDescription={props.project.description}
                submitText="Update project"
                callback={callback}
            >
            </Common>
        </Query>
    );
}

export function ProjectField(props: { data: Project }) {
    return (
        <div class="glow-row" style="margin-bottom: 1rem">
            <div class="glow-row-rest" style="background-color: #252525">
                <h3 class="glow-section" style={{ margin: "0rem" }}>
                    <a href={props.data.link}>{props.data.name}</a>
                    <EditButton
                        deleteWarning="You are about to delete this project!s"
                        delete={(token, q) => {
                            withQuery(
                                () =>
                                    trpc.projects.delete.mutate(
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
                            location.href = "/internal/project/edit/" +
                                props.data.id}
                    />
                </h3>
                {props.data.description}
            </div>
        </div>
    );
}
