import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionHeading, Reveal } from "./Reveal";
import { imgSize } from "../lib/img";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useSiteContent } from "../lib/sheets";

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=900&q=80";
const SPANS = [
    ["col-span-12 md:col-span-7", "h-[300px] md:h-[440px]"],
    ["col-span-6 md:col-span-5", "h-[220px] md:h-[300px]"],
    ["col-span-6 md:col-span-5", "h-[220px] md:h-[300px]"],
    ["col-span-12 md:col-span-7", "h-[300px] md:h-[440px]"],
    ["col-span-12 md:col-span-6", "h-[260px] md:h-[380px]"],
    ["col-span-12 md:col-span-6", "h-[260px] md:h-[380px]"],
];

export default function InspirationGallery() {
    const ref = useRef(null);
    const { data } = useSiteContent();
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const yA = useTransform(scrollYProgress, [0, 1], [22, -22]);
    const yB = useTransform(scrollYProgress, [0, 1], [42, -42]);
    const sourceItems = [
        ...(data.treks || []).flatMap((trek) => (trek.gallery || []).map((item) => ({
            id: `trek-gallery-${trek.id}-${item.id || item.order}`,
            image: item.image,
            caption: item.caption || trek.title || trek.name,
            region: trek.region || "Himalayan trail",
        }))),
        ...(data.destinations || []).map((item) => ({ id: `destination-${item.id}`, image: item.image, caption: item.name, region: item.region || "Himalayan destinations" })),
        ...(data.experiences || []).map((item) => ({ id: `experience-${item.id}`, image: item.image, caption: item.title, region: item.location || item.tag || "Culture · Nature · Heritage" })),
    ];
    const seenImages = new Set();
    const gallery = sourceItems.filter((item) => {
        if (!item.image || seenImages.has(item.image)) return false;
        seenImages.add(item.image);
        return true;
    }).slice(0, 6);

    return <section id="inspiration" className="bg-canvas py-24" data-testid="inspiration-section">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <SectionHeading eyebrow="Nature & Inspiration" title="Closer to the wild. Closer to the culture." description="A visual journal of the places, landscapes and living traditions behind our journeys across Northeast India and the Himalayas." />
            {gallery.length > 0 ? <div ref={ref} className="mt-14 grid grid-cols-12 gap-4">
                {gallery.map((item, index) => {
                    const [span, height] = SPANS[index % SPANS.length];
                    return <Reveal key={item.id} delay={(index % 3) * 0.08} className={span}>
                        <figure className={`group relative overflow-hidden rounded-xl bg-forest ${height}`}>
                            <motion.img style={{ y: index % 2 ? yB : yA }} src={imgSize(item.image, 1000)} alt={item.caption || "Northeast India and Himalayan landscape"} loading="lazy" decoding="async" onError={(event) => { event.currentTarget.src = FALLBACK_IMAGE; }} className="absolute inset-x-0 -top-10 h-[calc(100%+5rem)] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                            <div className="absolute inset-0 bg-gradient-to-t from-forest/85 via-transparent to-transparent" />
                            <figcaption className="absolute inset-x-0 bottom-0 p-5"><span className="font-serif text-lg italic text-beige md:text-xl">{item.caption}</span><span className="mt-1 block font-mono text-[9px] uppercase tracking-[0.2em] text-glow">{item.region}</span></figcaption>
                        </figure>
                    </Reveal>;
                })}
            </div> : <p className="mt-10 text-sm text-moss">Add destination, experience or trek gallery images in Google Sheets to build this gallery.</p>}
            <div className="mt-10 flex flex-wrap gap-3">
                <Link to="/destinations" className="inline-flex items-center gap-2 rounded-full bg-forest px-5 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-beige transition hover:bg-olive">Browse destinations <ArrowRight className="h-4 w-4" /></Link>
                <Link to="/experiences" className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-5 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-ink transition hover:border-gold">Discover experiences <ArrowRight className="h-4 w-4" /></Link>
            </div>
        </div>
    </section>;
}
