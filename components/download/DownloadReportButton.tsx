"use client";

import { FaFileExcel } from 'react-icons/fa';

import { Storage } from "@/constants/Storage";
import { Button } from "@nextui-org/react";
import { useState } from "react";

export default function DownloadReportButton() {
    const [isLoading, setIsLoading] = useState(false);

    const handleDownload = async () => {
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:8000/api/v1/export_xlsx', {
                method: 'GET',
                headers: new Headers({
                    Authorization: `Bearer ${localStorage.getItem(Storage.access_token) ?? ''}`
                }),
            });

            // console.log(await response.text());

            if (!response.ok) {
                const message = `Error al descargar el archivo: ${response.status} ${response.statusText}`;
                throw new Error(message);
            }

            // Obtener el nombre del archivo de la cabecera 'Content-Disposition'
            const contentDisposition = response.headers.get('Content-Disposition');
            const filename = contentDisposition?.split('filename=')[1]?.replace(/['"]/g, '');

            // Convertir la respuesta a un Blob
            const blob = await response.blob();

            // Crear un enlace de descarga
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'Reporte de ingresos.xlsx');

            // Simular un clic en el enlace para iniciar la descarga
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error(error);
            alert("Error al descargar el archivo.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Button
            color="primary"
            onClick={handleDownload}
            isLoading={isLoading}
            startContent={<FaFileExcel />}
        >
            Descargar Reporte
        </Button>
    );
}