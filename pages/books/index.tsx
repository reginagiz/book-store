import { gql } from "@apollo/client";
import client from "../../helpers/appolo-client"
import Link from "next/link";
import { Card } from 'antd';
import s from './allBooks.module.css'



export default function Books({ data }: any) {
    const { Meta } = Card;
    return (
        <div className={s.listBooks}>
            {data.map((item: any) => (
            <Link href={`/books/${item.id}`}>
                <Card
                    hoverable
                    style={{ width: 280, margin: 20}}
                    cover={<img src={item.avatar.url} alt="example" style={{width: 280,height: 370 }} />}
                >
                    <div key={item.id}>
                        <Meta title={item.title} description={item.author.name} />
                    </div>
                </Card>
                </Link>
            ))}
        </div>
    );
}
export async function getStaticProps() {
    const { data } = await client.query({
        query: gql`
        query {
          books {
            id
            title
            avatar{
                url
            }
            author{
                name
              }
          }
        }
      `,
    });

    return {
        props: {
            data: data.books,
        },
    };
}
