import { useIsAdmin, useToken } from "../client/token.ts";
import { useQueryState } from "../client/helper.ts";

export function EditButton(
    props: { edit: () => void; delete: (token: string) => void },
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
                            <a onClick={() => props.delete(token!)}>
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
