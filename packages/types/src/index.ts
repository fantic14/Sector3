export type RaceStatus = "past" | "next" | "future" | "live";

export interface Circuit {
    id: string;
    name: string;
    city: string;
    country: string;
    image: string;
}

export interface RaceSession {
    circuit_key: number;
    circuit_short_name: string;
    country_code: string;
    country_key: number;
    country_name: string;
    date_end: string;
    date_start: string;
    gmt_offset: string;
    location: string;
    meeting_key: number;
    session_key: number;
    session_name: string;
    session_type: string;
    year: number;
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
    sessions: RaceSession;

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
