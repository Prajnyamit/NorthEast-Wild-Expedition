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
        text: "We plan like mountaineers, not agencies — turnaround times, weather margins and escape routes on every route.",
    },
    {
        stamp: "Principle 02",
        text: "The crew who carries your duffel eats the same dinner, from the same kitchen, at the same table.",
    },
    {
        stamp: "Principle 03",
        text: "Every booking funds trail conservation and the village schools along our routes.",
    },
];

export default function About() {
    return (
        <>
            <PageHeader
                eyebrow="About Us"
                title="Born on the trails of the North East."
                description="North East Wild Expedition began with a small crew of mountain guides in Gangtok who believed the wild should be shared slowly, safely and with the people who call it home."
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
                            title="A decade and a half of quiet first ascents — of a different kind."
                        />
                        <Reveal delay={0.18}>
                            <div className="mt-6 flex flex-col gap-4 text-base leading-relaxed text-moss">
                                <p>
                                    We started with one borrowed jeep, two guides and a promise:
                                    show guests the mountains the way locals know them — the
                                    routes, the monasteries, the weather signs in the clouds.
                                </p>
                                <p>
                                    Today our lead guides chart expeditions across the Himalayas,
                                    the Alps, the Dolomites, Patagonia and Iceland. The promise
                                    has not changed. Groups stay small, every itinerary is walked
                                    before you walk it, and the mountains are left exactly as we
                                    found them.
                                </p>
                            </div>
                        </Reveal>
                        <Reveal delay={0.26}>
                            <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.25em] text-gold-deep">
                                — The NE Wild Lead Guides
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
