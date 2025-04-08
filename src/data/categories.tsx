import { Category } from "../scripts/Category";

export const categories = [
    ["wb00", "spanish:Desarrollo Web;english:Web Development"],
    ["lb00", "spanish:Creación de Librerías;english:Library Creation"],
    ["dt00", "spanish:Análisis de Datos;english:Data Analysis"],
    ["dt01", "spanish:Visualización de Datos;english:Data Visualization"],
].map(l => new Category(l[0], l[1]));