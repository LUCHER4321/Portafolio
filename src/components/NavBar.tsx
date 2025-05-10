import { useEffect, useState } from "react";
import { codeText, getLanguageOptions } from "../functions/translate";
import { links } from "../data/links";
import { ImageLink } from "./ImageLink";
import { Language } from "../classes/Language";
import { Category } from "../classes/Category";
import { getUser } from "../api/user";
import { getLanguages } from "../api/languages";
import { getCategories } from "../api/categories";

interface NavBarProps {
    language: string;
    setLanguage: (language: string) => void;
}

export const NavBar = ({language, setLanguage}: NavBarProps) => {
    const [projects, setProjects] = useState(false);
    const [categoriesVisible, setCategoriesVisible] = useState(false);
    const [languagesVisible, setLanguagesVisible] = useState(false);
      const [remoteLan, setRemoteLan] = useState<Language[]>([]);
      const [remoteCat, setRemoteCat] = useState<Category[]>([]);
      useEffect(() => {
        getUser().then(
          u => {
            getLanguages({ user: u.id }).then(
              L => setRemoteLan(
                L.map(
                  l => new Language(l)
                )
              )
            );
            getCategories({ user: u.id }).then(
              C => setRemoteCat(
                C.map(
                  c => new Category(c)
                )
              )
            );
          }
        );
      }, []);
    const trLanguages = getLanguageOptions();

    const switchProjects = () => {
        setCategoriesVisible(false);
        setLanguagesVisible(false);
        setProjects(!projects);
    }
    return (
        <>
            {projects && <button className="flex opacity-0 fixed top-0 bottom-0 right-0 left-0" onClick={switchProjects}/>}
            <div className="flex fixed justify-between mb-4 px-10 bg-[#27273E]/50 top-0 right-0 left-0 h-15">
                <div className="flex flex-row">
                    <ImageLink
                        link="/Portafolio/"
                        image="https://cdn-icons-png.flaticon.com/512/25/25694.png"
                        height={25}
                        hoverHeight={32}
                        className="mr-2 image-link-container"
                        blank={false}
                    />
                    <div className="hidden sm:flex">
                        {links.filter(l => ["LinkedIn", "GitHub"].includes([...l.name.values()][0])).map((link, index) => (
                            <ImageLink
                                key={index}
                                link={link.link}
                                image={link.logo}
                                height={25}
                                hoverHeight={32}
                                className="mx-2 image-link-container"
                                alt={link.name.get(language)}
                            />
                        ))}
                    </div>
                    <div className={"flex flex-col rounded" + ( projects ? " bg-[#7616AD]/75" : "")}>
                        <button className="bg-white/0! mt-1.5 text-start" onClick={switchProjects}>
                            {codeText("stt02", language)}
                        </button>
                        <table className={`${projects ? "block" : "hidden"} bg-[#7616AD]/75 rounded`}>
                            <tbody>
                            <tr className=" align-top">
                                <td>
                                    <button className="flex flex-row bg-white/0! text-start justify-between w-full" onClick={() => setCategoriesVisible(!categoriesVisible)}>
                                        <div>{codeText("stt03", language)}</div>
                                        <div className="ml-2">{">"}</div>
                                    </button>
                                </td>
                                <td className={`${categoriesVisible ? "block" : "hidden"} flex flex-col`}>
                                    {remoteCat.map((category, index) => (
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
                                    {remoteLan.map((language, index) => (
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
            <div className="fixed flex sm:hidden bottom-0 right-0 left-0 justify-start mt-4 px-10 bg-[#27273E]/50 h-15">
                {links.filter(l => ["LinkedIn", "GitHub"].includes([...l.name.values()][0])).map((link, index) => (
                    <ImageLink
                        key={index}
                        link={link.link}
                        image={link.logo}
                        height={25}
                        hoverHeight={32}
                        className="mx-2 image-link-container"
                        alt={link.name.get(language)}
                    />
                ))}
            </div>
            <div className="h-10"/>
        </>
    );
};