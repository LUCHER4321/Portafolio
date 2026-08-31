import { BACKEND_URL } from "../config";

interface ContactProps {
    token: string;
    name?: string;
    company?: string;
    email?: string;
    phone?: string;
    message?: string;
}

export const contact = async (body: ContactProps) => {
    try {
        await fetch(BACKEND_URL + "api/portfolio/contact", {
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/json"
            }),
            body: JSON.stringify(body),
        });
    }
    catch(e){}
};