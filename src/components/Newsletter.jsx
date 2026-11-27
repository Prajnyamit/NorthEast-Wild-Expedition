import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { Reveal } from "./Reveal";

export default function Newsletter() {
    const [email, setEmail] = useState("");

    const submit = (e) => {
        e.preventDefault();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            toast.error("Please enter a valid email address");
            return;
        }
        toast.info("Newsletter signup is not connected yet", {
            description: "Please contact our team directly for trek updates and departure information.",
        });
    };

    return (
        <section id="newsletter" className="topo-lines relative overflow-hidden bg-charcoal">
            <div className="pointer-events-none absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-gold/10 blur-[100px]" />
            <div className="relative mx-auto max-w-7xl px-5 py-24 md:py-28 lg:px-8">
                <div className="grid items-end gap-10 md:grid-cols-2">
                    <div>
                        <Reveal>
                            <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-gold">
                                <span className="inline-block h-px w-8 bg-gold" />
                                The Field Journal
                            </p>
                        </Reveal>
                        <Reveal delay={0.08}>
                            <h2 className="mt-4 font-serif text-4xl font-medium leading-[1.1] tracking-tight text-beige sm:text-5xl">
                                Stay Close to the <em className="italic text-gold">Wild.</em>
                            </h2>
                        </Reveal>
                        <Reveal delay={0.16}>
                            <p className="mt-5 max-w-md text-base leading-relaxed text-sage">
                                Get in touch for route updates, seasonal guidance and information about upcoming journeys.
                            </p>
                        </Reveal>
                    </div>
                    <Reveal delay={0.2}>
                        <form onSubmit={submit} className="flex flex-col gap-4 sm:flex-row">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="your@email.com"
                                data-testid="newsletter-email-input"
                                className="w-full border-b border-white/25 bg-transparent py-3.5 text-sm text-beige outline-none transition-colors placeholder:text-sage/60 focus:border-gold"
                            />
                            <button
                                type="submit"
                                data-testid="newsletter-submit-button"
                                className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-charcoal transition-colors hover:bg-glow"
                            >
                                Subscribe
                                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </button>
                        </form>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
