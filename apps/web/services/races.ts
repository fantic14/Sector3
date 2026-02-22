import { RaceSession } from '@f1/types'

const API_BASE_URL = "https://api.openf1.org/v1"

const currentYear = new Date().getFullYear();

export const RaceService = {

    async getRacesForYear(year: number): Promise<RaceSession[]> {
        const response = await fetch(`${API_BASE_URL}/sessions?year=${year}&session_name=Race`);
        if (!response.ok) throw new Error(`Failed to fetch ${year} years races`);

        const result: RaceSession[] = await response.json();
        return result;
    },

    async getUpcomingRaces(): Promise<RaceSession[]> {
        const races: RaceSession[] = await this.getRacesForYear(currentYear);

        const upcomingRaces: RaceSession[] = []
        const now = new Date();

        for (const race of races) {
            const raceStart = new Date(race.date_start);
            if (raceStart > now) upcomingRaces.push(race);
        }

        return upcomingRaces;
    },

    async getLiveSession(): Promise<RaceSession | null> {
        const races: RaceSession[] = await this.getRacesForYear(currentYear);

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
    },

    async getPastRacesForYear(year: number): Promise<RaceSession[]> {
        return await this.getRacesForYear(year);
    }
}
