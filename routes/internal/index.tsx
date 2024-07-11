import UploadField from "../../islands/UploadButton.tsx";

export default function Index() {
    return (
        <div class="glow-text">
            <div class="glow-field">
                <ul>
                    <li>
                        <a href="/internal/account/login">Account login</a>
                    </li>
                    <li>
                        <a href="/internal/account/create">Account creation</a>
                    </li>
                    <li>
                        <a href="/internal/post/create">Blog post creation</a>
                    </li>
                    <li>
                        <a href="/internal/project/create">Project creation</a>
                    </li>
                    <li>
                        <a href="/internal/download/create">
                            Download creation
                        </a>
                    </li>
                </ul>
            </div>
            <br />
            <div class="glow-field">
                <UploadField />
            </div>
        </div>
    );
}
