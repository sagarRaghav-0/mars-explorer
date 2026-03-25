import Rovers from "@/components/rovers";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">

      {/* 🔥 Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/mars.mp4" type="video/mp4" />
      </video>

      {/* 🔥 Optional Overlay (better readability) */}
      <div className="absolute inset-0 bg-black/40" />

      {/* 🔥 Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 md:px-10">
        <Rovers />
      </div>

    </div>
  );
}