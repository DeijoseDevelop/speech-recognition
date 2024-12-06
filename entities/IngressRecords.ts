import { User } from "./user";

export interface IngressRecord {
    id?: number;
    timeStamp?: string;
    suggestionsComments?: string;
    protectionNotice?: string;
    servicesLibrary?: string;
    reason?: string;
    userId?: number;
    user?: User;
}
