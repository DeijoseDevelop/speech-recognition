import { IngressRecord } from "./IngressRecords";

export interface User {
    id?: number;
    name?: string;
    last_name?: string;
    document_number?: string;
    email?: string;
    password?: string;
    gender?: string;
    user_type?: string;
    dependency?: string;
    academic_program?: string;
    face_encoding?: any;
    ingress_records?: IngressRecord[];
}
