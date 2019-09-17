import React from 'react';
import gql from 'graphql-tag';
import {useQuery} from '@apollo/react-hooks';
import SalePrice, {SALE_PRICE_FRAGMENT} from './sale-price';

const PRODUCT_QUERY = gql`
  query product($id: ProductId!) {
    product(id: $id) {
      id
      prices {
        ...SalePrice
      }
    }
  }
  ${SALE_PRICE_FRAGMENT}
`;

const ProductBlock = () => {
  const {loading, error, data} = useQuery(PRODUCT_QUERY, {
    variables: {id: 'NormalProduct'},
    returnPartialData: true
  });
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (data) {
    return <SalePrice priceInfo={data.product.prices} />;
  }
};

export default ProductBlock;
