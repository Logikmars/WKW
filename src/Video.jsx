import { useEffect, useRef, useState } from "react";

export default function VideoClip({ playSignal }) {
    const videoRef = useRef(null);
    const audioRef = useRef(null);
    const [visible, setVisible] = useState(false);

    const canVideoPlay = useRef("yes");
    const unlocked = useRef(false);
    const pendingPlay = useRef(false);
    const audioCtxRef = useRef(null);

    const playNow = async () => {
        const v = videoRef.current, a = audioRef.current;
        if (!v || !a) return;
        try { v.currentTime = 0; a.currentTime = 0; } catch { }

        setVisible(true);
        v.muted = true; v.playsInline = true;

        try { await v.play(); } catch { }
        try {
            if (!audioCtxRef.current) {
                const Ctx = window.AudioContext || window.webkitAudioContext;
                if (Ctx) audioCtxRef.current = new Ctx();
            }
            if (audioCtxRef.current?.state !== "running") await audioCtxRef.current?.resume();
            await a.play();
        } catch { }

        canVideoPlay.current = "no";
        setTimeout(() => setVisible(false), 4000);
        setTimeout(() => { v.pause(); a.pause(); canVideoPlay.current = "yes"; }, 4500);
    };

    // Первый жест = анлок + возможный немедленный запуск
    useEffect(() => {
        const unlock = async () => {
            if (unlocked.current) return;
            const v = videoRef.current, a = audioRef.current;

            try { v.muted = true; v.playsInline = true; await v.play(); v.pause(); v.currentTime = 0; } catch { }
            try {
                const Ctx = window.AudioContext || window.webkitAudioContext;
                if (Ctx && !audioCtxRef.current) audioCtxRef.current = new Ctx();
                if (audioCtxRef.current?.state !== "running") await audioCtxRef.current?.resume();
                if (a) { a.muted = true; await a.play(); a.pause(); a.currentTime = 0; a.muted = false; }
            } catch { }

            unlocked.current = true;
            if (pendingPlay.current) { pendingPlay.current = false; playNow(); }
        };

        // pointerdown ловит и мышь, и тач; выполняется раньше click/touchend
        window.addEventListener("pointerdown", unlock, { once: true, passive: true });
        return () => window.removeEventListener("pointerdown", unlock);
    }, []);

    useEffect(() => {
        if (!playSignal || canVideoPlay.current === "no") return;
        const v = videoRef.current;
        if (!unlocked.current) { pendingPlay.current = true; return; }

        if (v?.readyState >= 2) playNow();
        else {
            const onReady = () => playNow();
            v.addEventListener("loadeddata", onReady, { once: true });
            v.addEventListener("canplay", onReady, { once: true });
            const t = setTimeout(onReady, 1200);
            return () => { v.removeEventListener("loadeddata", onReady); v.removeEventListener("canplay", onReady); clearTimeout(t); };
        }
    }, [playSignal]);

    return (
        <>
            <video ref={videoRef} src="/video.mp4" preload="auto" playsInline muted className={`vid ${visible ? "is-visible" : ""}`} />
            <audio ref={audioRef} src="/music.mp3" preload="auto" />
        </>
    );
}
