import { Head } from "$fresh/runtime.ts";
import { ProjectField } from "../islands/Projects.tsx";
import { VisitCounter } from "../islands/VisitCounter.tsx";
import { loadProjects } from "../server/projects.ts";

export default async function Home() {
    const projects = await loadProjects(5);
    return (
        <>
            <Head>
                <title>Glowman554 - Home</title>
            </Head>
            <div class="glow-text">
                <h1>
                    Hello my name is Glowman554 and I'm happy to meet you 👍!
                </h1>
                <h1>I'm mainly here to have fun 👾!</h1>
                <br />
                <hr />
                <br />

                <h2>My Latest Projects</h2>
                {projects.map((project) => <ProjectField data={project} />)}
                <VisitCounter />
            </div>
        </>
    );
}
