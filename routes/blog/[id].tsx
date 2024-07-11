import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { getPost, Post } from "../../server/posts.ts";
import { CSS, render } from "$gfm";
import { PostEditButton } from "../../islands/Blog.tsx";

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
                ? (
                    <>
                        <Head>
                            <style dangerouslySetInnerHTML={{ __html: CSS }} />
                            <title>Wiki - {props.data.title}</title>
                        </Head>
                        <div>
                            <h1 class="glow-section">
                                {props.data.title}
                                <PostEditButton id={props.data.id} />
                            </h1>
                        </div>
                        <hr />
                        <div
                            dangerouslySetInnerHTML={{
                                __html: render(props.data.content, {
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
