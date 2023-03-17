import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import { GET_ORDER } from "../pages/api/query/getOrder";
import { useMutation, useQuery } from '@apollo/client';
import s from '../components/style/orderModal.module.css'
import type { RadioChangeEvent } from 'antd';
import { Radio } from 'antd';
import AddressForm from './addressForm';
import { Address } from '@/pages/api/types/Types';
import { CREATE_ORDER } from '@/pages/api/mutation/createOrder';
import { GET_ORDERS } from '@/pages/api/query/getOrders';
import { CUSTOMER } from '@/pages/api/query/getCustomer';
import { useUser } from '@auth0/nextjs-auth0/client';
import { CartItem } from '@/pages/api/types/Types';

interface MyProps {
  price: number,
}
const Order = (totalPrice: MyProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [value, setValue] = useState<Address>();
  const [orderItemsIds, setorderItemsIds] = useState<any[]>([]);

  const { user, isLoading } = useUser();
  const { data: customer } = useQuery(CUSTOMER, { variables: { email: user?.email } });

  const [createOrder, { data: order }] = useMutation(CREATE_ORDER, {
    refetchQueries: [{ query: CUSTOMER, variables: { email: user?.email } }],
    awaitRefetchQueries: true
  })

  const id = order?.createOrder.id
  const { data, loading, error } = useQuery(GET_ORDER, { variables: { id: id } });

  useEffect(() => {
    let arrId: any[] = []
    customer?.customer.orderitems.forEach((orderItem: CartItem) => {
      arrId.push({ id: orderItem.id })
      setorderItemsIds(arrId)
    })
  }, [customer]);

  const customerId = data?.order.customer.id;
  const price = totalPrice.price

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };

  const showModal = () => {
    setIsModalOpen(current => !current);
    createOrder({ variables: { id: { connect: { id: customer?.customer.id } }, input: price, cart: { connect: orderItemsIds } } })
  };
  const handleOk = () => {
    setIsModalOpen(current => !current);
  };
  const handleCancel = () => {
    setIsModalOpen(current => !current);
  };

  return (
    <div >
      <div className={s.confirm}>
        <Button type="primary" onClick={showModal} className={s.confirm}>
          <p >confirm order</p>
        </Button>
      </div>
      <Modal title="Confirm your order" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText='Pay'>
        {data ?
          <div>
            <div >
              <div className={s.modal}>
                <div className={s.user_info}>
                  <div>{data?.order.customer.email}</div>
                  <div className={s.address_title}>Delivery address :</div>
                  {data?.order.customer.address.length > 0 ?
                    <div>
                      {data?.order.customer.address?.map((e: Address) => {
                        return (
                          <Radio.Group onChange={onChange} value={value} defaultValue={data?.order.customer.address[0]}>
                            <Radio value={e}>
                              <div className={s.address_box}>
                                <div>{e.country},</div>
                                <div>{e.city},</div>
                                <div>{e.street},</div>
                                <div>{e.build}</div>
                              </div>
                            </Radio>
                          </Radio.Group>
                        )
                      })}
                    </div>
                    :
                    <div className={s.address_form}>
                      <AddressForm id={customerId} />
                    </div>
                  }

                </div>
                <div className={s.order_title}>Your order's information :</div>
                <div className={s.books}>{data.order.cart?.map((e: any) => {
                  return (
                    <div className={s.books_info}>
                      <div>"{e.product.title}"</div>
                      <div>{e.product.author.name}</div>
                      <div>{e.product.price * e.quantity} USD</div>
                      <div>({e.quantity})</div>
                    </div>
                  )
                })}</div>
              </div>
            </div>
            <p className={s.total_price}>Total Price: <b>{data.order.totalprice} USD</b></p>
          </div>
          : <div>Loading...</div>
        }

      </Modal>
    </div>

  );
};

export default Order;