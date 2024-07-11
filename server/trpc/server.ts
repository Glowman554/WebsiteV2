import { initTRPC } from "@trpc/server";
import { z } from "zod";
import {
    createToken,
    createUser,
    getUserByToken,
    passwordOk,
} from "../users.ts";
import superjson from "superjson";
import {
    createProject,
    deleteProject,
    loadProjects,
    loadProjectsAll,
    updateProject,
} from "../projects.ts";
import { createPost, deletePost, updatePost } from "../posts.ts";

const t = initTRPC.create({ transformer: superjson });

const usernameAndPassword = z.object({
    username: z.string(),
    password: z.string(),
});

async function adminOnly(token: string) {
    const user = await getUserByToken(token);
    if (!user || !user.admin) {
        throw new Error("Not allowed");
    }
    return user;
}

const users = t.router({
    test: t.procedure.input(z.string()).query(
        async ({ input }) => {
            const user = await getUserByToken(input);
            return user != null;
        },
    ),
    create: t.procedure.input(usernameAndPassword).mutation(
        async ({ input }) => {
            await createUser(input.username, input.password);
            return createToken(input.username);
        },
    ),
    login: t.procedure.input(usernameAndPassword).mutation(
        async ({ input }) => {
            const ok = await passwordOk(input.username, input.password);
            if (!ok) {
                throw new Error("Invalid password");
            }
            return createToken(input.username);
        },
    ),
    isAdmin: t.procedure.input(z.string()).query(async ({ input }) => {
        const user = await getUserByToken(input);
        if (!user) {
            throw new Error("Invalid token");
        }
        return user.admin;
    }),
});

const projects = t.router({
    create: t.procedure.input(z.object({
        name: z.string(),
        link: z.string(),
        description: z.string(),
        token: z.string(),
    })).mutation(async ({ input }) => {
        await adminOnly(input.token);
        return createProject(input.name, input.link, input.description);
    }),
    loadAll: t.procedure.query(async () => {
        return await loadProjectsAll();
    }),
    load: t.procedure.input(z.number().int().max(5)).query(
        async ({ input }) => {
            return await loadProjects(input);
        },
    ),
    delete: t.procedure.input(
        z.object({ token: z.string(), id: z.number().int() }),
    ).mutation(async ({ input }) => {
        await adminOnly(input.token);
        await deleteProject(input.id);
    }),
    update: t.procedure.input(z.object({
        name: z.string(),
        link: z.string(),
        description: z.string(),
        id: z.number().int(),
        token: z.string(),
    })).mutation(async ({ input }) => {
        await adminOnly(input.token);
        return updateProject(
            input.name,
            input.link,
            input.description,
            input.id,
        );
    }),
});

const posts = t.router({
    create: t.procedure.input(
        z.object({
            token: z.string(),
            title: z.string(),
            content: z.string(),
        }),
    ).mutation(async ({ input }) => {
        await adminOnly(input.token);
        return createPost(input.title, input.content);
    }),
    update: t.procedure.input(
        z.object({
            token: z.string(),
            id: z.number().int(),
            title: z.string(),
            content: z.string(),
        }),
    ).mutation(async ({ input }) => {
        await adminOnly(input.token);
        await updatePost(input.title, input.content, input.id);
    }),
    delete: t.procedure.input(
        z.object({
            token: z.string(),
            id: z.number().int(),
        }),
    ).mutation(async ({ input }) => {
        await adminOnly(input.token);
        await deletePost(input.id);
    }),
});

export const appRouter = t.router({
    hello: t.procedure.input(z.string().nullish()).query(async ({ input }) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return `hello ${input ?? "world"}`;
    }),
    users,
    projects,
    posts,
});

export type AppRouter = typeof appRouter;
