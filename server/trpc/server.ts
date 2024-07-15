import { initTRPC } from "@trpc/server";
import { z } from "zod";
import {
    createToken,
    createUser,
    getUserByToken,
    passwordOk,
} from "../users.ts";
import superjson from "superjson";
import { createProject, deleteProject, updateProject } from "../projects.ts";
import { createPost, deletePost, updatePost } from "../posts.ts";
import {
    createDownload,
    deleteDownload,
    updateDownload,
} from "../downloads.ts";
import { sendWebHook } from "../message.ts";
import { generate } from "../openai.ts";

const t = initTRPC.create({ transformer: superjson });

const usernameAndPassword = z.object({
    username: z.string(),
    password: z.string(),
});

export async function adminOnly(token: string) {
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

const downloads = t.router({
    create: t.procedure.input(z.object({
        name: z.string(),
        link: z.string(),
        token: z.string(),
    })).mutation(async ({ input }) => {
        await adminOnly(input.token);
        return createDownload(input.name, input.link);
    }),
    delete: t.procedure.input(
        z.object({ token: z.string(), id: z.number().int() }),
    ).mutation(async ({ input }) => {
        await adminOnly(input.token);
        await deleteDownload(input.id);
    }),
    update: t.procedure.input(z.object({
        name: z.string(),
        link: z.string(),
        id: z.number().int(),
        token: z.string(),
    })).mutation(async ({ input }) => {
        await adminOnly(input.token);
        return updateDownload(input.name, input.link, input.id);
    }),
});

const openai = t.router({
    complete: t.procedure.input(z.object({
        token: z.string(),
        system: z.string(),
        prompt: z.string(),
    })).query(async ({ input }) => {
        await adminOnly(input.token);
        return await generate(input.system, input.prompt);
    }),
});

export const appRouter = t.router({
    message: t.procedure.input(z.string()).mutation(async ({ input }) => {
        await sendWebHook(input);
    }),
    users,
    projects,
    posts,
    downloads,
    openai,
});

export type AppRouter = typeof appRouter;
