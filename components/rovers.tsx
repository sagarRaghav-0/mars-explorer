"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

type Rover = {
    name: string;
    img: string;
};

export default function Rovers() {
    const router = useRouter();

    const rovers: Rover[] = [
        { name: "Curiosity", img: "/curiosity.webp" },
        { name: "Opportunity", img: "/opportunity.webp" },
        { name: "Spirit", img: "/spirit.webp" },
    ];

    const handleClick = (rover: Rover) => {
        router.push(`/rovers/${rover.name.toLowerCase()}`);
    };

    return (
        <div className="flex items-center justify-center w-full min-h-screen px-4">

            {/* 🔥 Card */}
            <div className="w-full max-w-md sm:max-w-lg md:max-w-xl bg-white/10 backdrop-blur-md py-5 rounded-xl">

                {/* 🔥 Header */}
                <div className="flex items-center justify-center gap-3 mb-6 text-amber-50">
                    <Image
                        src="/mars.webp"
                        alt="Mars"
                        width={40}
                        height={40}
                        className="animate-[spin_27s_linear_infinite]"
                    />
                    <h1 className="text-xl sm:text-2xl font-bold tracking-wide">
                        ROVERS
                    </h1>
                </div>

                {/* 🔥 Rover List */}
                <div className="flex flex-col gap-4 px-4 sm:px-6">

                    {rovers.map((rover) => (
                        <div
                            key={rover.name}
                            onClick={() => handleClick(rover)}
                            className="flex items-center justify-between gap-4 p-3 rounded-lg text-amber-50 cursor-pointer hover:scale-105 hover:bg-white/10 transition"
                        >
                            {/* 🔥 Image */}
                            <Image
                                src={rover.img}
                                alt={rover.name}
                                width={120}
                                height={120}
                                className="w-[80px] sm:w-[100px] md:w-[120px] h-auto"
                            />

                            {/* 🔥 Text */}
                            <h2 className="text-base sm:text-lg md:text-xl font-semibold">
                                {rover.name}
                            </h2>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    );
}