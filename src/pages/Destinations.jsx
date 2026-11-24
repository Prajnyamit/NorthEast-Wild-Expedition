import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MapPin, Mountain, CalendarDays } from "lucide-react";
import PageHeader from "../components/PageHeader";
import { Reveal } from "../components/Reveal";
import { useSiteContent } from "../lib/sheets";
import { useTrips } from "../context/TripContext";
import { imgSize } from "../lib/img";

const DEST_KEY = {
    spiti: "spiti",
    dolomites: "dolomites",
    patagonia: "patagonia",
    himalayas: "himalayas",
    iceland: "iceland",
    alps: "swiss-alps",
};

const SEASON_TOKENS = {
    "Spring / Summer": ["mar", "apr", "may", "jun", "jul", "aug"],
    "Autumn": ["sep", "oct", "nov"],
    "Winter": ["dec", "jan", "feb"],
};
const SEASON_FILTERS = ["All Seasons", ...Object.keys(SEASON_TOKENS)];

export default function Destinations() {
    const { data } = useSiteContent();
    const { openTrip } = useTrips();
    const [season, setSeason] = useState("All Seasons");
    const destinations = data.destinations || [];
    const adventures = data.adventures || [];

    const visible = destinations.filter((d) => {
        if (season === "All Seasons") return true;
        const tokens = SEASON_TOKENS[season] || [];
        const s = (d.season || "").toLowerCase();
        return tokens.some((t) => s.includes(t));
    });

    const tripsFor = (destId) =>
        adventures.filter((a) => {
            const token = (a.id || "").split("-")[1];
            return (DEST_KEY[token] || token) === destId;
        });

    return (
        <>
            <PageHeader
                eyebrow="Destinations"
                title="Ranges that change you."
                description="Six regions, walked and mapped by our own guides. Pick a range — we will handle the passes, permits and pulse checks."
            />
            <section className="bg-canvas" data-testid="destinations-page">
                <div className="mx-auto max-w-7xl px-5 pt-12 lg:px-8">
                    <Reveal>
                        <div className="flex flex-wrap gap-2" data-testid="season-filters">
                            {SEASON_FILTERS.map((s) => (
                                <button
                                    key={s}
                                    onClick={() => setSeason(s)}
                                    data-testid={`season-pill-${s.toLowerCase().replace(/[\s/]+/g, "-")}`}
                                    className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] transition-colors ${
                                        season === s
                                            ? "border-gold bg-gold text-charcoal"
                                            : "border-ink/15 bg-white text-moss hover:border-gold/50"
                                    }`}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </Reveal>
                </div>
                <div className="mx-auto max-w-7xl px-5 pb-16 pt-6 lg:px-8">
                    {visible.length === 0 && (
                        <p className="py-16 text-center text-sm text-moss" data-testid="no-destinations-message">
                            No regions match this season right now — try another filter.
                        </p>
                    )}
                    <AnimatePresence mode="popLayout">
                        {visible.map((d, i) => {
                            const related = tripsFor(d.id);
                            return (
                                <motion.div
                                    layout
                                    key={d.id}
                                    initial={{ opacity: 0, y: 24 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -12 }}
                                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                    className="grid items-center gap-10 border-b border-ink/10 py-14 last:border-0 lg:grid-cols-2 lg:gap-16"
                                    data-testid={`destination-row-${d.id}`}
                                >
                                    <Reveal className={i % 2 ? "md:order-2" : ""}>
                                        <div className="group relative h-[300px] overflow-hidden rounded-2xl md:h-[440px]">
                                            <img
                                                src={imgSize(d.image, 1100)}
                                                alt={d.name}
                                                loading="lazy"
                                                decoding="async"
                                            className="img-tone h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-forest/60 to-transparent" />
                                        <span className="absolute left-5 top-5 rounded-full border border-white/15 bg-black/30 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-beige backdrop-blur-sm">
                                            {d.code} · {d.altitude}
                                        </span>
                                    </div>
                                </Reveal>
                                <div className={i % 2 ? "md:order-1" : ""}>
                                    <Reveal>
                                        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-deep">
                                            {d.code} — {d.region}
                                        </p>
                                        <h2 className="mt-3 font-serif text-3xl font-medium tracking-tight text-ink md:text-4xl">
                                            {d.name}
                                        </h2>
                                        <p className="mt-4 max-w-lg text-base leading-relaxed text-moss">
                                            {d.description}
                                        </p>
                                        <div className="mt-5 flex flex-wrap gap-2.5">
                                            <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-beige px-3.5 py-2 text-[11px] font-medium text-pine">
                                                <Mountain className="h-3.5 w-3.5 text-gold-deep" />
                                                {d.altitude} max altitude
                                            </span>
                                            <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-beige px-3.5 py-2 text-[11px] font-medium text-pine">
                                                <CalendarDays className="h-3.5 w-3.5 text-gold-deep" />
                                                {d.season}
                                            </span>
                                            <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-beige px-3.5 py-2 text-[11px] font-medium text-pine">
                                                <MapPin className="h-3.5 w-3.5 text-gold-deep" />
                                                {d.region}
                                            </span>
                                        </div>
                                        {related.length > 0 && (
                                            <div className="mt-7">
                                                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink/50">
                                                    Expeditions here
                                                </p>
                                                <div className="mt-3 flex flex-col gap-2.5">
                                                    {related.map((t) => (
                                                        <button
                                                            key={t.id}
                                                            onClick={() => openTrip(t)}
                                                            data-testid={`destination-trip-${t.id}`}
                                                            className="group flex w-full max-w-md items-center justify-between gap-4 rounded-xl border border-ink/10 bg-white px-4 py-3 text-left transition-colors hover:border-gold/50"
                                                        >
                                                            <span className="min-w-0">
                                                                <span className="block truncate font-serif text-sm font-semibold text-ink">
                                                                    {t.title}
                                                                </span>
                                                                <span className="block font-mono text-[9px] uppercase tracking-[0.2em] text-olive">
                                                                    {t.duration} · {t.price}
                                                                </span>
                                                            </span>
                                                            <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] text-gold-deep">
                                                                View →
                                                            </span>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </Reveal>
                                </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            </section>
        </>
    );
}
