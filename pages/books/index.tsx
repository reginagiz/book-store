import Link from "next/link";
import { Card } from "antd";
import s from "../../components/style/AllBooks.module.css";
import { useQuery } from "@apollo/client";
import { BOOKS_QUERY } from "../api/query/getAllBooks";
import { Product } from "../api/types/Types";

export default function Books() {
  const { Meta } = Card;
  const { data, loading, error } = useQuery(BOOKS_QUERY);
  if (loading) {
    return <p>loading...</p>;
  }
  if (error) {
    return <p>Ruh roh! {error.message}</p>;
  }

  return (
    <div className={s.listBooks}>
      <div className={s.listBooks_container}>
        {data?.books?.map((item: Product) => (
          <Link href={`/books/${item.id}`} key={item.id}>
            <Card
              hoverable
              style={{ width: 290, margin: 20 }}
              cover={
                <img
                  src={item?.avatar?.url}
                  alt="example"
                  style={{ width: 290, height: 380 }}
                />
              }
            >
              <div key={item.id}>
                <Meta title={item.title} description={item.author.name} />
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
