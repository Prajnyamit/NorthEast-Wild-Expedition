import { Compass, Leaf, MapPinned, Users } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";
import { WHY_US } from "../data";

const ICONS = { Compass, MapPinned, Users, Leaf };

export default function WhyUs() {
    return (
        <section className="bg-canvas py-24" data-testid="why-us-section">
            <div className="mx-auto max-w-7xl px-5 lg:px-8">
                <SectionHeading
                    eyebrow="Why Travel With Us"
                    title="Premium by design, responsible by conviction."
                    description="We are mountain people first. Every departure is built on small groups, local expertise and a stubborn respect for the wild places we walk through."
                />
                <div className="mt-14 grid gap-px overflow-hidden rounded-xl border border-gold/20 bg-gold/20 sm:grid-cols-2 lg:grid-cols-4">
                    {WHY_US.map((item, i) => {
                        const Icon = ICONS[item.icon] || Compass;
                        return (
                            <Reveal key={item.title} delay={i * 0.08} className="h-full">
                                <div className="flex h-full flex-col bg-canvas p-7 transition-colors duration-300 hover:bg-beige md:p-8">
                                    <div className="flex items-center justify-between">
                                        <span className="font-mono text-xs text-gold-deep">
                                            0{i + 1}
                                        </span>
                                        <span className="rounded-full border border-gold/30 bg-beige p-2.5">
                                            <Icon className="h-4 w-4 text-olive" />
                                        </span>
                                    </div>
                                    <h3 className="mt-8 font-serif text-xl font-semibold text-ink">
                                        {item.title}
                                    </h3>
                                    <p className="mt-3 text-sm leading-relaxed text-moss">
                                        {item.text}
                                    </p>
                                </div>
                            </Reveal>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
