import Link from "next/link";
import React from 'react';
import { Table, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useMutation, useQuery } from "@apollo/client";
import { ITEMS_QUERY } from "../api/query/getOrderItems";
import { DELETE_ORDER_ITEM } from "../api/mutation/deleteOrderItem";
import { ITEMS_COUNT_QUERY } from '../api/query/getOrderItemsCount'
import { UPDATE_ORDER_ITEM } from '../api/mutation/updateOrdrItem'
import s from '../../components/style/Cart.module.css'

type CartItem = {
  product: Product;
  quantity: number;
  id: number;
};
type Product = {
  title: string;
  price: number;
  id: string;
  quantity: number;
  author: Author;
  avatar: Avatar
};
type Author = {
  name: string;
};
type Avatar = {
  url: string;
};

export default function Cart() {
  const [deleteOrderItem] = useMutation(DELETE_ORDER_ITEM, {
    refetchQueries: [{ query: ITEMS_QUERY }, { query: ITEMS_COUNT_QUERY }]
  });
  const [updateOrderItem] = useMutation(UPDATE_ORDER_ITEM, {
    refetchQueries: [{ query: ITEMS_QUERY }, { query: ITEMS_COUNT_QUERY }]
  })

  const { data, loading, error } = useQuery(ITEMS_QUERY);
  if (loading) {
    return <p>loading...</p>;
  }
  if (error) {
    return <p>Ruh roh! {error.message}</p>;
  }

  const getTotal = () => {
    let totalPrice = 0
    data.orderItems?.forEach((orderItem: CartItem) => {
      totalPrice += orderItem.product.price * orderItem.quantity
    })
    return { totalPrice }
  }
  console.log(data.orderItems.map((orderItem: any) => { orderItem.product.id }))
  console.log(data.orderItems)

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
      dataIndex: 'product',
      key: 'product',
      render: (product: Product) => <Link href={`/books/${product.id}`} >{product.title}</Link>,
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
          <Button onClick={() =>
            updateOrderItem({ variables: { id: orderItem.id, input: quantity - 1 } })}>-
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
      render: (_, productItem) => (
        <Button onClick={() => deleteOrderItem({ variables: { id: productItem.id } })}>X</Button >
      ),
    }
  ];
  return (
    <div className={s.cart}>
      <div className={s.title}>My shopping cart</div>
      <div className={s.table_container}>
        <Table columns={columns} dataSource={data.orderItems} pagination={false} />
        <div className={s.delivery_total}>
          <div className={s.delivery}>Delivery : 0 USD</div>
          <div className={s.total}>Total : {getTotal().totalPrice} USD</div>
        </div>
      </div>
    </div>

  );
}


