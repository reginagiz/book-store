import { gql } from '@apollo/client';
import client from '../../../helpers/appolo-client';

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query {
        books {
          id
          title
          year
          genre
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
