import { destinations } from "./destinations";
import { experiences } from "./experiences";
import { adventures } from "./adventures";
import { testimonials } from "./testimonials";

export const MOCK = { destinations, experiences, adventures, testimonials };

export const STATS = [
    { value: "14+", label: "Years charting the Himalayas" },
    { value: "4,800m", label: "Average expedition altitude" },
    { value: "8–12", label: "Explorers per batch, never more" },
    { value: "99.4%", label: "Summit & safety success rate" },
    { value: "100%", label: "Zero single-use plastic policy" },
];

export const WHY_US = [
    {
        icon: "Compass",
        title: "Hand-Curated Routes",
        text: "Every itinerary is walked, tested and refined by our own guides before it ever carries a traveller.",
    },
    {
        icon: "MapPinned",
        title: "Local Expert Guides",
        text: "Certified mountain leaders from the regions we walk — storytellers, naturalists and first-aid professionals.",
    },
    {
        icon: "Users",
        title: "Small Groups Only",
        text: "Eight to twelve explorers per departure, never more. Quiet trails, shared campfires, genuine camaraderie.",
    },
    {
        icon: "Leaf",
        title: "Leave No Trace",
        text: "Zero single-use plastic, locally sourced provisions and conservation fees built into every booking.",
    },
];
