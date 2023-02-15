import React from 'react';
import { Tabs } from 'antd';
import LoginForm from '@/components/LoginForm';
import SignUpForm from '@/components/SignUpForm';
import s from '../../components/style/Auth.module.css'

const TabPane = Tabs.TabPane;

const tabItemClick = (key: String) => {
    console.log('tab click', key);
};

const Auth: React.FC = () => (
    <div className={s.auth}>
        <div className={s.title}>Hello, Log in or create an account on Book store, don't miss the discounts!</div>
        <div className={s.tabs}>
            <Tabs defaultActiveKey="1" onChange={tabItemClick}>
                <TabPane tab="LogIn" key="1"><LoginForm /></TabPane>
                <TabPane tab="Sign Up" key="2"><SignUpForm /></TabPane>
            </Tabs>
        </div>
    </div >

);

export default Auth;