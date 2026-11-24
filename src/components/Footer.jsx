import { Link } from "react-router-dom";
import { Facebook, Instagram, MessageCircle, Twitter, Youtube } from "lucide-react";
import { Logo, LogoWordmark } from "./Logo";
import { BRAND } from "../config/site";
import { useSiteContent } from "../lib/sheets";

// `key` = row name in the Site_Settings tab. A social icon only shows
// when its row holds a real link (https://...), so placeholders stay hidden.
const SOCIALS = [
    { icon: Instagram, label: "Instagram", key: "instagram" },
    { icon: Facebook, label: "Facebook", key: "facebook" },
    { icon: Youtube, label: "YouTube", key: "youtube" },
    { icon: Twitter, label: "Twitter", key: "twitter" },
];

const EXPLORE = [
    { label: "Home", to: "/" },
    { label: "Treks", to: "/treks" },
    { label: "Destinations", to: "/destinations" },
    { label: "Experiences", to: "/experiences" },
    { label: "About Us", to: "/about" },
];

const isUrl = (v) => /^https?:\/\//i.test(v || "");

export default function Footer() {
    const { data } = useSiteContent();
    const s = data.settings || {};
    const destinations = data.destinations || [];

    const name = s.company_name || BRAND.name;
    const email = s.email || BRAND.email;
    const phone = s.phone || BRAND.phone;
    const address = s.address || BRAND.address;

    const socials = SOCIALS.filter((x) => isUrl(s[x.key])).map((x) => ({ ...x, href: s[x.key] }));
    const waDigits = (s.whatsapp || "").replace(/\D/g, "");
    if (waDigits.length >= 8) {
        socials.push({ icon: MessageCircle, label: "WhatsApp", href: `https://wa.me/${waDigits}` });
    }

    return (
        <footer className="bg-charcoal" data-testid="site-footer">
            <div className="mx-auto max-w-7xl px-5 pt-16 lg:px-8">
                <div className="grid gap-12 pb-14 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
                    <div>
                        <Link to="/" className="flex items-center gap-3" data-testid="footer-logo">
                            <Logo size={40} />
                            <LogoWordmark />
                        </Link>
                        <p className="mt-5 max-w-xs text-sm leading-relaxed text-sage">
                            Curated small-group wilderness journeys — hiking, trekking, climbing
                            and quiet nature retreats across the wildest ranges on earth.
                        </p>
                        <div className="mt-6 flex gap-3">
                            {socials.map((x) => (
                                <a
                                    key={x.label}
                                    href={x.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={x.label}
                                    data-testid={`footer-social-${x.label.toLowerCase()}`}
                                    className="rounded-full border border-white/15 p-2.5 text-beige/75 transition-colors hover:border-gold/50 hover:text-gold"
                                >
                                    <x.icon className="h-4 w-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold">
                            Explore
                        </h4>
                        <ul className="mt-5 flex flex-col gap-3">
                            {EXPLORE.map((l) => (
                                <li key={l.to}>
                                    <Link
                                        to={l.to}
                                        className="text-sm text-beige/75 transition-colors hover:text-gold"
                                        data-testid={`footer-link-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
                                    >
                                        {l.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold">
                            Regions
                        </h4>
                        <ul className="mt-5 flex flex-col gap-3">
                            {destinations.slice(0, 6).map((d) => (
                                <li key={d.id}>
                                    <Link
                                        to="/destinations"
                                        className="text-sm text-beige/75 transition-colors hover:text-gold"
                                    >
                                        {d.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold">
                            Contact
                        </h4>
                        <ul className="mt-5 flex flex-col gap-3 text-sm text-beige/75">
                            <li>
                                <a href={`mailto:${email}`} className="transition-colors hover:text-gold">
                                    {email}
                                </a>
                            </li>
                            <li>
                                <a
                                    href={`tel:${(phone || "").replace(/[^+\d]/g, "")}`}
                                    className="transition-colors hover:text-gold"
                                >
                                    {phone}
                                </a>
                            </li>
                            {address && <li className="leading-relaxed text-sage">{address}</li>}
                        </ul>
                        <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-gold/25 px-3.5 py-2 font-mono text-[9px] uppercase tracking-[0.2em] text-gold/90">
                            <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-glow" />
                            24/7 expedition support
                        </p>
                    </div>
                </div>

                <svg
                    viewBox="0 0 1200 60"
                    preserveAspectRatio="none"
                    className="h-10 w-full text-forest"
                    aria-hidden="true"
                >
                    <path
                        d="M0 60 L0 40 L80 18 L140 34 L210 10 L290 38 L360 22 L430 42 L520 14 L600 36 L680 20 L760 40 L840 16 L920 34 L1000 22 L1080 38 L1150 26 L1200 40 L1200 60 Z"
                        fill="currentColor"
                        opacity="0.55"
                    />
                </svg>
            </div>

            <div className="border-t border-white/10">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 text-center sm:flex-row sm:text-left lg:px-8">
                    <p className="text-xs text-sage">
                        © {new Date().getFullYear()} {name}. Crafted in the Himalayas.
                    </p>
                    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-sage/70">
                        Privacy · Terms · Responsible Travel Policy
                    </p>
                </div>
            </div>
        </footer>
    );
}