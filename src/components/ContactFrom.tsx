import { EMAIL_CODE } from "../config";
import { codeText } from "../functions/translate";

export const ContactForm = ({language}: {language: string}) => {
    const baseClass = "text-black bg-white! rounded p-2";
    const inputClass = `${baseClass} col-span-1 col-start-1! sm:col-span-3`;
    const textAreaClass = `${baseClass} row-span-4 sm:row-start-1 sm:col-start-4! col-span-1 sm:col-span-4`;
    return (
        <div className="w-full flex flex-col items-center">
            <h2 className="text-white">{codeText("stt05", language)}</h2>
            <form className="grid grid-cols-1 grid-flow-row sm:grid-rows-5 sm:grid-cols-7 sm:w-11/24 mt-4 gap-4" action={`https://formsubmit.co/${EMAIL_CODE}`} method="POST">
                <input type="text" className={inputClass} placeholder={codeText("frm00", language) + "*"} name="name" required/>
                <input type="text" className={inputClass} placeholder={codeText("frm01", language)} name="company"/>
                <input type="email" className={inputClass} placeholder={codeText("frm02", language) + "*"} name="email" required/>
                <input type="tel" className={inputClass} placeholder={codeText("frm03", language) + "*"} name="phone" required/>
                <textarea className={textAreaClass} placeholder={codeText("frm04", language) + "*"} name="message" required/>
                <button className={`${baseClass} col-start-1 sm:col-start-2 col-span-1 sm:col-span-5 hover:text-white hover:bg-black!`} type="submit">{codeText("frm05", language)}</button>
                <input type="hidden" name="_next" value="https://lucher4321.github.io/Portafolio/"/>
                <input type="hidden" name="_captcha" value="false"/>
            </form>
            <div className="h-10 sm:h-0"/>
        </div>
    )
};