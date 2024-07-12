import { PageProps } from "fresh";
import { ProjectField } from "../../../../islands/Projects.tsx";
import { loadProject } from "../../../../server/projects.ts";

export default async function View(props: PageProps) {
    const id = Number(props.params.id);
    const project = await loadProject(id);

    return (
        <div class="glow-text">
            <head>
                <title>
                    {project
                        ? "Glowman554 - " + project.name
                        : "Glowman554 - error"}
                </title>
            </head>
            {project ? <ProjectField data={project} /> : <p>Page not found</p>}
        </div>
    );
}
