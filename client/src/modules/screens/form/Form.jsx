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

  const user = Cookies.get('user');
  const userData = JSON.parse(user);
  const email = userData ? userData.email : null;

  useEffect(() => {
    if (email) {
      const createForm = async (email) => {
        try {
          const response = await fetch('https://todovisa.onrender.com/api/show-form-eeuu', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
          });

          if (!response.ok) {
            throw new Error('El usuario no tiene un formulario creado');
          }

          const responseData = await response.json();
          setQuestions(responseData.user.questions);
          console.log('Respuesta del servidor:', responseData.user.questions);
        } catch (error) {
          console.error('Error en la solicitud:', error);
          // navigateTo('/');
        }
      };

      createForm(email);
    } else {
      console.error('No se pudo obtener el email del usuario desde sessionStorage.');
    }
  }, [email]);

  const handlePopUp = () => {
    const html = '<h1 class="text-Black font-semibold text-3xl pt-4 pb-5">Términos y condiciones</h1><div class="text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis est sed hic aliquam, esse assumenda molestiae mayores laudantium consequuntur itaque tempora? Corrupti ea odit consequuntur et commodi rerum dolor odio magnam tempora fugiat ducimus tempore temporibus pariatur repudiandae, vitae esse unde. Illo quisquam, ut cum facere deserunt accusantium voluptatibus minus inventore, corrupti repellat sed quas ad maxime! Numquam, vitae assumenda.Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis est sed hic aliquam, esse assumenda molestiae maiores laudantium consequuntur itaque tempora? Corrupti ea odit consequuntur et commodi rerum dolor odio magnam tempora fugiat ducimus tempore temporibus pariatur repudiandae, vitae esse unde. Illo quisquam, ut cum facere deserunt accusantium voluptatibus minus inventore, corrupti repellat sed quas ad maxime! Numquam, vitae assumenda.</div><p class="pt-4 font-bold w-full text-left">(Texto opcional)</p>';
    const btn = "¡Entendido!";
    handleClickPopUp(html, btn);
  };

  const questionList = (form) => {
    let count = 1;
    return questions.map((question, index) => (
      <>
        <div className="text-lg font-semibold ">{`${count++}. ${question.question}`}</div>
        <Form.Item
          key={index}
          name={question.question}
          rules={[
            {
              required: question.user_response == "" ? true : false,
              message: viproInfo.obligatory_field,
            },
          ]}
          className="w-full font-bold py-2"
          hasFeedback
          validateTrigger="onFinish"
        >
          {question.type_question === "abierta" && <Input style={{ color: 'black' }} size="large" placeholder={question.user_response} value={question.user_response} />}
          {question.type_question === "number" && <Input type="number" size="large" placeholder={question.user_response} value={question.user_response} />}
          {question.type_question === "textarea" && <TextArea allowClear size="large" placeholder={question.user_response} value={question.user_response} />}
          {question.type_question === "cerrada" && (
            <Select placeholder={question.user_response == "" ? viproInfo.select_option
             : question.user_response} allowClear size="large" value={question.user_response}>
              {question.response.map((option, idx) => (
                <Option key={idx} value={option}>
                  {option}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>
      </>
    ));
  };

  const onFinish = async () => {
    if (!termsAccepted) {
      setTermsMessage(viproInfo.warning);
      return;
    }

    try {
      if (user) {
        const response = await fetch('https://todovisa.onrender.com/api/update-form-eeuu', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, questions }),
        });

        if (!response.ok) {
          throw new Error('Error al actualizar el formulario');
        }

        const responseData = await response.json();
        console.log('Formulario actualizado:', responseData);
        const fetchData = async () => {
          try {
            const response = await fetch(
              "https://todovisa.onrender.com/api/vipro-finish",
              {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
              }
            );
            if (response.ok) {
              console.log(response);
              navigateTo('/')
            } else {
              console.log(response);
            }
          } catch (err) {
            console.error(err);
          }
        };

        fetchData();
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
      handleClickPopUpSaveForm(html, email, questions)
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
      console.log(email)
      console.log(questions);
    }
  };

  const location = useLocation();
  const pathSegments = location.pathname.split("/");
  const country = pathSegments[pathSegments.length - 1];
  const viproInfo = lang[0].form
  return (
    <Form
      {...layout}
      form={form}
      name="control-hooks"
      onFinish={onFinish}
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
      <p className="py-6">
        {viproInfo.description}
      </p>
      {questionList(form)}

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
  );
};

export default VIPROForm;
