export function Logo({ dark = false, size = 40 }) {
    const ink = dark ? "#F4EFE6" : "#F4EFE6";
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 64 64"
            fill="none"
            aria-hidden="true"
            className="shrink-0"
        >
            <rect width="64" height="64" rx="14" fill="#112217" />
            <rect x="1.5" y="1.5" width="61" height="61" rx="12.5" stroke="#C29D59" strokeOpacity="0.35" />
            <path d="M11 47 L26 21 L34 34 L41 25 L53 47 Z" fill="#C29D59" />
            <path d="M11 47 L26 21 L32 31.5 L28 47 Z" fill="#D8AB5E" opacity="0.55" />
            <path
                d="M32 8 L34.2 12.8 L39 15 L34.2 17.2 L32 22 L29.8 17.2 L25 15 L29.8 12.8 Z"
                fill={ink}
            />
        </svg>
    );
}

export function LogoWordmark({ light = true }) {
    return (
        <span className="flex flex-col leading-none">
            <span
                className={`font-mono text-[10px] tracking-[0.32em] uppercase ${
                    light ? "text-gold" : "text-olive"
                }`}
            >
                North East
            </span>
            <span
                className={`font-serif text-lg font-semibold tracking-tight ${
                    light ? "text-beige" : "text-ink"
                }`}
            >
                Wild Expedition
            </span>
        </span>
    );
}
