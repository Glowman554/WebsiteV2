import { getPost } from "../../server/posts.ts";
import { render } from "@deno/gfm";
import { PostEditButton } from "../../islands/Blog.tsx";
import { PageProps } from "fresh";

import "prismjs/components/prism-json.js";
import "prismjs/components/prism-java.js";
import "prismjs/components/prism-typescript.js";
import "prismjs/components/prism-c.js";
import "prismjs/components/prism-cobol.js";

export default async function View(props: PageProps) {
    const id = Number(props.params.id);
    const post = await getPost(id);

    return (
        <div class="glow-text">
            {post
                ? (
                    <>
                        <head>
                            <link href="/prism.css" rel="stylesheet" />
                            <title>Glowman554 - {post.title}</title>
                        </head>
                        <div>
                            <h1 class="glow-section">
                                {post.title}
                                <PostEditButton id={post.id} />
                            </h1>
                        </div>
                        <hr />
                        <main
                            class="markdown-body"
                            dangerouslySetInnerHTML={{
                                __html: render(post.content, {
                                    disableHtmlSanitization: true,
                                }),
                            }}
                        >
                        </main>
                    </>
                )
                : <p>Page not found</p>}
        </div>
    );
}
