import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import { useTrips } from "../context/TripContext";
import { useSiteContent } from "../lib/sheets";
import { imgSize } from "../lib/img";
import { stopScroll, startScroll } from "../lib/lenis";

export default function SearchModal({ open, onClose }) {
    const [q, setQ] = useState("");
    const { openTrip } = useTrips();
    const { data } = useSiteContent();

    const results = useMemo(() => {
        const list = data.adventures || [];
        if (!q.trim()) return list.slice(0, 4);
        const needle = q.toLowerCase();
        return list.filter((a) =>
            `${a.title} ${a.region} ${a.difficulty || ""}`.toLowerCase().includes(needle)
        );
    }, [q, data]);

    useEffect(() => {
        if (open) {
            setQ("");
            stopScroll();
        } else startScroll();
    }, [open]);

    useEffect(() => {
        const onKey = (e) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [onClose]);

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-[110] flex items-start justify-center px-4 pt-24"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <div
                        className="absolute inset-0 bg-charcoal/75 backdrop-blur-sm"
                        onClick={onClose}
                        data-testid="search-modal-backdrop"
                    />
                    <motion.div
                        initial={{ opacity: 0, y: -18, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -12, scale: 0.98 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="relative w-full max-w-xl overflow-hidden rounded-2xl bg-canvas shadow-2xl"
                        data-lenis-prevent
                    >
                        <div className="flex items-center gap-3 border-b border-ink/10 px-5 py-4">
                            <Search className="h-4 w-4 text-olive" />
                            <input
                                autoFocus
                                value={q}
                                onChange={(e) => setQ(e.target.value)}
                                placeholder="Search expeditions, regions, difficulty…"
                                className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink/40"
                                data-testid="search-modal-input"
                            />
                            <button
                                onClick={onClose}
                                className="rounded-full p-1.5 text-ink/50 transition-colors hover:bg-ink/5 hover:text-ink"
                                data-testid="search-modal-close-button"
                                aria-label="Close search"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                        <div className="max-h-[52vh] overflow-y-auto p-2" data-lenis-prevent>
                            {results.length === 0 ? (
                                <p className="px-4 py-8 text-center text-sm text-moss">
                                    No expeditions found — try “Spiti”, “Alps” or “Iceland”.
                                </p>
                            ) : (
                                results.map((a) => (
                                    <button
                                        key={a.id}
                                        onClick={() => {
                                            onClose();
                                            openTrip(a);
                                        }}
                                        className="flex w-full items-center gap-4 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-beige"
                                        data-testid={`search-result-${a.id}`}
                                    >
                                        <img
                                            src={imgSize(a.image, 120)}
                                            alt=""
                                            loading="lazy"
                                            decoding="async"
                                            className="h-12 w-12 shrink-0 rounded-lg object-cover"
                                        />
                                        <span className="min-w-0 flex-1">
                                            <span className="block font-serif text-base font-medium leading-snug text-ink">
                                                {a.title}
                                            </span>
                                            <span className="block font-mono text-[10px] uppercase leading-relaxed tracking-[0.2em] text-olive">
                                                {a.region} · {a.duration}
                                            </span>
                                        </span>
                                        <span className="shrink-0 font-mono text-xs text-gold-deep">
                                            {a.price}
                                        </span>
                                    </button>
                                ))
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
