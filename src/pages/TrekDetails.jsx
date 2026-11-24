
import { useParams, Link } from "react-router-dom";
import {
    ArrowLeft,
    ArrowRight,
    Clock,
    MapPin,
    Mountain,
    CalendarDays,
    CheckCircle2,
    XCircle,
    MessageCircle,
    ChevronDown,
    Star,
    Download,
} from "lucide-react";

import { useTrek } from "../lib/sheets";

const FALLBACK_IMAGE =
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=85";

const WHATSAPP_NUMBER = "918825565517";

function getValue(...values) {
    return values.find(
        (value) => value !== undefined &&
        value !== null &&
        String(value).trim() !== ""
    );
}

function formatPrice(value) {
    if (!value) return "Contact for price";

    const text = String(value);
    if (/[₹,]/.test(text) || /person/i.test(text)) return text;

    const amount = Number(text.replace(/[^0-9.]/g, ""));
    return Number.isFinite(amount) && amount > 0
        ? `₹${amount.toLocaleString("en-IN")}/person`
        : text;
}

function SectionTitle({ eyebrow, title, description }) {
    return (
        <div className="mb-8">
            {eyebrow && (
                <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.25em] text-gold-deep">
                    {eyebrow}
                </p>
            )}
            <h2 className="font-serif text-3xl text-ink md:text-4xl">
                {title}
            </h2>
            {description && (
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink/60">
                    {description}
                </p>
            )}
        </div>
    );
}

export default function TrekDetails() {
    const { id } = useParams();
    const { trek, loading, error } = useTrek(id);

    if (loading && !trek) {
        return (
            <div className="flex min-h-[70vh] items-center justify-center bg-canvas">
                <div className="h-9 w-9 animate-spin rounded-full border-2 border-gold border-t-transparent" />
            </div>
        );
    }

    if (error && !trek) {
        return (
            <div className="flex min-h-[70vh] flex-col items-center justify-center bg-canvas px-5 text-center">
                <h1 className="font-serif text-3xl text-ink">
                    Unable to load trek
                </h1>
                <p className="mt-3 text-sm text-ink/60">
                    Please check your internet connection and try again.
                </p>
                <Link to="/treks" className="mt-6 text-sm font-semibold text-gold-deep">
                    Back to all treks
                </Link>
            </div>
        );
    }

    if (!trek) {
        return (
            <div className="flex min-h-[70vh] flex-col items-center justify-center bg-canvas px-5 text-center">
                <Mountain className="mb-5 h-10 w-10 text-gold-deep" />
                <h1 className="font-serif text-3xl text-ink">
                    Trek not found
                </h1>
                <p className="mt-3 text-sm text-ink/60">
                    We couldn't find a trek with this ID.
                </p>
                <Link to="/treks" className="mt-6 text-sm font-semibold text-gold-deep">
                    Explore all treks
                </Link>
            </div>
        );
    }

    const title = getValue(trek.title, trek.name, "Himalayan Trek");
    const location = getValue(trek.region, trek.location, trek.destination);
    const duration = getValue(trek.duration, trek.days);
    const startPoint = getValue(
        trek.start_location,
        trek.starting_point,
        trek.start_point
    );
    const difficulty = trek.difficulty;
    const altitude = trek.altitude;
    const price = formatPrice(trek.price);

    const description = getValue(
        trek.description,
        trek.overview,
        trek.short_description
    );

    const heroImage = trek.image || FALLBACK_IMAGE;
    const gallery = (trek.gallery || []).filter((item) => item.image);

    const itinerary = trek.itinerary || [];
    const inclusions = trek.inclusions || [];
    const exclusions = trek.exclusions || [];
    const faqs = trek.faq || [];
    const reviews = trek.reviewList || [];
    const documents = trek.documents || [];

    const whatsappMessage = encodeURIComponent(
        `Hi Northeast Wild Expedition! I'm interested in the ${title}. Please share more details about upcoming departures and booking.`
    );

    const whatsappLink =
        `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;

    return (
        <div className="bg-canvas">

            {/* HERO */}
            <section className="relative flex min-h-[75vh] items-end overflow-hidden bg-forest md:min-h-[85vh]">
                <img
                    src={heroImage}
                    alt={title}
                    onError={(e) => {
                        e.currentTarget.src = FALLBACK_IMAGE;
                    }}
                    className="absolute inset-0 h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/45 to-black/20" />

                <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-14 pt-32 lg:px-8 md:pb-20">
                    <Link
                        to="/treks"
                        className="mb-12 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-beige/80 transition hover:text-gold"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        All Treks
                    </Link>

                    <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-gold">
                        {location || "Uttarakhand, Himalayas"}
                    </p>

                    <h1 className="max-w-4xl font-serif text-5xl leading-[1.05] text-beige md:text-7xl">
                        {title}
                    </h1>

                    {description && (
                        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-beige/75 md:text-base">
                            {description}
                        </p>
                    )}

                    <div className="mt-8 flex flex-wrap items-center gap-5 text-sm text-beige/85">
                        {duration && (
                            <span className="inline-flex items-center gap-2">
                                <Clock className="h-4 w-4 text-gold" />
                                {duration}
                            </span>
                        )}
                        {startPoint && (
                            <span className="inline-flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-gold" />
                                {startPoint}
                            </span>
                        )}
                    </div>

                    <div className="mt-9 flex flex-wrap items-center gap-4">
                        <a
                            href={whatsappLink}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-3 rounded-full bg-gold px-7 py-4 text-xs font-bold uppercase tracking-[0.16em] text-forest transition hover:bg-beige"
                        >
                            Enquire Now
                            <ArrowRight className="h-4 w-4" />
                        </a>

                        <span className="text-sm text-beige/80">
                            Starting from <strong className="text-xl text-beige">{price}</strong>
                        </span>
                    </div>
                </div>
            </section>

            {/* QUICK FACTS */}
            <section className="border-b border-ink/10 bg-beige">
                <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-5 py-8 md:grid-cols-4 lg:px-8">
                    {[
                        { label: "Duration", value: duration, icon: Clock },
                        { label: "Starting Point", value: startPoint, icon: MapPin },
                        { label: "Difficulty", value: difficulty, icon: Mountain },
                        { label: "Maximum Altitude", value: altitude, icon: ArrowRight },
                    ]
                        .filter((item) => item.value)
                        .map((item) => {
                            const Icon = item.icon;
                            return (
                                <div key={item.label}>
                                    <Icon className="mb-3 h-5 w-5 text-gold-deep" />
                                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/45">
                                        {item.label}
                                    </p>
                                    <p className="mt-1 text-sm font-semibold text-ink">
                                        {item.value}
                                    </p>
                                </div>
                            );
                        })}
                </div>
            </section>

            {/* OVERVIEW */}
            {description && (
                <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
                    <SectionTitle
                        eyebrow="Discover the journey"
                        title="About this trek"
                        description={description}
                    />
                </section>
            )}

            {/* ITINERARY */}
            {itinerary.length > 0 && (
                <section className="bg-beige py-20">
                    <div className="mx-auto max-w-5xl px-5 lg:px-8">
                        <SectionTitle
                            eyebrow="Your journey"
                            title="Trek itinerary"
                            description="Explore the journey day by day."
                        />

                        <div className="space-y-3">
                            {itinerary.map((day, index) => {
                                const dayTitle = getValue(
                                    day.title,
                                    day.activity,
                                    day.route,
                                    day.name,
                                    `Day ${index + 1}`
                                );

                                const dayNumber = getValue(
                                    day.day,
                                    day.day_number,
                                    index + 1
                                );

                                const dayDescription = getValue(
                                    day.description,
                                    day.details,
                                    day.activities
                                );

                                return (
                                    <details
                                        key={day.id || `${id}-day-${index}`}
                                        className="group rounded-xl border border-ink/10 bg-canvas"
                                    >
                                        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5">
                                            <div className="flex items-center gap-4">
                                                <span className="font-mono text-xs text-gold-deep">
                                                    DAY {dayNumber}
                                                </span>
                                                <h3 className="font-serif text-lg text-ink">
                                                    {dayTitle}
                                                </h3>
                                            </div>
                                            <ChevronDown className="h-5 w-5 shrink-0 text-ink/50 transition-transform group-open:rotate-180" />
                                        </summary>

                                        {dayDescription && (
                                            <div className="border-t border-ink/10 px-5 py-5 text-sm leading-relaxed text-ink/65">
                                                {dayDescription}
                                            </div>
                                        )}
                                    </details>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}

            {/* GALLERY */}
            {gallery.length > 0 && (
                <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
                    <SectionTitle
                        eyebrow="Visual journey"
                        title="Moments from the mountains"
                    />

                    <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                        {gallery.map((item, index) => (
                            <div
                                key={item.id || index}
                                className={`overflow-hidden rounded-xl ${
                                    index === 0 ? "col-span-2 row-span-2" : ""
                                }`}
                            >
                                <img
                                    src={item.image}
                                    alt={item.caption || `${title} trek`}
                                    loading="lazy"
                                    onError={(e) => {
                                        e.currentTarget.style.display = "none";
                                    }}
                                    className="h-full min-h-[170px] w-full object-cover transition duration-700 hover:scale-105"
                                />
                                {item.caption && (
                                    <p className="bg-beige px-3 py-2 text-xs text-ink/60">
                                        {item.caption}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* INCLUSIONS AND EXCLUSIONS */}
            {(inclusions.length > 0 || exclusions.length > 0) && (
                <section className="bg-beige py-20">
                    <div className="mx-auto grid max-w-7xl gap-12 px-5 md:grid-cols-2 lg:px-8">
                        {inclusions.length > 0 && (
                            <div>
                                <SectionTitle
                                    eyebrow="Package details"
                                    title="What's included"
                                />
                                <ul className="space-y-4">
                                    {inclusions.map((item, index) => (
                                        <li key={index} className="flex items-start gap-3 text-sm text-ink/75">
                                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-700" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {exclusions.length > 0 && (
                            <div>
                                <SectionTitle
                                    eyebrow="Please note"
                                    title="What's not included"
                                />
                                <ul className="space-y-4">
                                    {exclusions.map((item, index) => (
                                        <li key={index} className="flex items-start gap-3 text-sm text-ink/75">
                                            <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-700" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* DOCUMENTS */}
            {documents.length > 0 && (
                <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
                    <SectionTitle
                        eyebrow="Plan ahead"
                        title="Trek documents"
                    />
                    <div className="grid gap-3 md:grid-cols-2">
                        {documents.map((document, index) => (
                            <a
                                key={document.id || index}
                                href={document.download || document.url}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center justify-between rounded-xl border border-ink/10 bg-beige p-5 transition hover:border-gold"
                            >
                                <span className="text-sm font-medium text-ink">
                                    {getValue(document.title, document.name, "View trek document")}
                                </span>
                                <Download className="h-4 w-4 text-gold-deep" />
                            </a>
                        ))}
                    </div>
                </section>
            )}

            {/* FAQ */}
            {faqs.length > 0 && (
                <section className="bg-beige py-20">
                    <div className="mx-auto max-w-4xl px-5 lg:px-8">
                        <SectionTitle
                            eyebrow="Need to know"
                            title="Frequently asked questions"
                        />
                        <div className="space-y-3">
                            {faqs.map((faq, index) => (
                                <details
                                    key={faq.id || index}
                                    className="group rounded-xl border border-ink/10 bg-canvas"
                                >
                                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5">
                                        <span className="text-sm font-semibold text-ink">
                                            {getValue(faq.question, faq.q, "Question")}
                                        </span>
                                        <ChevronDown className="h-4 w-4 shrink-0 text-ink/50 transition-transform group-open:rotate-180" />
                                    </summary>
                                    <div className="border-t border-ink/10 px-5 py-5 text-sm leading-relaxed text-ink/65">
                                        {getValue(faq.answer, faq.a, "Please contact us for more information.")}
                                    </div>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* REVIEWS */}
            {reviews.length > 0 && (
                <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
                    <SectionTitle
                        eyebrow="Traveller stories"
                        title="Experiences from our trekkers"
                    />
                    <div className="grid gap-5 md:grid-cols-2">
                        {reviews.map((review, index) => (
                            <article
                                key={review.id || index}
                                className="rounded-xl border border-ink/10 bg-beige p-6"
                            >
                                <div className="mb-4 flex gap-1 text-gold-deep">
                                    {Array.from({
                                        length: Math.min(5, Math.max(0, Number(review.rating) || 0)),
                                    }).map((_, i) => (
                                        <Star key={i} className="h-4 w-4 fill-current" />
                                    ))}
                                </div>
                                <p className="text-sm leading-relaxed text-ink/70">
                                    {getValue(review.text, review.comment, review.review, "")}
                                </p>
                                <p className="mt-5 text-sm font-semibold text-ink">
                                    {getValue(review.name, review.reviewer, "Traveller")}
                                </p>
                            </article>
                        ))}
                    </div>
                </section>
            )}

            {/* FINAL CTA */}
            <section className="bg-forest px-5 py-20 text-center">
                <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.25em] text-gold">
                    Your next adventure starts here
                </p>
                <h2 className="mx-auto max-w-3xl font-serif text-4xl text-beige md:text-5xl">
                    Ready to explore {title}?
                </h2>
                <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-beige/65">
                    Contact our team for trek details, departure information and booking enquiries.
                </p>
                <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-8 inline-flex items-center gap-3 rounded-full bg-gold px-8 py-4 text-xs font-bold uppercase tracking-[0.16em] text-forest transition hover:bg-beige"
                >
                    <MessageCircle className="h-4 w-4" />
                    Enquire on WhatsApp
                </a>
            </section>
        </div>
    );
}
