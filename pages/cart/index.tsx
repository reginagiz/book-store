import Link from "next/link";
import React, { useEffect, useState } from 'react';
import { Table, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useMutation, useQuery } from "@apollo/client";
import { CUSTOMER } from "../api/query/getCustomer";
import { CREATE_ORDER } from "../api/mutation/createOrder";
import { DELETE_ORDER_ITEM } from "../api/mutation/deleteOrderItem";
import { ITEMS_COUNT_QUERY } from '../api/query/getOrderItemsCount'
import { UPDATE_ORDER_ITEM } from '../api/mutation/updateOrdrItem'
import { GET_ORDER } from "../api/query/getOrder";
import s from '../../components/style/Cart.module.css'
import { CartItem } from "../api/types/Types";
import { useUser } from '@auth0/nextjs-auth0/client';
import Order from "@/components/orderModal";


export default function Cart() {
  const [price, setPrice] = useState(0)
  const { user, isLoading } = useUser();
  const { data, loading, error } = useQuery(CUSTOMER, { variables: { email: user?.email } });

  const [deleteOrderItem] = useMutation(DELETE_ORDER_ITEM, {
    refetchQueries: [{ query: CUSTOMER, variables: { email: user?.email } }, { query: ITEMS_COUNT_QUERY }]
  });
  const [updateOrderItem] = useMutation(UPDATE_ORDER_ITEM, {
    refetchQueries: [{ query: CUSTOMER, variables: { email: user?.email } }, { query: ITEMS_COUNT_QUERY }]
  })

  const [createOrder, { data: order }] = useMutation(CREATE_ORDER, {
    refetchQueries: [{ query: CUSTOMER, variables: { email: user?.email } }],
    awaitRefetchQueries: true
  })
  const OrderId = order?.createOrder.id

  useEffect(() => {
    let totalPrice = 0
    data?.customer.orderitems.forEach((orderItem: CartItem) => {
      totalPrice += orderItem.product.price * orderItem.quantity
      setPrice(totalPrice)
    })
  }, [data, price]);

  const columns: ColumnsType<CartItem> = [
    {
      title: '',
      dataIndex: ['product', 'avatar', 'url'],
      key: 'url',
      render: (image) => (
        <div style={{ width: 90, height: 120 }}>
          <img
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            src={image}
            alt="Product"
          />
        </div>
      ),
    },
    {
      title: 'Title',
      dataIndex: ['product'],
      key: 'product',
      render: (product) => <Link href={`/books/${product.id}`} >{product.title}</Link>,
    },
    {
      title: 'Author',
      dataIndex: ['product', 'author', 'name'],
      key: 'name',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (quantity, orderItem) => (
        <div key={orderItem.id} className={s.quantity}>
          <Button onClick={() =>
            updateOrderItem({ variables: { id: orderItem.id, input: quantity + 1 } })}>+
          </Button>
          <li>
            &nbsp;{quantity}&nbsp;
          </li>
          <Button onClick={() => {
            quantity === 1 ? deleteOrderItem({ variables: { id: orderItem.id } })
              : updateOrderItem({ variables: { id: orderItem.id, input: quantity - 1 } })
          }}>-
          </Button>
        </div >
      )
    },
    {
      title: 'Price',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (quantity, orderItem) => (<div>${orderItem.product.price * quantity}</div>),
    },
    {
      title: 'Remove',
      key: 'action',
      render: (_, orderItem) => (
        <Button onClick={() => deleteOrderItem({ variables: { id: orderItem.id } })}>X</Button >
      ),
    }
  ];

  if (loading) {
    return <p>loading...</p>;
  }
  if (error) {
    return <p>Ruh roh! {error.message}</p>;
  }

  return (
    <> {data ?
      <div className={s.cart}>
        <div className={s.title}>My shopping cart</div>
        <div className={s.table_total}>
          <div className={s.table_container}>
            <Table columns={columns} dataSource={data?.customer.orderitems} pagination={false} size='middle' />
          </div>
          <div className={s.delivery_total}>
            <div className={s.delivery_total_title}>Order Summary</div>
            <div className={s.delivery}>Delivery Total : <b>0 USD</b></div>
            <div className={s.product_total}>Product Total : <b>{price} USD</b></div>
            <div className={s.line}></div>
            <div className={s.total}><b>{price} USD</b> </div>
            <a onClick={() => createOrder({ variables: { email: user?.email, input: price } })}>
              <Order id={OrderId} />
            </a>
          </div>
        </div>
      </div>
      :
      loading}
    </>

  );
}


