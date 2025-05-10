import { BACKEND_TOKEN, BACKEND_URL } from "../config";
import { UserDTO } from "../types";

export const getUser = async (): Promise<UserDTO> => {
    try {
        const result = await fetch(BACKEND_URL + `api/portfolio/user/${BACKEND_TOKEN}`);
        const json = await result.json();
        return json;
    } catch {
        return {
            id: "",
            name: "",
        }
    }
};