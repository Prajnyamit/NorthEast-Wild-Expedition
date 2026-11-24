import { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import { initLenis, scrollTop } from "./lib/lenis";
import { TripProvider } from "./context/TripContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import Home from "./pages/Home";

const TrekDetails = lazy(() => import("./pages/TrekDetails"));
const ExperienceDetails = lazy(() => import("./pages/ExperienceDetails"));
const Treks = lazy(() => import("./pages/Treks"));
const Destinations = lazy(() => import("./pages/Destinations"));
const Experiences = lazy(() => import("./pages/Experiences"));
const About = lazy(() => import("./pages/About"));

function ScrollManager() {
    const { pathname } = useLocation();
    useEffect(() => {
        scrollTop();
    }, [pathname]);
    return null;
}

function PageFallback() {
    return (
        <div className="flex min-h-[70vh] items-center justify-center bg-canvas">
            <div
                className="h-9 w-9 animate-spin rounded-full border-2 border-gold border-t-transparent"
                aria-label="Loading"
            />
        </div>
    );
}

export default function App() {
    useEffect(() => {
        initLenis();
    }, []);

    return (
        <BrowserRouter>
            <ScrollManager />
            <TripProvider>
                <div className="grain-overlay" aria-hidden="true" />
                <Navbar />
                <main>
                    <Suspense fallback={<PageFallback />}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/treks" element={<Treks />} />
                            <Route path="/treks/:id" element={<TrekDetails />} />
                            <Route path="/experiences/:id" element={<ExperienceDetails />} />
                            <Route path="/destinations" element={<Destinations />} />
                            <Route path="/experiences" element={<Experiences />} />
                            <Route path="/about" element={<About />} />
                            <Route path="*" element={<Home />} />
                        </Routes>
                    </Suspense>
                </main>
                <Footer />
                <BackToTop />
                <Toaster
                    position="bottom-right"
                    toastOptions={{
                        style: {
                            background: "#112217",
                            border: "1px solid rgba(194,157,89,0.35)",
                            color: "#F4EFE6",
                        },
                    }}
                />
            </TripProvider>
        </BrowserRouter>
    );
}