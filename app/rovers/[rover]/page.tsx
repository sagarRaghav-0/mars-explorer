"use client";

import { roverMap } from "@/lib/rover";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { use, useEffect, useRef, useState } from "react";

export type Props = {
    params: Promise<{
        rover: string;
    }>;
};

export default function RoverPage({ params }: Props) {
    const { rover } = use(params);

    const [isMoving, setIsMoving] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const roverData = roverMap[rover as keyof typeof roverMap];

    // ✅ ALL HOOKS FIRST (NO CONDITION ABOVE)

    const progress = useMotionValue(0);

    const x = useTransform(progress, [0, 1], ["-20vw", "40vw"]);

    const yMobile = useTransform(progress, [0, 1], ["40vh", "65vh"]);
    const yDesktop = useTransform(progress, [0, 1], ["10vh", "40vh"]);
    const y = isMobile ? yMobile : yDesktop;

    const scale = useTransform(progress, [0, 1], [0.3, 1]);

    // ✅ Detect mobile
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 640);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    // ✅ Animation + audio
    useEffect(() => {
        const controls = animate(progress, 1, {
            duration: 12,
            ease: "easeInOut",
            onComplete: () => setIsMoving(false),
        });

        if (audioRef.current) {
            audioRef.current.muted = true;

            audioRef.current.play().then(() => {
                setTimeout(() => {
                    if (audioRef.current) {
                        audioRef.current.muted = false;
                    }
                }, 500);
            }).catch(() => {
                console.log("Autoplay blocked");
            });
        }

        return controls.stop;
    }, [progress]);

    // ✅ NOW SAFE TO CHECK
    if (!roverData) {
        return (
            <div className="flex items-center justify-center min-h-screen text-white">
                Rover not found
            </div>
        );
    }

    // ✅ UI
    return (
        <div className="bg-[url('/marsland.webp')] bg-cover bg-center min-h-screen relative overflow-hidden">

            <audio ref={audioRef} src="/music.mp3" loop muted />

            <h2 className="text-sm sm:text-2xl md:text-3xl text-amber-50 font-bold absolute top-4 left-1/2 -translate-x-1/2 text-center px-4">
                Welcome to World of{" "}
                <span className="text-2xl sm:text-3xl md:text-4xl pl-2">
                    {roverData.name}
                </span>
            </h2>

            <motion.div className="absolute" style={{ x, y, scale }}>
                <motion.div
                    animate={
                        isMoving
                            ? {
                                x: [0, 1, -1, 1, -1, 0],
                                y: [0, -1, 1, -1, 1, 0],
                                rotate: [0, 1, -1, 1, -1, 0],
                            }
                            : {}
                    }
                    transition={{
                        duration: 0.3,
                        ease: "easeInOut",
                        repeat: isMoving ? Infinity : 0,
                    }}
                >
                    <Link href={`/rovers/${rover}/details`}>
                        <Image
                            src={roverData.img}
                            alt={roverData.name}
                            width={300}
                            height={300}
                            className="w-[120px] sm:w-[180px] md:w-[250px] lg:w-[300px] h-auto cursor-pointer"
                            priority
                        />
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    );
}