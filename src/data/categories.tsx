import { Category } from "../classes/Category";

export const categories = [
    [
        "wb00",
        "spanish:Desarrollo Web;english:Web Development",
        "https://cdn-icons-png.flaticon.com/512/11096/11096817.png",
    ],
    [
        "lb00",
        "spanish:Creación de Librerías;english:Library Creation",
        "https://static-production.npmjs.com/58a19602036db1daee0d7863c94673a4.png",
    ],
    [
        "dt00",
        "spanish:Análisis de Datos;english:Data Analysis",
        "https://cdn-icons-png.flaticon.com/512/8921/8921081.png",
    ],
    [
        "dt01",
        "spanish:Visualización de Datos;english:Data Visualization",
        "https://cdn-icons-png.flaticon.com/512/6332/6332308.png",
    ],
].map(l => new Category(l[0], l[1], l[2]));