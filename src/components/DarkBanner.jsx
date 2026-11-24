import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";

export default function DarkBanner() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });
    const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

    return (
        <section
            ref={ref}
            className="topo-lines relative overflow-hidden bg-forest"
            data-testid="manifesto-banner"
        >
            <motion.div
                style={{ y }}
                className="pointer-events-none absolute -right-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-gold/15 blur-[110px]"
            />
            <div className="relative mx-auto max-w-4xl px-5 py-28 md:py-36 lg:px-8">
                <Reveal>
                    <p className="font-mono text-xs uppercase tracking-[0.25em] text-gold">
                        Field Note 047 · Eastern Himalaya
                    </p>
                </Reveal>
                <Reveal delay={0.1}>
                    <blockquote className="mt-6 font-serif text-3xl font-medium leading-[1.22] tracking-tight text-beige md:text-5xl">
                        “The mountains are not a destination; they are a{" "}
                        <em className="italic text-gold">mirror</em>.”
                    </blockquote>
                </Reveal>
                <Reveal delay={0.2}>
                    <Link
                        to="/about"
                        data-testid="banner-about-link"
                        className="group mt-9 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-beige/80 transition-colors hover:text-gold"
                    >
                        Our Story
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                </Reveal>
            </div>
        </section>
    );
}
