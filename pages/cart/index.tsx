import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Table, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useMutation, useQuery } from "@apollo/client";
import { CUSTOMER } from "../api/query/getCustomer";
import { ARCHIVE_ORDER_ITEM } from "../api/mutation/archiveOrderItem";
import { ITEMS_COUNT_QUERY } from "../api/query/getOrderItemsCount";
import { UPDATE_ORDER_ITEM } from "../api/mutation/updateOrdrItem";
import s from "../../components/style/Cart.module.css";
import { CartItem } from "../api/types/Types";
import { useUser } from "@auth0/nextjs-auth0/client";
import OrderModal from "@/components/OrderModal";

export default function Cart() {
  const [price, setPrice] = useState(0);

  const { user, isLoading } = useUser();

  const { data, loading, error } = useQuery(CUSTOMER, {
    variables: { email: user?.email, status: { equals: "unarchived" } },
  });

  const [archiveOrderItem] = useMutation(ARCHIVE_ORDER_ITEM, {
    refetchQueries: [
      {
        query: CUSTOMER,
        variables: { email: user?.email, status: { equals: "unarchived" } },
      },
      { query: ITEMS_COUNT_QUERY },
    ],
  });
  const [updateOrderItem] = useMutation(UPDATE_ORDER_ITEM, {
    refetchQueries: [
      {
        query: CUSTOMER,
        variables: { email: user?.email, status: { equals: "unarchived" } },
      },
      { query: ITEMS_COUNT_QUERY },
    ],
  });

  useEffect(() => {
    let totalPrice = 0;
    data?.customer.orderitems.forEach((orderItem: CartItem) => {
      totalPrice += orderItem.product.price * orderItem.quantity;
      setPrice(totalPrice);
    });
  }, [data, price]);

  const columns: ColumnsType<CartItem> = [
    {
      title: "",
      dataIndex: ["product", "avatar", "url"],
      key: "url",
      width: "40%",
      render: (image) => (
        <div style={{ width: 90, height: 120 }}>
          <img
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
            src={image}
            alt="Product"
          />
        </div>
      ),
    },
    {
      title: "Title",
      dataIndex: ["product"],
      key: "product",
      width: "40%",
      render: (product) => (
        <Link href={`/books/${product.id}`}>{product.title}</Link>
      ),
    },
    {
      title: "Author",
      dataIndex: ["product", "author", "name"],
      key: "name",
      width: "40%",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity, orderItem) => (
        <div key={orderItem.id} className={s.quantity}>
          <Button
            onClick={() =>
              updateOrderItem({
                variables: { id: orderItem.id, input: quantity + 1 },
              })
            }
            size="small"
          >
            +
          </Button>
          <li>{quantity}</li>
          <Button
            onClick={() => {
              quantity === 1
                ? archiveOrderItem({
                    variables: { id: orderItem.id, input: "archived" },
                  })
                : updateOrderItem({
                    variables: { id: orderItem.id, input: quantity - 1 },
                  });
            }}
            size="small"
          >
            -
          </Button>
        </div>
      ),
    },
    {
      title: "Price",
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity, orderItem) => (
        <div>${orderItem.product.price * quantity}</div>
      ),
    },
    {
      title: "Remove",
      key: "action",
      render: (_, orderItem) => (
        <Button
          onClick={() =>
            archiveOrderItem({
              variables: { id: orderItem.id, input: "archived" },
            })
          }
        >
          X
        </Button>
      ),
    },
  ];

  if (loading) {
    return <p>loading...</p>;
  }
  if (error) {
    return <p>Ruh roh! {error.message}</p>;
  }

  return (
    <>
      {" "}
      {data ? (
        <div className={s.cart}>
          <div className={s.cart_container}>
            <h2 className={s.title}>Your shopping cart</h2>
            <div className={s.table_total}>
              <div className={s.table_container}>
                <Table
                  columns={columns}
                  dataSource={data?.customer?.orderitems}
                  pagination={false}
                />
              </div>
              <div className={s.delivery_total}>
                <h3 className={s.delivery_total_title}>Order Summary</h3>
                <div className={s.delivery}>
                  Delivery Total : <b>0 USD</b>
                </div>
                <div className={s.product_total}>
                  Product Total : <b>{price} USD</b>
                </div>
                <div className={s.line}></div>
                <div className={s.total}>
                  <b>{price} USD</b>{" "}
                </div>
                <div>
                  <OrderModal price={price} />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        loading
      )}
    </>
  );
}
