import { Handlers, PageProps } from "$fresh/server.ts";
import { EditPostField } from "../../../../islands/Blog.tsx";
import { getPost, Post } from "../../../../server/posts.ts";

export const handler: Handlers<Post | null> = {
    async GET(_req, ctx) {
        const id = Number(ctx.params.id);
        return ctx.render(await getPost(id));
    },
};

export default function View(props: PageProps<Post | null>) {
    return (
        <div class="glow-text">
            {props.data
                ? <EditPostField post={props.data} />
                : <p>Page not found</p>}
        </div>
    );
}
