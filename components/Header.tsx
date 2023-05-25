import logo from "../components/images/logo.png";
import React, { useEffect, useState } from "react";
import s from "./style/Header.module.css";
import Link from "next/link";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { Badge } from "antd";
import { CUSTOMER } from "../pages/api/query/getCustomer";
import { useMutation, useQuery } from "@apollo/client";
import { CartItem } from "@/pages/api/types/Types";
import { useUser } from "@auth0/nextjs-auth0/client";
import { CREATE_CUSTOMER } from "../pages/api/mutation/createCustomer";
import { useRouter } from "next/router";

const Header = () => {
  const [countItems, setCountItems] = useState<number>(0);

  const { user, isLoading } = useUser();

  const router = useRouter();

  const { data, loading, error } = useQuery(CUSTOMER, {
    variables: { email: user?.email, status: { equals: "unarchived" } },
  });
  const [createCustomer] = useMutation(CREATE_CUSTOMER, {
    refetchQueries: [
      {
        query: CUSTOMER,
        variables: { email: user?.email, status: { equals: "unarchived" } },
      },
    ],
    awaitRefetchQueries: true,
  });

  console.log(data);

  useEffect(() => {
    if (data)
      setCountItems(
        data?.customer?.orderitems.reduce((acc: number, curent: CartItem) => {
          return acc + curent.quantity;
        }, 0)
      );
  }, [data]);

  useEffect(() => {
    if (!data && user) {
      createCustomer({ variables: { email: user?.email, name: user?.name } });
    }
  }, [user]);

  return (
    <div className={s.header}>
      <div className={s.header_container}>
        <button
          type="button"
          onClick={() => router.push("/books")}
          className={s.logo_container}
        >
          <img src={logo.src} alt="logo"></img>
        </button>
        {!data ? (
          <div className={s.header_buttons}>
            <a href="/api/auth/login">
              <Button
                type="primary"
                shape="circle"
                icon={<UserOutlined />}
                size="large"
              />
            </a>
            <Badge count={countItems} showZero offset={[6, 11]}>
              <a href="/api/auth/login">
                <Button
                  type="primary"
                  shape="circle"
                  icon={<ShoppingCartOutlined />}
                  size="large"
                />
              </a>
            </Badge>
          </div>
        ) : (
          <div className={s.header_buttons}>
            <Button
              type="primary"
              shape="circle"
              icon={<UserOutlined />}
              size="large"
              onClick={() => router.push("/profile")}
            />
            <Badge count={countItems} showZero offset={[6, 11]}>
              <Button
                type="primary"
                shape="circle"
                icon={<ShoppingCartOutlined />}
                size="large"
                onClick={() => router.push("/cart")}
              />
            </Badge>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
