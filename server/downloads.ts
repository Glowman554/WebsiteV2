import { desc, eq } from "drizzle-orm";
import { db } from "./database/drizzle.ts";
import { downloads } from "./database/schema.ts";

export interface Download {
    id: number;
    name: string;
    link: string;
}

export async function createDownload(name: string, link: string) {
    const result = await db.insert(downloads).values({
        name,
        link,
    })
        .returning().get();
    return result.id;
}

export async function getDownloads(): Promise<Download[]> {
    return await db.select().from(downloads).orderBy(
        desc(downloads.creationDate),
    );
}

export async function getDownload(id: number): Promise<Download | undefined> {
    return await db.select().from(downloads).where(eq(downloads.id, id)).get();
}

export async function deleteDownload(id: number) {
    await db.delete(downloads).where(eq(downloads.id, id));
}

export async function updateDownload(name: string, link: string, id: number) {
    await db.update(downloads).set({ name, link }).where(
        eq(downloads.id, id),
    );
}
