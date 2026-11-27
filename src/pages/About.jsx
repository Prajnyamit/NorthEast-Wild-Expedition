import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PageHeader from "../components/PageHeader";
import StatsBand from "../components/StatsBand";
import WhyUs from "../components/WhyUs";
import DarkBanner from "../components/DarkBanner";
import Newsletter from "../components/Newsletter";
import { Reveal, SectionHeading } from "../components/Reveal";
import { imgSize } from "../lib/img";

const FIELD_NOTES = [
    {
        stamp: "Principle 01",
        text: "Good planning starts with clear route information, realistic expectations and attention to local conditions.",
    },
    {
        stamp: "Principle 02",
        text: "Local communities, traditions and landscapes are an important part of understanding every destination.",
    },
    {
        stamp: "Principle 03",
        text: "We encourage responsible travel: respect local customs, minimise waste and leave natural places undisturbed.",
    },
];

export default function About() {
    return (
        <>
            <PageHeader
                eyebrow="About Us"
                title="Explore the mountains with a deeper sense of place."
                description="Northeast Wild Expedition brings together Himalayan trekking routes, remarkable landscapes and cultural experiences. Explore the collection, understand each route and speak with the team before planning your journey."
            />

            <section className="bg-canvas py-20" data-testid="about-story">
                <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-2 lg:px-8">
                    <Reveal>
                        <div className="relative">
                            <div className="group h-[340px] overflow-hidden rounded-2xl md:h-[480px]">
                                <img
                                    src={imgSize("https://images.unsplash.com/photo-1526772662000-3f88f10405ff?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzF8MHwzfHxoaWtlcnMlMjB0cmVra2luZyUyMG1vdW50YWluJTIwdHJhaWwlMjBiYWNrcGFja3xlbnwwfHx8fDE3OTUzMjUwNjB8MA&ixlib=rb-4.1.0&q=85", 1100)}
                                    alt="Hiker beside cairn stones on a mountain ridge"
                                    loading="lazy"
                                    decoding="async"
                                    className="img-tone h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                            <div className="absolute -bottom-8 -right-3 hidden w-52 overflow-hidden rounded-xl border-4 border-canvas shadow-xl lg:block lg:-right-8">
                                <img
                                    src={imgSize("https://images.pexels.com/photos/914128/pexels-photo-914128.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", 500)}
                                    alt="Two hikers on a snowy mountain trail"
                                    loading="lazy"
                                    decoding="async"
                                    className="img-tone h-36 w-full object-cover"
                                />
                            </div>
                        </div>
                    </Reveal>
                    <div>
                        <SectionHeading
                            eyebrow="Our Story"
                            title="A thoughtful approach to every journey."
                        />
                        <Reveal delay={0.18}>
                            <div className="mt-6 flex flex-col gap-4 text-base leading-relaxed text-moss">
                                <p>
                                    The Himalayas are not just a backdrop for adventure. They are living landscapes shaped by mountain communities, local knowledge, changing seasons and extraordinary natural environments.
                                </p>
                                <p>
                                    Our collection brings together trek routes and destination-led experiences so travellers can compare places, understand the journey and ask the right questions before making a booking. Route conditions, permits, inclusions and departure details should always be confirmed with the team.
                                </p>
                            </div>
                        </Reveal>
                        <Reveal delay={0.26}>
                            <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.25em] text-gold-deep">
                                — Northeast Wild Expedition
                            </p>
                        </Reveal>
                    </div>
                </div>
            </section>

            <StatsBand />

            <section className="bg-canvas pb-24" data-testid="field-notes">
                <div className="mx-auto max-w-7xl px-5 pt-20 lg:px-8">
                    <SectionHeading
                        eyebrow="Field Notes"
                        title="How we work, off the record."
                    />
                    <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-gold/20 bg-gold/20 md:grid-cols-3">
                        {FIELD_NOTES.map((n, i) => (
                            <Reveal key={n.stamp} delay={i * 0.08} className="h-full">
                                <div className="flex h-full flex-col bg-canvas p-7">
                                    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-deep">
                                        {n.stamp}
                                    </p>
                                    <p className="mt-4 font-serif text-lg italic leading-relaxed text-ink/85">
                                        {n.text}
                                    </p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                    <Reveal delay={0.2}>
                        <Link
                            to="/destinations"
                            data-testid="about-explore-cta"
                            className="group mt-12 inline-flex items-center gap-2 rounded-full bg-forest px-7 py-3.5 text-sm font-semibold text-beige transition-colors hover:bg-pine"
                        >
                            Start Planning Your Expedition
                            <ArrowRight className="h-4 w-4 text-gold transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                    </Reveal>
                </div>
            </section>

            <WhyUs />
            <DarkBanner />
            <Newsletter />
        </>
    );
}
