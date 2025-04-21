import { Language } from "../classes/Language";

export const languages = [
    ["NPM", "https://static-production.npmjs.com/58a19602036db1daee0d7863c94673a4.png"],
    ["TypeScript", "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/2048px-Typescript_logo_2020.svg.png"],
    ["JavaScript", "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/640px-JavaScript-logo.png"],
    ["Tailwind CSS", "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/1024px-Tailwind_CSS_Logo.svg.png"],
    ["Vite", "/Portafolio/vite.svg"],
    ["React", "/Portafolio/react.svg"],
    ["CSS", "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/CSS3_logo_and_wordmark.svg/1452px-CSS3_logo_and_wordmark.svg.png"],
    ["HTML", "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/1024px-HTML5_logo_and_wordmark.svg.png"],
    ["Power BI", "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/New_Power_BI_Logo.svg/1200px-New_Power_BI_Logo.svg.png"],
    ["R", "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/R_logo.svg/724px-R_logo.svg.png"],
    ["Kotlin", "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Kotlin_Icon.png/1200px-Kotlin_Icon.png"],
    ["Android Studio", "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Android_Studio_icon_%282023%29.svg/2048px-Android_Studio_icon_%282023%29.svg.png"],
].map(l => new Language(l[0], l[1]));