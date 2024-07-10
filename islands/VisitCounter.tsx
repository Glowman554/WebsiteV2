import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";


export function VisitCounter() {
    const counter = useSignal("0 th");

    useEffect(() => {
        let count = 1;
        const countStr = localStorage.getItem("counter");
        if (countStr) {
            count = parseInt(countStr) + 1;
        }
        localStorage.setItem("counter", String(count));

        if (count == 1) {
            counter.value = "1st";
        } else {
            counter.value = count + "th";
        }

    });

    return (
        <h5>This is your {counter} visit on this website</h5>
    );
}