import { RaceEvent } from '@f1/types'

const API_BASE_URL = "https://api.openf1.org/v1"

export const RaceService = {
    async getUpcomingRaces(): Promise<RaceEvent[]> {
        const current_year = new Date().getFullYear();
        const response = await fetch(`${API_BASE_URL}/sessions?year=${current_year}&session_name=Race`);
        if (!response.ok) throw new Error("Failed to fetch upcoming races");

        const result: RaceEvent[] = await response.json();
        return result
    }
}
