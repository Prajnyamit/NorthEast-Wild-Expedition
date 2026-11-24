
import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { MaskedLine, EASE } from "./Reveal";
import { imgSize } from "../lib/img";
import { useSiteContent } from "../lib/sheets";

const FALLBACK_IMAGE =
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&q=85";

function firstValue(object, keys, fallback = "") {
    for (const key of keys) {
        const value = object?.[key];
        if (value !== undefined && value !== null && String(value).trim()) {
            return String(value).trim();
        }
    }
    return fallback;
}

export default function Hero() {
    const ref = useRef(null);
    const { data } = useSiteContent();
    const hero = data?.hero || {};

    const imageUrl = firstValue(
        hero,
        ["image", "background_image", "hero_image", "image_url"],
        FALLBACK_IMAGE
    );

    const eyebrow = firstValue(
        hero,
        ["eyebrow", "tagline", "location", "subtitle"],
        "Uttarakhand · Indian Himalayas"
    );

    const headingOne = firstValue(
        hero,
        ["heading", "title", "title_line_1"],
        "Find Your Way"
    );

    const headingTwo = firstValue(
        hero,
        ["heading_highlight", "title_line_2", "highlight"],
        "Into The Wild."
    );

    const description = firstValue(
        hero,
        ["description", "content", "body"],
        "Discover the beauty of the Indian Himalayas through unforgettable trekking journeys, mountain landscapes and meaningful local experiences."
    );

    const primaryLabel = firstValue(
        hero,
        ["primary_button_text", "cta_text", "button_text"],
        "Explore Treks"
    );

    const primaryLink = firstValue(
        hero,
        ["primary_button_link", "cta_link", "button_link"],
        "/destinations"
    );

    const secondaryLabel = firstValue(
        hero,
        ["secondary_button_text", "secondary_cta_text"],
        "Discover Experiences"
    );

    const secondaryLink = firstValue(
        hero,
        ["secondary_button_link", "secondary_cta_link"],
        "/experiences"
    );

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
    const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

    return (
        <section
            ref={ref}
            id="hero"
            className="relative h-[100svh] min-h-[620px] overflow-hidden bg-forest"
        >
            <motion.div style={{ y }} className="absolute inset-0">
                <motion.img
                    src={imgSize(imageUrl, 1920)}
                    alt="Uttarakhand Himalayan mountain landscape"
                    fetchPriority="high"
                    initial={{ scale: 1.18 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 2.4, ease: EASE }}
                    className="img-tone h-full w-full object-cover"
                />
            </motion.div>

            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/25 to-forest" />

            <motion.div
                style={{ opacity: fade }}
                className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-5 pb-32 md:justify-center md:pb-0 lg:px-8"
            >
                <motion.p
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.9, ease: EASE }}
                    className="mb-5 inline-flex w-fit items-center gap-3 rounded-full border border-white/20 bg-black/25 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.25em] text-beige/90 backdrop-blur-sm md:text-[11px]"
                >
                    <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-glow" />
                    {eyebrow}
                </motion.p>

                <h1 className="font-serif text-[13.5vw] font-medium leading-[1.02] tracking-tight text-[#F9F7F2] sm:text-7xl lg:text-[6.2rem]">
                    <MaskedLine delay={0.85}>{headingOne}</MaskedLine>
                    <MaskedLine delay={1.0}>
                        <em className="font-serif italic text-gold">
                            {headingTwo}
                        </em>
                    </MaskedLine>
                </h1>

                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.25, duration: 0.9, ease: EASE }}
                    className="mt-6 max-w-xl text-base leading-relaxed text-beige/85 sm:text-lg"
                >
                    {description}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4, duration: 0.9, ease: EASE }}
                    className="mt-9 flex flex-wrap items-center gap-4"
                >
                    <Link
                        to={primaryLink}
                        data-testid="hero-cta-destinations"
                        className="group inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-charcoal transition-colors hover:bg-glow"
                    >
                        {primaryLabel}
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>

                    <Link
                        to={secondaryLink}
                        data-testid="hero-cta-experiences"
                        className="inline-flex items-center gap-2 rounded-full border border-white/40 px-7 py-3.5 text-sm font-semibold text-beige backdrop-blur-sm transition-colors hover:border-white hover:bg-white/10"
                    >
                        {secondaryLabel}
                    </Link>
                </motion.div>
            </motion.div>

            <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between px-5 pb-6 lg:px-8">
                <div className="flex items-center gap-4" data-testid="hero-scroll-indicator">
                    <span className="relative block h-12 w-px overflow-hidden bg-white/20">
                        <span className="absolute inset-x-0 top-0 h-1/2 animate-scroll-line bg-gold" />
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-beige/70">
                        Scroll to explore
                    </span>
                </div>
            </div>
        </section>
    );
}
