'use client';

import { RaceCard } from "../components/RaceCard";
import { ASSETS } from "@assets/images";
import Link from "next/link";
import { RaceService } from "../services/races";
import { RaceSessions } from "@f1/types";
import { useEffect, useState } from "react";


const PAST_RACE = { name: "Abu Dhabi GP", img: ASSETS.TRACKS.ABUDHABI };
const CURRENT_RACE = { name: "Australian GP", img: ASSETS.TRACKS.AUSTRALIA };

export default function HomePage() {

    const [pastRaces, setPastRaces] = useState<RaceSessions[]>([])
    const [liveOrNextRace, setLiveOrNextRace] = useState<RaceSessions>()
    const [upcomingRaces, setUpcomingRaces] = useState<RaceSessions[]>([])

    useEffect(() => {
        RaceService.getUpcomingRaces().then(setUpcomingRaces);
    }, [])

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
                    <div className="hidden xl:flex flex-col gap-2 my-auto">
                        <span className="text-xs uppercase text-zinc-500 font-semibold tracking-widest pl-1">Last race weekend</span>
                        {pastRaces.map((race, i) => (
                            <Link key={i} href={"/table"}>
                                <RaceCard status="past" name={PAST_RACE.name} image={PAST_RACE.img} date={""} />
                            </Link>
                        ))}
                    </div>

                    <div className="flex flex-col gap-2 shrink-0">
                        <span className="text-xs uppercase text-white font-bold tracking-widest pl-1">NEXT RACE</span>
                        <Link href="/table">
                            <RaceCard status="live" name={CURRENT_RACE.name} image={CURRENT_RACE.img} date={""} />
                        </Link>
                    </div>

                    <div className="flex flex-col gap-2 min-w-0 flex-1 overflow-hidden my-auto">
                        <span className="text-xs uppercase text-zinc-400 font-semibold tracking-widest pl-1">Upcoming race weekends</span>

                        <div className="flex gap-4 overflow-x-auto no-scrollbar pr-8 mask-linear-fade">
                            {upcomingRaces.map((race, i) => (
                                <Link key={i} href={"/table"}>
                                    <RaceCard status="future" name={race.circuit_short_name} image={ASSETS.TRACKS[race.circuit_key]} date={""} />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

            </div>

            <footer className="absolute bottom-0 w-full z-20 bg-black/80 backdrop-blur-md border-t border-white/5 py-3 px-8 flex justify-between items-center text-[10px] uppercase text-zinc-500 tracking-widest">
                <p>© 2026 Sector3 Live. All rights reserved.</p>
                <p>Data provided by [API Name]. Not affiliated with Formula 1.</p>
            </footer>
        </main>
    );
}
