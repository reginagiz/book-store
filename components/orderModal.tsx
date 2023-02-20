import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { GET_ORDER } from "../pages/api/query/getOrder";
import { useQuery } from '@apollo/client';


interface MyProps {
    id: String,
}
const Order: React.FC<MyProps> = (props: MyProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data, loading, error } = useQuery(GET_ORDER, { variables: { id: props } });
    console.log(props)

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
        <>
            <Button type="primary" onClick={showModal}>
                confirm order
            </Button>
            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                {loading ?
                    loading
                    :
                    <p>{data?.order}</p>
                }

            </Modal>
        </>
    );
};

export default Order;