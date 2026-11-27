import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Hero from "../components/Hero";
import Marquee from "../components/Marquee";
import StatsBand from "../components/StatsBand";
import DestinationCard from "../components/DestinationCard";
import ExperienceCard from "../components/ExperienceCard";
import AdventureCard from "../components/AdventureCard";
import TestimonialCard from "../components/TestimonialCard";
import DarkBanner from "../components/DarkBanner";
import WhyUs from "../components/WhyUs";
import InspirationGallery from "../components/InspirationGallery";
import Newsletter from "../components/Newsletter";
import { Reveal, SectionHeading } from "../components/Reveal";
import { useSiteContent } from "../lib/sheets";

const DEST_LAYOUT = [
    { className: "col-span-12 md:col-span-7", h: "h-[400px] md:h-[540px]" },
    { className: "col-span-12 md:col-span-5", h: "h-[400px] md:h-[540px]" },
    { className: "col-span-12 md:col-span-4", h: "h-[320px] md:h-[400px]" },
    { className: "col-span-12 md:col-span-8", h: "h-[320px] md:h-[400px]" },
    { className: "col-span-12 md:col-span-6", h: "h-[360px] md:h-[440px]" },
    { className: "col-span-12 md:col-span-6", h: "h-[360px] md:h-[440px]" },
];

const BENTO = [
    "col-span-2 row-span-2",
    "col-span-2",
    "col-span-1",
    "col-span-1",
    "col-span-2",
    "col-span-1",
    "col-span-1",
];

export default function Home() {
    const { data } = useSiteContent();
    const destinations = data.destinations || [];
    const experiences = data.experiences || [];
    const adventures = data.adventures || [];
    const testimonials = data.testimonials || [];

    return (
        <>
            <Hero />
            <StatsBand />
            {/* <Marquee /> */}

            <section id="destinations" className="bg-canvas py-24" data-testid="featured-destinations">
                <div className="mx-auto max-w-7xl px-5 lg:px-8">
                    <div className="flex flex-wrap items-end justify-between gap-6">
                        <SectionHeading
                            eyebrow="Featured Destinations"
                            title="Ranges that stay with you."
                            description="From the lush valleys of Northeast India to the majestic Himalayan landscapes of Uttarakhand — discover extraordinary destinations, one trail at a time."
                        />
                        <Reveal delay={0.2}>
                            <Link
                                to="/destinations"
                                data-testid="home-view-all-destinations"
                                className="group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-ink transition-colors hover:text-gold-deep"
                            >
                                All Destinations
                                <ArrowRight className="h-4 w-4 text-gold-deep transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>
                        </Reveal>
                    </div>
                    <div className="mt-14 grid grid-cols-12 gap-4">
                        
                        {destinations.map((d, i) => {
                            const layout = DEST_LAYOUT[i % DEST_LAYOUT.length] || {};

                            return (
                                <DestinationCard
                                    key={d.id}
                                    d={d}
                                    className={layout.className || ""}
                                    h={layout.h || ""}
                                />
                            );
                        })}

                    </div>
                </div>
            </section>

            <section id="experiences" className="bg-beige py-24" data-testid="adventure-experiences">
                <div className="mx-auto max-w-7xl px-5 lg:px-8">
                    <div className="flex flex-wrap items-end justify-between gap-6">
                        <SectionHeading
                        eyebrow="Culture · Nature · Heritage"
                        title="Discover the soul of every destination."
                        description="From vibrant tribal festivals and ancient traditions to extraordinary landscapes and living heritage, explore experiences beyond the trail."
                           
                        />
                        <Reveal delay={0.2}>
                            <Link
                                to="/experiences"
                                data-testid="home-view-all-experiences"
                                className="group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-ink transition-colors hover:text-gold-deep"
                            >
                                All Experiences
                                <ArrowRight className="h-4 w-4 text-gold-deep transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>
                        </Reveal>
                    </div>
                    
                    <div className="mt-14 grid grid-cols-2 auto-rows-[180px] gap-4 md:grid-cols-4 md:auto-rows-[200px]">
                        {experiences.map((e, i) => {
                            const layout = BENTO[i % BENTO.length];

                            return (
                                <ExperienceCard
                                    key={e.id}
                                    e={e}
                                    className={layout}
                                />
                            );
                        })}
                    </div>

                </div>
            </section>

            <DarkBanner />

            <section id="adventures" className="bg-canvas py-24" data-testid="featured-adventures">
                <div className="mx-auto max-w-7xl px-5 lg:px-8">
                    <SectionHeading
                        eyebrow="Trek Collection"
                        title="Find a trail that feels like yours."
                        description="Compare the routes, landscapes and itinerary outlines. Contact our team to confirm current departures, availability and package details."
                    />
                    <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {adventures.slice(0, 3).map((t, i) => (
                            <AdventureCard key={t.id} trip={t} delay={(i % 3) * 0.08} />
                        ))}
                    </div>
                    <div className="mt-10 text-center">
                        <Link to="/treks" className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-ink transition hover:border-gold hover:bg-beige">
                            Explore all treks <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </section>

            <WhyUs />
            <InspirationGallery />

            {testimonials.length > 0 && (
                <section className="bg-beige py-24" data-testid="testimonials-section">
                    <div className="mx-auto max-w-7xl px-5 lg:px-8">
                        <SectionHeading eyebrow="Traveller stories" title="Notes from the trail." description="Experiences shared by travellers who have journeyed with us." />
                        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                            {testimonials.map((t, i) => (
                                <TestimonialCard key={t.id} t={t} delay={(i % 4) * 0.08} />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <Newsletter />
        </>
    );
}
