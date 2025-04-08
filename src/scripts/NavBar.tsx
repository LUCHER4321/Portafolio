import { useState } from "react";
import { categories } from "../data/categories";
import { codeText, getLanguageOptions } from "./translate";
import { languages } from "../data/languages";

interface NavBarProps {
    language: string;
    setLanguage: (language: string) => void;
}

export const NavBar = ({language, setLanguage}: NavBarProps) => {
    const [projects, setProjects] = useState(false);
    const [categoriesVisible, setCategoriesVisible] = useState(false);
    const [languagesVisible, setLanguagesVisible] = useState(false);
    const trLanguages = getLanguageOptions();

    const switchProjects = () => {
        setCategoriesVisible(false);
        setLanguagesVisible(false);
        setProjects(!projects);
    }
    return (
        <>
            {projects && <button className="flex opacity-0 fixed top-0 bottom-0 right-0 left-0" onClick={switchProjects}/>}
            <div className="flex fixed justify-between mb-4 w-full px-10 bg-[#6E17A2]/50 sm:bg-[#27273E]/50 top-0 right-0 h-15">
                <div className="flex flex-row">
                    <a href="/Portafolio/" className="h-full flex items-center justify-center mr-4">
                        <img style={{height: 25}} src="https://cdn-icons-png.flaticon.com/512/25/25694.png" alt="Home"/>
                    </a>
                    <div className={"flex flex-col" + ( projects ? " bg-[#7616AD]/75" : "")}>
                        <button className="bg-white/0! mt-1.5 text-start" onClick={switchProjects}>
                            {codeText("stt02", language)}
                        </button>
                        <table className={`${projects ? "block" : "hidden"} bg-[#7616AD]/75`}>
                            <tbody>
                            <tr className=" align-top">
                                <td>
                                    <button className="flex flex-row bg-white/0! text-start justify-between w-full" onClick={() => setCategoriesVisible(!categoriesVisible)}>
                                        <div>{codeText("stt03", language)}</div>
                                        <div className="ml-2">{">"}</div>
                                    </button>
                                </td>
                                <td className={`${categoriesVisible ? "block" : "hidden"} flex flex-col`}>
                                    {categories.map((category, index) => (
                                        <a href={`/Portafolio/Category?cat=${category.id}`} key={index} className="text-black! dark:text-white! py-2.5">
                                            {category.name.get(language)}
                                        </a>
                                    ))}
                                </td>
                            </tr>
                            <tr className="align-top">
                                <td>
                                    <button className="flex flex-row bg-white/0! text-start justify-between" onClick={() => setLanguagesVisible(!languagesVisible)}>
                                        <div>{codeText("stt01", language)}</div>
                                        <div className="ml-2">{">"}</div>
                                    </button>
                                </td>
                                <td className={`${languagesVisible ? "block" : "hidden"} flex flex-col`}>
                                    {languages.map((language, index) => (
                                        <a href={`/Portafolio/Language?lan=${language.name}`} key={index} className="text-black! dark:text-white! py-1.5">
                                            {language.name}
                                        </a>
                                    ))}
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="rounded"
                >
                    {Array.from(trLanguages).map(([key, value], index) => (
                        <option value={key} key={index} className="bg-[#27273E]">
                            {value}
                        </option>
                    ))}
                </select>
            </div>
            <div className="h-10"/>
        </>
    );
};