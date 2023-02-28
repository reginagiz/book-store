import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import { GET_ORDER } from "../pages/api/query/getOrder";
import { useQuery } from '@apollo/client';
import s from '../components/style/orderModal.module.css'


interface MyProps {
    id: String,
}
const Order = (orderId: MyProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const id = orderId.id
    const { data, loading, error } = useQuery(GET_ORDER, { variables: { id: id } });

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>{!data ?
            <div className={s.confirm}>
                <Button type="primary" onClick={showModal} className={s.confirm}>
                    <p >confirm order</p>
                </Button>
            </div>
            :
            <div >
                <div className={s.confirm}>
                    <Button type="primary" onClick={showModal} className={s.confirm}>
                        <p >confirm order</p>
                    </Button>
                </div>
                <Modal title="Confirm your order" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <div >
                        <div className={s.modal}>
                            <div className={s.user_info}>
                                <div>{data?.order.customer.name}</div>
                                <div>{data?.order.customer.email}</div>
                            </div>
                            <div>{data.order.cart?.map((e: any) => {
                                return (
                                    <div className={s.books_info}>
                                        <p>Book's information:</p>
                                        <div className={s.book}>
                                            <div>Title: {e.product.title}</div>
                                            <div>Author: {e.product.author.name}</div>
                                            <div>Price: {e.product.price * e.quantity} USD</div>
                                            <div>Quantity: {e.quantity}</div>
                                        </div>
                                    </div>
                                )
                            })}</div>
                        </div>
                    </div>
                    <p className={s.total_price}>Total Price: <b>{data.order.totalprice} USD</b></p>
                </Modal>
            </div>
        }
        </>
    );
};

export default Order;