import { PersonalLink } from "../classes/PersonalLink";

export const links = [
    ["lan:LinkedIn", "https://www.linkedin.com/in/luciano-hern%C3%A1ndez-76b8b9257/", "https://img.logo.dev/linkedin.com?token=pk_VXzZR_o_QTelazRSvSRkNw&format=png&retina=true"],
    ["lan:GitHub", "https://github.com/LUCHER4321", "https://img.logo.dev/github.com?token=pk_VXzZR_o_QTelazRSvSRkNw&format=png"],
    ["spanish:Correo;english:Mail", "mailto:lhernandezr@udd.cl", "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Microsoft_Outlook_logo_%282024%E2%80%932025%29.svg/1200px-Microsoft_Outlook_logo_%282024%E2%80%932025%29.svg.png"],
    ["spanish:Curriculum en Español;english:Resume in Spanish", "https://drive.google.com/file/d/1Y1aUuTzrS1YxRh1zetu38unMMlBcjnJz/view?usp=sharing", "https://img.logo.dev/pdfsimpli.com?token=pk_VXzZR_o_QTelazRSvSRkNw&format=png&retina=true"],
    ["spanish:Curriculum en Inglés;english:Resume in English", "https://drive.google.com/file/d/1AWzMUdG7-dOwoMyu5dfKeI3KtCGc90zV/view?usp=sharing", "https://img.logo.dev/pdfsimpli.com?token=pk_VXzZR_o_QTelazRSvSRkNw&format=png&retina=true"],
    ["spanish:Certificados;english:Certificates", "https://drive.google.com/drive/folders/17vUsvy5fZZEV04eHkKM0vIwOROTxGUQV?usp=drive_link", "https://upload.wikimedia.org/wikipedia/commons/thumb/archive/8/8a/20191115145934%21Google_Drive_logo_%282014-2020%29.svg/120px-Google_Drive_logo_%282014-2020%29.svg.png"]
].map(l => new PersonalLink(l[0], l[1], l.length > 2 ? l[2] : undefined));