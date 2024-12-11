import { ChartsRepository } from "@/data/repositories/r_charts";
import { ChartsResponse, ChartsService, ChartsTotals } from "@/entities/ChartsResponse";
import { create } from "zustand";

interface ChartStore {
    chartDataServices: ChartsService[] | null;
    chartDataTotals: ChartsTotals[] | null;

    fetchChartData: () => Promise<ChartsResponse>;

    getChartDataServices: () => ChartsService[] | null;
    getChartDataTotals: () => ChartsTotals[] | null;

    setChartDataServices: (data: ChartsService[]) => void;
    setChartDataTotals: (data: ChartsTotals[]) => void;
}

const useChartStore = create<ChartStore>((set, get) => ({
    chartDataServices: null,
    chartDataTotals: null,

    fetchChartData: async () => {
        const repository = new ChartsRepository();

        const response: Response = await repository.getData();
        const data: ChartsResponse = await response.json();

        set({
            chartDataServices: data.services ?? [],
            chartDataTotals: data.totals ?? [],
        });

        return data;
    },

    getChartDataServices: () => get().chartDataServices,
    getChartDataTotals: () => get().chartDataTotals,

    setChartDataServices: (data) => set({ chartDataServices: data }),
    setChartDataTotals: (data) => set({ chartDataTotals: data }),
}));

export default useChartStore;
