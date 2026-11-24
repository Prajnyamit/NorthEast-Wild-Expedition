const ITEMS = [
    "The Himalayas",
    "Spiti Valley",
    "Swiss Alps",
    "Patagonia",
    "The Dolomites",
    "Iceland Highlands",
];

export default function Marquee() {
    return (
        <section
            aria-label="Destinations we explore"
            className="overflow-hidden border-y border-white/10 bg-charcoal py-5"
        >
            <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
                {[0, 1].map((half) => (
                    <div key={half} aria-hidden={half === 1} className="flex shrink-0 items-center">
                        {ITEMS.map((t) => (
                            <span key={t} className="flex items-center">
                                <span className="whitespace-nowrap px-8 font-serif text-xl italic text-beige/90 md:text-2xl">
                                    {t}
                                </span>
                                <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
                            </span>
                        ))}
                    </div>
                ))}
            </div>
        </section>
    );
}
