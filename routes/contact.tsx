import { Head } from "$fresh/runtime.ts";
import { MessageField } from "../islands/MessageField.tsx";

export default function Contact() {
    return (
        <>
            <Head>
                <title>Glowman554 - Contact</title>
            </Head>
            <div class="glow-text">
                <h2>Contact Me:</h2>

                <table class="glow-table">
                    <tr class="glow-tr">
                        <td class="glow-td">Discord</td>
                        <td class="glow-td">
                            <a href="https://discordapp.com/users/584344177257480192">
                                glowman554
                            </a>
                        </td>
                    </tr>
                    <tr class="glow-tr">
                        <td class="glow-td">Instagram</td>
                        <td class="glow-td">
                            <a href="https://www.instagram.com/glowman434/">
                                glowman434
                            </a>
                        </td>
                    </tr>
                </table>

                <br />
                <hr />
                <br />
                <MessageField />
            </div>
        </>
    );
}
