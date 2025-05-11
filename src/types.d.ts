export interface NameDTO {
    translation: string;
    name: string;
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