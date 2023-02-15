import Link from "next/link";
import s from '../../components/style/book.module.css';
import { Button } from 'antd';
import { ShoppingOutlined, ExportOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from "@apollo/client";
import { BOOK_QUERY } from '../api/query/getBook';
import { useRouter } from 'next/router'
import { UPDATE_ORDER_ITEM } from '../api/mutation/updateOrdrItem'
import { CREATE_ORDER_ITEM } from '../api/mutation/createOrderItem'
import { ITEMS_COUNT_QUERY } from '../api/query/getOrderItemsCount'
import { ITEMS_QUERY } from "../api/query/getOrderItems";
import { openNotification } from '../../components/Notification'
import { useState, useEffect } from "react";
import { CartItem } from "../api/types/Types";
import { useUser } from '@auth0/nextjs-auth0/client';


export default function Book() {
    const router = useRouter()
    const id = router.query.id as string;

    const [cartItem, setCartItem] = useState<CartItem>();

    const { data: bookData, loading, error } = useQuery(BOOK_QUERY, { variables: { id } });
    const { data: cart } = useQuery(ITEMS_COUNT_QUERY);

    const [createOrderItem] = useMutation(CREATE_ORDER_ITEM, {
        refetchQueries: [{ query: ITEMS_QUERY }, { query: ITEMS_COUNT_QUERY }]
    })
    const [updateOrderItem] = useMutation(UPDATE_ORDER_ITEM, {
        refetchQueries: [{ query: ITEMS_QUERY }, { query: ITEMS_COUNT_QUERY }]
    })

    const { user, isLoading } = useUser();

    useEffect(() => {
        if (cart?.orderItems) {
            setCartItem(cart.orderItems.find((e: CartItem) => e.product.id === id));
        }
    }, [cart])

    const addItemToCart = () => {
        if (cartItem) {
            updateOrderItem({ variables: { id: cartItem.id, input: cartItem.quantity + 1 } });
            openNotification(bookData)
        } else {
            createOrderItem({ variables: { id: id, email: user?.email, name: user?.name } })
            openNotification(bookData)
        }
    }

    if (loading) {
        return <p>loading...</p>;
    }
    if (error) {
        return <p>Ruh roh! {error.message}</p>;
    }

    if (bookData) {
        const { book } = bookData;
        return (<div className={s.book}>
            <div className={s.imgbox}>
                <img src={book.avatar.url} alt="example" />
            </div>
            <div className={s.info}>
                <div className={s.title}>{book.title}</div>
                <div className={s.author}>{book.author.name} (Author)</div>
                <div className={s.price}>${book.price}</div>
                <div><b>Publish Date:</b> {book.year}</div>
                <div><b>Genre:</b> {book.genre}</div>
                <div className={s.description}><b>Description:</b> {book.description}</div>
                {user ?
                    <Button type="primary" className={s.button} onClick={addItemToCart}>Add to cart</Button>
                    :
                    <a href="/api/auth/login">
                        <Button type="primary" className={s.button}>Add to cart</Button>
                    </a>
                }
                <div className={s.shipping_return}>
                    <div className={s.shipping}>
                        <ShoppingOutlined style={{ fontSize: '50px' }} />
                        <div>
                            <p>Free shipping</p>
                            Free shipping on orders of 100 USD or more
                        </div>
                    </div>
                    <div className={s.return}>
                        <ExportOutlined style={{ fontSize: '45px' }} />
                        <div>
                            <p>Easy Returns and Exchanges</p>
                            Possibility of return within 30 days of receiving the order
                        </div>
                    </div>
                </div>
            </div>
        </div>)
    }


}
