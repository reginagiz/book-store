import React, { SyntheticEvent, useEffect, useState } from "react";
import { Button, Modal } from "antd";
import { useMutation, useQuery } from "@apollo/client";
import s from "../components/style/OrderModal.module.css";
import type { RadioChangeEvent } from "antd";
import { Radio } from "antd";
import AddressForm from "./AddressForm";
import { Address } from "@/pages/api/types/Types";
import { CREATE_ORDER } from "@/pages/api/mutation/createOrder";
import { CUSTOMER } from "@/pages/api/query/getCustomer";
import { useUser } from "@auth0/nextjs-auth0/client";
import { CartItem } from "@/pages/api/types/Types";
import { GET_ORDERS } from "@/pages/api/query/getOrders";

interface MyProps {
  price: number;
}

type OrderItemId = {
  id: number;
};

const OrderModal = (totalPrice: MyProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderItemsIds, setorderItemsIds] = useState<OrderItemId[]>([]);
  const [isShown, setIsShown] = useState(false);

  const { user, isLoading } = useUser();
  const { data, loading, error } = useQuery(CUSTOMER, {
    variables: { email: user?.email, status: { equals: "unarchived" } },
  });

  const [value, setValue] = useState<Address>(data?.customer.address[0]);

  const [createOrder] = useMutation(CREATE_ORDER, {
    refetchQueries: [
      {
        query: CUSTOMER,
        variables: { email: user?.email, status: { equals: "unarchived" } },
      },
      {
        query: GET_ORDERS,
        variables: { input: { id: { equals: data?.customer.id } } },
      },
    ],
    awaitRefetchQueries: true,
  });

  useEffect(() => {
    let arrId: OrderItemId[] = [];
    data?.customer.orderitems.forEach((orderItem: CartItem) => {
      arrId.push({ id: orderItem.id });
      setorderItemsIds(arrId);
    });
  }, [data]);

  const customerId = data?.customer.id;
  const price = totalPrice.price;

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };

  const showModal = () => {
    setIsModalOpen((current) => !current);
  };
  const handleOk = () => {
    setIsModalOpen((current) => !current);
    createOrder({
      variables: {
        id: { connect: { id: data?.customer.id } },
        input: price,
        cart: { connect: orderItemsIds },
        address: { connect: { id: value.id } },
      },
    });
  };
  const handleCancel = () => {
    setIsModalOpen((current) => !current);
  };
  const handleClick = (event: SyntheticEvent) => {
    setIsShown((current) => !current);
  };

  return (
    <>
      <div className={s.confirm}>
        <Button type="primary" onClick={showModal} className={s.confirm}>
          <p>confirm order</p>
        </Button>
      </div>
      <Modal
        title={<h2>Confirm your order</h2>}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Pay"
      >
        {data ? (
          <div className={s.modal}>
            <div className={s.modal_container}>
              <div>
                <div className={s.user_info}>
                  <div>{data?.customer.email}</div>
                  <h2>Delivery address :</h2>
                  {data?.customer.address.length > 0 ? (
                    <div className={s.address_info}>
                      <div className={s.radio_buttons}>
                        {data?.customer.address?.map((e: Address) => {
                          return (
                            <Radio.Group
                              onChange={onChange}
                              value={value}
                              defaultValue={data?.customer.address[0]}
                            >
                              <Radio value={e}>
                                <div className={s.address_box}>
                                  <div>{e.country},</div>
                                  <div>{e.city},</div>
                                  <div>{e.street},</div>
                                  <div>{e.build}</div>
                                </div>
                              </Radio>
                            </Radio.Group>
                          );
                        })}
                      </div>
                      <Button onClick={handleClick} type="primary">
                        + Add new address
                      </Button>
                      {isShown && (
                        <div className={s.address_form}>
                          <AddressForm id={customerId} />
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className={s.address_form}>
                      <AddressForm id={customerId} />
                    </div>
                  )}
                </div>
                <h2>Your order's information :</h2>
                <div className={s.books}>
                  {data?.customer.orderitems.map((e: any) => {
                    return (
                      <div className={s.books_info}>
                        <div>"{e.product?.title}"</div>
                        <div>{e.product?.author?.name}</div>
                        <div>{e.product?.price * e.quantity} USD</div>
                        <div>({e.quantity})</div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <h2>
                Total Price: <b>{price} USD</b>
              </h2>
            </div>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </Modal>
    </>
  );
};

export default OrderModal;
