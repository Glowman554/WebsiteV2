import { ComponentChildren } from "preact";
import { useIsAdmin } from "../client/token.ts";
import { useQueryState } from "../client/helper.ts";
import { Query } from "../components/Query.tsx";
export function AdminOnly(
    props: {
        children: ComponentChildren;
        token: string | undefined;
    },
) {
    const q = useQueryState(false);
    const isAdmin = useIsAdmin(props.token, q);

    return (
        <Query q={q}>
            {props.token
                ? (isAdmin
                    ? <>{props.children}</>
                    : <p>You need to be an admin to use this page</p>)
                : <p>You need to be logged in to use this page</p>}
        </Query>
    );
}
