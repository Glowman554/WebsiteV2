import { PageProps } from "fresh";
import { ProjectEditField } from "../../../../islands/Projects.tsx";
import { loadProject } from "../../../../server/projects.ts";

export default async function View(props: PageProps) {
    const id = Number(props.params.id);
    const project = await loadProject(id);

    return (
        <div class="glow-text">
            {project
                ? <ProjectEditField project={project} />
                : <p>Page not found</p>}
        </div>
    );
}
