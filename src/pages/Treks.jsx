import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Search, MessageCircle } from "lucide-react";
import AdventureCard from "../components/AdventureCard";
import { SectionHeading } from "../components/Reveal";
import PageHeader from "../components/PageHeader";
import { useSiteContent } from "../lib/sheets";

const WHATSAPP_NUMBER = "918822565517";

export default function Treks() {
    const { data, loading, error } = useSiteContent();
    const treks = data.treks || [];
    const [query, setQuery] = useState("");
    const [region, setRegion] = useState("All regions");

    const regions = useMemo(() => [
        "All regions",
        ...Array.from(new Set(treks.map((trek) => trek.region).filter(Boolean))).sort(),
    ], [treks]);

    const visibleTreks = useMemo(() => {
        const normalizedQuery = query.trim().toLowerCase();
        return treks.filter((trek) => {
            const matchesRegion = region === "All regions" || trek.region === region;
            const searchable = [trek.title, trek.name, trek.region, trek.description, trek.season]
                .filter(Boolean).join(" ").toLowerCase();
            return matchesRegion && (!normalizedQuery || searchable.includes(normalizedQuery));
        });
    }, [treks, query, region]);

    const enquiryLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi Northeast Wild Expedition! Please help me compare the available treks, dates and package details.")}`;

    return (
        <>
            <PageHeader
                eyebrow="Trek collection"
                title="Choose your next trail."
                description="Explore Himalayan routes by landscape, region and season. Open any trek to review its route outline, then contact our team to confirm current departures, permits, availability and pricing."
            />
            <section className="min-h-[60vh] bg-canvas pb-24 pt-12" data-testid="treks-page">
                <div className="mx-auto max-w-7xl px-5 lg:px-8">
                    <div className="mb-10 flex flex-col gap-6 rounded-2xl border border-ink/10 bg-white p-5 md:flex-row md:items-end md:justify-between md:p-7">
                        <div className="flex-1">
                            <SectionHeading
                                eyebrow="Find your route"
                                title="A trail for every kind of explorer."
                                description="Search the collection or narrow it down by region."
                            />
                            <div className="mt-6 grid gap-3 sm:grid-cols-[minmax(0,1fr)_220px]">
                                <label className="flex items-center gap-3 rounded-xl border border-ink/15 bg-canvas px-4 py-3">
                                    <Search className="h-4 w-4 shrink-0 text-moss" />
                                    <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search trek or destination" aria-label="Search treks" className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-moss/70" />
                                </label>
                                <select value={region} onChange={(event) => setRegion(event.target.value)} aria-label="Filter by region" className="rounded-xl border border-ink/15 bg-canvas px-4 py-3 text-sm text-ink outline-none focus:border-gold">
                                    {regions.map((item) => <option key={item} value={item}>{item}</option>)}
                                </select>
                            </div>
                        </div>
                        <a href={enquiryLink} target="_blank" rel="noreferrer" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-forest px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-beige transition hover:bg-olive">
                            <MessageCircle className="h-4 w-4" /> Get trek advice
                        </a>
                    </div>

                    {loading && treks.length === 0 && <p className="py-14 text-center text-sm text-moss">Loading treks…</p>}
                    {error && treks.length === 0 && <p className="py-14 text-center text-sm text-moss">Could not load treks right now. Please try again shortly.</p>}
                    {!loading && !error && treks.length === 0 && <p className="py-14 text-center text-sm text-moss">No treks are listed yet.</p>}

                    {treks.length > 0 && <div className="mb-5 flex items-center justify-between gap-4">
                        <p className="text-sm text-moss"><strong className="text-ink">{visibleTreks.length}</strong> {visibleTreks.length === 1 ? "trek" : "treks"} found</p>
                        {(query || region !== "All regions") && <button type="button" onClick={() => { setQuery(""); setRegion("All regions"); }} className="text-xs font-semibold uppercase tracking-[0.12em] text-gold-deep hover:text-ink">Clear filters</button>}
                    </div>}

                    {visibleTreks.length > 0 ? (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {visibleTreks.map((trek, index) => <AdventureCard key={trek.id} trip={trek} delay={(index % 3) * 0.06} />)}
                        </div>
                    ) : treks.length > 0 ? (
                        <div className="rounded-2xl border border-dashed border-ink/20 px-6 py-14 text-center">
                            <p className="font-serif text-2xl text-ink">No matching trails found.</p>
                            <p className="mt-2 text-sm text-moss">Try another search term or region.</p>
                        </div>
                    ) : null}

                    <div className="mt-14 rounded-2xl bg-beige p-6 md:flex md:items-center md:justify-between md:p-8">
                        <div>
                            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold-deep">Need a little help?</p>
                            <h2 className="mt-2 font-serif text-2xl text-ink">Not sure which trek is right for you?</h2>
                            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-moss">Tell us your preferred dates, experience level and the kind of landscape you want to explore. We can help you understand the options.</p>
                        </div>
                        <a href={enquiryLink} target="_blank" rel="noreferrer" className="mt-5 inline-flex shrink-0 items-center gap-2 rounded-full bg-gold px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-charcoal transition hover:bg-glow md:mt-0">Talk to our team <ArrowRight className="h-4 w-4" /></a>
                    </div>
                </div>
            </section>
        </>
    );
}
