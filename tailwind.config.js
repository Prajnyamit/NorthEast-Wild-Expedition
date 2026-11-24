/** @type {import('tailwindcss').Config} */
module.exports = {
    blocklist: ["overline"],
    darkMode: ["class"],
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./public/index.html",
    ],
    theme: {
        extend: {
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            colors: {
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                forest: "#112217",
                pine: "#1A2E22",
                olive: "#435645",
                sage: "#8E9E8D",
                gold: {
                    DEFAULT: "#C29D59",
                    glow: "#D8AB5E",
                    deep: "#A88442",
                },
                beige: "#F4EFE6",
                canvas: "#FAF8F5",
                charcoal: "#0E1511",
                ink: "#1A231C",
                moss: "#445248",
            },
            fontFamily: {
                serif: ['"Playfair Display"', "Georgia", "serif"],
                sans: ['"Plus Jakarta Sans"', "-apple-system", "sans-serif"],
                mono: ['"JetBrains Mono"', "monospace"],
            },
            letterSpacing: {
                widest2: "0.25em",
            },
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
                marquee: {
                    from: { transform: "translateX(0)" },
                    to: { transform: "translateX(-50%)" },
                },
                "pulse-dot": {
                    "0%, 100%": { opacity: "1", transform: "scale(1)" },
                    "50%": { opacity: "0.35", transform: "scale(0.8)" },
                },
                "scroll-line": {
                    "0%": { transform: "translateY(-100%)" },
                    "100%": { transform: "translateY(220%)" },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                marquee: "marquee 48s linear infinite",
                "marquee-slow": "marquee 70s linear infinite",
                "pulse-dot": "pulse-dot 2.2s ease-in-out infinite",
                "scroll-line": "scroll-line 2.2s cubic-bezier(0.65,0,0.35,1) infinite",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
};
