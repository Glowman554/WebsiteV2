import { ComponentChildren, createContext } from "preact";
import { useContext, useState } from "preact/hooks";

const OverlayViewResetContext = createContext(() => {});

export function useOverlayViewReset() {
    return useContext(OverlayViewResetContext);
}

export function OverlayView(
    props: { children: ComponentChildren; text: string },
) {
    const [show, setShow] = useState(false);
    return (
        <>
            <button
                class="editor-fancy-button"
                onClick={setShow.bind(null, true)}
            >
                {props.text}
            </button>

            {show
                ? (
                    <OverlayViewResetContext.Provider
                        value={setShow.bind(null, false)}
                    >
                        <div class="glow-confirm-bg">
                            <div class="glow-confirm">
                                {props.children}
                            </div>
                        </div>
                    </OverlayViewResetContext.Provider>
                )
                : <></>}
        </>
    );
}

export function OverlayViewReset() {
    const reset = useOverlayViewReset();
    return (
        <button
            onClick={reset}
            class="editor-fancy-button"
        >
            Cancel
        </button>
    );
}
