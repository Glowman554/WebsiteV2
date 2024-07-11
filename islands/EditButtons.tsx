import { useIsAdmin, useToken } from "../client/token.ts";
import { QueryState, useQueryState } from "../client/helper.ts";

export function EditButton(
    props: {
        edit: () => void;
        delete: (token: string, q: QueryState) => void;
    },
) {
    const q = useQueryState(true);
    const token = useToken(q);
    const isEditor = useIsAdmin(token, q);

    return (
        <span>
            {q.isLoading
                ? (
                    <img
                        class="glow-spinner"
                        src="/loading.svg"
                        style={{
                            width: "2rem",
                        }}
                    />
                )
                : (isEditor
                    ? (
                        <>
                            <a onClick={props.edit}>
                                <img
                                    src="/edit.svg"
                                    style={{ width: "2rem" }}
                                />
                            </a>
                            <a onClick={() => props.delete(token!, q)}>
                                <img
                                    src="/delete.svg"
                                    style={{ width: "2rem" }}
                                />
                            </a>
                        </>
                    )
                    : <></>)}
        </span>
    );
}
