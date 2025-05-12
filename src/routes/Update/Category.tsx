import { useEffect, useState } from "react";
import { Method } from "../../enum";
import { CategoryDTO, Field } from "../../types";
import { deleteCategory, getCategories, patchCategory, postCategory } from "../../api/categories";
import { Update } from "../../components/Update";

export const CategoryUpdate = ({}) => {
    const [token, setToken] = useState("");
    const [method, setMethod] = useState(Method.POST);
    const [options, setOptions] = useState<CategoryDTO[]>([]);
    const [selected, setSelected] = useState<CategoryDTO>();
    const [id, setId] = useState("");
    const [nameSp, setSpanish] = useState("");
    const [nameEn, setEnglish] = useState("");
    const [icon, setIcon] = useState("");
    const [response, setResponse] = useState<any>({});
    const idField: Field<unknown> = {
        postExclusive: true,
        name: "id",
        type: "string",
        setString: setId,
    };
    const nameField: Field<unknown> = {
        name: "name",
        type: "name",
        setSpanish,
        setEnglish,
    };
    const iconField: Field<unknown> = {
        name: "icon",
        type: "string",
        setString: setIcon,
    };
    const [optionals, setOptionals] = useState(new Map([
        [nameField, false],
        [iconField, false],
    ]));

    useEffect(() => {
        getCategories().then(C => setOptions(C));
    }, []);

    return (
        <Update
            title="Category"
            token={token}
            setToken={setToken}
            method={method}
            setMethod={setMethod}
            options={options}
            selected={selected}
            setSelected={setSelected}
            fields={[
                idField,
                nameField,
                iconField,
            ]}
            response={response}
            optionals={optionals}
            setOptional={(f, b) => {
                const opt = new Map(optionals);
                opt.set(f, b);
                setOptionals(opt);
            }}
            stringValues={new Map([
                [idField, id],
                [iconField, icon],
            ])}
            nameValues={new Map([
                [nameField, new Map([
                    ["spanish", nameSp],
                    ["english", nameEn],
                ])],
            ])}
            listValues={new Map()}
            imagePrev={icon}
            send={async () => {
                let r: any;
                switch(method) {
                    case Method.POST:
                        r = await postCategory({
                            token,
                            id,
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
                            icon,
                        });
                        break;
                    case Method.PATCH:
                        r = await patchCategory(selected?.id ?? "", {
                            token,
                            name: optionals.get(nameField) ? [
                                {
                                    translation: "spanish",
                                    name: nameSp,
                                },
                                {
                                    translation: "english",
                                    name: nameEn,
                                },
                            ] : undefined,
                        });
                        break;
                    case Method.DELETE:
                        r = await deleteCategory(selected?.id ?? "", token);
                        break;
                }
                setResponse(r);
            }}
        />
    );
};