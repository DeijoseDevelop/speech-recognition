import axios, { AxiosResponse } from "axios";

interface MethodsParams {
    path: string;
    body?: BodyInit;
    headers?: Headers;
}

export default class BaseRepository {
    constructor() { }

    public async get({ path, headers }: MethodsParams): Promise<AxiosResponse<any, any>> {
        let res = axios.get(`${process.env.API_URL}${path}`, {
            headers: { "x-api-key": process.env.X_API_KEY! },
        });
        return res;
    }

    public async post({ path, body }: MethodsParams) {
        let res = fetch(`${process.env.API_URL}${path}`, {
            method: "POST",
            headers: new Headers({ "x-api-key": process.env.X_API_KEY! }),
            body: body,
        });
        return res;
    }

    public async put({ path, body }: MethodsParams) {
        let res = fetch(`${process.env.API_URL}${path}`, {
            method: "PUT",
            headers: new Headers({ "x-api-key": process.env.X_API_KEY! }),
            body: body,
        });
        return res;
    }

    public async delete({ path, body }: MethodsParams) {
        let res = fetch(`${process.env.API_URL}${path}`, {
            method: "DELETE",
            headers: new Headers({ "x-api-key": process.env.X_API_KEY! }),
            body: body,
        });
        return res;
    }
}