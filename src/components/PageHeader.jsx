import { Reveal } from "./Reveal";

export default function PageHeader({ eyebrow, title, description }) {
    return (
        <section className="topo-lines relative overflow-hidden bg-forest pb-20 pt-36 md:pb-24 md:pt-44">
            <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
                <Reveal>
                    <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-gold">
                        <span className="inline-block h-px w-8 bg-gold" />
                        {eyebrow}
                    </p>
                </Reveal>
                <Reveal delay={0.08}>
                    <h1 className="mt-4 max-w-3xl font-serif text-4xl font-medium leading-[1.08] tracking-tight text-beige sm:text-5xl lg:text-6xl">
                        {title}
                    </h1>
                </Reveal>
                {description && (
                    <Reveal delay={0.16}>
                        <p className="mt-6 max-w-xl text-base leading-relaxed text-sage sm:text-lg">
                            {description}
                        </p>
                    </Reveal>
                )}
            </div>
        </section>
    );
}
