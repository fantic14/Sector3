import Image from "next/image";
import { RaceStatus } from "@f1/types";

interface RaceCardProps {
    status: RaceStatus;
    name: string;
    image: string;
    date: string;
    onClick?: () => void;
    className?: string;
}

export const RaceCard = ({ status, name, image, date, onClick, className = "" }: RaceCardProps) => {
    const isCurrent = status === "next" || status === "live";
    const isPast = status === "past";

    return (
        <div
            className={`
        relative shrink-0 overflow-hidden rounded-xl transition-all duration-300 group cursor-pointer bg-[#D9D9D9]
        ${isCurrent ? "w-[25vw] h-[17vw] hover:scale-102 z-10 opacity-70 hover:opacity-90" : ""}
        ${isPast ? "w-[19vw] h-[12vw] opacity-60 hover:opacity-80 grayscale" : ""}
        ${status === "future" ? "w-[19vw] h-[12vw] opacity-60 hover:opacity-80" : ""}
        ${className}
      `}
        >
            <div className="absolute inset-0">
                <div className="absolute inset-0 flex mt-[3%] justify-center">
                    <div className="relative w-[93%] h-[80%]">
                        <Image
                            src={image}
                            alt={name}
                            fill
                            className="object-cover rounded-br-3xl rounded-tl-3xl rounded-tr-md rounded-bl-md"
                        />
                    </div>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 w-full font-mono">
                {(status === "live") && (
                    <div className="absolute -top-[500%] left-4 bg-brand-red text-white text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">
                        Live Stats
                    </div>
                )}

                <h3 className={`uppercase ml-[5%] ${isCurrent ? "mb-[3%]" : "mb-[2%]"} tracking-wide text-black ${isCurrent ? "text-2xl font-extrabold" : "text-md font-bold"} group-hover:underline`}>
                    {name}
                </h3>
            </div>
        </div>
    );
};
