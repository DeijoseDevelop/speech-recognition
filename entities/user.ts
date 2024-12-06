import { IngressRecord } from "./IngressRecords";

export interface User {
    id?: number;
    name?: string;
    lastName?: string;
    documentNumber?: string;
    email?: string;
    password?: string;
    gender?: string;
    userType?: string;
    dependency?: string;
    academicProgram?: string;
    faceEncoding?: any;
    ingressRecords?: IngressRecord[];
}
