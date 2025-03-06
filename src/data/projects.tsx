import { Project } from "../scripts/Project";

export const projects = [
    ["Portafolio", "https://github.com/LUCHER4321/Portafolio", "https://lucher4321.github.io/Portafolio/", "https://lucher4321.github.io/Portafolio/icon.png"],
    ["Librería chrono-phylo-tree", "https://github.com/LUCHER4321/chrono-phylo-tree", "https://phylotree.netlify.app/", "https://phylotree.netlify.app/logo.png"],
    ["Carrusel de Imágenes", "https://github.com/LUCHER4321/Carrusel-Imagenes", "https://lucher4321.github.io/Carrusel-Imagenes/"],
    ["Conversor de Unidades", "https://github.com/LUCHER4321/Conversor-Unidades", "https://lucher4321.github.io/Conversor-Unidades"],
    ["Reloj en Tiempo Real", "https://github.com/LUCHER4321/Reloj", "https://lucher4321.github.io/Reloj"],
    ["Lista de Tareas", "https://github.com/LUCHER4321/Lista-Tareas", "https://lucher4321.github.io/Lista-Tareas"],
    ["Calculadora de Propinas", "https://github.com/LUCHER4321/Calculadora-Propinas", "https://lucher4321.github.io/Calculadora-Propinas"],
    ["Postulación a RECEMED", "https://github.com/LUCHER4321/RECEMED"],
].map(l => new Project(l[0], l[1], l.length > 2 ? l[2] : undefined, l.length > 3 ? l[3] : undefined));