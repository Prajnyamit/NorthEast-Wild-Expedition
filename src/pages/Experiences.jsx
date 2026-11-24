
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PageHeader from "../components/PageHeader";
import ExperienceCard from "../components/ExperienceCard";
import Newsletter from "../components/Newsletter";
import { Reveal, SectionHeading } from "../components/Reveal";
import { useSiteContent } from "../lib/sheets";

const BENTO = [
    "col-span-2 row-span-2",
    "col-span-2",
    "col-span-1",
    "col-span-1",
    "col-span-2",
    "col-span-1",
    "col-span-1",
];

export default function Experiences() {
    const { data, loading, error } = useSiteContent();
    const experiences = data?.experiences || [];

    return (
        <>
            <PageHeader
                eyebrow="Discover the Northeast"
                title="Beyond the trail, discover a different world."
                description="From vibrant tribal festivals and ancient traditions to extraordinary landscapes and living heritage — discover the experiences that make every journey meaningful."
            />

            <section
                className="bg-canvas py-20"
                data-testid="experiences-page"
            >
                <div className="mx-auto max-w-7xl px-5 lg:px-8">
                    <div className="flex flex-wrap items-end justify-between gap-6">
                        <SectionHeading
                            eyebrow="Culture · Nature · Heritage"
                            title="Discover what makes each place special."
                            description="Explore the traditions, communities, festivals and natural wonders of Northeast India and the Himalayas."
                        />

                        <Reveal delay={0.15}>
                            <Link
                                to="/treks"
                                className="group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.15em] text-ink transition-colors hover:text-gold-deep"
                            >
                                Explore Treks
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </Reveal>
                    </div>

                    {loading ? (
                        <p className="py-16 text-center text-sm text-moss">
                            Loading experiences...
                        </p>
                    ) : error ? (
                        <p className="py-16 text-center text-sm text-moss">
                            Experiences could not be loaded. Please try again later.
                        </p>
                    ) : experiences.length > 0 ? (
                        <div className="mt-14 grid auto-rows-[150px] grid-cols-2 gap-4 md:auto-rows-[190px] md:grid-cols-4">
                            {experiences.map((e, i) => (
                                <ExperienceCard
                                    key={e.id}
                                    e={e}
                                    className={BENTO[i % BENTO.length]}
                                />
                            ))}
                        </div>
                    ) : (
                        <p className="py-16 text-center text-sm text-moss">
                            New experiences are coming soon.
                        </p>
                    )}
                </div>
            </section>

            <Newsletter />
        </>
    );
}
