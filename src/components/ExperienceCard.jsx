
import { Link } from "react-router-dom";
import {
    MountainSnow,
    Footprints,
    Axe,
    Tent,
    Binoculars,
    Sparkles,
    CarFront,
    Mountain,
    ArrowUpRight,
    Landmark,
    Users,
    Flower2,
} from "lucide-react";
import { Reveal } from "./Reveal";
import { imgSize } from "../lib/img";

const ICONS = {
    MountainSnow,
    Footprints,
    Axe,
    Tent,
    Binoculars,
    Sparkles,
    CarFront,
    Landmark,
    Users,
    Flower2,
};

const FALLBACK_IMAGE =
    "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&q=80";

export default function ExperienceCard({ e, className = "" }) {
    if (!e) return null;

    const Icon = ICONS[e.icon] || Mountain;
    const image = e.image ? imgSize(e.image, 800) : FALLBACK_IMAGE;

    return (
        <Reveal className={className}>
            <Link
                to={`/experiences/${e.id}`}
                data-testid={`experience-card-${e.id}`}
                aria-label={`Explore ${e.title || "experience"}`}
                className="group relative block h-full min-h-0 w-full overflow-hidden rounded-xl bg-forest"
            >
                <img
                    src={image}
                    alt={e.title || "Experience"}
                    loading="lazy"
                    decoding="async"
                    onError={(event) => {
                        event.currentTarget.src = FALLBACK_IMAGE;
                    }}
                    className="img-tone absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-forest/95 via-forest/20 to-black/15" />

                <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/30 p-2.5 backdrop-blur-sm">
                    <Icon className="h-4 w-4 text-gold" />
                </span>

                <div className="absolute inset-x-0 bottom-0 p-5">
                    {e.tag && (
                        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold">
                            {e.tag}
                        </p>
                    )}

                    <div className="mt-1 flex items-end justify-between gap-2">
                        <div>
                            <h3 className="font-serif text-lg font-medium leading-snug text-beige md:text-xl">
                                {e.title || "Explore the Outdoors"}
                            </h3>

                            {e.location && (
                                <p className="mt-1 text-xs text-beige/70">
                                    {e.location}
                                </p>
                            )}
                        </div>

                        <span className="mb-0.5 shrink-0 rounded-full border border-white/15 bg-black/30 p-1.5 opacity-100 backdrop-blur-sm transition-all duration-300 md:opacity-0 md:group-hover:opacity-100">
                            <ArrowUpRight className="h-3.5 w-3.5 text-gold" />
                        </span>
                    </div>
                </div>
            </Link>
        </Reveal>
    );
}
