import { BACKEND_URL } from "../config";
import { Delete, LanguageDTO } from "../types";

interface Filter {
    proy?: number;
    user?: string;
}

export const getLanguages = async ({ proy, user }: Filter = {} ): Promise<LanguageDTO[]> => {
    try {
        const result = await fetch(BACKEND_URL + `api/portfolio/languages${(proy !== undefined || user) ? "?" : ""}${proy !== undefined ? `proy=${proy}${user ? "&" : ""}` : ""}${user ? `user=${user}` : ""}`);
        const json = await result.json();
        return json;
    } catch {
        return [];
    }
};

export const getLanguage = async (id: number): Promise<LanguageDTO> => {
    try {
        const result = await fetch(BACKEND_URL + `api/portfolio/languages/${id}`);
        const json = await result.json();
        return json;
    } catch {
        return {
            id: 0,
            name: "",
            image: ""
        };
    }
};

interface Post extends Omit<LanguageDTO, "id"> {
    token: string;
}

export const postLanguage = async (body: Post): Promise<LanguageDTO> => {
    try {
        const result = await fetch(BACKEND_URL + "api/portfolio/languages", {
            method: "POST",
            body: JSON.stringify(body),
        });
        const json = await result.json();
        return json;
    } catch {
        return {
            id: 0,
            name: "",
            image: ""
        };
    }
};

interface Patch extends Partial<Omit<Post, "token">> {
    token: string;
}

export const patchLanguage = async (id: number, body: Patch): Promise<LanguageDTO> => {
    try {
        const result = await fetch(BACKEND_URL + `api/portfolio/languages/${id}`, {
            method: "PATCH",
            body: JSON.stringify(body),
        });
        const json = await result.json();
        return json;
    } catch {
        return {
            id: 0,
            name: "",
            image: ""
        };
    }
};

export const deleteLanguage = async (id: number, token: string): Promise<Delete> => {
    try {
        const result = await fetch(BACKEND_URL + `api/portfolio/languages/${id}`, {
            method: "DELETE",
            body: JSON.stringify({ token }),
        });
        const json = await result.json();
        return json;
    } catch(e: any) {
        return { message: e.message };
    }
};