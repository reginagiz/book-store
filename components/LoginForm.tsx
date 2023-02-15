import React, { useEffect } from 'react';
import { LockOutlined, EyeInvisibleOutlined, EyeTwoTone, MailOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import s from './style/Auth.module.css'
import { useMutation, useQuery } from "@apollo/client";
import { AUTH_USER } from '../pages/api/mutation/authenticateUser'
import { useRouter } from 'next/router'

const LoginForm: React.FC = () => {
    const router = useRouter();
    const [authenticateUser, { data, loading, error }] = useMutation(AUTH_USER);

    useEffect(() => {
        if (data) {
            localStorage.setItem('currentUserId', JSON.stringify(data?.authenticateUserWithPassword.item.id));
            router.push("/profile");
        }
    }, [data]);

    const onFinish = (values: any) => {
        authenticateUser({ variables: { email: values.email, password: values.password } })
    };

    return (
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
        >
            <Form.Item
                name="email"
                rules={[
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                    },
                    {
                        required: true,
                        message: 'Please input your E-mail!',
                    },
                ]}
            >
                <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your Password!' }]}
            >
                <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" className={s.login_form_button}>
                    Log in
                </Button>
            </Form.Item>
        </Form>
    );
};

export default LoginForm;