import { PersonalLink } from "../scripts/PersonalLink";

export const links = [
    ["LinkedIn", "https://www.linkedin.com/in/luciano-hern%C3%A1ndez-76b8b9257/", "https://logo.clearbit.com/linkedin.com"],
    ["GitHub", "https://github.com/LUCHER4321", "https://logo.clearbit.com/github.com"],
    ["Curriculum", "https://drive.google.com/file/d/1Y1aUuTzrS1YxRh1zetu38unMMlBcjnJz/view?usp=sharing", "https://www.svgrepo.com/show/28209/pdf.svg"],
    ["Resume", "https://drive.google.com/file/d/1AWzMUdG7-dOwoMyu5dfKeI3KtCGc90zV/view?usp=sharing", "https://www.svgrepo.com/show/28209/pdf.svg"],
    ["Certificados", "https://drive.google.com/drive/folders/17vUsvy5fZZEV04eHkKM0vIwOROTxGUQV?usp=drive_link", "https://upload.wikimedia.org/wikipedia/commons/thumb/archive/8/8a/20191115145934%21Google_Drive_logo_%282014-2020%29.svg/120px-Google_Drive_logo_%282014-2020%29.svg.png"]
].map(l => new PersonalLink(l[0], l[1], l.length > 2 ? l[2] : undefined));