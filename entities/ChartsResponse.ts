export interface ChartsServiceData {
    [location: string]: number;
}

export interface ChartsService {
    service?: string;
    data?: ChartsServiceData;
}

export interface ChartsTotals {
    site?: string;
    total?: number;
}

export interface ChartsResponse {
    services?: ChartsService[];
    totals?: ChartsTotals[];
}