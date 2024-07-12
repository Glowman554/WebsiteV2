import { getPosts } from "../server/posts.ts";

export default async function Blog() {
    const posts = await getPosts();
    return (
        <>
            <head>
                <title>Glowman554 - Blog</title>
            </head>

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
