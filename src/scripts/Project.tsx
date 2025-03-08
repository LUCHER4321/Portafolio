import { useEffect, useState } from "react";
import { CustomTable } from "./CustomTable";
import { ImageLink } from "./ImageLink";
import { Languaje } from "./Languaje";
import { languajes } from "../data/languajes";

const token = process.env.NEXT_PUBLIC_PUBLIC_KEY

export class Project {
    name: string;
    repository: string;
    website?: string;
    icon?: string;
    languajes: string[] = [];

    private static GitHubLogo = "https://logo.clearbit.com/github.com";

    constructor(name: string, repository: string, website: string | undefined = undefined, icon: string | undefined = undefined, ...languages: string[]) {
        this.name = name;
        this.repository = repository;
        this.website = website;
        this.icon = icon;
        this.languajes = languages;
    }

    private languajesURL () {
        return this.repository.replace("https://github.com", "https://api.github.com/repos") + "/languages";
    }

    async getLanguajes(keepFetching = false): Promise<string[] | undefined>{
        try{
            const response = await fetch(this.languajesURL(), {
                headers: {
                    Authorization: `token ${token}`
                }
            });
            if(!response.ok){
                if(response.status === 403) {
                    const remaining = response.headers.get('X-RateLimit-Remaining');
                    if(remaining === '0') {
                        const resetTime = response.headers.get('X-RateLimit-Reset');
                        const waitTime = resetTime ? parseInt(resetTime) - Math.floor(Date.now() / 1000) : 60;
                        console.log(`Rate limit exceeded. Retrying in ${waitTime} seconds.`);
                        await new Promise(resolve => setTimeout(resolve, waitTime * 1000));
                        return keepFetching ? await this.getLanguajes() : undefined;
                    }
                }
                console.error("Error:", response.status, response.statusText);
                return keepFetching ? await this.getLanguajes() : undefined;
            }
            const json = await response.json();
            return Object.keys(json);
        } catch(e) {
            console.error("Error:", e);
            return keepFetching ? await this.getLanguajes() : undefined;
        }
    }

    static Table({projects, className, height, thClassName, tdClassName, languajeFilter, lanHeight}: tableProps) {
        const [lang, setLang] = useState<Map<Project,string[]>>(new Map(projects.map(p => [p, p.languajes])));
        const getLang = async () => {
            const m = new Map<Project,string[]>();
            for(const p of projects){
                m.set(p, (await p.getLanguajes(true) ?? []).concat(p.languajes));
            }
            return m;
        }
        useEffect(() => {
            getLang().then(setLang);
        }, [projects]);
        return(
            <CustomTable
                headers={["Proyecto", "Repositorio", "Lenguajes", "Sitio Web"]}
                data={languajeFilter ? projects.filter(p => {
                    for(const l of languajeFilter){
                        if(lang.get(p)?.includes(l.name)) return true;
                    }
                    return false;
                }) : projects}
                row={p => p ? [
                    p.name,
                    <ImageLink
                        link={p.repository}
                        image={Project.GitHubLogo}
                        height={height}
                    />,
                    <Languaje.List
                        languajes={languajes.filter(l => lang.get(p)?.includes(l.name))}
                        className="flex flex-wrap"
                        height={lanHeight}
                    />, //lang.get(p)?.join(", ") ?? "...",
                    p.website && <ImageLink
                        link={p.website}
                        image={p.icon}
                        height={height}
                    />
                ] : []}
                className={className}
                thClassName={thClassName}
                tdClassName={tdClassName}
            />
        );
    }
}

interface tableProps {
    projects: Project[];
    height?: number;
    className?: string;
    thClassName?: string;
    tdClassName?: string;
    languajeFilter?: Languaje[];
    lanHeight?: number;
}