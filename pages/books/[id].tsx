import { gql } from "@apollo/client";
import client from "../../helpers/appolo-client"
import Link from "next/link";
import s from './book.module.css';
import { Button } from 'antd';
import { ShoppingOutlined, ExportOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from "@apollo/client";
import { BOOK_QUERY } from '../api/query/getBook';
import { useRouter } from 'next/router'



export default function Book() {
    const router = useRouter()
    const id = router.query.id as string

    const { data, loading, error } = useQuery(BOOK_QUERY, { variables: { id } });
    if (loading) {
        return <p>loading...</p>;
    }
    if (error) {
        return <p>Ruh roh! {error.message}</p>;
    }
    const { book } = data
    return (
        <div className={s.book}>
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
                {/* <Button type="primary" className={s.button} onClick={() =>  createOrderItem(orderBookId) }>Add to cart</Button> */}
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
        </div>
    );
}

// export async function getStaticPaths() {
//     const { data } = await client.query({
//         query: gql`
//         query {
//           books {
//             id
//           }
//         }
//       `,
//     });
//     const paths = data.books.map((item: any) => ({
//         params: {
//             id: item.id,
//         },
//     }));

//     return { paths, fallback: false };
// }
// export async function createOrderItem(orderBookId: any) {
//     const id = orderBookId;
//     const { data } = await client.mutate({
//         mutation: gql`
//         mutation MutationCreateOrderItem($id:ID!) {
//             createOrderItem(data: { quantity: 1, product: { connect: { id: $id } } }) {
//               quantity
//               product {
//                 title
//                 id
//                 price
//                 author {
//                   name
//                 }
//               }
//             }
//           }
//         `,
//         variables: { id },
//     });
//     return {
//         props: {
//             data: data.OrderItem,
//         },
//     };
// }

// export async function getStaticProps({ params }: any) {
//     const { id } = params;
//     const { data } = await client.query({
//         query: gql`
//         query getBookById($id:ID) {
//             book(where: { id: $id }){
//                 title
//                 id
//                 year
//                 genre
//                 price
//                 description
//                 avatar{
//                     url
//                 }
//                 author{
//                     name
//                   }
//               }
//             }
//         `,
//         variables: { id },
//     });
//     return {
//         props: {
//             data: data.book,
//         },
//     };
// }




