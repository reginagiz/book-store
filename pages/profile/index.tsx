import React, { useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useMutation, useQuery } from "@apollo/client";
import { CUSTOMER } from '../api/query/getCustomer';
import { GET_ORDERS } from '../api/query/getOrders';
import { DELETE_ADDRESS } from '../api/mutation/deleteAddress';
import { Menu, Button, Collapse } from 'antd';
import s from '../../components/style/Profile.module.css'
import AddressForm from '@/components/addressForm';

export default function Profile() {
    const { user, isLoading } = useUser();
    const { data, loading, error } = useQuery(CUSTOMER, { variables: { email: user?.email } });
    const { data: orders } = useQuery(GET_ORDERS, { variables: { input: { id: { equals: data?.customer.id } } } });
    const [deleteAddress] = useMutation(DELETE_ADDRESS, {
        refetchQueries: [{ query: CUSTOMER, variables: { email: user?.email } }]
    })
    const [selectedMenuItem, setSelectedMenuItem] = useState('item1');

    const { Panel } = Collapse;
    const customerId = data?.customer.id

    const componentsSwtich = (key: any) => {
        switch (key) {
            case 'item1':
                return (
                    <div className={s.profile}>
                        <div className={s.name_email}>
                            <div><b>Name:</b> {data.customer.name}</div>
                            <div><b>Email:</b> {data.customer.email}</div>
                        </div>
                        {data?.customer.address.length > 0 ?
                            <div>
                                <div><b>Your address:</b></div>
                                {data?.customer.address.map((e: any) => {
                                    return (
                                        <div>
                                            <div className={s.address_box}>
                                                <button className={s.delete_button}
                                                    onClick={() => deleteAddress({ variables: { id: e.id } })}><b>x</b>
                                                </button>
                                                <div>Country: {e.country}</div>
                                                <div>City: {e.city}</div>
                                                <div>Street: {e.street}</div>
                                                <div>Build number: {e.build}</div>
                                                <div>Index: {e.index}</div>
                                            </div>
                                        </div>
                                    )
                                })}
                                <div className={s.address}>
                                    <Collapse>
                                        <Panel header="Add new address for delivery" key="1">
                                            <AddressForm id={customerId} />
                                        </Panel>
                                    </Collapse>
                                </div>
                            </div>
                            :
                            <div className={s.address}>
                                <Collapse>
                                    <Panel header="Add address for delivery" key="1">
                                        <AddressForm id={customerId} />
                                    </Panel>
                                </Collapse>
                            </div>
                        }
                        <div>
                            <a href="/api/auth/logout">
                                <Button type="primary">Log out</Button>
                            </a>
                        </div>
                    </div>
                );
            case 'item2':
                return (
                    <>{orders?.orders ?
                        <div className={s.orders}>{orders?.orders?.map((order: any) => {
                            return (
                                <div className={s.order}>
                                    <div className={s.data_price}>
                                        <div className={s.data}>{order.createdAt.slice(0, 10)}</div>
                                        <div className={s.price}>{order.totalprice} USD</div>
                                    </div>
                                    {order?.cart?.map((cartItem: any) => {
                                        return (
                                            <div className={s.info_item}>
                                                <div>"{cartItem.product.title}"</div>
                                                <div>{cartItem.product.author.name}</div>
                                                <div>({cartItem.quantity})</div>
                                            </div>
                                        )
                                    })}
                                </div>
                            )
                        })}
                        </div>
                        : <div>You don't have orders yet</div>
                    }
                    </>
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