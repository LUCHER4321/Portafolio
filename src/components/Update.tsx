import { Method } from "../enum";
import { Field, Lan } from "../types";

interface UpdatePorps<T> {
    title: string;
    token: string;
    setToken: (s: string) => void;
    method: Method;
    setMethod: (m: Method) => void;
    options: T[];
    toValue: (t: T) => number | string;
    toDisplay: (t: T) => string;
    selected?: number | string;
    setSelected: (id: number | string) => void;
    fields: Field<any>[];
    response?: T;
    optionals: Map<string, boolean>;
    setOptional: (f: string, b: boolean) => void;
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
    toValue,
    toDisplay,
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
    const fieldSwitch = <V,>(f: Field<V>) => {
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
                return <table>
                    <tbody>
                        {f.items?.().map((item, index) => (
                            <tr key={index}>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={listValues.get(f)?.includes(item)}
                                        onChange={e => f.setItem?.(item, e.target.checked)}
                                    />
                                </td>
                                <td>
                                    <img
                                        src={f.iconFunc?.(item)}
                                        style={{maxHeight: 25}}
                                    />
                                </td>
                                <td>
                                    {f.nameFunc?.(item)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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
                <tr className="border">
                    <td className="border">
                        <select
                            value={method}
                            onChange={e => setMethod(e.target.value as Method)}
                        >
                            {Object.values(Method).map((m, index) => (
                                <option key={index} value={m} className="bg-[#27273E]">
                                    {m}
                                </option>
                            ))}
                        </select>
                    </td>
                    <td className="border">
                        {method !== Method.POST &&
                            <select
                                value={selected}
                                onChange={e => setSelected(typeof selected === "string" ? e.target.value : +e.target.value)}
                                className="border"
                            >
                                {options.map((o, index) => (
                                    <option key={index} value={toValue(o)} className="bg-[#27273E]">
                                        {toDisplay(o)}
                                    </option>
                                ))}
                            </select>
                        }
                    </td>
                    <td rowSpan={(method !== Method.DELETE ? fields.length : 0) + 2} className="border">
                        {JSON.stringify(response)}
                    </td>
                </tr>
                {method !== Method.DELETE && fields.map((f, index) => (
                    <tr key={index} className="border">
                        {(method === Method.POST || !f.postExclusive) && <>
                            <td className="border">
                                <label>
                                    {f.name} {(method === Method.PATCH || f.optional) &&
                                        <input
                                            type="checkbox"
                                            checked={optionals.get(f.name)}
                                            onChange={e => setOptional(f.name, e.target.checked)}
                                        />}
                                </label>
                            </td>
                            <td className="border">
                                {fieldSwitch(f)}
                            </td>
                        </>}
                    </tr>
                ))}
                <tr>
                    <td colSpan={2} className="border">
                        <img
                            src={imagePrev === "" ? undefined : imagePrev}
                            style={{maxHeight: 50}}
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