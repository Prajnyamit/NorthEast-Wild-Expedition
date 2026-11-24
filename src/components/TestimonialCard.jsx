
import { Star } from "lucide-react";
import { Reveal } from "./Reveal";
import { imgSize } from "../lib/img";

const FALLBACK_AVATAR =
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=160&q=80";

export default function TestimonialCard({ t, delay = 0 }) {
    if (!t) return null;

    const rating = Math.min(5, Math.max(0, Number(t.rating) || 0));
    const avatar = t.avatar ? imgSize(t.avatar, 160) : FALLBACK_AVATAR;
    const attribution = [t.trip, t.code].filter(Boolean).join(" · ");

    return (
        <Reveal delay={delay} className="h-full">
            <figure
                className="flex h-full flex-col rounded-xl border border-gold/20 bg-white p-6 shadow-sm md:p-7"
                data-testid={`testimonial-card-${t.id}`}
            >
                <div
                    className="flex items-center gap-1"
                    aria-label={`${rating} out of 5 stars`}
                >
                    {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                            key={index}
                            className={`h-3.5 w-3.5 ${
                                index < rating
                                    ? "fill-gold text-gold"
                                    : "text-ink/20"
                            }`}
                        />
                    ))}
                </div>

                {t.text && (
                    <blockquote className="mt-4 flex-1 font-serif text-[15px] italic leading-relaxed text-ink/85 md:text-base">
                        “{t.text}”
                    </blockquote>
                )}

                <figcaption className="mt-6 flex items-center gap-4 border-t border-ink/10 pt-5">
                    <img
                        src={avatar}
                        alt={t.name || "Customer"}
                        loading="lazy"
                        decoding="async"
                        onError={(event) => {
                            event.currentTarget.onerror = null;
                            event.currentTarget.src = FALLBACK_AVATAR;
                        }}
                        className="h-11 w-11 rounded-full object-cover ring-1 ring-gold/40"
                    />

                    <div className="min-w-0">
                        <p className="text-sm font-semibold text-ink">
                            {t.name || "Verified Customer"}
                        </p>

                        {attribution && (
                            <p className="font-mono text-[10px] uppercase leading-relaxed tracking-[0.18em] text-olive">
                                {attribution}
                            </p>
                        )}
                    </div>
                </figcaption>
            </figure>
        </Reveal>
    );
}
