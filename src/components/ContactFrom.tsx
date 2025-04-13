import { codeText } from "../functions/translate";

export const ContactForm = ({language}: {language: string}) => {
    const baseClass = "text-black bg-white! rounded p-2";
    const inputClass = `${baseClass} col-span-1 sm:col-span-3`;
    const textAreaClass = `${baseClass} row-span-4 col-span-1 sm:col-span-4`;
    return (
        <div className="w-full flex flex-col items-center">
            <h2>{codeText("stt05", language)}</h2>
            <form className="grid grid-cols-1 sm:grid-cols-7 sm:w-1/2 mt-4 gap-4" action="https://formsubmit.co/c5c08f2d10745c1c410bc5abab4dd957" method="POST">
                <input type="text" className={inputClass} placeholder={codeText("frm00", language) + "*"} name="name" required/>
                <textarea className={textAreaClass + " hidden sm:flex"} placeholder={codeText("frm04", language) + "*"} name="message"/>
                <input type="text" className={inputClass} placeholder={codeText("frm01", language)} name="company"/>
                <input type="email" className={inputClass} placeholder={codeText("frm02", language) + "*"} name="email" required/>
                <input type="tel" className={inputClass} placeholder={codeText("frm03", language) + "*"} name="phone" required/>
                <textarea className={inputClass + " flex sm:hidden"} placeholder={codeText("frm04", language) + "*"} name="message"/>
                <button className={`${baseClass} col-start-1 sm:col-start-2 col-span-1 sm:col-span-5 hover:text-white hover:bg-black!`} type="submit">Enviar</button>
                <input type="hidden" name="_next" value="https://lucher4321.github.io/Portafolio/"/>
                <input type="hidden" name="_captcha" value="false"/>
            </form>
            <div className="h-10 sm:h-0"/>
        </div>
    )
};