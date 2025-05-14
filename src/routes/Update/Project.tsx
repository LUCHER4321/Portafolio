import { useEffect, useState } from "react";
import { Method } from "../../enum";
import { CategoryDTO, Field, LanguageDTO, ProjectDTO } from "../../types";
import { Update } from "../../components/Update";
import { getUser } from "../../api/user";
import { deleteProject, getProjects, patchProject, postProject } from "../../api/projects";
import { getLanguages } from "../../api/languages";
import { getCategories } from "../../api/categories";

export const ProjectUpdate = ({}) => {
    const [user, setUser] = useState("");
    const [token, setToken] = useState("");
    const [method, setMethod] = useState(Method.POST);
    const [options, setOptions] = useState<ProjectDTO[]>([]);
    const [selected, setSelected] = useState<number>();
    const [nameSp, setSpanish] = useState("");
    const [nameEn, setEnglish] = useState("");
    const [repository, setRepository] = useState("");
    const [website, setWebsite] = useState("");
    const [icon, setIcon] = useState("");
    const [languages, setLanguages] = useState<LanguageDTO[]>([]);
    const [languagesOpt, setLanguagesOpt] = useState<LanguageDTO[]>([]);
    const [categories, setCategories] = useState<CategoryDTO[]>([]);
    const [categoriesOpt, setCategoriesOpt] = useState<CategoryDTO[]>([]);
    const [response, setResponse] = useState<any>({});
    const nameField: Field<unknown> = {
        name: "name",
        type: "name",
        setSpanish,
        setEnglish,
    };
    const repoField: Field<unknown> = {
        name: "repository",
        type: "string",
        setString: setRepository,
    };
    const webField: Field<unknown> = {
        name: "website",
        optional: true,
        type: "string",
        setString: setWebsite,
    };
    const iconField: Field<unknown> = {
        name: "icon",
        optional: true,
        type: "string",
        setString: setIcon,
    };
    const lanField: Field<LanguageDTO> = {
        name: "languages",
        type: "list",
        setItem: (l, b) => {
            let lan = [...languages];
            if(!lan.includes(l) && b) lan.push(l);
            else if (lan.includes(l) && !b) lan = lan.filter(l1 => l1 !== l);
            setLanguages(lan);
        },
        items: () => languagesOpt,
        iconFunc: l => l.image,
        nameFunc: l => l.name,
    };
    const catField: Field<CategoryDTO> = {
        name: "categories",
        type: "list",
        setItem: (c, b) => {
            let cat = [...categories];
            if(!cat.includes(c) && b) cat.push(c);
            else if (cat.includes(c) && !b) cat = cat.filter(c1 => c1 !== c);
            setCategories(cat);
        },
        items: () => categoriesOpt,
        iconFunc: c => c.icon,
        nameFunc: c => c.name.map(c1 => c1.name).join("; "),
    };
    const [optionals, setOptionals] = useState(new Map([
        [nameField.name, false],
        [repoField.name, false],
        [webField.name, false],
        [iconField.name, false],
        [lanField.name, false],
        [catField.name, false],
    ]));

    const setProject = (id: number) => {
        const project = options.find(p => p.id === id);
        setSpanish(project?.name.find(n => n.translation === "spanish")?.name ?? "");
        setEnglish(project?.name.find(n => n.translation === "english")?.name ?? "");
        setRepository(project?.repository ?? "");
        setWebsite(project?.website ?? "");
        setIcon(project?.icon ?? "");
        const selectedLanguages = languagesOpt.filter(l => 
            project?.languages.some(pl => pl.name === l.name)
        );
        setLanguages(selectedLanguages);
        const selectedCategories = categoriesOpt.filter(c => 
            project?.categories.some(pc => pc.id === c.id)
        );
        setCategories(selectedCategories);
    };

    useEffect(() => {
        getUser().then(
            u => {
                setUser(u.id);
                getProjects({user: u.id}).then(P => setOptions(P));
            }
        );
        getLanguages().then(L => setLanguagesOpt(L));
        getCategories().then(C => setCategoriesOpt(C));
    }, []);
    return (
        <Update
            title="project"
            token={token}
            setToken={setToken}
            method={method}
            setMethod={m => {
                setMethod(m);
                if(m !== Method.POST) setProject(selected ?? options[0].id);
            }}
            options={options}
            toValue={(p: ProjectDTO) => p.id}
            toDisplay={p => `${p.id}: ${p.name.map(p1 => p1.name).join("; ")}`}
            selected={selected}
            setSelected={id => {
                if(typeof id !== "string") setSelected(id);
                setProject(id as number);
            }}
            fields={[
                nameField,
                repoField,
                webField,
                iconField,
                lanField,
                catField
            ]}
            response={response}
            optionals={optionals}
            setOptional={(f, b) => {
                const opt = new Map([...optionals.entries()]);
                opt.set(f, b);
                setOptionals(opt);
            }}
            stringValues={new Map([
                [repoField, repository],
                [webField, website],
                [iconField, icon],
            ])}
            nameValues={new Map([
                [nameField, new Map([
                    ["spanish", nameSp],
                    ["english", nameEn],
                ])],
            ])}
            listValues={new Map<Field<any>, any[]>([
                [lanField, languages],
                [catField, categories],
            ])}
            imagePrev={icon}
            send={async () => {
                let r: any;
                switch(method) {
                    case Method.POST:
                        r = await postProject(user, {
                            token,
                            name: [
                                {
                                    translation: "spanish",
                                    name: nameSp,
                                },
                                {
                                    translation: "english",
                                    name: nameEn,
                                },
                            ],
                            repository,
                            website: optionals.get(webField.name) ? website : undefined,
                            icon: optionals.get(iconField.name) ? icon : undefined,
                            languages: languages.map(l => l.name),
                            categories: categories.map(c => c.id),
                        });
                        break;
                    case Method.PATCH:
                        r = await patchProject(user, selected ?? 0, {
                            token,
                            name: optionals.get(nameField.name) ? [
                                {
                                    translation: "spanish",
                                    name: nameSp,
                                },
                                {
                                    translation: "english",
                                    name: nameEn,
                                },
                            ] : undefined,
                            repository: optionals.get(repoField.name) ? repository : undefined,
                            website: optionals.get(webField.name) ? website : undefined,
                            icon: optionals.get(iconField.name) ? icon : undefined,
                            languages: optionals.get(lanField.name) ? languages.map(l => l.name) : undefined,
                            categories: optionals.get(catField.name) ? categories.map(c => c.id) : undefined,
                        });
                        break;
                    case Method.DELETE:
                        r = await deleteProject(user, selected ?? 0, token);
                        break;
                }
                setResponse(r);
            }}
        />
    );
};