import { Project } from "../scripts/Project";

export const projects = [
    ["Portafolio", "https://github.com/LUCHER4321/Portafolio", "https://lucher4321.github.io/Portafolio/", "https://lucher4321.github.io/Portafolio/icon.png", "TypeScript", "CSS", "HTML"],
    ["Librería chrono-phylo-tree", "https://github.com/LUCHER4321/chrono-phylo-tree", "https://phylotree.netlify.app/", "https://phylotree.netlify.app/logo.png", "TypeScript", "CSS", "HTML"],
    ["Carrusel de Imágenes", "https://github.com/LUCHER4321/Carrusel-Imagenes", "https://lucher4321.github.io/Carrusel-Imagenes/", undefined, "TypeScript", "JavaScript", "CSS", "HTML"],
    ["Conversor de Unidades", "https://github.com/LUCHER4321/Conversor-Unidades", "https://lucher4321.github.io/Conversor-Unidades", undefined, "TypeScript", "JavaScript", "CSS", "HTML"],
    ["Reloj en Tiempo Real", "https://github.com/LUCHER4321/Reloj", "https://lucher4321.github.io/Reloj", undefined, "TypeScript", "JavaScript", "CSS", "HTML"],
    ["Lista de Tareas", "https://github.com/LUCHER4321/Lista-Tareas", "https://lucher4321.github.io/Lista-Tareas", undefined, "TypeScript", "JavaScript", "CSS", "HTML"],
    ["Calculadora de Propinas", "https://github.com/LUCHER4321/Calculadora-Propinas", "https://lucher4321.github.io/Calculadora-Propinas", undefined, "TypeScript", "JavaScript", "CSS", "HTML"],
    ["Postulación a RECEMED", "https://github.com/LUCHER4321/RECEMED", undefined, undefined, "JavaScript", "CSS", "HTML"],
    ["Power BI Netflix", "https://github.com/LUCHER4321/Power-BI-Netflix", "https://aka.ms/AAuyv0k", "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/New_Power_BI_Logo.svg/1200px-New_Power_BI_Logo.svg.png", "Power BI"],
    ["Noble Corral", "https://github.com/LUCHER4321/Noble-Corral", undefined, undefined, "Power BI", "R"],
    ["Valoraciones Steam", "https://github.com/LUCHER4321/Valoraciones-Steam", undefined, undefined, "R"],
    ["Edificios Ecotect", "https://github.com/LUCHER4321/Edificios-Ecotect", undefined, undefined, "R"],
    ["Pacientes ACV", "https://github.com/LUCHER4321/Pacientes-ACV", undefined, undefined, "R"],
    ["Accidentes Cerebro Vasculares", "https://github.com/LUCHER4321/ACV", undefined, undefined, "R"],
    ["Informe Mundial sobre la Felicidad", "https://github.com/LUCHER4321/Informe-Felicidad", undefined, undefined, "R"],
].map(l => new Project(l[0] ?? "", l[1] ?? "", l.length > 2 ? l[2] : undefined, l.length > 3 ? l[3] : undefined, ...(l.length > 4 ? l.slice(4).map(s => s ?? "") : [])));