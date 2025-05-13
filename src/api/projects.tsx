import { BACKEND_URL } from "../config";
import { Delete, ProjectDTO } from "../types";

interface Filter {
    user: string;
    lan?: string;
    cat?: string;
}

export const getProjects = async ({user, lan, cat} : Filter): Promise<ProjectDTO[]> => {
    try {
        const result = await fetch(BACKEND_URL + `api/portfolio/projects/${user}${(lan || cat) ? "?" : ""}${lan ? `lan=${lan}${cat ? "&" : ""}` : ""}${cat ? `cat=${cat}` : ""}`);
        const json = await result.json();
        return json;
    } catch {
        return [];
    }
};

export const getProject = async (user: string, id: number): Promise<ProjectDTO> => {
    try {
        const result = await fetch(BACKEND_URL + `api/portfolio/projects/${user}/${id}`);
        const json = await result.json();
        return json;
    } catch {
        return {
            id: 0,
            name: [],
            repository: "",
            languages: [],
            categories: [],
        };
    }
};

interface Post extends Omit<Omit<Omit<ProjectDTO, "id">, "languages">, "categories"> {
    token: string;
    languages: string[];
    categories: string[];
};

export const postProject = async (user: string, body: Post): Promise<ProjectDTO> => {
    try {
        const result = await fetch(BACKEND_URL + `api/portfolio/projects/${user}`, {
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
            id: 0,
            name: [],
            repository: "",
            languages: [],
            categories: [],
        };
    }
};

interface Patch extends Partial<Omit<Post, "token">> {
    token: string;
}

export const patchProject = async (user: string, id: number, body: Patch): Promise<ProjectDTO> => {
    try {
        const result = await fetch(BACKEND_URL + `api/portfolio/projects/${user}/${id}`, {
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
            id: 0,
            name: [],
            repository: "",
            languages: [],
            categories: [],
        };
    }
};

export const deleteProject = async (user: string, id: number, token: string): Promise<Delete> => {
    try {
        const result = await fetch(BACKEND_URL + `api/portfolio/projects/${user}/${id}`, {
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