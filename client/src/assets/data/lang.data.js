import english from "./lang/english.lang";
import portuguese from "./lang/portuguese.lang";
import spanish from "./lang/spanish.lang";

const localLanguage = localStorage.getItem('lang') || "Spanish";

const langSelection = (lang) => {
    if (lang === 'Spanish' || lang === 'Español' || lang === 'Espanhol') {
        return spanish
    } else if (lang === 'English' || lang === 'English' || lang === 'Inglês') {
        return english
    } else {
        return portuguese
    }
}

const lang = langSelection(localLanguage)

export default lang