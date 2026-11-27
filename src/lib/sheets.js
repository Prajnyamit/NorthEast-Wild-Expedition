
import { useEffect, useState } from "react";

const SHEET_ID_FALLBACK =
    "1NXjMp_8sljN2ohvzFo-tGUGlRDJvBco_U74Y6QwXG2U";

const SHEET_ID =
    (typeof process !== "undefined" &&
        process.env &&
        process.env.REACT_APP_SHEET_ID) ||
    SHEET_ID_FALLBACK;

const CACHE_KEY = "mt_sheet_cache_v4";
const CACHE_TTL = 5 * 60 * 1000;

const TABS = {
    settings: ["Site_Settings", "key"],
    hero: ["Hero", "id"],
    destinations: ["Destinations", "id"],
    experiences: ["Experiences", "id"],

    // New experience tabs
    experienceDetails: ["Experience_Details", "id"],
    experienceGallery: ["Experience_Gallery", "id"],

    treks: ["Treks", "id"],
    gallery: ["Trek_Gallery", "id"],
    itinerary: ["Trek_Itinerary", "id"],
    inclusions: ["Trek_Inclusions", "id"],
    exclusions: ["Trek_Exclusions", "id"],
    reviews: ["Trek_Reviews", "id"],
    faq: ["Trek_FAQ", "id"],
    documents: ["Trek_Documents", "id"],
    testimonials: ["Testimonials", "id"],
};

// ---------- CSV parsing ----------

function parseCSV(text) {
    const rows = [];
    let row = [];
    let cell = "";
    let inQuotes = false;

    for (let i = 0; i < text.length; i++) {
        const c = text[i];

        if (inQuotes) {
            if (c === '"' && text[i + 1] === '"') {
                cell += '"';
                i++;
            } else if (c === '"') {
                inQuotes = false;
            } else {
                cell += c;
            }
        } else if (c === '"') {
            inQuotes = true;
        } else if (c === ",") {
            row.push(cell);
            cell = "";
        } else if (c === "\n" || c === "\r") {
            if (c === "\r" && text[i + 1] === "\n") i++;

            row.push(cell);
            cell = "";

            rows.push(row);
            row = [];
        } else {
            cell += c;
        }
    }

    if (cell !== "" || row.length) {
        row.push(cell);
        rows.push(row);
    }

    return rows;
}

function toObjects(rows, firstHeader) {
    if (!rows.length) return [];

    const header = rows[0].map((h) => h.trim());

    if (header[0] !== firstHeader) return [];

    return rows
        .slice(1)
        .filter((r) => r.some((c) => String(c ?? "").trim() !== ""))
        .map((r) => {
            const obj = {};

            header.forEach((h, i) => {
                if (h) obj[h] = (r[i] ?? "").trim();
            });

            return obj;
        });
}

// ---------- Helpers ----------

const num = (value) => {
    const parsed = parseFloat(
        String(value ?? "").replace(/[^0-9.-]/g, "")
    );

    return Number.isNaN(parsed) ? 0 : parsed;
};

const bool = (value) =>
    /^(true|yes|1|y)$/i.test(String(value ?? "").trim());


const driveId = (url = "") => {
    const value = String(url);

    const match =
        value.match(/drive\.google\.com\/file\/d\/([^/?#]+)/) ||
        value.match(/\/d\/([^/?#]+)/) ||
        value.match(/[?&]id=([^&#]+)/);

    return value.includes("drive.google.com") && match
        ? match[1]
        : null;
};

export const img = (url = "") => {
    if (!url) return "";

    const id = driveId(url);

    return id
        ? `https://lh3.googleusercontent.com/d/${id}`
        : url;
};

const pdf = (url = "") => {
    const id = driveId(url);

    return id
        ? {
            url: `https://drive.google.com/file/d/${id}/view`,
            download: `https://drive.google.com/uc?export=download&id=${id}`,
        }
        : {
            url,
            download: url,
        };
};


const groupBy = (rows, key) =>
    rows.reduce((acc, row) => {
        const value = row[key];

        if (!value) return acc;

        (acc[value] = acc[value] || []).push(row);

        return acc;
    }, {});

// ---------- Shape the data ----------

function build(raw) {
    // Trek-related data
    const gallery = groupBy(
        [...raw.gallery].sort(
            (a, b) => num(a.order) - num(b.order)
        ),
        "trek_id"
    );

    const dayOrder = (row) => {
        const value = String(row.day || row.day_number || row.order || "");
        const match = value.match(/\d+/);
        return match ? Number(match[0]) : 0;
    };

    const itinerary = groupBy(
        [...raw.itinerary].sort((a, b) => dayOrder(a) - dayOrder(b)),
        "trek_id"
    );

    const inclusions = groupBy(raw.inclusions, "trek_id");
    const exclusions = groupBy(raw.exclusions, "trek_id");
    const reviews = groupBy(raw.reviews, "trek_id");
    const faq = groupBy(raw.faq, "trek_id");
    const documents = groupBy(raw.documents, "trek_id");

    const destinations = raw.destinations.map((d) => ({ ...d, image: img(d.image) }));
    const heroSourceImage = String(raw.hero[0]?.image || "").trim();

    const sheetTreks = raw.treks
        .filter((t) => t.id)
        .map((t) => {
            const [lat, lng] = (t.coords || "")
                .split(",")
                .map((x) => parseFloat(x));

            const id = t.id;
            const linkedDestination = destinations.find((destination) =>
                destination.id === (t.destination_id || t.destinationId) ||
                String(destination.id || "").replace(/^D/i, "T").toUpperCase() === String(t.id).toUpperCase() ||
                (t.destination_code && destination.code === t.destination_code) ||
                [t.destination, t.title, t.name].some((value) => {
                    const a = String(value || "").toLowerCase().replace(/[^a-z0-9]/g, "");
                    const b = String(destination.name || "").toLowerCase().replace(/[^a-z0-9]/g, "");
                    return a && b && (a.includes(b) || b.includes(a));
                })
            );
            const suppliedTrekImage = String(t.hero_image || t.image || "").trim();
            const imageIsHomepageHero = suppliedTrekImage && heroSourceImage && suppliedTrekImage === heroSourceImage;
            const trekImage = imageIsHomepageHero ? "" : suppliedTrekImage;

            return {
                ...t,
                image: img(trekImage || linkedDestination?.image || ""),
                group_size: num(t.group_size),
                rating: num(t.rating),
                reviews: num(t.reviews),
                featured: bool(t.featured),

                lat: Number.isNaN(lat) ? null : lat,
                lng: Number.isNaN(lng) ? null : lng,

                gallery: (gallery[id] || []).map((g) => ({
                    ...g,
                    image: img(g.image),
                    order: num(g.order),
                })),

                itinerary: itinerary[id] || [],

                inclusions: (inclusions[id] || []).map(
                    (x) => x.item
                ),

                exclusions: (exclusions[id] || []).map(
                    (x) => x.item
                ),

                reviewList: (reviews[id] || []).map((r) => ({
                    ...r,
                    rating: num(r.rating),
                    avatar: img(r.avatar),
                })),

                faq: faq[id] || [],

                documents: (documents[id] || []).map((d) => ({
                    ...d,
                    ...pdf(d.url),
                })),
            };
        });

    // Create a basic trek record for each destination that has no matching
    // Treks-tab row. The destination remains the source for its name, image,
    // region and editorial description; itinerary data is attached by trek_id.
    // Commercial fields such as price, difficulty and inclusions are never guessed.
    const existingTrekIds = new Set(sheetTreks.map((trek) => String(trek.id).toUpperCase()));
    const destinationTreks = destinations
        .map((destination) => {
            const trekId = String(
                destination.trek_id || destination.trekId ||
                String(destination.id || "").replace(/^D/i, "T")
            ).toUpperCase();
            if (!trekId || existingTrekIds.has(trekId)) return null;

            const trekItinerary = itinerary[trekId] || [];
            return {
                id: trekId,
                destination_id: destination.id,
                title: destination.name || "Himalayan Trek",
                name: destination.name || "Himalayan Trek",
                region: destination.region || "Uttarakhand",
                location: destination.region || "Uttarakhand",
                description: destination.description || "Explore this Himalayan destination. Contact us for route and departure information.",
                image: destination.image || "",
                altitude: destination.altitude || "",
                season: destination.season || "",
                code: destination.code || "",
                duration: trekItinerary.length ? `${trekItinerary.length} days (itinerary outline)` : "Contact for duration",
                price: "",
                difficulty: "",
                featured: false,
                itinerary: trekItinerary,
                gallery: (gallery[trekId] || []).map((g) => ({
                    ...g,
                    image: img(g.image),
                    order: num(g.order),
                })),
                inclusions: (inclusions[trekId] || []).map((x) => x.item),
                exclusions: (exclusions[trekId] || []).map((x) => x.item),
                reviewList: (reviews[trekId] || []).map((r) => ({
                    ...r,
                    rating: num(r.rating),
                    avatar: img(r.avatar),
                })),
                faq: faq[trekId] || [],
                documents: (documents[trekId] || []).map((d) => ({ ...d, ...pdf(d.url) })),
                isDestinationFallback: true,
            };
        })
        .filter(Boolean);

    const treks = [...sheetTreks, ...destinationTreks];

    // Experience details, indexed by experience ID
    const experienceDetails = Object.fromEntries(
        raw.experienceDetails
            .filter((item) => item.id)
            .map((item) => [item.id, item])
    );

    // Experience gallery, grouped by experience ID
    const experienceGallery = groupBy(
        [...raw.experienceGallery].sort(
            (a, b) => num(a.order) - num(b.order)
        ),
        "experience_id"
    );

    // Combine listing information with detail information
    const experiences = raw.experiences
        .filter((e) => e.id)
        .map((e) => {
            const details = experienceDetails[e.id] || {};

            return {
                ...e,
                ...details,

                // Prefer the detail image, otherwise use listing image
                image: img(details.image || e.image),

                gallery: (experienceGallery[e.id] || []).map(
                    (g) => ({
                        ...g,
                        image: img(g.image),
                        order: num(g.order),
                    })
                ),
            };
        });

    return {
        settings: Object.fromEntries(
            raw.settings.map((s) => [s.key, s.value])
        ),

        hero: raw.hero[0]
            ? {
                  ...raw.hero[0],
                  image: img(raw.hero[0].image),
              }
            : null,

        destinations,

        experiences,
        treks,

        // Existing homepage functionality
        adventures: treks.filter((t) => t.featured).length
            ? treks.filter((t) => t.featured)
            : treks.slice(0, 3),

        testimonials: raw.testimonials.map((t) => ({
            ...t,
            avatar: img(t.avatar),
            rating: num(t.rating),
        })),
    };
}

// ---------- Fetching and cache ----------

const EMPTY = {
    settings: {},
    hero: null,
    destinations: [],
    experiences: [],
    treks: [],
    adventures: [],
    testimonials: [],
};


async function fetchTab([tab, firstHeader], optional = false) {
    try {
        const url =
            `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq` +
            `?tqx=out:csv&sheet=${encodeURIComponent(tab)}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const rows = parseCSV(await response.text());
        const data = toObjects(rows, firstHeader);

        if (!data.length && optional) {
            console.warn(
                `[sheets] Optional tab "${tab}" is empty or has an incorrect header.`
            );
        }

        return data;
    } catch (error) {
        if (optional) {
            console.warn(
                `[sheets] Optional tab "${tab}" could not be loaded:`,
                error
            );
            return [];
        }

        throw new Error(
            `Could not load tab "${tab}". Check spreadsheet permissions and tab name. ${error.message}`
        );
    }
}


async function loadAll() {
    const keys = Object.keys(TABS);

    const results = await Promise.all(
        keys.map((key) => {
            const isOptional =
                key === "experienceDetails" ||
                key === "experienceGallery";

            return fetchTab(TABS[key], isOptional);
        })
    );

    const raw = Object.fromEntries(
        keys.map((key, index) => [key, results[index]])
    );

    return build(raw);
}

const readCache = () => {
    try {
        const cached = JSON.parse(
            sessionStorage.getItem(CACHE_KEY)
        );

        return cached && cached.data ? cached : null;
    } catch {
        return null;
    }
};

let inflight = null;

function getContent() {
    if (!inflight) {
        inflight = loadAll()
            .then((data) => {
                try {
                    sessionStorage.setItem(
                        CACHE_KEY,
                        JSON.stringify({
                            t: Date.now(),
                            data,
                        })
                    );
                } catch {
                    // Ignore storage errors
                }

                return data;
            })
            .finally(() => {
                inflight = null;
            });
    }

    return inflight;
}

// ---------- React hooks ----------

// const { data, loading, error } = useSiteContent();

export function useSiteContent() {
    const cached = readCache();

    const fresh =
        cached && Date.now() - cached.t < CACHE_TTL;

    const [state, setState] = useState({
        data: cached ? cached.data : EMPTY,
        loading: !fresh,
        error: null,
    });

    useEffect(() => {
        if (fresh) return;

        let alive = true;

        getContent()
            .then((data) => {
                if (alive) {
                    setState({
                        data,
                        loading: false,
                        error: null,
                    });
                }
            })
            .catch((error) => {
                console.error("[sheets]", error);

                if (alive) {
                    setState((previous) => ({
                        ...previous,
                        loading: false,
                        error,
                    }));
                }
            });

        return () => {
            alive = false;
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return state;
}

// const { trek, loading } = useTrek("T001");

export function useTrek(id) {
    const { data, loading, error } = useSiteContent();

    const normalizedId = String(id || "").trim().toUpperCase();
    return {
        trek: data.treks.find((t) => String(t.id).trim().toUpperCase() === normalizedId) || null,
        loading,
        error,
    };
}

// const { experience, loading } = useExperience("E001");

export function useExperience(id) {
    const { data, loading, error } = useSiteContent();

    return {
        experience:
            data.experiences.find((e) => e.id === id) || null,
        loading,
        error,
    };
}
