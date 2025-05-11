import { BACKEND_URL } from "../config";
import { ProjectDTO } from "../types";

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