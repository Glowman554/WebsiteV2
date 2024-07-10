import { Head } from "$fresh/runtime.ts";
import { ProjectField } from "../islands/Projects.tsx";
import { loadProjectsAll } from "../server/projects.ts";

export default async function Home() {
    const projects = await loadProjectsAll();
    return (
        <>
            <Head>
                <title>Glowman554 - Projects</title>
            </Head>
            <div class="glow-text">
                <h1>My Projects</h1>
                {projects.map((project) => <ProjectField data={project} />)}
            </div>
        </>
    );
}
