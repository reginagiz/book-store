import React, { useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useQuery } from "@apollo/client";
import { CUSTOMER } from '../api/query/getCustomer';
import { GET_ORDERS } from '../api/query/getOrders';
import { Menu, Button } from 'antd';
import s from '../../components/style/Profile.module.css'

export default function Profile() {
    const { user, isLoading } = useUser();
    const { data, loading, error } = useQuery(CUSTOMER, { variables: { email: user?.email } });
    const { data: orders } = useQuery(GET_ORDERS, { variables: { input: { id: { equals: data?.customer.id } } } });
    const [selectedMenuItem, setSelectedMenuItem] = useState('item1');

    console.log(orders?.orders)

    const componentsSwtich = (key: any) => {
        switch (key) {
            case 'item1':
                return (
                    <div className={s.profile}>
                        <div>{data.customer.name}</div>
                        <div>{data.customer.email}</div>
                        <a href="/api/auth/logout">
                            <Button type="primary">Log out</Button>
                        </a>
                    </div>
                );
            case 'item2':
                return (
                    <div>
                        <div>{orders?.orders?.map((order: any) => {
                            <div>
                                <div>{order.createdAt}</div>
                                <div>{order.totalprice}</div>
                                {order?.cart?.map((cartItem: any) => {
                                    <div>
                                        <div>{cartItem.quantity}</div>
                                        <div>{cartItem.product.title}</div>
                                        <div>{cartItem.product.author.name}</div>
                                        <div>{cartItem.product.price * cartItem.quantity}</div>
                                    </div>
                                })}
                            </div>
                        })}</div>
                    </div>
                );
            default:
                break;
        }
    }

    if (isLoading || loading) return <div>Loading...</div>;

    if (error) return <div>{error.message}</div>;

    if (data) {
        return (
            <div className={s.menu}>
                <Menu selectedKeys={[selectedMenuItem]} mode="vertical" style={{ width: 300 }} defaultSelectedKeys={['item1']} onClick={(e) =>
                    setSelectedMenuItem(e.key)}>
                    <Menu.Item key="item1">Profile</Menu.Item>
                    <Menu.Item key="item2">Orders</Menu.Item>
                </Menu>
                <div>
                    {componentsSwtich(selectedMenuItem)}
                </div>
            </div>
        )
    }
};