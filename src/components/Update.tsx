import { Method } from "../enum";
import { Field, Lan } from "../types";
import { ImageLink } from "./ImageLink";

interface UpdatePorps<T> {
    title: string;
    token: string;
    setToken: (s: string) => void;
    method: Method;
    setMethod: (m: Method) => void;
    options: T[];
    selected?: T;
    setSelected: (t: T) => void;
    fields: Field<any>[];
    response?: T;
    optionals: Map<Field<any>, boolean>;
    setOptional: (f: Field<any>, b: boolean) => void;
    stringValues: Map<Field<any>, string>;
    nameValues: Map<Field<any>, Map<Lan, string>>;
    listValues: Map<Field<any>, any[]>;
    imagePrev?: string;
    send: () => Promise<void>;
}

export const Update = <T,>({
    title,
    token,
    setToken,
    method,
    setMethod,
    options,
    selected,
    setSelected,
    fields,
    response,
    optionals,
    setOptional,
    stringValues,
    nameValues,
    listValues,
    imagePrev,
    send,
}: UpdatePorps<T>) => {
    const fieldSwitch = (f: Field<any>) => {
        switch(f.type) {
            case "string":
                return <input
                    type="text"
                    placeholder={f.name}
                    value={stringValues.get(f)}
                    onChange={e => f.setString?.(e.target.value)}
                />;
            case "name":
                return <table>
                    <tbody>
                        <tr>
                            <td>
                                Español
                            </td>
                            <td>
                                <input
                                    type="text"
                                    placeholder="Español"
                                    value={nameValues.get(f)?.get("spanish")}
                                    onChange={e => f.setSpanish?.(e.target.value)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                English
                            </td>
                            <td>
                                <input
                                    type="text"
                                    placeholder="English"
                                    value={nameValues.get(f)?.get("english")}
                                    onChange={e => f.setEnglish?.(e.target.value)}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            case "list":
                return <ul>
                    {f.items?.().map((item, index) => (
                        <li key={index}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={listValues.get(f)?.includes(item)}
                                    onChange={e => f.setItem?.(item, e.target.checked)}
                                /> <ImageLink
                                    link=""
                                    image={f.iconFunc?.(item)}
                                    height={25}
                                /> {f.nameFunc?.(item)}
                            </label>
                        </li>
                    ))}
                </ul>
        }
    };
    return (
        <table>
            <tbody>
                <tr>
                    <td colSpan={3}>
                        <h1>{title}</h1>
                    </td>
                </tr>
                <tr>
                    <td colSpan={3}>
                        <input
                            type="text"
                            placeholder="token"
                            value={token}
                            onChange={e => setToken(e.target.value)}
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        <select
                            value={method}
                            onChange={e => setMethod(e.target.value as Method)}
                        >
                            {Object.values(Method).map((m, index) => (
                                <option key={index} value={m}>
                                    {m}
                                </option>
                            ))}
                        </select>
                    </td>
                    <td>
                        {method !== Method.POST &&
                            <select
                                value={JSON.stringify(selected)}
                                onChange={e => setSelected(JSON.parse(e.target.value))}
                            >
                                {options.map((o, index) => (
                                    <option key={index} value={JSON.stringify(o)}>
                                        {JSON.stringify(o)}
                                    </option>
                                ))}
                            </select>
                        }
                    </td>
                    <td rowSpan={(method !== Method.DELETE ? fields.length : 0) + 2}>
                        {JSON.stringify(response)}
                    </td>
                </tr>
                {method !== Method.DELETE && fields.map((f, index) => (
                    <tr key={index}>
                        {(method === Method.POST || !f.postExclusive) && <>
                            <td>
                                <label>
                                    {f.name} {(method === Method.PATCH || f.optional) &&
                                        <input
                                            type="checkbox"
                                            checked={optionals.get(f)}
                                            onChange={e => setOptional(f, e.target.checked)}
                                        />}
                                </label>
                            </td>
                            <td>
                                {fieldSwitch(f)}
                            </td>
                        </>}
                    </tr>
                ))}
                <tr>
                    <td colSpan={2}>
                        <ImageLink
                            link=""
                            image={imagePrev === "" ? undefined : imagePrev}
                            height={50}
                        />
                    </td>
                </tr>
                <tr>
                    <td colSpan={3}>
                        <button onClick={async() => await send()}>SEND</button>
                    </td>
                </tr>
            </tbody>
        </table>
    );
};