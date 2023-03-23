import logo from '../components/images/logo.png'
import React, { useEffect, useState, useContext } from 'react';
import s from './style/Header.module.css'
import Link from "next/link";
import { ShoppingCartOutlined, UserOutlined, UserDeleteOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { Badge } from 'antd';
import { CUSTOMER } from '../pages/api/query/getCustomer';
import { useMutation, useQuery } from "@apollo/client";
import { CartItem } from '@/pages/api/types/Types';
import { useUser } from '@auth0/nextjs-auth0/client';
import { CREATE_CUSTOMER } from '../pages/api/mutation/createCustomer'


const Header = () => {
  const [countItems, setCountItems] = useState<number>(0);

  const { user, isLoading } = useUser();

  const { data, loading, error } = useQuery(CUSTOMER, { variables: { email: user?.email, status: { equals: "unarchived" } } });
  const [createCustomer] = useMutation(CREATE_CUSTOMER, {
    refetchQueries: [{ query: CUSTOMER, variables: { email: user?.email, status: { equals: "unarchived" } } }],
    awaitRefetchQueries: true
  })

  useEffect(() => {
    if (data)
      setCountItems(data?.customer?.orderitems.reduce((acc: number, curent: CartItem) => {
        return acc + curent.quantity;
      }, 0))
  }, [data])

  useEffect(() => {
    if (!loading && !data && user) {
      createCustomer({ variables: { email: user?.email, name: user?.name } })
    }
  }, [data, user])

  return (
    <>{!data ?
      <div className={s.header}>
        <div className={s.logobox}>
          <Link href="/">
            <img src={logo.src} alt="logo" className={s.logo}></img>
          </Link>
        </div>
        <div className={s.books}>
          <Link href="/books">All books</Link>
        </div>
        <div className={s.buttons} >
          <div className={s.user_button_auth}>
            <a href="/api/auth/login">
              <Button type="primary" shape="circle" icon={<UserOutlined />} size='large' />
            </a>
          </div>
          <div className={s.cart_button}>
            <Badge count={countItems} showZero offset={[6, 11]}>
              <a href="/api/auth/login">
                <Button type="primary" shape="circle" icon={<ShoppingCartOutlined />} size='large' />
              </a>
            </Badge>
          </div>
        </div>
      </div>
      :
      <div className={s.header}>
        <div className={s.logobox}>
          <Link href="/">
            <img src={logo.src} alt="logo" className={s.logo}></img>
          </Link>
        </div>
        <div className={s.books}>
          <Link href="/books">All books</Link>
        </div>
        <div className={s.buttons} >
          <div className={s.user_button}>
            <Link href="/profile">
              <Button type="primary" shape="circle" icon={<UserOutlined />} size='large' />
              <div className={s.user_name}>{data?.customer?.email}</div>
            </Link>
          </div>
          <div className={s.cart_button}>
            <Badge count={countItems} showZero offset={[6, 11]}>
              <Link href="/cart">
                <Button type="primary" shape="circle" icon={<ShoppingCartOutlined />} size='large' />
              </Link>
            </Badge>
          </div>
        </div>
      </div>
    }
    </>

  )
}

export default Header;