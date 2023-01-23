import gql from 'graphql-tag';

export const ITEMS_COUNT_QUERY = gql`
    query orderItemsCount{
        orderItemsCount
}
`;