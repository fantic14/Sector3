import { RaceSessions } from '@f1/types'

const API_BASE_URL = "https://api.openf1.org/v1"

const current_year = new Date().getFullYear();

export const RaceService = {

    async getThisYearsRaces(): Promise<RaceSessions[]> {
        const response = await fetch(`${API_BASE_URL}/sessions?year=${current_year}&session_name=Race`);
        if (!response.ok) throw new Error("Failed to fetch this years races");

        const result: RaceSessions[] = await response.json();
        return result;
    },

    async getUpcomingRaces(): Promise<RaceSessions[]> {
        const races: RaceSessions[] = await this.getThisYearsRaces();

        const upcomingRaces: RaceSessions[] = []
        const now = new Date();

        for (const race of races) {
            const raceStart = new Date(race.date_start);
            if (raceStart > now) upcomingRaces.push(race);
        }

        return upcomingRaces;
    },

    // TODO finish this function
    async getLiveRace(): Promise<RaceSessions> {
        const response = await fetch(`${API_BASE_URL}/sessions?year=${current_year}`)
        if (!response.ok) throw new Error("Failed to fetch live race");

        const result: RaceSessions = await response.json()
        return result;
    }
}
