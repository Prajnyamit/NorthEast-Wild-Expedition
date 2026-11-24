import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Clock, Gauge, MapPin, Mountain, Star, Users, X } from "lucide-react";
import { toast } from "sonner";
import { stopScroll, startScroll } from "../lib/lenis";
import { imgSize } from "../lib/img";

export default function TripOverlay() {
    const [trip, setTrip] = useState(null);

    useEffect(() => {
        window.__openTrip = setTrip;
        return () => {
            delete window.__openTrip;
        };
    }, []);

    useEffect(() => {
        if (!trip) return;
        stopScroll();
        document.body.style.overflow = "hidden";
        const onKey = (e) => e.key === "Escape" && setTrip(null);
        window.addEventListener("keydown", onKey);
        return () => {
            startScroll();
            document.body.style.overflow = "";
            window.removeEventListener("keydown", onKey);
        };
    }, [trip]);

    return (
        <AnimatePresence>
            {trip && (
                <motion.div
                    className="fixed inset-0 z-[100] flex items-center justify-center p-3 md:p-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    data-testid="trip-detail-modal"
                >
                    <div
                        className="absolute inset-0 bg-charcoal/80 backdrop-blur-sm"
                        onClick={() => setTrip(null)}
                        data-testid="trip-modal-backdrop"
                    />
                    <motion.div
                        initial={{ opacity: 0, y: 56, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 40, scale: 0.97 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="relative max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-canvas shadow-2xl"
                        data-lenis-prevent
                        data-testid="trip-modal-panel"
                    >
                        <div className="relative h-52 md:h-72">
                            <img
                                src={imgSize(trip.image, 1200)}
                                alt={trip.title}
                                className="img-tone h-full w-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-canvas via-forest/30 to-black/30" />
                            <button
                                onClick={() => setTrip(null)}
                                aria-label="Close trip details"
                                data-testid="trip-modal-close-button"
                                className="absolute right-4 top-4 rounded-full border border-white/20 bg-black/40 p-2.5 text-beige backdrop-blur-sm transition-colors hover:bg-black/60"
                            >
                                <X className="h-4 w-4" />
                            </button>
                            <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-glow">
                                    {trip.code} · {trip.coords}
                                </p>
                                <h3 className="mt-1.5 max-w-xl font-serif text-2xl font-semibold text-beige md:text-4xl">
                                    {trip.title}
                                </h3>
                            </div>
                        </div>

                        <div className="px-6 pb-8 md:px-8">
                            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-moss md:text-base">
                                {trip.tagline}
                            </p>

                            <div className="mt-5 flex flex-wrap gap-2.5">
                                {[
                                    { icon: Clock, label: trip.duration },
                                    { icon: Gauge, label: trip.difficulty },
                                    { icon: Mountain, label: `${trip.altitude} max` },
                                    { icon: Users, label: trip.groupSize },
                                    { icon: Star, label: `${trip.rating} · ${trip.reviews} reviews` },
                                ].map((chip) => (
                                    <span
                                        key={chip.label}
                                        className="inline-flex items-center gap-1.5 rounded-full border border-gold/25 bg-beige px-3.5 py-2 text-[11px] font-medium text-pine"
                                    >
                                        <chip.icon className="h-3.5 w-3.5 text-gold-deep" />
                                        {chip.label}
                                    </span>
                                ))}
                            </div>

                            <div className="mt-8 grid gap-10 md:grid-cols-[1fr_300px]">
                                <div>
                                    <h4 className="font-serif text-xl font-semibold text-ink">
                                        Expedition Itinerary
                                    </h4>
                                    <div className="mt-5 flex flex-col">
                                        {(trip.itinerary || []).map((step, i, arr) => (
                                            <div
                                                key={i}
                                                className={`flex gap-5 pb-6 ${
                                                    i < arr.length - 1
                                                        ? "border-l border-dashed border-gold/40 pl-6"
                                                        : "pl-6"
                                                }`}
                                            >
                                                <span className="ml-[calc(-1.5rem-1px)] mt-1 h-2.5 w-2.5 shrink-0 rotate-45 bg-gold" />
                                                <div>
                                                    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-deep">
                                                        {step.day}
                                                    </p>
                                                    <p className="mt-1 font-serif text-base font-semibold text-ink">
                                                        {step.title}
                                                    </p>
                                                    <p className="mt-1 text-sm leading-relaxed text-moss">
                                                        {step.desc}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-8 grid gap-8 sm:grid-cols-2">
                                        <div>
                                            <h4 className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink/50">
                                                What's included
                                            </h4>
                                            <ul className="mt-3 flex flex-col gap-2.5">
                                                {(trip.inclusions || []).map((inc) => (
                                                    <li key={inc} className="flex gap-2.5 text-sm text-moss">
                                                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" />
                                                        {inc}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink/50">
                                                Not included
                                            </h4>
                                            <ul className="mt-3 flex flex-col gap-2.5">
                                                {(trip.exclusions || []).map((exc) => (
                                                    <li key={exc} className="flex gap-2.5 text-sm text-moss">
                                                        <X className="mt-0.5 h-4 w-4 shrink-0 text-sage" />
                                                        {exc}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <aside className="h-fit rounded-2xl bg-forest p-6 md:sticky md:top-6">
                                    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-sage">
                                        From
                                    </p>
                                    <p className="mt-1 font-serif text-4xl font-semibold text-gold">
                                        {trip.price}
                                        <span className="ml-1.5 font-sans text-xs font-normal text-sage">
                                            / person
                                        </span>
                                    </p>
                                    <div className="my-5 h-px bg-white/10" />
                                    <ul className="flex flex-col gap-2.5 text-xs text-beige/80">
                                        <li className="flex items-center gap-2">
                                            <Users className="h-3.5 w-3.5 text-gold" />
                                            {trip.groupSize}
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <MapPin className="h-3.5 w-3.5 text-gold" />
                                            {trip.region}
                                        </li>
                                    </ul>
                                    <button
                                        onClick={() =>
                                            toast.success("Expedition dossier requested", {
                                                description: `Our lead guide will reach out about “${trip.title}” within 24 hours.`,
                                            })
                                        }
                                        data-testid="trip-modal-book-now-button"
                                        className="mt-6 w-full rounded-full bg-gold py-3.5 text-sm font-semibold text-charcoal transition-colors hover:bg-glow"
                                    >
                                        Reserve Expedition Spot
                                    </button>
                                    <p className="mt-4 text-center font-mono text-[9px] uppercase tracking-[0.2em] text-sage/80">
                                        Live pricing · synced from expedition ledger
                                    </p>
                                </aside>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
