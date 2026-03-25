"use client";

import { createContext, useContext, useState } from "react";

type Rover = {
    name: string;
    img: string;
};

type RoverContextType = {
    rover: Rover | null;
    setRover: (rover: Rover) => void;
};

const RoverContext = createContext<RoverContextType | null>(null);

export const RoverProvider = ({ children }: { children: React.ReactNode }) => {
    const [rover, setRover] = useState<Rover | null>(null);

    return (
        <RoverContext.Provider value={{ rover, setRover }}>
            {children}
        </RoverContext.Provider>
    );
};

export const useRover = () => {
    const context = useContext(RoverContext);
    if (!context) throw new Error("useRover must be used within RoverProvider");
    return context;
};