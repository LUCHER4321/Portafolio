import { BACKEND_URL } from "../config";
import { LanguageDTO } from "../types";

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
        }
    }
};