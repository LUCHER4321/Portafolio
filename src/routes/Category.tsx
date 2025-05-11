import { useEffect, useState } from "react"
import { NavBar } from "../components/NavBar";
import { ProjectsPage } from "../components/Projects";
import { ContactForm } from "../components/ContactFrom";
import { getCategory } from "../api/categories";
import { useParams } from "react-router-dom";

export const CategoryPage = () => {
    const [language, setLanguage] = useState("spanish");
    const [titleParam, setTitleParam] = useState("");
    const { cat } = useParams();
    useEffect(() => {
        if(!cat) return;
        getCategory(cat).then(
            c => setTitleParam(
                c.name.find(
                    n => n.translation === language
                )?.name ?? ""
            )
        );
    }, []);
    return (
        <>
            <NavBar language={language} setLanguage={setLanguage}/>
            <ProjectsPage
                titleCode="ttl02"
                titleParam={titleParam}
                language={language}
            />
            <ContactForm language={language}/>
        </>
    )
}