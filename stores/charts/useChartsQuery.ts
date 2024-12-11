import { useQuery } from "react-query";
import useChartStore from "./useCharts";
import { ChartsService, ChartsTotals } from "@/entities/ChartsResponse";

export const useChartsQuery = () => {
    const {
        fetchChartData,
        setChartDataServices,
        setChartDataTotals
    } = useChartStore();

    const queryServices = useQuery<ChartsService[], Error>(
        ["servicesData"],
        async () => {
            const data = await fetchChartData();
            return data.services || [];
        },
        {
            onSuccess: (data) => {
                setChartDataServices(data);
            },
            onError: (error) => {
                console.error("Error fetching services data: ", error);
            },
        }
    );

    const queryTotals = useQuery<ChartsTotals[], Error>(
        ["totalsData"],
        async () => {
            const data = await fetchChartData();
            return data.totals || [];
        },
        {
            onSuccess: (data) => {
                setChartDataTotals(data);
            },
            onError: (error) => {
                console.error("Error fetching totals data: ", error);
            },
        }
    );

    return {
        ...queryServices,
        ...queryTotals,
        chartDataServices: queryServices.data,
        chartDataTotals: queryTotals.data,
    };
};