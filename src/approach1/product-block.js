import React from 'react';
import gql from 'graphql-tag';
import {useQuery} from '@apollo/react-hooks';
import PriceBlock, {PRICE_BLOCK_GRAGMENT} from './price-block';

const PRODUCT_QUERY = gql`
  query product($id: ProductId!, $quantity: Int) {
    product(id: $id, configuration: {quantity: $quantity}) {
      id
      price {
        ...PriceBlock
      }
    }
  }
  ${PRICE_BLOCK_GRAGMENT}
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
    return <PriceBlock productPrice={data.product.price} />;
  }
  return null;
};

export default ProductBlock;
