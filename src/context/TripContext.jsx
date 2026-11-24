import { createContext, useContext } from "react";
import TripOverlay from "../components/TripOverlay";

const TripContext = createContext(null);

export function TripProvider({ children }) {
    const openTrip = (trip) => {
        window.__openTrip && window.__openTrip(trip);
    };
    return (
        <TripContext.Provider value={{ openTrip }}>
            {children}
            <TripOverlay />
        </TripContext.Provider>
    );
}

export const useTrips = () => useContext(TripContext);
