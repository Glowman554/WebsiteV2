import { getPost } from "../../server/posts.ts";
import { CSS, render } from "@deno/gfm";
import { PostEditButton } from "../../islands/Blog.tsx";
import { PageProps } from "fresh";

export default async function View(props: PageProps) {
    const id = Number(props.params.id);
    const post = await getPost(id);

    return (
        <div class="glow-text">
            {post
                ? (
                    <>
                        <head>
                            <style dangerouslySetInnerHTML={{ __html: CSS }} />
                            <title>Glowman554 - {post.title}</title>
                        </head>
                        <div>
                            <h1 class="glow-section">
                                {post.title}
                                <PostEditButton id={post.id} />
                            </h1>
                        </div>
                        <hr />
                        <div
                            dangerouslySetInnerHTML={{
                                __html: render(post.content, {
                                    disableHtmlSanitization: true,
                                }),
                            }}
                        >
                        </div>
                    </>
                )
                : <p>Page not found</p>}
        </div>
    );
}
