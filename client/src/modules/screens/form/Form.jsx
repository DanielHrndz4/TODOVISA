import React, { useState, useEffect } from "react";
import { Button, Form, Input, Select, Space, Checkbox } from "antd";
import handleClickPopUp from "../../components/popup/PopUp";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Typography } from "@material-tailwind/react";

const { Option } = Select;
const { TextArea } = Input;
const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

const VIPROForm = () => {
  const [questions, setQuestions] = useState([]);
  const [form] = Form.useForm();
  const navigateTo = useNavigate();

  const userFromStorage = JSON.parse(sessionStorage.getItem('user'));
  const email = userFromStorage ? userFromStorage.email : null;

  useEffect(() => {
    if (email) {
      const createForm = async (email) => {
        try {
          const response = await fetch('http://localhost:3366/api/show-form-eeuu', {
            method: 'POST',
            credentials: 'include',
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
          navigateTo('/');
        }
      };

      createForm(email);
    } else {
      console.error('No se pudo obtener el email del usuario desde sessionStorage.');
    }
  }, [email]);

  const handlePopUp = () => {
    const html = '<h1 class="text-Black font-semibold text-3xl pt-4 pb-5">Términos y condiciones</h1><div class="text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis est sed hic aliquam, esse assumenda molestiae maiores laudantium consequuntur itaque tempora? Corrupti ea odit consequuntur et commodi rerum dolor odio magnam tempora fugiat ducimus tempore temporibus pariatur repudiandae, vitae esse unde. Illo quisquam, ut cum facere deserunt accusantium voluptatibus minus inventore, corrupti repellat sed quas ad maxime! Numquam, vitae assumenda.Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis est sed hic aliquam, esse assumenda molestiae maiores laudantium consequuntur itaque tempora? Corrupti ea odit consequuntur et commodi rerum dolor odio magnam tempora fugiat ducimus tempore temporibus pariatur repudiandae, vitae esse unde. Illo quisquam, ut cum facere deserunt accusantium voluptatibus minus inventore, corrupti repellat sed quas ad maxime! Numquam, vitae assumenda.</div><p class="pt-4 font-bold w-full text-left">(Texto opcional)</p>';
    const btn = "¡Entendido!";
    handleClickPopUp(html, btn);
  };

  const questionList = (form) => {
    let count = 1;
    return questions.map((question, index) => (
      <Form.Item
        key={index}
        name={question.question}
        label={<div className="text-lg">{`${count++}. ${question.question}`}</div>}
        rules={[
          {
            required: true,
            message: "Please enter a value",
          },
        ]}
        className="w-full font-bold py-2"
        hasFeedback
        validateTrigger="onFinish"
      >
        {question.type_question === "abierta" && <Input size="large" />}
        {question.type_question === "number" && <Input type="number" size="large" />}
        {/* {question.type === "checkbox" && <Checkbox.Group options={question.response} />} */}
        {question.type_question === "textarea" && <TextArea allowClear size="large" />}
        {/* {question.type === "tel" && <Input size="large" />} */}
        {/* {question.type === "email" && <Input size="large" />} */}
        {question.type_question === "cerrada" && (
          <Select placeholder="Selecciona una opción" allowClear size="large">
            {question.response.map((option, idx) => (
              <Option key={idx} value={option}>
                {option}
              </Option>
            ))}
          </Select>
        )}
      </Form.Item>
    ));
  };

  const onFinish = (values) => {
    console.log(values);
  };

  const onFinishFailed = ({ errorFields }) => {
    form.setFields(
      errorFields.map((field) => ({
        ...field,
        validateStatus: field.errors[0] === "Field empty" ? "success" : "warning",
      }))
    );
  };

  const onReset = () => {
    form.resetFields();
  };

  const location = useLocation();
  const pathSegments = location.pathname.split("/");
  const country = pathSegments[pathSegments.length - 1];

  return (
    <Form
      {...layout}
      form={form}
      name="control-hooks"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      className="w-full py-10 px-24 bg-white rounded-lg shadow"
    >
      <Link to="/">
        <Typography color="black" className="mb-4 font-normal w-full mx-1 text-black text-lg cursor-pointer [text-shadow:_4px_2px_2px_rgb(0_0_0_/_0.4)]">
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Regresar al inicio
        </Typography>
      </Link>
      <h1 className="text-center text-5xl text-black pb-4 font-bold">
        VIPRO <span className="capitalize">{country === "estadosunidos" ? "Estados Unidos" : country}</span>
      </h1>
      <p className="py-6">
        <strong>(Texto opcional)</strong> Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad dignissimos fugit fugiat sit possimus quibusdam
        libero est voluptate aperiam pariatur?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate vero illo beatae, blanditiis esse odio
        aspernatur molestias tenetur repellat libero.
      </p>
      {questionList(form)}
      
      <Form.Item className="min-w-[60%] w-[60%] mx-auto">
        <div className="flex flex-row justify-around">
          <Button htmlType="submit" className="w-[45%] py-5 bg-TVred shadow border-0 text-white font-semibold">
            Enviar formulario
          </Button>
          <Button htmlType="button" onClick={onReset} className="w-[45%] py-5 bg-TVBlue shadow border-0 text-white font-semibold">
            Reiniciar formulario
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default VIPROForm;
