
import { useParams, Link } from "react-router-dom";
import {
    ArrowLeft,
    ArrowUpRight,
    MapPin,
    CalendarDays,
    Clock,
    Compass,
    Mountain,
    MessageCircle,
} from "lucide-react";

import { useExperience } from "../lib/sheets";
import { Reveal, SectionHeading } from "../components/Reveal";

const FALLBACK_IMAGE =
    "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=1400&q=85";

function parseList(value) {
    if (Array.isArray(value)) return value;

    if (!value) return [];

    return String(value)
        .split(/[;\n|]/)
        .map((item) => item.trim())
        .filter(Boolean);
}

export default function ExperienceDetails() {
    const { id } = useParams();
    const { experience, loading, error } = useExperience(id);

    if (loading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center bg-canvas">
                <p className="text-sm uppercase tracking-[0.2em] text-moss">
                    Loading experience...
                </p>
            </div>
        );
    }

    if (error || !experience) {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center bg-canvas px-5 text-center">
                <Mountain className="mb-5 h-10 w-10 text-gold" />

                <h1 className="font-serif text-3xl text-ink">
                    Experience not found
                </h1>

                <p className="mt-3 max-w-md text-sm text-moss">
                    This experience may not be available yet. Explore our
                    other experiences instead.
                </p>

                <Link
                    to="/experiences"
                    className="mt-7 inline-flex items-center gap-2 rounded-full bg-forest px-6 py-3 text-xs font-semibold uppercase tracking-widest text-beige transition hover:bg-gold hover:text-charcoal"
                >
                    <ArrowLeft className="h-4 w-4" />
                    All Experiences
                </Link>
            </div>
        );
    }

    const highlights = parseList(experience.highlights);
    const places = parseList(experience.places);
    const gallery = experience.gallery || [];

    const heroImage = experience.image || FALLBACK_IMAGE;

    const whatsappMessage = encodeURIComponent(
        `Hello Northeast Wild Expedition, I would like to know more about ${experience.title}.`
    );

    return (
        <main className="bg-canvas">
            {/* Hero */}
            <section className="relative flex min-h-[65vh] items-end overflow-hidden bg-forest md:min-h-[78vh]">
                <img
                    src={heroImage}
                    alt={experience.title}
                    className="absolute inset-0 h-full w-full object-cover"
                    onError={(event) => {
                        event.currentTarget.src = FALLBACK_IMAGE;
                    }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/45 to-black/20" />

                <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-14 pt-32 lg:px-8 md:pb-20">
                    <Link
                        to="/experiences"
                        className="mb-10 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-beige/80 transition hover:text-gold"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        All Experiences
                    </Link>

                    <Reveal>
                        {experience.tag && (
                            <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-gold">
                                {experience.tag}
                            </p>
                        )}

                        <h1 className="max-w-4xl font-serif text-4xl font-medium leading-tight text-beige md:text-6xl lg:text-7xl">
                            {experience.title}
                        </h1>

                        {experience.location && (
                            <p className="mt-6 flex items-center gap-2 text-sm text-beige/80">
                                <MapPin className="h-4 w-4 text-gold" />
                                {experience.location}
                            </p>
                        )}
                    </Reveal>
                </div>
            </section>

            {/* Main content */}
            <section className="py-20 md:py-28">
                <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-[1.5fr_0.7fr] lg:px-8">
                    <div>
                        <Reveal>
                            <p className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-gold-deep">
                                Discover the Experience
                            </p>

                            <h2 className="max-w-2xl font-serif text-3xl leading-tight text-ink md:text-5xl">
                                A journey beyond the ordinary.
                            </h2>

                            <div className="mt-8 max-w-3xl whitespace-pre-line text-base leading-8 text-moss">
                                {experience.description ||
                                    "Discover the culture, landscape and traditions of this remarkable destination."}
                            </div>
                        </Reveal>

                        {/* Highlights */}
                        {highlights.length > 0 && (
                            <div className="mt-14">
                                <SectionHeading
                                    eyebrow="What to Discover"
                                    title="Experience the highlights."
                                />

                                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                                    {highlights.map((item, index) => (
                                        <Reveal key={index} delay={index * 0.06}>
                                            <div className="flex items-start gap-3 border-b border-ink/10 py-4">
                                                <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold/15">
                                                    <Compass className="h-4 w-4 text-gold-deep" />
                                                </span>

                                                <p className="text-sm leading-6 text-ink">
                                                    {item}
                                                </p>
                                            </div>
                                        </Reveal>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Places */}
                        {places.length > 0 && (
                            <div className="mt-16">
                                <SectionHeading
                                    eyebrow="Explore the Region"
                                    title="Places worth discovering."
                                />

                                <div className="mt-7 flex flex-wrap gap-3">
                                    {places.map((place, index) => (
                                        <span
                                            key={index}
                                            className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-4 py-3 text-sm text-ink"
                                        >
                                            <MapPin className="h-4 w-4 text-gold-deep" />
                                            {place}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Information panel */}
                    <aside>
                        <div className="sticky top-28 rounded-2xl border border-ink/10 bg-beige p-7 md:p-9">
                            <p className="font-mono text-xs uppercase tracking-[0.25em] text-gold-deep">
                                Experience Overview
                            </p>

                            <div className="mt-8 space-y-7">
                                {experience.location && (
                                    <div className="flex gap-4">
                                        <MapPin className="h-5 w-5 shrink-0 text-gold-deep" />
                                        <div>
                                            <p className="text-xs uppercase tracking-widest text-moss">
                                                Location
                                            </p>
                                            <p className="mt-1 text-sm font-medium text-ink">
                                                {experience.location}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {experience.season && (
                                    <div className="flex gap-4">
                                        <CalendarDays className="h-5 w-5 shrink-0 text-gold-deep" />
                                        <div>
                                            <p className="text-xs uppercase tracking-widest text-moss">
                                                Best Season
                                            </p>
                                            <p className="mt-1 text-sm font-medium text-ink">
                                                {experience.season}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {experience.duration && (
                                    <div className="flex gap-4">
                                        <Clock className="h-5 w-5 shrink-0 text-gold-deep" />
                                        <div>
                                            <p className="text-xs uppercase tracking-widest text-moss">
                                                Suggested Duration
                                            </p>
                                            <p className="mt-1 text-sm font-medium text-ink">
                                                {experience.duration}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="my-8 border-t border-ink/10" />

                            <p className="text-sm leading-7 text-moss">
                                Interested in discovering this place?
                                Contact our team to discuss your travel plans.
                            </p>

                            <a
                                href={`https://wa.me/918822565517?text=${whatsappMessage}`}
                                target="_blank"
                                rel="noreferrer"
                                className="mt-6 flex w-full items-center justify-center gap-3 rounded-full bg-forest px-6 py-4 text-xs font-semibold uppercase tracking-widest text-beige transition hover:bg-gold hover:text-charcoal"
                            >
                                <MessageCircle className="h-4 w-4" />
                                Enquire About This Experience
                                <ArrowUpRight className="h-4 w-4" />
                            </a>
                        </div>
                    </aside>
                </div>
            </section>

            {/* Gallery */}
            {gallery.length > 0 && (
                <section className="bg-beige py-20 md:py-28">
                    <div className="mx-auto max-w-7xl px-5 lg:px-8">
                        <SectionHeading
                            eyebrow="Visual Journey"
                            title="A glimpse of the experience."
                            description="Explore the landscapes, people and moments that make this destination special."
                        />

                        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {gallery.map((item, index) => (
                                <Reveal key={item.id || index} delay={index * 0.07}>
                                    <figure className="group overflow-hidden rounded-xl bg-forest">
                                        <img
                                            src={item.image || FALLBACK_IMAGE}
                                            alt={
                                                item.caption ||
                                                experience.title
                                            }
                                            loading="lazy"
                                            className="h-64 w-full object-cover transition duration-700 group-hover:scale-105 md:h-80"
                                            onError={(event) => {
                                                event.currentTarget.src =
                                                    FALLBACK_IMAGE;
                                            }}
                                        />

                                        {item.caption && (
                                            <figcaption className="px-5 py-4 text-sm text-ink">
                                                {item.caption}
                                            </figcaption>
                                        )}
                                    </figure>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Bottom CTA */}
            <section className="bg-forest px-5 py-20 text-center md:py-28">
                <Reveal>
                    <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold">
                        Your Next Discovery
                    </p>

                    <h2 className="mx-auto mt-5 max-w-3xl font-serif text-3xl leading-tight text-beige md:text-5xl">
                        Some places are better experienced than explained.
                    </h2>

                    <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-beige/65">
                        Get in touch with Northeast Wild Expedition and
                        start planning your discovery.
                    </p>

                    <Link
                        to="/experiences"
                        className="mt-9 inline-flex items-center gap-3 rounded-full border border-white/25 px-7 py-4 text-xs font-semibold uppercase tracking-widest text-beige transition hover:border-gold hover:bg-gold hover:text-charcoal"
                    >
                        Explore More Experiences
                        <ArrowUpRight className="h-4 w-4" />
                    </Link>
                </Reveal>
            </section>
        </main>
    );
}
