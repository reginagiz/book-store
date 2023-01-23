import gql from 'graphql-tag';

export const BOOKS_QUERY = gql`
  query BOOKS_QUERY {
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
`;

