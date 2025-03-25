import { Project } from "../scripts/Project";

export const projects = [
    ["spanish:Portafolio;english:Portfolio", "https://github.com/LUCHER4321/Portafolio", "https://lucher4321.github.io/Portafolio/", "/Portafolio/icon.png", "TypeScript", "Tailwind CSS", "Vite", "React", "CSS", "HTML"],
    ["spanish:Librería chrono-phylo-tree;english:chrono-phylo-tree Library", "https://github.com/LUCHER4321/chrono-phylo-tree", "https://phylotree.netlify.app/", "https://phylotree.netlify.app/logo.png", "NPM", "TypeScript", "Tailwind CSS", "Vite", "React", "CSS", "HTML"],
    ["spanish:Predicción de Finanzas;english:Finance Prediction", "https://github.com/LUCHER4321/predict-finance", undefined, undefined, "HTML", "R"],
    ["lan:Noble Corral", "https://github.com/LUCHER4321/Noble-Corral", undefined, undefined, "HTML", "Power BI", "R"],
    ["spanish:Carrusel de Imágenes;english:Image Carousel", "https://github.com/LUCHER4321/Carrusel-Imagenes", "https://lucher4321.github.io/Carrusel-Imagenes/", undefined, "TypeScript", "JavaScript", "CSS", "HTML"],
    ["spanish:Valoraciones Steam;english:Steam Ratings", "https://github.com/LUCHER4321/Valoraciones-Steam", undefined, undefined, "R"],
    ["spanish:Conversor de Unidades;english:Unit Converter", "https://github.com/LUCHER4321/Conversor-Unidades", "https://lucher4321.github.io/Conversor-Unidades", undefined, "TypeScript", "JavaScript", "CSS", "HTML"],
    ["spanish:Edificios Ecotect;english:Ecotect Buildings", "https://github.com/LUCHER4321/Edificios-Ecotect", undefined, undefined, "R"],
    ["spanish:Reloj en Tiempo Real;english:Real Time Clock", "https://github.com/LUCHER4321/Reloj", "https://lucher4321.github.io/Reloj", undefined, "TypeScript", "JavaScript", "CSS", "HTML"],
    ["spanish:Pacientes ACV;english:CVA Patients", "https://github.com/LUCHER4321/Pacientes-ACV", undefined, undefined, "R"],
    ["lan:Power BI Netflix", "https://github.com/LUCHER4321/Power-BI-Netflix", "https://aka.ms/AAuyv0k", "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/New_Power_BI_Logo.svg/1200px-New_Power_BI_Logo.svg.png", "Power BI"],
    ["spanish:Librería multiple-sorting-array;english:multiple-sorting-array Library", "https://github.com/LUCHER4321/multiple-sorting-array", "https://www.npmjs.com/package/multiple-sorting-array", "https://static-production.npmjs.com/58a19602036db1daee0d7863c94673a4.png", "NPM", "TypeScript"],
    ["spanish:Problema de las N Reinas;english:N Queens Problem", "https://github.com/LUCHER4321/n-queens", "https://lucher4321.github.io/n-queens/", "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Chess_tile_ql.svg/1200px-Chess_tile_ql.svg.png", "TypeScript", "JavaScript", "Tailwind CSS", "Vite", "React", "CSS", "HTML"],
    ["spanish:Lista de Tareas;english:To Do List", "https://github.com/LUCHER4321/Lista-Tareas", "https://lucher4321.github.io/Lista-Tareas", undefined, "TypeScript", "JavaScript", "CSS", "HTML"],
    ["spanish:Accidentes Cerebrovasculares;english:Cerebrovascular Accidents", "https://github.com/LUCHER4321/ACV", undefined, undefined, "R"],
    ["spanish:Calculadora de Propinas;english:Tip Calculator", "https://github.com/LUCHER4321/Calculadora-Propinas", "https://lucher4321.github.io/Calculadora-Propinas", undefined, "TypeScript", "JavaScript", "CSS", "HTML"],
    ["spanish:Librería change-base;english:change-base Library", "https://github.com/LUCHER4321/change-base", "https://www.npmjs.com/package/@lucher/change-base", "https://static-production.npmjs.com/58a19602036db1daee0d7863c94673a4.png", "NPM", "TypeScript"],
    ["spanish:Informe Mundial sobre la Felicidad;english:World Happiness Report", "https://github.com/LUCHER4321/Informe-Felicidad", undefined, undefined, "R"],
    ["spanish:Postulación a RECEMED;english:Application to RECEMED", "https://github.com/LUCHER4321/RECEMED", undefined, undefined, "JavaScript", "Tailwind CSS", "Vite", "React", "CSS", "HTML"],
].map(l => new Project(l[0] ?? "", l[1] ?? "", l.length > 2 ? l[2] : undefined, l.length > 3 ? l[3] : undefined, ...(l.length > 4 ? l.slice(4).map(s => s ?? "") : [])));