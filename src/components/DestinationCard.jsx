
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { imgSize } from "../lib/img";

const FALLBACK_IMAGE =
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900&q=80";

export default function DestinationCard({
    d,
    className = "",
    h = "h-[400px]",
}) {
    if (!d) return null;

    const image = d.image ? imgSize(d.image, 900) : FALLBACK_IMAGE;
    const meta = [d.code, d.altitude].filter(Boolean).join(" · ");

    const trekId = d.trek_id || d.trekId || d.id?.replace(/^D/, "T");
    const destinationLink = trekId ? `/treks/${trekId}` : "/treks";

    return (
        <Reveal className={className}>
            <Link
                to={destinationLink}
                data-testid={`destination-card-${d.id}`}
                aria-label={`Explore ${d.name || "destination"}`}
                className={`group relative block overflow-hidden rounded-xl bg-forest ${h}`}
            >
                <img
                    src={image}
                    alt={d.name || "Mountain destination"}
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                        e.currentTarget.src = FALLBACK_IMAGE;
                    }}
                    className="img-tone absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-forest/95 via-forest/15 to-black/10" />

                {meta && (
                    <span className="absolute left-5 top-5 rounded-full border border-white/15 bg-black/30 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-beige/90 backdrop-blur-sm">
                        {meta}
                    </span>
                )}

                <div className="absolute inset-x-0 bottom-0 p-6">
                    {d.region && (
                        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold">
                            {d.region}
                        </p>
                    )}

                    <h3 className="mt-1 font-serif text-2xl font-medium text-beige md:text-3xl">
                        {d.name || "Explore the Himalayas"}
                    </h3>

                    {d.description && (
                        <p className="mt-2 max-w-md text-sm leading-relaxed text-beige/70 opacity-100 transition-all duration-500 md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
                            {d.description}
                        </p>
                    )}

                    <span className="mt-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-beige">
                        View Trek Details
                        <ArrowRight className="h-3.5 w-3.5 text-gold transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                </div>
            </Link>
        </Reveal>
    );
}
