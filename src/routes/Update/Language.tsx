import { useEffect, useState } from "react";
import { Update } from "../../components/Update";
import { Method } from "../../enum";
import { Field, LanguageDTO } from "../../types";
import { deleteLanguage, getLanguages, patchLanguage, postLanguage } from "../../api/languages";

export const LanguageUpdate = ({}) => {
    const [token, setToken] = useState("");
    const [method, setMethod] = useState(Method.POST);
    const [options, setOptions] = useState<LanguageDTO[]>([]);
    const [selected, setSelected] = useState<number>(0);
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [response, setResponse] = useState<any>({});
    const nameField: Field<unknown> = {
        name: "name",
        type: "string",
        setString: setName,
    };
    const imageField: Field<unknown> = {
        name: "image",
        type: "string",
        setString: setImage,
    };
    const [optionals, setOptionals] = useState(new Map([
        [nameField.name, false],
        [imageField.name, false],
    ]));

    const setLanguage = (id: number) => {
        const language = options.find(l => l.id === id);
        setName(language?.name ?? "");
        setImage(language?.image ?? "");
    };

    useEffect(() => {
        getLanguages().then(L => setOptions(L));
    }, []);

    return (
        <Update
            title="Language"
            token={token}
            setToken={setToken}
            method={method}
            setMethod={m => {
                setMethod(m);
                if(m !== Method.POST) setLanguage(selected ?? options[0].id);
            }}
            options={options}
            toValue={(l: LanguageDTO) => l.id}
            toDisplay={l => `${l.id}: ${l.name}`}
            selected={selected}
            setSelected={id => {
                if(typeof id !== "string") setSelected(id);
                setLanguage(id as number);
            }}
            fields={[
                nameField,
                imageField,
            ]}
            response={response}
            optionals={optionals}
            setOptional={(f, b) => {
                const opt = new Map([...optionals.entries()]);
                opt.set(f, b);
                setOptionals(opt);
            }}
            stringValues={new Map([
                [nameField, name],
                [imageField, image],
            ])}
            nameValues={new Map()}
            listValues={new Map()}
            imagePrev={image}
            send={async () => {
                let r: any;
                switch(method) {
                    case Method.POST:
                        r = await postLanguage({
                            token,
                            name,
                            image
                        });
                        break;
                    case Method.PATCH:
                        r = await patchLanguage(selected ?? 0, {
                            token,
                            name: optionals.get(nameField.name) ? name : undefined,
                            image: optionals.get(imageField.name) ? image : undefined,
                        });
                        break;
                    case Method.DELETE:
                        r = await deleteLanguage(selected ?? 0, token);
                        break;
                }
                setResponse(r);
            }}
        />
    );
};