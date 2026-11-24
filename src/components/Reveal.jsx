import { motion } from "framer-motion";

export const EASE = [0.16, 1, 0.3, 1];

export function Reveal({ children, delay = 0, y = 30, className = "", once = true }) {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once, amount: 0.15 }}
            transition={{ duration: 0.9, delay, ease: EASE }}
        >
            {children}
        </motion.div>
    );
}

export function MaskedLine({ children, delay = 0, className = "" }) {
    return (
        <span className={`block overflow-hidden ${className}`}>
            <motion.span
                className="block will-change-transform"
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1.1, delay, ease: EASE }}
            >
                {children}
            </motion.span>
        </span>
    );
}

export function SectionHeading({
    eyebrow,
    title,
    description,
    dark = false,
    align = "left",
    className = "",
}) {
    return (
        <div className={`max-w-2xl ${align === "center" ? "mx-auto" : ""} ${className}`}>
            {eyebrow && (
                <Reveal>
                    <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-gold">
                        <span className="inline-block h-px w-8 bg-gold" aria-hidden="true" />
                        {eyebrow}
                    </p>
                </Reveal>
            )}
            <Reveal delay={0.08}>
                <h2
                    className={`mt-4 font-serif text-3xl font-medium leading-[1.12] tracking-tight sm:text-4xl lg:text-[2.75rem] ${
                        dark ? "text-beige" : "text-ink"
                    }`}
                >
                    {title}
                </h2>
            </Reveal>
            {description && (
                <Reveal delay={0.16}>
                    <p
                        className={`mt-5 text-base leading-relaxed sm:text-lg ${
                            dark ? "text-sage" : "text-moss"
                        }`}
                    >
                        {description}
                    </p>
                </Reveal>
            )}
        </div>
    );
}
