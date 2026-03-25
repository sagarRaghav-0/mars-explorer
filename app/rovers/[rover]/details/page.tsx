"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { use, useState } from "react";
import { Props } from "../page";

export default function RoverDetails({ params }: Props) {
    const { rover } = use(params);

    const [date, setDate] = useState("");
    const [photos, setPhotos] = useState<any[]>([]);
    const [selected, setSelected] = useState<any | null>(null);
    const [loading, setLoading] = useState(false);

    const fetchPhotos = async () => {
        if (!date) return alert("Please select a date");

        setLoading(true);

        try {
            const res = await fetch(
                `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?earth_date=${date}&api_key=HE3wo3I9JwA2QBstjCljbDvK3kjyb4evXNpZvG7j`
            );

            if (res.status === 404) {
                setPhotos([]);
                setSelected(null);
                return;
            }

            const data = await res.json();

            if (!data.photos || data.photos.length === 0) {
                setPhotos([]);
                setSelected(null);
                return;
            }

            setPhotos(data.photos);
            setSelected(data.photos[0]);

        } catch (error) {
            console.log(error);
        }

        setLoading(false);
    };

    return (
        <div className="bg-[url('/marsland.webp')] bg-cover bg-center min-h-screen p-6 text-white">

            <h1 className="text-3xl mb-6 text-center">
                🚀 {rover.toUpperCase()} Rover Photos
            </h1>

            {/* 🔥 Input */}
            <div className="flex gap-4 justify-center mb-6">
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="text-black px-3 py-2 rounded"
                />

                <button
                    onClick={fetchPhotos}
                    className="bg-yellow-400 text-black px-4 py-2 rounded font-bold"
                >
                    Get Photos
                </button>
            </div>

            {/* 🔥 SKELETON LOADING */}
            {loading && (
                <div className="max-w-5xl mx-auto space-y-6">

                    {/* Big Image Skeleton */}
                    <Skeleton className="w-full h-[400px] rounded-xl" />

                    {/* Thumbnails Skeleton */}
                    <div className="flex gap-4">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <Skeleton key={i} className="w-24 h-24 rounded-lg" />
                        ))}
                    </div>
                </div>
            )}

            {/* 🔥 SHOW CAROUSEL */}
            {!loading && photos.length > 0 && selected && (
                <div className="max-w-5xl mx-auto">

                    {/* ✅ BIG IMAGE */}
                    <Card className="mb-6 bg-black/40 border border-white/20">
                        <CardContent className="p-0">
                            <div className="relative w-full h-[400px]">
                                <Image
                                    src={selected.img_src}
                                    alt="selected"
                                    fill
                                    className="object-cover rounded"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* ✅ THUMBNAILS */}
                    <ScrollArea className="w-full whitespace-nowrap">
                        <div className="flex gap-4 p-2">

                            {photos.map((photo) => (
                                <div
                                    key={photo.id}
                                    onClick={() => setSelected(photo)}
                                    className={`relative w-24 h-24 flex-shrink-0 cursor-pointer rounded overflow-hidden border-2 transition-all
                                        ${selected.id === photo.id
                                            ? "border-yellow-400 scale-105"
                                            : "border-transparent"}
                                    `}
                                >
                                    <Image
                                        src={photo.img_src}
                                        alt="thumb"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            ))}

                        </div>

                        <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                </div>
            )}

            {/* 🔥 EMPTY STATE */}
            {!loading && photos.length === 0 && (
                <p className="text-center mt-10 text-gray-300">
                    No photos found for selected date
                </p>
            )}

        </div>
    );
}