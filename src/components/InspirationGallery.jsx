import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal, SectionHeading } from "./Reveal";
import { imgSize } from "../lib/img";
import { gallery } from "../data/gallery";

export default function InspirationGallery() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });
    const yA = useTransform(scrollYProgress, [0, 1], [26, -26]);
    const yB = useTransform(scrollYProgress, [0, 1], [52, -52]);

    return (
        <section id="inspiration" className="bg-canvas py-24" data-testid="inspiration-section">
            <div className="mx-auto max-w-7xl px-5 lg:px-8">
                <SectionHeading
                    eyebrow="Nature & Inspiration"
                    title="The wild, up close."
                    description="Dispatches from the field — light on ridgelines, silence under stars, and the small moments that stay long after the trek ends."
                />
                <div ref={ref} className="mt-14 grid grid-cols-12 gap-4">
                    {gallery.map((g, i) => (
                        <Reveal key={g.id} delay={(i % 3) * 0.08} className={g.span}>
                            <figure
                                className={`group relative overflow-hidden rounded-xl ${g.height}`}
                            >
                                <motion.img
                                    style={{ y: i % 2 ? yB : yA }}
                                    src={imgSize(g.image, 900)}
                                    alt={g.caption}
                                    loading="lazy"
                                    decoding="async"
                                    className="img-tone absolute inset-x-0 -top-12 h-[calc(100%+6rem)] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100" />
                                <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
                                    <span className="font-serif text-base italic text-beige md:text-lg">
                                        {g.caption}
                                    </span>
                                    <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.2em] text-glow">
                                        {g.coords}
                                    </span>
                                </figcaption>
                            </figure>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
