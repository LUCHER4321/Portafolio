export interface NameDTO {
    translation: string;
    name: string;
    description?: string;
}

export interface LanguageDTO {
    id: number;
    name: string;
    image: string;
}

export interface CategoryDTO {
    id: string;
    icon: string;
    name: NameDTO[];
}

export interface ProjectDTO {
    id: number;
    name: NameDTO[];
    repository: string;
    website?: string;
    icon?: string;
    languages: LanguageDTO[];
    categories: CategoryDTO[];
}

export interface UserDTO {
    id: string;
    name: string;
}

export interface Delete {
    message: string;
}

export type Lan = "spanish" | "english";

export interface Field<T> {
    postExclusive?: boolean;
    name: string;
    optional?: boolean;
    type: "string" | "name" | "list";
    setString?: (s: string) => void;
    setSpanish?: (n: string) => void;
    setEnglish?: (n: string) => void;
    setItem?: (l: T, b: boolean) => void;
    items?: () => T[];
    iconFunc?: (t: T) => string;
    nameFunc?: (t: T) => string;
}