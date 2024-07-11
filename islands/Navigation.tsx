import { useState } from "preact/hooks";
import { useQueryState } from "../client/helper.ts";
import { useIsAdmin, useToken } from "../client/token.ts";

export function Internal() {
    const q = useQueryState(true);
    const token = useToken(q);
    const isAdmin = useIsAdmin(token, q);

    return isAdmin ? <a href="/internal">Internal</a> : <></>;
}

export function Navigation() {
    const [mainBarClass, setMainBarClass] = useState("glow-bar");
    return (
        <div class={mainBarClass}>
            <a href="/">Home</a>
            <a href="/about">About me</a>
            <a href="/blog">Blog</a>
            <a href="/projects">Projects</a>
            <a href="/contact">Contact me</a>
            <a href="/downloads">Downloads</a>
            <a href="https://github.com/Glowman554">GitHub</a>
            <Internal />

            <a
                href="javascript:void(0);"
                onClick={() => {
                    if (mainBarClass == "glow-bar") {
                        setMainBarClass("glow-bar responsive");
                    } else {
                        setMainBarClass("glow-bar");
                    }
                }}
                class="icon"
            >
                <img src="/menu.svg" alt="Menu" style="width: 2rem;" />
            </a>
        </div>
    );
}
