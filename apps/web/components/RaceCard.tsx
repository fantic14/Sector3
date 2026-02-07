import Image from "next/image";
import { RaceStatus } from "@f1/types";

interface RaceCardProps {
    status: RaceStatus;
    name: string;
    image: string;
    date: string;
    className?: string;
}

export const RaceCard = ({ status, name, image, date, className = "" }: RaceCardProps) => {
    const isCurrent = status === "current" || status === "live";
    const isPast = status === "past";

    return (
        <div
            className={`
        relative shrink-0 overflow-hidden rounded-xl transition-all duration-300 group cursor-pointer 
        ${isCurrent ? "w-100 h-60 border-2 border-white/20 shadow-[0_0_40px_rgba(0,0,0,0.5)] scale-100 hover:scale-102 z-10" : ""}
        ${isPast ? "w-75 h-45 opacity-60 hover:opacity-80 grayscale" : ""}
        ${status === "future" ? "w-[320px] h-50 opacity-90 hover:opacity-100" : ""}
        ${className}
      `}
        >
            <div className="absolute inset-0">
                <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />
            </div>

            <div className="absolute bottom-0 left-0 w-full p-4">
                {isCurrent && (
                    <div className="absolute -top-40 left-4 bg-brand-red text-white text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">
                        Live Stats
                    </div>
                )}

                <h3 className={`font-bold uppercase tracking-wide ${isCurrent ? "text-2xl" : "text-lg text-zinc-300"}`}>
                    {name}
                </h3>
            </div>
        </div>
    );
};