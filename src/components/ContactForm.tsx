import { useState } from "react";
import { contact } from "../api/contact";
import { BACKEND_TOKEN } from "../config";
import { codeText, codeTextAlt } from "../functions/translate";

export const ContactForm = ({language}: {language: string}) => {
    const baseClass = "text-black bg-white! rounded p-2";
    const inputClass = `${baseClass} col-span-1 col-start-1! sm:col-span-3`;
    const textAreaClass = `${baseClass} row-span-4 sm:row-start-1 sm:col-start-4! col-span-1 sm:col-span-4`;
    const [name, setName] = useState("");
    const [company, setCompany] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");
    return (
        <div className="w-full flex flex-col items-center">
            <h2 className="text-white">{codeText("stt05", language)}</h2>
            <form className="grid grid-cols-1 grid-flow-row sm:grid-rows-5 sm:grid-cols-7 sm:w-11/24 mt-4 gap-4">
                <input
                    type="text"
                    className={inputClass}
                    placeholder={codeText("frm00", language) + "*"}
                    name="name"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <input
                    type="text"
                    className={inputClass}
                    placeholder={codeText("frm01", language)}
                    name="company"
                    value={company}
                    onChange={e => setCompany(e.target.value)}
                />
                <input
                    type="email"
                    className={inputClass}
                    placeholder={codeText("frm02", language) + "*"}
                    name="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input
                    type="tel"
                    className={inputClass}
                    placeholder={codeText("frm03", language) + "*"}
                    name="phone"
                    required
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                />
                <textarea
                    className={textAreaClass}
                    placeholder={codeText("frm04", language) + "*"}
                    name="message"
                    required
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                />
                <button
                    className={`${baseClass} col-start-1 sm:col-start-2 col-span-1 sm:col-span-5 hover:text-white hover:bg-black!`}
                    type="submit"
                    onClick={async () => {
                        if (!name.length) return alert(await codeTextAlt("rqr00", language));
                        if (!email.length) return alert(await codeTextAlt("rqr01", language));
                        if (!phone.length) return alert(await codeTextAlt("rqr02", language));
                        if (!message.length) return alert(await codeTextAlt("rqr03", language));
                        await contact({
                            token: BACKEND_TOKEN,
                            name,
                            company,
                            email,
                            phone,
                            message
                        });
                        alert(await codeTextAlt("snd00", language));
                    }}
                >{codeText("frm05", language)}</button>
                <input type="hidden" name="_captcha" value="false"/>
            </form>
            <div className="h-10 sm:h-0"/>
        </div>
    )
};