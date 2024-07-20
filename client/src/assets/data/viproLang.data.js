import questionsEnglish from "./questionsEnglish.data";
import questionsPortuguese from "./questionsPortuguese.data";
import questionsSpanish from "./questionsSpanish.data";

const localLanguageVIPRO = localStorage.getItem('lang');

const langSelectionVIPRO = (lang) => {
    if (lang === 'Spanish' || lang === 'Español' || lang === 'Espanhol') {
        return questionsSpanish;
    } else if (lang === 'Inglés' || lang === 'English' || lang === 'Inglês') {
        return questionsEnglish;
    } else if (lang === 'Portugués' || lang === 'Portuguese' || lang === 'Português') {
        return questionsPortuguese;
    } else {
        return questionsSpanish; // Otra opción predeterminada
    }
};

const langVIPRO = langSelectionVIPRO(localLanguageVIPRO);

export default langVIPRO;
