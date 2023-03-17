import React from 'react';
import { Button, Form, Input } from 'antd';
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_ADDRESS } from "../pages/api/mutation/createAddress";
import { CUSTOMER } from "../pages/api/query/getCustomer";
import { useUser } from '@auth0/nextjs-auth0/client';

interface MyProps {
    id: String,
}

const AddressForm = (orderId: MyProps) => {
    const { user, isLoading } = useUser();
    const id = orderId.id

    const [createAddress] = useMutation(CREATE_ADDRESS, {
        refetchQueries: [{ query: CUSTOMER, variables: { email: user?.email } }]
    })

    const onFinish = (values: any) => {
        createAddress({
            variables: {
                id: id, country: values.country, city: values.city, street: values.street,
                build: values.building_number, index: values.index
            }
        })
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
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
                label="Building"
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
}

export default AddressForm;