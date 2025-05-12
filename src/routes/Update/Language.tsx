import { useEffect, useState } from "react";
import { Update } from "../../components/Update";
import { Method } from "../../enum";
import { Field, LanguageDTO } from "../../types";
import { deleteLanguage, getLanguages, patchLanguage, postLanguage } from "../../api/languages";

export const LanguageUpdate = ({}) => {
    const [token, setToken] = useState("");
    const [method, setMethod] = useState(Method.POST);
    const [options, setOptions] = useState<LanguageDTO[]>([]);
    const [selected, setSelected] = useState<LanguageDTO>();
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
        [nameField, false],
        [imageField, false],
    ]));

    useEffect(() => {
        getLanguages().then(L => setOptions(L));
    }, []);

    return (
        <Update
            title="Language"
            token={token}
            setToken={setToken}
            method={method}
            setMethod={setMethod}
            options={options}
            selected={selected}
            setSelected={setSelected}
            fields={[
                nameField,
                imageField,
            ]}
            response={response}
            optionals={optionals}
            setOptional={(f, b) => {
                const opt = new Map(optionals);
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
                        r = await patchLanguage(selected?.id ?? 0, {
                            token,
                            name: optionals.get(nameField) ? name : undefined,
                            image: optionals.get(imageField) ? image : undefined,
                        });
                        break;
                    case Method.DELETE:
                        r = await deleteLanguage(selected?.id ?? 0, token);
                        break;
                }
                setResponse(r);
            }}
        />
    );
};