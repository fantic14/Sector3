'use client';

import { RaceCard } from "../components/RaceCard";
import { ASSETS } from "@assets/images";
import Link from "next/link";
import { RaceService } from "../services/races";
import { RaceSession } from "@f1/types";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";


export default function HomePage() {

    const [pastRaces, setPastRaces] = useState<RaceSession[]>([]);
    const [liveRace, setLiveRace] = useState<RaceSession | null>(null);
    const [nextRace, setNextRace] = useState<RaceSession | null>(null);
    const [upcomingRaces, setUpcomingRaces] = useState<RaceSession[]>([]);

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [selectedYear, setSelectedYear] = useState<number>(2026);
    const [isDropupOpen, setIsDropupOpen] = useState<boolean>(false);
    const dropupRef = useRef<HTMLDivElement>(null);

    const years = [2026, 2025, 2024, 2023];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropupRef.current && !dropupRef.current.contains(event.target as Node)) {
                setIsDropupOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            const [races, live] = await Promise.all([
                RaceService.getUpcomingRaces(),
                RaceService.getLiveSession()
            ]);

            if (live === null && races.length > 0) {
                const racesCopy = [...races];
                const next = racesCopy.shift();

                setNextRace(next ? next : null);
                setUpcomingRaces(racesCopy);
            } else {
                setUpcomingRaces(races);
                setNextRace(null);
            }

            setLiveRace(live);
            setIsLoading(false);
        };

        loadData();
    }, []);

    return (
        <main className="relative select-none h-screen w-full flex flex-col overflow-hidden font-sans selection:bg-red-600 selection:text-white">

            <div className="absolute inset-0 z-0">
                <div
                    className={"absolute inset-0 bg-cover bg-center opacity-40 blur-sm"}
                    style={{ backgroundImage: `url(${ASSETS.BACKGROUNDS.HOMEPAGE})` }}
                />
                <div className="absolute inset-0 bg-radial-[circle_at_center,var(--tw-gradient-stops)] from-transparent via-black/40 to-black" />
            </div>

            <div className="relative z-10 flex flex-col items-center h-full w-full">

                <div className="text-center mt-[10vh] space-y-2">
                    <h1 className="text-7xl font-black italic tracking-tighter text-brand-red drop-shadow-lg font-racing">
                        Sector<span className="text-brand-red/80">3</span>
                    </h1>
                    <p className="text-zinc-300 text-lg font-light tracking-wide opacity-90">
                        Free live stats tracking of F1 races
                    </p>
                </div>

                <div className="w-full max-w-400 flex items-end gap-6 mt-[10vh]">

                    <div className="flex flex-col gap-2 shrink-0">
                        <span className="text-xs uppercase text-white font-bold tracking-widest pl-1">NEXT RACE</span>
                        {isLoading ? (
                            <Image src={ASSETS.LOADING} alt="Loading..." width={20} height={20} />
                        ) : (
                            <Link href="/table">
                                <RaceCard
                                    status={liveRace ? "live" : "next"}
                                    name={liveRace?.circuit_short_name ?? (nextRace ? nextRace.circuit_short_name : "")}
                                    image={ASSETS.TRACKS[liveRace?.circuit_key ?? (nextRace ? nextRace.circuit_key : "")]}
                                    date={""}
                                />
                            </Link>
                        )}
                    </div>

                    <div className="flex flex-col gap-2 min-w-0 flex-1 overflow-hidden my-auto">
                        <span className="text-xs uppercase text-zinc-400 font-semibold tracking-widest pl-1">Upcoming race weekends</span>

                        <div className="flex gap-4 overflow-x-auto no-scrollbar pr-8 mask-linear-fade">
                            {isLoading ? (
                                <Image src={ASSETS.LOADING} alt="Loading..." width={20} height={20} />
                            ) : (
                                <>
                                    {upcomingRaces.map((race, i) => (
                                        <Link key={i} href={"/table"}>
                                            <RaceCard status="future" name={race.circuit_short_name} image={ASSETS.TRACKS[race.circuit_key]} date={""} />
                                        </Link>
                                    ))}
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <div className="relative ml-[70vw] mt-[20vh]" ref={dropupRef}>
                    <button
                        onClick={() => setIsDropupOpen(!isDropupOpen)}
                        className="flex items-center gap-2 hover:text-zinc-300 transition-colors"
                    >
                        <span>{selectedYear}</span>
                        <svg className={`w-3 h-3 transition-transform ${isDropupOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                    </button>
                    <h4 className="text-gray-400">Previous races</h4>
                    {isDropupOpen && (
                        <div className="absolute bottom-full right-0 mb-2 bg-zinc-900 border border-white/10 rounded shadow-lg overflow-hidden">
                            {years.map((year) => (
                                <button
                                    key={year}
                                    // TODO make every year to open new tab with all races from that year
                                    onClick={() => { }}
                                    className={`block w-full px-4 py-2 text-left hover:bg-white/10 transition-colors ${selectedYear === year ? 'text-brand-red' : 'text-zinc-400'}`}
                                >
                                    {year}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <footer className="absolute bottom-0 w-full z-20 bg-black/80 backdrop-blur-md border-t border-white/5 py-3 px-8 flex justify-between items-center text-[10px] uppercase text-zinc-500 tracking-widest">
                <p>© 2026 Sector3 Live. All rights reserved.</p>
                <p>Data provided by openf1.org. Not affiliated with Formula 1.</p>
            </footer>
        </main>
    );
}
