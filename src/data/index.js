import { destinations } from "./destinations";
import { experiences } from "./experiences";
import { adventures } from "./adventures";
import { testimonials } from "./testimonials";

export const MOCK = { destinations, experiences, adventures, testimonials };

export const STATS = [
    { value: "10", label: "Destinations in our current collection" },
    { value: "Day by day", label: "Itinerary outlines to help you plan" },
    { value: "On request", label: "Departure and availability details" },
    { value: "Local", label: "Regional landscapes and culture" },
    { value: "With care", label: "Thoughtful travel planning" },
];

export const WHY_US = [
    {
        icon: "Compass",
        title: "Hand-Curated Routes",
        text: "Explore route outlines and destination information before you enquire about a journey.",
    },
    {
        icon: "MapPinned",
        title: "Local Expert Guides",
        text: "Ask our team about local guiding arrangements, route conditions and the support available for your chosen trek.",
    },
    {
        icon: "Users",
        title: "Small Groups Only",
        text: "Contact us to learn about group size, private departures and the best dates for your chosen route.",
    },
    {
        icon: "Leaf",
        title: "Leave No Trace",
        text: "Travel thoughtfully, respect local communities and follow responsible trekking practices on the trail.",
    },
];
