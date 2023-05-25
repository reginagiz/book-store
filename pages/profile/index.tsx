import React, { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useMutation, useQuery } from "@apollo/client";
import { CUSTOMER } from "../api/query/getCustomer";
import { GET_ORDERS } from "../api/query/getOrders";
import { DELETE_ADDRESS } from "../api/mutation/deleteAddress";
import { Menu, Button, Collapse } from "antd";
import s from "../../components/style/Profile.module.css";
import AddressForm from "@/components/AddressForm";
import { Order, CartItem, Address } from "../api/types/Types";

export default function Profile() {
  const { user, isLoading } = useUser();
  const { data, loading, error } = useQuery(CUSTOMER, {
    variables: { email: user?.email, status: { equals: "unarchived" } },
  });
  const { data: orders } = useQuery(GET_ORDERS, {
    variables: { input: { id: { equals: data?.customer?.id } } },
  });

  const [deleteAddress] = useMutation(DELETE_ADDRESS, {
    refetchQueries: [
      {
        query: CUSTOMER,
        variables: { email: user?.email, status: { equals: "unarchived" } },
      },
    ],
  });
  const [selectedMenuItem, setSelectedMenuItem] = useState("item1");

  const { Panel } = Collapse;
  const customerId = data?.customer?.id;

  const componentsSwtich = (key: String) => {
    switch (key) {
      case "item1":
        return (
          <div className={s.customer_info}>
            <div>
              <b>Name:</b> {data?.customer?.name}
            </div>
            <div>
              <b>Email:</b> {data?.customer?.email}
            </div>
            {data?.customer?.address?.length > 0 ? (
              <div>
                <div>
                  <b>Your address:</b>
                </div>
                <div className={s.all_addresses}>
                  {data?.customer?.address?.map((e: Address) => {
                    return (
                      <div className={s.address_box}>
                        <button
                          onClick={() =>
                            deleteAddress({ variables: { id: e.id } })
                          }
                        >
                          <b>x</b>
                        </button>
                        <div className={s.address_info}>
                          <p>{e.country},</p>
                          <p>{e.city},</p>
                          <p>{e.street},</p>
                          <p>{e.build},</p>
                          <p>{e.index}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className={s.add_address}>
                  <Collapse>
                    <Panel header="Add new address for delivery" key="1">
                      <div className={s.address_form}>
                        <AddressForm id={customerId} />
                      </div>
                    </Panel>
                  </Collapse>
                </div>
              </div>
            ) : (
              <div className={s.add_address}>
                <Collapse>
                  <Panel header="Add address for delivery" key="1">
                    <div className={s.address_form}>
                      <AddressForm id={customerId} />
                    </div>
                  </Panel>
                </Collapse>
              </div>
            )}
            <a href="/api/auth/logout">
              <Button type="primary" className={s.logout_button}>
                Log out
              </Button>
            </a>
          </div>
        );
      case "item2":
        return (
          <>
            {orders?.orders ? (
              <div className={s.orders}>
                {orders?.orders?.map((order: Order) => {
                  return (
                    <div className={s.order}>
                      <div className={s.data_price}>
                        <div className={s.data}>
                          {order.createdAt.slice(0, 10)}
                        </div>
                        <div>{order.totalprice} USD</div>
                      </div>
                      {order?.cart?.map((cartItem: CartItem) => {
                        return (
                          <div className={s.info_item}>
                            <div>"{cartItem.product.title}"</div>
                            <div>{cartItem.product.author.name}</div>
                            <div>({cartItem.quantity})</div>
                          </div>
                        );
                      })}
                      <div className={s.order_address}>
                        <div>{order.address?.country},</div>
                        <div>{order.address?.city},</div>
                        <div>{order.address?.street},</div>
                        <div>{order.address?.index}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div>You don't have orders yet</div>
            )}
          </>
        );
      default:
        break;
    }
  };

  if (isLoading || loading) return <div>Loading...</div>;

  if (error) return <div>{error.message}</div>;

  if (data) {
    return (
      <div className={s.profile}>
        <div className={s.profile_container}>
          <div className={s.menu_container}>
            <Menu
              className={s.menu}
              selectedKeys={[selectedMenuItem]}
              mode="horizontal"
              defaultSelectedKeys={["item1"]}
              onClick={(e) => setSelectedMenuItem(e.key)}
            >
              <Menu.Item key="item1">Profile</Menu.Item>
              <Menu.Item key="item2">Orders</Menu.Item>
            </Menu>
            <div className={s.choose_item}>
              {componentsSwtich(selectedMenuItem)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
