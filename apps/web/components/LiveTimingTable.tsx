'use client';

import React from 'react';
import { ASSETS } from "@assets/images";
import Image from "next/image";

// Mock data to match your screenshot exactly
const DRIVERS = [
    { pos: 1, code: 'LEC', team: 'HP SCUDERIA FERRARI', s1: '46.4326', s2: '26.453', s3: '33.425', last: '1:46.3016', interval: 33, color: 'text-ferrari'},
    { pos: 2, code: 'VER', team: 'RED BULL RACING', s1: '46.4326', s2: '26.453', s3: '33.425', last: '1:46.3016', interval: '+1.0', color: 'text-redbull' },
    { pos: 3, code: 'RUS', team: 'PETRONAS MERCEDES', s1: '46.4326', s2: '26.453', s3: '33.425', last: '1:46.3016', interval: '+1.0', color: 'text-mercedes' },
    { pos: 4, code: 'NOR', team: 'MCLAREN MERCEDES', s1: '46.4326', s2: '26.453', s3: '33.425', last: '1:46.3016', interval: '+1.0', color: 'text-mclaren' },
    { pos: 5, code: 'HAM', team: 'HP SCUDERIA FERRARI', s1: '46.4326', s2: '26.453', s3: '33.425', last: '1:46.3016', interval: '+1.0', color: 'text-ferrari' },
    { pos: 6, code: 'ANT', team: 'PETRONAS MERCEDES', s1: '46.4326', s2: '26.453', s3: '33.425', last: '1:46.3016', interval: '+1.0', color: 'text-mercedes' },
    { pos: 7, code: 'HAD', team: 'RACING BULLS', s1: '46.4326', s2: '26.453', s3: '33.425', last: '1:46.3016', interval: '+1.0', color: 'text-racingbulls' },
    { pos: 8, code: 'PIA', team: 'MCLAREN MERCEDES', s1: '46.4326', s2: '26.453', s3: '33.425', last: '1:46.3016', interval: '+1.0', color: 'text-mclaren' },
    { pos: 9, code: 'HUL', team: 'AUDI', s1: '46.4326', s2: '26.453', s3: '33.425', last: '1:46.3016', interval: '+1.0', color: 'text-audi' },
    { pos: 10, code: 'BEA', team: 'HAAS', s1: '46.4326', s2: '26.453', s3: '33.425', last: '1:46.3016', interval: '+1.0', color: 'text-haas' },
    { pos: 11, code: 'BOR', team: 'AUDI', s1: '46.4326', s2: '26.453', s3: '33.425', last: '1:46.3016', interval: '+1.0', color: 'text-audi' },
    { pos: 12, code: 'ALO', team: 'ARAMCO ASTON MARTIN', s1: '46.4326', s2: '26.453', s3: '33.425', last: '1:46.3016', interval: '+1.0', color: 'text-astonmartin' },
    { pos: 13, code: 'GAS', team: 'ALPINE', s1: '46.4326', s2: '26.453', s3: '33.425', last: '1:46.3016', interval: '+1.0', color: 'text-alpine' },
    { pos: 14, code: 'OCO', team: 'HAAS', s1: '46.4326', s2: '26.453', s3: '33.425', last: '1:46.3016', interval: '+1.0', color: 'text-haas' },
    { pos: 15, code: 'ALB', team: 'WILLIAMS', s1: '46.4326', s2: '26.453', s3: '33.425', last: '1:46.3016', interval: '+1.0', color: 'text-williams' },
    { pos: 16, code: 'TSU', team: 'RED BULL RACING', s1: '46.4326', s2: '26.453', s3: '33.425', last: '1:46.3016', interval: '+1.0', color: 'text-redbull' },
];

export default function LiveTimingTable() {

    function team(team: string) {
        if (team.toLowerCase().includes('ferrari')) {
            return (
                <span className={"flex flex-row gap-[1vw]"}>
                    <Image src={ASSETS.TEAM_LOGOS.FERRARI} alt="Ferrari" width={20} height={20} className={"h-[3vh]"} />{team}
                </span>
            )
        } else if (team.toLowerCase().includes('red bull')) {
            return (
                <span className={"flex flex-row gap-[1vw]"}>
                    <Image src={ASSETS.TEAM_LOGOS.REDBULL} alt="Red Bull Racing" width={20} height={20} className={"h-[3vh] w-fit"} />{team}
                </span>
            )
        } else {
            return team;
        }
    }

    return (
        <div className="w-full flex flex-col h-full text-sm md:text-base select-none">
            <div className="grid grid-cols-19 border-b border-gray-700 text-gray-300 font-mono text-xs md:text-sm uppercase tracking-wider py-2 sticky top-0 bg-black z-10">
                <div className="col-span-1 flex items-center justify-center border-r border-gray-800">Pos</div>
                <div className="col-span-2 flex items-center justify-center border-r border-gray-800">Driver</div>
                <div className="col-span-5 flex items-center justify-center border-r border-gray-800">Team</div>
                <div className="col-span-2 flex items-center justify-center border-r border-gray-800">Sector 1</div>
                <div className="col-span-2 flex items-center justify-center border-r border-gray-800">Sector 2</div>
                <div className="col-span-2 flex items-center justify-center border-r border-gray-800">Sector 3</div>
                <div className="col-span-3 flex items-center justify-center border-r border-gray-800">Last Lap</div>
                <div className="col-span-2 flex items-center justify-center">Interval</div>

            </div>

            <div className="flex-1">
                {DRIVERS.map((driver) => (
                    <div
                        key={driver.pos}
                        className="grid grid-cols-19 border-b border-gray-800 hover:bg-white/5 transition-colors h-[6vh] font-bold"
                    >
                        <div className={`font-racing col-span-1 flex items-center justify-center border-r border-gray-800 ${driver.pos === 1 ? "text-[#FFD700]" : (driver.pos === 2 ? "text-[#C0C0C0]" : (driver.pos === 3 ? "text-[#CD7F32]" : "text-white"))} italic text-lg`}>
                            {driver.pos}
                        </div>

                        <div className={`font-racing col-span-2 flex items-center justify-center border-r border-gray-800 ${driver.color} italic text-xl tracking-widest`}>
                            {driver.code}
                        </div>

                        <div className="font-racing col-span-5 flex items-center ml-[15%] border-r border-gray-800 relative overflow-hidden">
                            <div className={`flex items-center gap-2 ${driver.color} italic tracking-wider w-full h-full`}>
                                {team(driver.team)}
                            </div>
                        </div>

                        <div className="font-mono col-span-2 flex items-center justify-center border-r border-gray-800 text-fastest">
                            {driver.s1}
                        </div>

                        <div className="font-mono col-span-2 flex items-center justify-center border-r border-gray-800 text-pb">
                            {driver.s2}
                        </div>

                        <div className="font-mono col-span-2 flex items-center justify-center border-r border-gray-800 text-slow">
                            {driver.s3}
                        </div>

                        <div className="font-mono col-span-3 flex items-center justify-center border-r border-gray-800 text-white">
                            {driver.last}
                        </div>

                        <div className="font-mono col-span-2 flex items-center justify-center text-white">
                            {driver.interval}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}