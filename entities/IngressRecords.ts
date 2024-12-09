import { User } from "./user";

export enum SiteEnum {
    Sede4Vientos = "Biblioteca Sede 4 Vientos",
    SedeCentro = "Biblioteca Sede Centro",
    SedeTurbaco = "Biblioteca Sede Turbaco",
}

export interface IngressRecord {
    id?: number;
    timeStamp?: string;
    suggestionsComments?: string;
    protectionNotice?: string;
    servicesLibrary?: string;
    reason?: string;
    site?: SiteEnum;
    userId?: number;
    user?: User;
}
