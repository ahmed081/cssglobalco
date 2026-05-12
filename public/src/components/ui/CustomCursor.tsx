import {useEffect, useRef} from "react";

export function CustomCursor() {
    const dot = useRef<HTMLDivElement | null>(null);
    const ring = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const finePointer = window.matchMedia("(pointer: fine)").matches;
        if (!finePointer) return;

        const move = (event: MouseEvent) => {
            const x = `${event.clientX}px`;
            const y = `${event.clientY}px`;
            if (dot.current) {
                dot.current.style.left = x;
                dot.current.style.top = y;
            }
            if (ring.current) {
                ring.current.style.left = x;
                ring.current.style.top = y;
            }
        };

        window.addEventListener("mousemove", move, {passive: true});
        return () => window.removeEventListener("mousemove", move);
    }, []);

    return (
        <>
            <div ref={dot} className="cur"/>
            <div ref={ring} className="cur-ring"/>
        </>
    );
}
