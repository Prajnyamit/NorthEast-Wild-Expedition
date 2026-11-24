
import { motion } from "framer-motion";
import {
    ArrowRight,
    Clock,
    MapPin,
    Mountain,
    Star,
} from "lucide-react";
import { useTrips } from "../context/TripContext";
import { Reveal, EASE } from "./Reveal";
import { imgSize } from "../lib/img";

const FALLBACK_IMAGE =
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=700&q=80";

export default function AdventureCard({ trip, delay = 0 }) {
    const { openTrip } = useTrips();

    if (!trip) return null;

    const image = trip.image ? imgSize(trip.image, 700) : FALLBACK_IMAGE;
    const location = trip.region || trip.start_location || "";
    const duration = trip.duration || "";
    const altitude = trip.altitude || "";
    const rating = Number(trip.rating);
    const hasRating = Number.isFinite(rating) && rating > 0;
    const price =
        trip.price !== null && trip.price !== undefined && trip.price !== ""
            ? trip.price
            : "Contact us";

    return (
        <Reveal delay={delay} className="h-full">
            <motion.article
                whileHover={{ y: -8 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="group flex h-full flex-col overflow-hidden rounded-xl border border-gold/15 bg-white shadow-sm transition-shadow duration-500 hover:shadow-2xl"
                data-testid={`trip-card-${trip.id}`}
            >
                <div className="relative aspect-[4/3] overflow-hidden bg-forest">
                    <img
                        src={image}
                        alt={trip.title || "Trekking adventure"}
                        loading="lazy"
                        decoding="async"
                        onError={(event) => {
                            event.currentTarget.src = FALLBACK_IMAGE;
                        }}
                        className="img-tone h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {trip.difficulty && (
                        <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-charcoal/70 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-beige backdrop-blur-sm">
                            {trip.difficulty}
                        </span>
                    )}

                    {hasRating && (
                        <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-canvas/95 px-3 py-1.5 font-mono text-xs font-medium text-ink">
                            <Star className="h-3.5 w-3.5 fill-gold text-gold" />
                            {rating.toFixed(1)}
                        </span>
                    )}
                </div>

                <div className="flex flex-1 flex-col p-5 md:p-6">
                    {(trip.code || trip.coords) && (
                        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-deep">
                            {[trip.code, trip.coords].filter(Boolean).join(" · ")}
                        </p>
                    )}

                    <h3 className="mt-2 font-serif text-xl font-semibold leading-snug text-ink">
                        {trip.title || "Mountain Trek"}
                    </h3>

                    {location && (
                        <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-moss">
                            <MapPin className="h-3.5 w-3.5 text-olive" />
                            {location}
                        </p>
                    )}

                    {(duration || altitude) && (
                        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-ink/10 pt-4 text-xs text-moss">
                            {duration && (
                                <span className="inline-flex items-center gap-1.5">
                                    <Clock className="h-3.5 w-3.5 text-olive" />
                                    {duration}
                                </span>
                            )}

                            {altitude && (
                                <span className="inline-flex items-center gap-1.5">
                                    <Mountain className="h-3.5 w-3.5 text-olive" />
                                    {altitude}
                                </span>
                            )}
                        </div>
                    )}

                    <div className="mt-auto flex items-center justify-between gap-3 pt-5">
                        <div>
                            <p className="text-[10px] uppercase tracking-[0.2em] text-ink/45">
                                From
                            </p>
                            <p className="font-serif text-xl font-semibold text-ink">
                                {price}
                                {price !== "Contact us" && (
                                    <span className="ml-1 font-sans text-[10px] font-normal text-ink/45">
                                        / person
                                    </span>
                                )}
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => openTrip(trip)}
                            data-testid={`explore-trip-button-${trip.id}`}
                            className="group/btn inline-flex items-center gap-2 rounded-full bg-gold px-4 py-2.5 text-xs font-semibold text-charcoal transition-colors hover:bg-glow"
                        >
                            Explore Trip
                            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
                        </button>
                    </div>
                </div>
            </motion.article>
        </Reveal>
    );
}
