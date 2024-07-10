import { Head } from "$fresh/runtime.ts";
import { LoginField } from "../../islands/Account.tsx";

export default function Login() {
    return (
        <div class="glow-text glow-center">
            <Head>
                <title>Glowman554 - Internal account login</title>
            </Head>
            <LoginField />
        </div>
    );
}
