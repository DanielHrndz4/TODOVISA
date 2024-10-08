import React, { useState, useEffect } from "react";
import { Button, Form, Input, Select, Space, Checkbox } from "antd";
import handleClickPopUp from "../../components/popup/PopUp";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Typography } from "@material-tailwind/react";
import Cookies from 'js-cookie'
import handleClickPopUpSaveForm from "../../components/popup/PopUpSaveForm";
import lang from "../../../assets/data/lang.data";
import { Fade } from "react-awesome-reveal";
import URI from "../../../assets/data/admin/uri.api";

const { Option } = Select;
const { TextArea } = Input;
const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

const VIPROForm = () => {
  const [questions, setQuestions] = useState([]);
  const [termsMessage, setTermsMessage] = useState("");
  const [form] = Form.useForm();
  const navigateTo = useNavigate();
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = Cookies.get('user');
  const userData = JSON.parse(user);
  const email = userData ? userData.email : null;
  const location = useLocation();
  const pathSegments = location.pathname.split("/");
  const country = pathSegments[pathSegments.length - 1];
  const viproInfo = lang[0].form
  useEffect(() => {
    if (email) {
      const createForm = async (email) => {
        try {
          const response = await fetch(`${URI}/show-form-eeuu`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, country }),
          });

          if (!response.ok) {
            throw new Error('El usuario no tiene un formulario creado');
          }

          const responseData = await response.json();
          setQuestions(responseData.user.questions);
          setLoading(true)
        } catch (error) {
          console.error('Error en la solicitud:', error);
          navigateTo('/');
        }
      };

      createForm(email);
    } else {
      console.error('No se pudo obtener el email del usuario desde sessionStorage.');
    }
  }, [email]);

  const onFinish = async () => {
    
    if (!termsAccepted) {
      setTermsMessage(viproInfo.warning);
      return;
    }
    const isFinish = true
    try {
      if (user) {
        const response = await fetch(`${URI}/update-form-eeuu`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, questions, country, isFinish }),
        });

        if (!response.ok) {
          throw new Error('Error al actualizar el formulario');
        }

        const responseData = await response.json();
        
        if(response.ok){
          navigateTo('/qualifications')
        }
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  const onFinishFailed = async (email, questions) => {
    if (!termsAccepted) {
      setTermsMessage(viproInfo.warning);
      return;
    } else {
      const html = `<div>${viproInfo.alert_save}</div>`
      handleClickPopUpSaveForm(html, email, questions, country)
    }
  };

  const handleClickTermsAndCondition = () => {
    const html = `<h1 class='pt-4 pb-6 font-semibold text-2xl'>${viproInfo.terms}</h1><div class='text-justify'>${viproInfo.terms_and_conditions}</div>`
    const btn = viproInfo.button;
    handleClickPopUp(html, btn)
  }

  const onReset = () => {
    form.resetFields();
  };

  const handleValuesChange = (changedValues, allValues) => {
    const changedQuestionIndex = questions.findIndex(q => q.question in changedValues);

    if (changedQuestionIndex !== -1) {
      const updatedQuestions = [...questions];
      updatedQuestions[changedQuestionIndex].user_response = changedValues[questions[changedQuestionIndex].question];
      setQuestions(updatedQuestions);
    }
  };

  const localLanguage = localStorage.getItem('lang') || "Spanish";

const langSelection = (language) => {
    if (language === 'Spanish' || language === 'Español' || language === 'Espanhol') {
        return 'spanish';
    } else if (language === 'English' || language === 'Inglês') {
        return 'english';
    } else {
        return 'portuguese';
    }
}

const language = langSelection(localLanguage);

const categories = {
    spanish: {
        personalData: 'DATOS PERSONALES',
        familyAndFinancialTies: 'ARRAIGOS FAMILIARES Y FINANCIEROS',
        travelHistory: 'HISTORIAL DE VIAJES',
        criminalHistory: 'HISTORIAL DELICTIVO'
    },
    english: {
      personalData: 'PERSONAL DATA',
      familyAndFinancialTies: 'FAMILY AND FINANCIAL TIES',
      travelHistory: 'TRAVEL HISTORY',
      criminalHistory: 'CRIMINAL HISTORY'
  },
  portuguese: {
      personalData: 'DADOS PESSOAIS',
      familyAndFinancialTies: 'VÍNCULOS FAMILIARES E FINANCEIROS',
      travelHistory: 'HISTÓRICO DE VIAGENS',
      criminalHistory: 'HISTÓRICO CRIMINAL'
  }
};

const selectedCategories = categories[language];

const categorizedQuestions = {
    [selectedCategories.personalData]: questions.filter(q => q.category === 'DATOS PERSONALES'),
    [selectedCategories.familyAndFinancialTies]: questions.filter(q => q.category === 'ARRAIGOS FAMILIARES Y FINANCIEROS'),
    [selectedCategories.travelHistory]: questions.filter(q => q.category === 'HISTORIAL DE VIAJES'),
    [selectedCategories.criminalHistory]: questions.filter(q => q.category === 'HISTORIAL DELICTIVO')
};

  return (
    <>{loading && (
      <Fade>
        <main className="w-full h-full bg-TVBlue" >
          <div className="w-full lg:w-[70%] m-auto py-8">
            <Form
              {...layout}
              form={form}
              name="control-hooks"
              onFinish={()=>onFinish()}
              onFinishFailed={() => onFinishFailed(email, questions)}
              onValuesChange={handleValuesChange}
              className="w-full py-6 lg:py-10 px-6 lg:px-24 bg-white rounded-lg shadow"
            >
              <Link to="/">
                <Typography color="black" className="mb-4 font-normal w-full mx-1 text-black text-lg cursor-pointer [text-shadow:_4px_2px_2px_rgb(0_0_0_/_0.4)]">
                  <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />{viproInfo.return}
                </Typography>
              </Link>
              <h1 className="text-center text-4xl lg:pt-4 pt-3 lg:text-5xl text-black pb-4 font-bold flex flex-col">
                {viproInfo.title}<span className="capitalize font-semibold pt-2 lg:pt-0">{country === "estadosunidos" ? "Estados Unidos" : country}</span>
              </h1>
              <p className="py-6 text-justify">
                {viproInfo.description}
              </p>
              {Object.keys(categorizedQuestions).map((category, idx) => (
              <div key={idx}>
                <Typography color="black" className="mb-6 font-semibold text-xl ms:text-2xl lg:text-2xl xl:text-3xl pt-4 text-center">
                  {category}
                </Typography>
                {categorizedQuestions[category].map((question, qIdx) => (
                  <div key={qIdx} className="my-4">
                    <div className="text-lg font-semibold">{`${qIdx + 1}. ${question.question}`}</div>
                    <Form.Item
                      name={question.question}
                      rules={[
                        {
                          required: question.user_response === "",
                          message: viproInfo.obligatory_field,
                        },
                      ]}
                      className="w-full font-bold py-2"
                      hasFeedback
                      validateTrigger="onFinish"
                    >
                      {question.type_question === "abierta" && (
                        <Input style={{ color: 'black' }} size="large" placeholder={question.user_response} value={question.user_response} />
                      )}
                      {question.type_question === "number" && (
                        <Input type="number" size="large" placeholder={question.user_response} value={question.user_response} />
                      )}
                      {question.type_question === "textarea" && (
                        <TextArea allowClear size="large" placeholder={question.user_response} value={question.user_response} />
                      )}
                      {question.type_question === "cerrada" && (
                        <Select
                          placeholder={question.user_response === "" ? viproInfo.select_option : question.user_response}
                          allowClear
                          size="large"
                          value={question.user_response}
                        >
                          {question.response.map((option, optIdx) => (
                            <Option key={optIdx} value={option}>
                              {option}
                            </Option>
                          ))}
                        </Select>
                      )}
                    </Form.Item>
                  </div>
                ))}
              </div>
            ))}

              <div className="pb-6 pt-2">
                <div className="pb-2 font-semibold">
                  <Checkbox checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} color="red" />
                  <span className="pl-2">{viproInfo.acept}</span>
                  <span className="hover:text-TVBlue hover:cursor-pointer text-TVred underline" onClick={handleClickTermsAndCondition}>{viproInfo.terms}</span>
                </div>
                <div className="font-semibold text-TVred">
                  {!termsAccepted && termsMessage}
                </div>
              </div>

              <Form.Item className="lg:min-w-[60%] lg:w-[60%] min-w-full w-full mx-auto">
                <div className="flex flex-row justify-around">
                  <Button htmlType="submit" className="w-[45%] py-5 bg-TVred shadow border-0 text-white font-semibold">
                    {viproInfo.send_form}
                  </Button>
                  <Button htmlType="button" onClick={onReset} className="w-[45%] py-5 bg-TVBlue shadow border-0 text-white font-semibold">
                    {viproInfo.reload_form}
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </div>
        </main>
      </Fade>
    )}</>
  );
};

export default VIPROForm;
