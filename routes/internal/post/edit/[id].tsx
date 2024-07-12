import { PageProps } from "fresh";
import { EditPostField } from "../../../../islands/Blog.tsx";
import { getPost } from "../../../../server/posts.ts";

export default async function View(props: PageProps) {
    const id = Number(props.params.id);
    const post = await getPost(id);

    return (
        <div class="glow-text">
            <head>
                <title>
                    {post
                        ? "Glowman554 - " + post.title + " (editor)"
                        : "Glowman554 - error"}
                </title>
            </head>
            {post ? <EditPostField post={post} /> : <p>Page not found</p>}
        </div>
    );
}
