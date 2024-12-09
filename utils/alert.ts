import Swal, { SweetAlertOptions } from "sweetalert2";


export class SwalAlert {
    public static showAlert({ icon, title }: SweetAlertOptions) {
        Swal.fire({
            icon: icon,
            title: title,
            showConfirmButton: false,
            timer: 2000,
        });
    }

    public static showOptionAlert({
        icon,
        title,
        confirmButtonText = "Continuar",
        preConfirm
    }: SweetAlertOptions) {
        return Swal.fire({
            icon: icon,
            title: title,
            confirmButtonText: confirmButtonText,
            confirmButtonColor: "rgb(14 165 233 / 1)",
            cancelButtonColor: "#d33",
            cancelButtonText: "Cancelar",
            preConfirm: preConfirm,
            showCancelButton: true,
        });
    }

    public static showUploadAlert() {
        Swal.fire({
            title: "¿Quieres cargar usuarios o descargar la plantilla?",
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: "Descargar plantilla",
            confirmButtonColor: "#32CD32",
            denyButtonText: "Cargar usuarios",
            denyButtonColor: "#00CED1",
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire("Saved!", "", "success");
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });
    }
}