import React, { useState } from 'react';
import questions from '../../../assets/data/questions.data';
import { Button, Form, Input, Select, Space, Checkbox } from 'antd';
import handleClickPopUp from '../../components/popup/PopUp';

const { Option } = Select;
const { TextArea } = Input;
const layout = {
    labelCol: {
        span: 24,
    },
    wrapperCol: {
        span: 24,
    },
};

const questionList = (form) => {
    return questions.map((question) => {
        return (
            <Form.Item
                key={question.id}
                name={question.question}
                label={<div className='text-xl'>{`${question.id + ') ' + question.question}`}</div>}
                rules={[
                    {
                        required: question.required,
                        message: 'Please enter a value',
                    },
                    {
                        validator: (_, value) => {
                            if (!value && !question.required) {
                                return Promise.resolve();
                            }
                            return Promise.resolve();
                        }
                    }
                ]}
                className='w-full font-bold py-2'
                hasFeedback
                validateTrigger="onFinish"
                initialValue={null}
            >
                {question.type === 'text' && <Input size="large" />}
                {question.type === 'number' && <Input min={0} type="number" size="large" />}
                {question.type === 'checkbox' && <Checkbox.Group options={question.options} />}
                {question.type === 'textarea' && <TextArea placeholder="textarea with clear icon" allowClear size="large" />}
                {question.type === 'tel' && <Input placeholder="text" size="large" />}
                {question.type === 'email' && <Input placeholder="text" size="large" />}
                {question.type === 'select' && (
                    <Select placeholder="Select an option" allowClear size="large">
                        {question.options.map((option) => (
                            <Option key={option} value={option}>
                                {option}
                            </Option>
                        ))}
                    </Select>
                )}
            </Form.Item>
        );
    });
};

const VIPROForm = () => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log(values);
    };

    const onFinishFailed = ({ errorFields }) => {
        form.setFields(
            errorFields.map((field) => ({
                ...field,
                validateStatus: field.errors[0] == 'Field empty' ? 'success' : 'warning',
            }))
        );
    };

    const onReset = () => {
        form.resetFields();
    };

    return (
        <Form
            {...layout}
            form={form}
            name="control-hooks"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            className='w-full py-10 px-24 bg-white rounded-lg shadow'
        >
            <h1 className='text-center text-5xl text-black pb-4 font-bold'>Formulario VIPRO</h1>
            <p className='py-6'><strong>(Texto opcional)</strong> Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad dignissimos fugit fugiat sit possimus quibusdam libero est voluptate aperiam pariatur?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate vero illo beatae, blanditiis esse odio aspernatur molestias tenetur repellat libero.</p>
            {questionList(form)}
            <Form.Item
                shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
            >
                {({ getFieldValue }) =>
                    getFieldValue('gender') === 'other' ? (
                        <Form.Item
                            name="customizeGender"
                            label="Customize Gender"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter a value',
                                },
                                {
                                    validator: (_, value) => {
                                        if (!value) {
                                            return Promise.reject('This field cannot be empty');
                                        }
                                        return Promise.resolve();
                                    }
                                }
                            ]}
                            hasFeedback
                            validateStatus="warning"
                            initialValue={null} 
                        >
                            <Input />
                        </Form.Item>
                    ) : null
                }
                <Form.Item
                    name="terms"
                    valuePropName="checked"
                    className='m-0 pb-4'
                    rules={[{ required: true, message: 'Debe aceptar los términos y condiciones' }]}
                >
                    <Checkbox >
                        <span className='font-semibold text-lg'>
                            Acepto los
                        </span>
                    </Checkbox>
                    <strong onClick={handleClickPopUp} className='font-semibold text-lg hover:text-TVBlue cursor-pointer'>Términos y condiciones</strong>
                </Form.Item>
            </Form.Item>
            <Form.Item className='min-w-[60%] w-[60%] mx-auto'>
                <div className='flex flex-row justify-around'>
                    <Button htmlType="submit" className='w-[45%] py-5 bg-TVred shadow border-0 text-white font-semibold'>
                        Enviar formulario
                    </Button>
                    <Button htmlType="button" onClick={onReset} className='w-[45%] py-5 bg-TVBlue shadow border-0 text-white font-semibold'>
                        Reiniciar formulario
                    </Button>
                </div>
            </Form.Item>
        </Form>
    );
};

export default VIPROForm;
