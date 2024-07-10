import { desc, eq } from "drizzle-orm";
import { db } from "./database/drizzle.ts";
import { projects } from "./database/schema.ts";

export interface Project {
    id: number;
    name: string;
    link: string;
    description: string;
}

export async function createProject(
    name: string,
    link: string,
    description: string,
) {
    const result = await db.insert(projects).values({ name, link, description })
        .returning().get();
    return result.id;
}

export async function loadProjects(limit: number): Promise<Project[]> {
    return await db.select().from(projects).limit(limit).orderBy(
        desc(projects.creationDate),
    );
}

export async function loadProjectsAll(): Promise<Project[]> {
    return await db.select().from(projects).all();
}

export async function loadProject(id: number): Promise<Project | undefined> {
    return await db.select().from(projects).where(eq(projects.id, id)).get();
}

export async function deleteProject(id: number) {
    await db.delete(projects).where(eq(projects.id, id));
}

export async function updateProject(
    name: string,
    link: string,
    description: string,
    id: number,
) {
    await db.update(projects).set({ name, link, description }).where(
        eq(projects.id, id),
    );
}
