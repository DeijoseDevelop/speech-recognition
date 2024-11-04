export function translateGender(gender: string | undefined): string {
    switch (gender?.toLocaleLowerCase()) {
        case "male":
            return "Masculino";
        case "female":
            return "Femenino";
        case "non-binary":
            return "No binario";
        case "other":
            return "Otro";
        default:
            return "Desconocido";
    }
}