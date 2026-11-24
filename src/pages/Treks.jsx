import AdventureCard from "../components/AdventureCard";
import { SectionHeading } from "../components/Reveal";
import { useSiteContent } from "../lib/sheets";

// All treks from the "Treks" tab of the Google Sheet.
export default function Treks() {
    const { data, loading, error } = useSiteContent();
    const treks = data.treks || [];

    return (
        <section className="min-h-screen bg-canvas pb-24 pt-36" data-testid="treks-page">
            <div className="mx-auto max-w-7xl px-5 lg:px-8">
                <SectionHeading
                    eyebrow="All Treks"
                    title="Every trail, every season."
                    description="Small-group treks led by our own guides. Pick a trek to see the itinerary, inclusions, reviews and brochure."
                />

                {loading && treks.length === 0 && (
                    <p className="mt-14 text-sm text-moss">Loading treks…</p>
                )}
                {error && treks.length === 0 && (
                    <p className="mt-14 text-sm text-moss">
                        Could not load treks right now. Please try again shortly.
                    </p>
                )}
                {!loading && !error && treks.length === 0 && (
                    <p className="mt-14 text-sm text-moss">No treks are listed yet.</p>
                )}

                <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {treks.map((t, i) => (
                        <AdventureCard key={t.id} trip={t} delay={(i % 3) * 0.08} />
                    ))}
                </div>
            </div>
        </section>
    );
}