import { Handlers, PageProps } from "$fresh/server.ts";
import { ProjectEditField } from "../../../../islands/Projects.tsx";
import { loadProject, Project } from "../../../../server/projects.ts";

export const handler: Handlers<Project | null> = {
    async GET(_req, ctx) {
        const id = Number(ctx.params.id);
        return ctx.render(await loadProject(id));
    },
};

export default function View(props: PageProps<Project | null>) {
    return (
        <div class="glow-text">
            {props.data
                ? <ProjectEditField project={props.data} />
                : <p>Page not found</p>}
        </div>
    );
}
