import { Storage } from "@/constants/Storage"

interface MethodsParams {
    url?: string
    path: string
    body?: BodyInit
    headers?: Headers | { Authorization: string }
}

export default class BaseRepository {
    constructor() { }
    protected buildHeaders = (): Headers => {
        return new Headers({ 'Content-Type': 'application/json' })
    }

    public buildHeadersWithToken = (): Headers => {
        return new Headers({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem(Storage.access_token) ?? ''}`
        })
    }

    public async get({ url = process.env.API_URL, path, headers }: MethodsParams): Promise<Response> {
        let res = fetch(`${url}${path}`, {
            method: 'GET',
            headers: headers
        })
        return res
    }

    public async post({ url = process.env.API_URL, path, body, headers }: MethodsParams) {
        let res = fetch(`${url}${path}`, {
            method: 'POST',
            headers: headers,
            body: body
        })
        return res
    }

    public async put({ url = process.env.API_URL, path, body, headers }: MethodsParams) {
        let res = fetch(`${url}${path}`, {
            method: 'PUT',
            headers: headers,
            body: body
        })
        return res
    }

    public async patch({ url = process.env.API_URL, path, body, headers }: MethodsParams) {
        let res = fetch(`${url}${path}`, {
            method: 'PATCH',
            headers: headers,
            body: body
        })
        return res
    }

    public async delete({ url = process.env.API_URL, path, headers }: MethodsParams) {
        let res = fetch(`${url}${path}`, {
            method: 'DELETE',
            headers: headers,
        })
        return res
    }
}
