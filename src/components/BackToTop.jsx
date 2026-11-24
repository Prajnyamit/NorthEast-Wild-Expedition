import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { getLenis } from "../lib/lenis";

export default function BackToTop() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const onScroll = () => setShow(window.scrollY > 700);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <AnimatePresence>
            {show && (
                <motion.button
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 18 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => {
                        const lenis = getLenis();
                        if (lenis) lenis.scrollTo(0, { duration: 1.6 });
                        else window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    aria-label="Back to top"
                    data-testid="back-to-top-button"
                    className="fixed bottom-6 right-6 z-40 rounded-full border border-gold/40 bg-forest/90 p-3 text-gold shadow-xl backdrop-blur-md transition-colors hover:bg-forest"
                >
                    <ArrowUp className="h-4 w-4" />
                </motion.button>
            )}
        </AnimatePresence>
    );
}
