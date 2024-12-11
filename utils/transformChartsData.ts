"use client";

import { ChartsService, ChartsTotals } from "@/entities/ChartsResponse";
import { ChartData } from "chart.js";

export const transformServicesData = (servicesData: ChartsService[]): ChartData<"bar"> => {
    const labels = servicesData.map((item) => item.service || "");
    const allSites = Array.from(new Set(servicesData.flatMap((item) => Object.keys(item.data || {}))));

    const datasets = allSites.map((site, index) => ({
        label: site,
        data: servicesData.map((item) => (item.data ? item.data[site] || 0 : 0)),
        backgroundColor: `rgba(${54 + index * 50}, ${99 + index * 30}, ${132 + index * 20}, 0.5)`,
        borderColor: `rgba(${54 + index * 50}, ${99 + index * 30}, ${132 + index * 20}, 1)`,
        borderWidth: 1,
    }));

    return { labels, datasets };
};

export const transformTotalsData = (totalsData: ChartsTotals[]): ChartData<"bar"> => {
    const labels = totalsData.map((item) => item.site || "");
    const datasets = [
        {
            label: "Totales por Sede",
            data: totalsData.map((item) => item.total || 0),
            backgroundColor: [
                "rgba(255, 99, 132, 0.5)",
                "rgba(54, 162, 235, 0.5)",
                "rgba(75, 192, 192, 0.5)",
            ],
            borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(75, 192, 192, 1)",
            ],
            borderWidth: 1,
        },
    ];

    return { labels, datasets };
};