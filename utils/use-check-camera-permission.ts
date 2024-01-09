import { useEffect, useState } from "react";

export function useCheckCameraPermission() {
    const [ message, setMessage ] = useState<string>("");
    const [ hasError, setHasError ] = useState<boolean>(false);
    useEffect(() => {
        navigator.permissions.query({ name: "camera" }).then(function (permissionStatus: PermissionStatus) {
            console.log('El estado del permiso de la cámara es:', permissionStatus.state);

            if (permissionStatus.state === 'granted') {
                // console.log("Permiso de cámara concedido.");
                setMessage("Permiso de cámara concedido.");
            } else if (permissionStatus.state === 'prompt') {
                // console.log("Permiso de cámara pendiente de respuesta.");
                setMessage("Permiso de cámara pendiente de respuesta");
            } else {
                // console.log("Permiso de cámara denegado.");
                setMessage("Permiso de cámara denegado.");
            }
        }).catch(function (error) {
            console.error('No se pudo consultar el estado del permiso de la cámara:', error);
            setMessage(`No se pudo consultar el estado del permiso de la cámara: ${error}`);
            setHasError(true);
        });
    }, [])
    return {
        message,
        hasError
    }
}