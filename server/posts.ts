import { desc, eq } from "drizzle-orm";
import { db } from "./database/drizzle.ts";
import { posts } from "./database/schema.ts";

export interface Post {
    id: number;
    title: string;
    content: string;
    creationDate: Date;
}

export async function createPost(
    title: string,
    content: string,
) {
    const result = await db.insert(posts).values({
        content,
        title,
    }).returning().get();
    return result.id;
}

export async function updatePost(title: string, content: string, id: number) {
    await db.update(posts).set({
        title,
        content,
    }).where(eq(posts.id, id));
}

export async function getPost(id: number): Promise<Post | null> {
    const maybe = await db.select().from(posts).where(eq(posts.id, id));
    if (maybe.length == 0) {
        return null;
    }
    return maybe[0];
}

export async function getPosts() {
    return await db.select({
        id: posts.id,
        title: posts.title,
        creationDate: posts.creationDate,
    }).from(posts).orderBy(desc(posts.creationDate));
}

export async function deletePost(id: number) {
    await db.delete(posts).where(eq(posts.id, id));
}
