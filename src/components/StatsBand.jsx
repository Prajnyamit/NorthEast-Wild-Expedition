import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import { Reveal, EASE } from "./Reveal";
import { STATS } from "../data";

function Stat({ stat, index }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, amount: 0.4 });
    const match = stat.value.match(/^([\d.,]+)(.*)$/);
    const isRange = stat.value.includes("–");
    const [display, setDisplay] = useState(match && !isRange ? "0" : stat.value);
    const num = match ? parseFloat(match[1].replace(/,/g, "")) : null;

    useEffect(() => {
        if (!inView || num === null || isRange) return;
        const controls = animate(0, num, {
            duration: 1.8,
            delay: index * 0.12,
            ease: EASE,
            onUpdate: (v) => {
                const val = num % 1 !== 0 ? Math.round(v * 10) / 10 : Math.round(v);
                setDisplay(val.toLocaleString("en-US"));
            },
        });
        return () => controls.stop();
    }, [inView, num, isRange, index]);

    const text =
        display !== stat.value && match ? display + (match[2] || "") : stat.value;

    return (
        <div ref={ref} className="bg-forest px-6 py-9 md:px-8">
            <p className="font-mono text-2xl text-gold md:text-3xl">{text}</p>
            <p className="mt-2 text-xs leading-relaxed text-sage md:text-sm">{stat.label}</p>
        </div>
    );
}

export default function StatsBand() {
    return (
        <section className="border-b border-gold/15 bg-forest" data-testid="stats-band">
            <Reveal y={20}>
                <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-gold/15 md:grid-cols-5">
                    {STATS.map((s, i) => (
                        <Stat key={s.label} stat={s} index={i} />
                    ))}
                </div>
            </Reveal>
        </section>
    );
}
