"use client";

import { useChartsQuery } from "@/stores/charts/useChartsQuery";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    ChartData,
} from "chart.js";
import { ChartsService, ChartsTotals } from "@/entities/ChartsResponse";
import { transformServicesData, transformTotalsData } from "@/utils/transformChartsData";

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const Charts = () => {
    const { chartDataServices, chartDataTotals } = useChartsQuery();

    const servicesChartData = chartDataServices ? transformServicesData(chartDataServices) : null;
    const totalsChartData = chartDataTotals ? transformTotalsData(chartDataTotals) : null;

    return (
        <>
            {/* Services Chart */}
            <div className="mb-8">
                <h2 className="text-lg font-semibold mb-4">Servicios por Sede</h2>
                {servicesChartData ? (
                    <Bar
                        data={servicesChartData}
                        options={{
                            responsive: true,
                            plugins: {
                                legend: {
                                    position: "top",
                                },
                                title: {
                                    display: true,
                                    text: "Servicios por Sede",
                                },
                            },
                        }}
                    />
                ) : (
                    <p>Cargando gráfica de servicios...</p>
                )}
            </div>

            {/* Totals Chart */}
            <div>
                <h2 className="text-lg font-semibold mb-4">Totales por Sede</h2>
                {totalsChartData ? (
                    <Bar
                        data={totalsChartData}
                        options={{
                            responsive: true,
                            plugins: {
                                legend: {
                                    position: "top",
                                },
                                title: {
                                    display: true,
                                    text: "Totales por Sede",
                                },
                            },
                        }}
                    />
                ) : (
                    <p>Cargando gráfica de totales...</p>
                )}
            </div>
        </>
    );
};

export default Charts;
