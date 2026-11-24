export const BRAND = {
    name: "North East Wild Expedition",
    short: "NE Wild",
    tagline: "Find Your Way Into The Wild.",
    email: "expeditions@newild.in",
    phone: "+91 98320 00000",
    address: "Development Area, Gangtok, Sikkim 737101, India",
};

// Editable content source: publish your Google Sheet (File > Share > Publish to web),
// paste the sheet ID (the string between /d/ and /edit in its URL) below,
// or set REACT_APP_GOOGLE_SHEET_ID in frontend/.env. Leave empty for mock data.
export const GOOGLE_SHEET_ID = (process.env.REACT_APP_GOOGLE_SHEET_ID || "").trim();

export const SHEET_TABS = {
    destinations: "Destinations",
    experiences: "Experiences",
    adventures: "Adventures",
    testimonials: "Testimonials",
};
