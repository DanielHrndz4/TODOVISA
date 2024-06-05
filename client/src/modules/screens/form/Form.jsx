import React from 'react';
import questions from '../../../assets/data/questions.data';
import { Button, Form, Input, Select, Space, Checkbox } from 'antd';

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
                initialValue={null} // Establecer el valor inicial a null para los campos opcionales
            >
                {question.type === 'text' && <Input size="large"/>}
                {question.type === 'number' && <Input min={0} type="number" size="large"/>}
                {question.type === 'checkbox' && <Checkbox.Group options={question.options} defaultValue={['Español']} />}
                {question.type === 'textarea' && <TextArea placeholder="textarea with clear icon" allowClear size="large"/>}
                {question.type === 'tel' && <Input placeholder="text" size="large"/>}
                {question.type === 'email' && <Input placeholder="text" size="large"/>}
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
            className='w-full py-10 px-24 bg-white rounded-lg'
        >
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
                            initialValue={null} // Establecer el valor inicial a null para los campos opcionales
                        >
                            <Input />
                        </Form.Item>
                    ) : null
                }
            </Form.Item>
            <Form.Item >
                <Space>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                    <Button htmlType="button" onClick={onReset}>
                        Reset
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    );
};

export default VIPROForm;
