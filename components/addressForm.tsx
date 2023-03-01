import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';

const onFinish = (values: any) => {
    console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};

const AddressForm: React.FC = () => (
    <Form
        name="basic"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 12 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
    >
        <Form.Item
            label="Country"
            name="country"
            rules={[{ required: true, message: 'Please input your country!' }]}
        >
            <Input />
        </Form.Item>
        <Form.Item
            label="City"
            name="city"
            rules={[{ required: true, message: 'Please input your city!' }]}
        >
            <Input />
        </Form.Item>
        <Form.Item
            label="Street"
            name="street"
            rules={[{ required: true, message: 'Please input your street!' }]}
        >
            <Input />
        </Form.Item>
        <Form.Item
            label="Building number"
            name="building_number"
            rules={[{ required: true, message: 'Please input your building number!' }]}
        >
            <Input />
        </Form.Item>
        <Form.Item
            label="Index"
            name="index"
            rules={[{ required: true, message: 'Please input your index!' }]}
        >
            <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Button type="primary" htmlType="submit">
                Save
            </Button>
        </Form.Item>
    </Form>
);

export default AddressForm;