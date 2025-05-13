import { BACKEND_URL } from "../config";
import { CategoryDTO, Delete } from "../types";

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

interface Post extends CategoryDTO {
    token: string;
}

export const postCategory = async(body: Post): Promise<CategoryDTO> => {
    try {
        const result = await fetch(BACKEND_URL + "api/portfolio/categories", {
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/json"
            }),
            body: JSON.stringify(body),
        });
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

interface Patch extends Partial<Omit<Omit<Post, "id">, "token">> {
    token: string;
}

export const patchCategory = async(id: string, body: Patch): Promise<CategoryDTO> => {
    try {
        const result = await fetch(BACKEND_URL + `api/portfolio/categories/${id}`, {
            method: "PATCH",
            headers: new Headers({
                "Content-Type": "application/json"
            }),
            body: JSON.stringify(body),
        });
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

export const deleteCategory = async (id: string, token: string): Promise<Delete> => {
    try {
        const result = await fetch(BACKEND_URL + `api/portfolio/categories/${id}`, {
            method: "DELETE",
            headers: new Headers({
                "Content-Type": "application/json"
            }),
            body: JSON.stringify({ token }),
        });
        const json = await result.json();
        return json;
    } catch(e: any) {
        return { message: e.message };
    }
};