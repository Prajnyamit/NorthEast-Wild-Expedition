import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CalendarDays, MapPin, Mountain } from "lucide-react";
import PageHeader from "../components/PageHeader";
import { Reveal } from "../components/Reveal";
import { useSiteContent } from "../lib/sheets";
import { imgSize } from "../lib/img";

const SEASON_TOKENS = {
    "Spring / Summer": ["mar", "apr", "may", "jun", "jul", "aug"],
    Autumn: ["sep", "oct", "nov"],
    Winter: ["dec", "jan", "feb"],
};
const SEASON_FILTERS = ["All Seasons", ...Object.keys(SEASON_TOKENS)];
const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1100&q=80";

export default function Destinations() {
    const { data, loading, error } = useSiteContent();
    const [season, setSeason] = useState("All Seasons");
    const destinations = data.destinations || [];
    const visible = destinations.filter((destination) => {
        if (season === "All Seasons") return true;
        const tokens = SEASON_TOKENS[season] || [];
        const value = String(destination.season || "").toLowerCase();
        return tokens.some((token) => value.includes(token));
    });

    return (
        <>
            <PageHeader eyebrow="Destinations" title="Find the place that calls you." description="Explore Himalayan valleys, high mountain meadows and remarkable landscapes. Choose a destination to discover its details and related treks." />
            <section className="bg-canvas" data-testid="destinations-page">
                <div className="mx-auto max-w-7xl px-5 pt-12 lg:px-8">
                    <Reveal><div className="flex flex-wrap gap-2" data-testid="season-filters">
                        {SEASON_FILTERS.map((item) => <button key={item} type="button" onClick={() => setSeason(item)} className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] transition-colors ${season === item ? "border-gold bg-gold text-charcoal" : "border-ink/15 bg-white text-moss hover:border-gold/50"}`}>{item}</button>)}
                    </div></Reveal>
                </div>
                <div className="mx-auto max-w-7xl px-5 pb-24 pt-10 lg:px-8">
                    {loading && destinations.length === 0 && <p className="py-12 text-sm text-moss">Loading destinations…</p>}
                    {error && destinations.length === 0 && <p className="py-12 text-sm text-moss">Destinations could not be loaded. Please try again.</p>}
                    {!loading && !error && visible.length === 0 && <p className="py-16 text-center text-sm text-moss">No destinations match this season. Try another filter.</p>}
                    <AnimatePresence mode="popLayout">
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {visible.map((destination, index) => <motion.article layout key={destination.id} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35, delay: (index % 3) * 0.04 }} className="group overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-sm transition-shadow hover:shadow-xl" data-testid={`destination-card-${destination.id}`}>
                                <Link
                                    to={`/treks/${destination.trek_id || destination.trekId || destination.id?.replace(/^D/, "T")}`}
                                        className="block"
                                    >
                                    <div className="relative aspect-[4/3] overflow-hidden bg-forest">
                                        <img src={destination.image ? imgSize(destination.image, 1000) : FALLBACK_IMAGE} alt={destination.name || "Mountain destination"} loading="lazy" onError={(event) => { event.currentTarget.src = FALLBACK_IMAGE; }} className="img-tone h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-forest/75 via-transparent to-black/10" />
                                        {destination.code && <span className="absolute left-4 top-4 rounded-full bg-black/35 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white backdrop-blur">{destination.code}</span>}
                                        <span className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-[0.2em] text-gold">{destination.region}</span>
                                    </div>
                                    <div className="p-5 md:p-6">
                                        <h2 className="font-serif text-2xl text-ink">{destination.name}</h2>
                                        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-moss">{destination.description}</p>
                                        <div className="mt-5 flex flex-wrap gap-2 text-[11px] text-moss">
                                            {destination.altitude && <span className="inline-flex items-center gap-1 rounded-full border border-gold/25 px-3 py-1.5"><Mountain className="h-3.5 w-3.5 text-gold-deep" />{destination.altitude}</span>}
                                            {destination.season && <span className="inline-flex items-center gap-1 rounded-full border border-gold/25 px-3 py-1.5"><CalendarDays className="h-3.5 w-3.5 text-gold-deep" />{destination.season}</span>}
                                            {destination.region && <span className="inline-flex items-center gap-1 rounded-full border border-gold/25 px-3 py-1.5"><MapPin className="h-3.5 w-3.5 text-gold-deep" />{destination.region}</span>}
                                        </div>
                                        <span className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-ink">View trek details <ArrowRight className="h-4 w-4 text-gold-deep transition-transform group-hover:translate-x-1" /></span>
                                    </div>
                                </Link>
                            </motion.article>)}
                        </div>
                    </AnimatePresence>
                </div>
            </section>
        </>
    );
}
