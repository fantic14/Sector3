export type RaceStatus = "past" | "current" | "future" | "live";

export interface Circuit {
    id: string;
    name: string;
    city: string;
    country: string;
    image: string;
}

export interface RaceSessions {
    fp1: string;
    fp2: string;
    fp3?: string;
    qualifying: string;
    sprint?: string;
    grandPrix: string;
}

export interface RaceEvent {
    id: string;
    slug: string;        // For URL routing (e.g. /race/australia)
    name: string;
    round: number;       // Round number (e.g., 1)
    season: number;      // 2026
    status: RaceStatus;
    date: string;
    circuit: Circuit;
    sessions: RaceSessions;

    winner?: {
        driverId: string;
        code: string;      // "VER"
        teamColor: string; // "#0600EF"
    };
}

// 5. API Response Wrapper (Standardized Backend Response)
export interface ApiResponse<T> {
    data: T;
    meta?: {
        total: number;
        timestamp: string; // When the data was fetched
    };
}