import { RaceSession } from '@f1/types'

const API_BASE_URL = "https://api.openf1.org/v1"

const current_year = new Date().getFullYear();

export const RaceService = {

    async getThisYearsRaces(): Promise<RaceSession[]> {
        const response = await fetch(`${API_BASE_URL}/sessions?year=${current_year}&session_name=Race`);
        if (!response.ok) throw new Error("Failed to fetch this years races");

        const result: RaceSession[] = await response.json();
        return result;
    },

    async getUpcomingRaces(): Promise<RaceSession[]> {
        const races: RaceSession[] = await this.getThisYearsRaces();

        const upcomingRaces: RaceSession[] = []
        const now = new Date();

        for (const race of races) {
            const raceStart = new Date(race.date_start);
            if (raceStart > now) upcomingRaces.push(race);
        }

        return upcomingRaces;
    },

    async getLiveSession(): Promise<RaceSession | null> {
        const races: RaceSession[] = await this.getThisYearsRaces();

        const now = new Date();
        let liveRace: RaceSession | null = null;

        for (const race of races) {
            const raceStart = new Date(race.date_start);
            const raceEnd = new Date(race.date_end);

            if (raceStart <= now && raceEnd >= now) {
                liveRace = race;
                break;
            }
        }

        return liveRace;
    }
}
