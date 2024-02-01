import Swal, { SweetAlertOptions, SweetAlertResult } from "sweetalert2";

export class SwalAlert {
    public static showAlert({ icon, title }: SweetAlertOptions) {
        Swal.fire({
            icon: icon,
            title: title,
            showConfirmButton: false,
            timer: 1500,
        });
    }
}