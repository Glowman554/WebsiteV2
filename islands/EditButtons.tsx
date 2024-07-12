import { useIsAdmin, useToken } from "../client/token.ts";
import { QueryState, useQueryState } from "../client/helper.ts";
import { useState } from "preact/hooks";
import { ContinueBox } from "./ContinueBox.tsx";

export function EditButton(
    props: {
        edit: () => void;
        delete: (token: string, q: QueryState) => void;
        deleteWarning: string;
    },
) {
    const q = useQueryState(true);
    const token = useToken(q);
    const isEditor = useIsAdmin(token, q);

    const [showContinueBox, setShowContinueBox] = useState(false);

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
                            <a
                                onClick={() => setShowContinueBox(true)}
                            >
                                <img
                                    src="/delete.svg"
                                    style={{ width: "2rem" }}
                                />
                            </a>
                            {showContinueBox
                                ? (
                                    <ContinueBox
                                        message={props.deleteWarning}
                                        cancelCallback={() => {}}
                                        continueCallback={() =>
                                            props.delete(token!, q)}
                                        resetCallback={() =>
                                            setShowContinueBox(false)}
                                    />
                                )
                                : <></>}
                        </>
                    )
                    : <></>)}
        </span>
    );
}
