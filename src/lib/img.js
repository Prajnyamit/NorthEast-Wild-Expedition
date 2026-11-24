export function imgSize(url, w = 900) {
    if (!url) return url;
    try {
        const u = new URL(url);
        if (u.hostname.includes("unsplash.com")) {
            u.searchParams.set("w", String(w));
            u.searchParams.set("q", "70");
            u.searchParams.set("auto", "format");
            u.searchParams.set("fit", "crop");
            return u.toString();
        }
        if (u.hostname.includes("pexels.com")) {
            u.searchParams.set("w", String(w));
            return u.toString();
        }
        return url;
    } catch {
        return url;
    }
}
