import logo from '../logo.png'
import React, { useEffect, useState } from 'react';
import s from './style/Header.module.css'
import Link from "next/link";
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { Badge } from 'antd';
import { ITEMS_QUERY } from '../pages/api/query/getOrderItems';
import { useQuery } from "@apollo/client";
import { CartItem } from '@/pages/api/types/Types';

const Header = () => {
  const [countItems, setCountItems] = useState<number>(0);

  const { data, loading, error } = useQuery(ITEMS_QUERY);

  useEffect(() => {
    setCountItems(data?.orderItems.reduce((acc: number, curent: CartItem) => {
      return acc + curent.quantity;
    }, 0))
  }, [data])

  if (loading) {
    return <p>loading...</p>;
  }
  if (error) {
    return <p>Ruh roh! {error.message}</p>;
  }

  return (
    <div className={s.header}>
      <div className={s.logobox}>
        <Link href="/">
          <img src={logo.src} alt="logo" className={s.logo}></img>
        </Link>
      </div>
      <div className={s.books}>
        <Link href="/books">All books</Link>
      </div>
      <div className={s.button} >
        <Badge count={countItems} showZero offset={[6, 11]}>
          <Link href="/cart">
            <Button type="primary" shape="circle" icon={<ShoppingCartOutlined />} size='large' />
          </Link>
        </Badge>
      </div>
    </div>
  )
}

export default Header;