import { Head } from "$fresh/runtime.ts";
import { getPosts } from "../server/posts.ts";

export default async function Blog() {
    const posts = await getPosts();
    return (
        <>
            <Head>
                <title>Glowman554 - Blog</title>
            </Head>

            <div class="glow-text">
                <h1>Blog</h1>
                {posts.map((entry) => (
                    <h3>
                        {entry.creationDate.toLocaleDateString()}:{" "}
                        <a href={"/blog/" + entry.id}>{entry.title}</a>
                    </h3>
                ))}
            </div>
        </>
    );
}
