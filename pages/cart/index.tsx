import { gql } from "@apollo/client";
import client from "../../helpers/appolo-client"
import Link from "next/link";
import { Card } from 'antd';
import React from 'react';
import { Table, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  id: string;
}
export default function Cart({ data }: any) {
  const columns: ColumnsType<DataType> = [
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
      dataIndex: ['product', 'title'],
      key: 'title',
      render: (text) => <a>{text}</a>,
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
    },
    {
      title: 'Price',
      dataIndex: ['product', 'price'],
      key: 'price',
      render: (text) => <div>${text}</div>,
    },
    {
      title: 'Remove',
      key: 'action',
      render: (_, product) => (
        <Button onClick={() => DeleteOrderItem({ params: { id: product.id }})}>X</Button >
    ),
  } 
];
return (
  <Table columns={columns} dataSource={data} />
);
}
export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
        query{
            orderItems{
              id
              quantity
              product{
                title
                avatar{
                    url
                }
                author{
                  name
                }
                price
              }
            }
            }
      `,
  });
  return {
    props: {
      data: data.orderItems,
    },
  };
}
export async function DeleteOrderItem({ params }: any) {
  const { id } = params;
  const { data } = await client.mutate({
    mutation: gql`
        mutation MutationDeleteOrderItem($id:ID!) {
            deleteOrderItem(where: { id: $id }){
              id
              product{
                id
              }
              quantity 
              }
            }    
        `,
    variables: { id },
  });
  return {
    props: {
      data: data.OrderItem,
    },
  };
}