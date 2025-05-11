import { BACKEND_URL } from "../config";
import { CategoryDTO } from "../types";

interface Filter {
    proy?: number;
    user?: string;
}

export const getCategories = async ({proy, user} : Filter = {}): Promise<CategoryDTO[]> => {
    try {
        const result = await fetch(BACKEND_URL + `api/portfolio/categories${(proy !== undefined || user) ? "?" : ""}${proy !== undefined ? `proy=${proy}${user ? "&" : ""}` : ""}${user ? `user=${user}` : ""}`);
        const json = await result.json();
        return json;
    } catch {
        return [];
    }
};

export const getCategory = async (id: string): Promise<CategoryDTO> => {
    try {
        const result = await fetch(BACKEND_URL + `api/portfolio/categories/${id}`);
        const json = await result.json();
        return json;
    } catch {
        return {
            id: "",
            name: [],
            icon: ""
        }
    }
};