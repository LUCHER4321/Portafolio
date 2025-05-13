import { useEffect, useState } from "react";
import { Method } from "../../enum";
import { Field } from "../../types";
import { deleteCategory, getCategories, patchCategory, postCategory } from "../../api/categories";
import { Update } from "../../components/Update";

export const CategoryUpdate = ({}) => {
    const [token, setToken] = useState("");
    const [method, setMethod] = useState(Method.POST);
    const [options, setOptions] = useState<string[]>([]);
    const [selected, setSelected] = useState<string>("");
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
        [nameField.name, false],
        [iconField.name, false],
    ]));

    useEffect(() => {
        getCategories().then(C => setOptions(C.map(c => c.id)));
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
            setSelected={id => {
                if(typeof id !== "number") setSelected(id);
            }}
            fields={[
                idField,
                nameField,
                iconField,
            ]}
            response={response}
            optionals={optionals}
            setOptional={(f, b) => {
                const opt = new Map([...optionals.entries()]);
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
                        r = await patchCategory(selected ?? "", {
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
                            icon: optionals.get(iconField.name) ? icon : undefined,
                        });
                        break;
                    case Method.DELETE:
                        r = await deleteCategory(selected ?? "", token);
                        break;
                }
                setResponse(r);
            }}
        />
    );
};