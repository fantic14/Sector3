'use client';

import { useSearchParams } from "next/dist/client/components/navigation";
import { ASSETS } from "@assets/images";
import { RaceSession } from "@f1/types";
import { RaceService } from "../services/races";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function PreviousRaces() {

    const searchParams = useSearchParams();
    const year = Number(searchParams!.get("year")) || new Date().getFullYear();

    const [races, setRaces] = useState<RaceSession[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const maxRetries = 3;
        const retryDelay = 1000;

        const loadData = async (retryCount = 0) => {
            setIsLoading(true);
            setError(null);

            try {
                const races = await RaceService.getRacesForYear(year);

                setRaces(races);
            } catch (e) {
                if (retryCount < maxRetries) {
                    setTimeout(() => loadData(retryCount + 1), retryDelay);
                    return;
                } else {
                    setError(e instanceof Error ? e.message : "Failed to load races");
                }
            }
            setIsLoading(false);
        }

        loadData();
    }, [year]);

    return (
        <main className="relative select-none h-screen w-full flex flex-col overflow-hidden font-sans selection:bg-red-600 selection:text-white">

            <div className="absolute inset-0 z-0">
                <div
                    className={"absolute inset-0 bg-cover bg-center opacity-40 blur-sm"}
                    style={{ backgroundImage: `url(${ASSETS.BACKGROUNDS.HOMEPAGE})` }}
                />
                <div className="absolute inset-0 bg-radial-[circle_at_center,var(--tw-gradient-stops)] from-transparent via-black/40 to-black" />
            </div>

            <p>{year}</p>

            {isLoading ? (
                <>
                    <span className="text-xs uppercase text-white font-bold tracking-widest pl-1">NEXT RACE</span>
                    <Image src={ASSETS.LOADING} alt="Loading..." width={20} height={20} />
                </>
            ) : error ? (
                <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 text-sm rounded border border-white/10"
                >
                    Retry
                </button>
            ) : (races.map(race => {
                return (
                    <div key={race.circuit_key}>
                        <p>{race.circuit_short_name}</p>
                    </div>
                )
            }))}

        </main>
    )
}
