import Lenis from "lenis";

let lenis = null;

export function initLenis() {
    if (lenis) return lenis;
    lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    const raf = (t) => {
        lenis.raf(t);
        requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
    return lenis;
}

export const getLenis = () => lenis;

export const stopScroll = () => lenis && lenis.stop();
export const startScroll = () => lenis && lenis.start();

export function scrollToId(id) {
    const el = document.getElementById(id);
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { offset: -70, duration: 1.5 });
    else el.scrollIntoView({ behavior: "smooth" });
}

export function scrollTop() {
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
    else window.scrollTo(0, 0);
}
