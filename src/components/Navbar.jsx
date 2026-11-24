import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Search, User, X, ArrowUpRight } from "lucide-react";
import { toast } from "sonner";
import { Logo, LogoWordmark } from "./Logo";
import SearchModal from "./SearchModal";
import { scrollToId, stopScroll, startScroll } from "../lib/lenis";

const PREFETCH = {
    "/destinations": () => import("../pages/Destinations"),
    "/experiences": () => import("../pages/Experiences"),
    "/about": () => import("../pages/About"),
};

const LINKS = [
    { label: "Explore", to: "/" },
    { label: "Destinations", to: "/destinations" },
    { label: "Experiences", to: "/experiences" },
    { label: "About Us", to: "/about" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const navigate = useNavigate();
    const { pathname } = useLocation();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        const onKey = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
                e.preventDefault();
                setSearchOpen(true);
            }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    useEffect(() => {
        if (menuOpen) stopScroll();
        else startScroll();
    }, [menuOpen]);

    const goExplore = (e, to) => {
        e.preventDefault();
        setMenuOpen(false);
        if (pathname === to) {
            if (to === "/") scrollToId("destinations");
            return;
        }
        navigate(to);
        if (to === "/") setTimeout(() => scrollToId("destinations"), 700);
    };

    return (
        <>
            <header
                className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
                    scrolled
                        ? "border-b border-gold/20 bg-forest/95 shadow-xl backdrop-blur-xl"
                        : "border-b border-white/10 bg-black/35 backdrop-blur-md"
                }`}
            >
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-20 lg:px-8">
                    <Link
                        to="/"
                        onClick={(e) => goExplore(e, "/")}
                        className="flex items-center gap-3"
                        data-testid="nav-logo-link"
                    >
                        <Logo size={38} />
                        <LogoWordmark />
                    </Link>

                    <nav className="hidden items-center gap-9 lg:flex">
                        {LINKS.map((l) => (
                            <Link
                                key={l.to}
                                to={l.to}
                                onClick={(e) => goExplore(e, l.to)}
                                onMouseEnter={() => PREFETCH[l.to] && PREFETCH[l.to]()}
                                className="group relative text-sm font-medium text-beige/85 transition-colors hover:text-beige"
                                data-testid={`nav-link-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
                            >
                                {l.label}
                                <span className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-300 group-hover:scale-x-100" />
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center gap-2.5">
                        <button
                            onClick={() => setSearchOpen(true)}
                            aria-label="Search expeditions"
                            data-testid="nav-search-button"
                            className="rounded-full border border-white/15 p-2.5 text-beige/85 transition-colors hover:border-gold/50 hover:text-gold"
                        >
                            <Search className="h-4 w-4" />
                        </button>
                        <button
                            onClick={() =>
                                toast("Member portal coming soon", {
                                    description:
                                        "Sign-in for past explorers arrives with our next release.",
                                })
                            }
                            aria-label="Profile"
                            data-testid="nav-profile-button"
                            className="hidden rounded-full border border-white/15 p-2.5 text-beige/85 transition-colors hover:border-gold/50 hover:text-gold sm:block"
                        >
                            <User className="h-4 w-4" />
                        </button>
                        <Link
                            to="/destinations"
                            data-testid="nav-explore-trips-cta"
                            className="hidden items-center gap-1.5 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-charcoal transition-colors hover:bg-glow sm:inline-flex"
                        >
                            Explore Trips
                            <ArrowUpRight className="h-3.5 w-3.5" />
                        </Link>
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            aria-label="Menu"
                            data-testid="nav-menu-toggle"
                            className="rounded-full border border-white/15 p-2.5 text-beige transition-colors hover:border-gold/50 lg:hidden"
                        >
                            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                        </button>
                    </div>
                </div>
            </header>

            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -16 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed inset-0 z-40 flex flex-col justify-center bg-forest px-8 topo-lines lg:hidden"
                        data-testid="mobile-menu"
                    >
                        <nav className="flex flex-col gap-2">
                            {LINKS.map((l, i) => (
                                <motion.div
                                    key={l.to}
                                    initial={{ opacity: 0, x: -18 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.08 + i * 0.06, duration: 0.5 }}
                                >
                                    <Link
                                        to={l.to}
                                        onClick={(e) => goExplore(e, l.to)}
                                        className="block py-2 font-serif text-4xl font-medium text-beige transition-colors hover:text-gold"
                                        data-testid={`mobile-link-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
                                    >
                                        {l.label}
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="mt-10 flex flex-col gap-4"
                        >
                            <Link
                                to="/destinations"
                                onClick={() => setMenuOpen(false)}
                                className="inline-flex w-fit items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-charcoal"
                                data-testid="mobile-explore-trips-cta"
                            >
                                Explore Trips <ArrowUpRight className="h-4 w-4" />
                            </Link>
                            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-sage">
                                expeditions@newild.in · Gangtok, Sikkim
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
        </>
    );
}
