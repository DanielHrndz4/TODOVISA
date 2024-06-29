import questionsEnglish from "./questionsEnglish.data";
import questionsPortuguese from "./questionsPortuguese.data";
import questionsSpanish from "./questionsSpanish.data";

const localLanguageVIPRO = localStorage.getItem('lang') || "Spanish";

const langSelectionVIPRO = (lang) => {
    if (lang === 'Spanish' || lang === 'Español' || lang === 'Espanhol') {
        return questionsSpanish
    } else if (lang === 'English' || lang === 'English' || lang === 'Inglês') {
        return questionsEnglish
    } else {
        return questionsPortuguese
    }
}

const langVIPRO = langSelectionVIPRO(localLanguageVIPRO)

export default langVIPRO