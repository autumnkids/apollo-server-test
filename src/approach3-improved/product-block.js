import React from 'react';
import gql from 'graphql-tag';
import {useQuery} from '@apollo/react-hooks';
import PriceBlock, {PRICE_BLOCK_FRAGMENT} from './price-block';
import ProductSelector from '../common/product-selector';

const PRODUCT_QUERY = gql`
  query product($id: ProductId!) {
    product(id: $id) {
      id
      prices {
        ...PriceBlock
      }
    }
  }
  ${PRICE_BLOCK_FRAGMENT}
`;

const ProductBlock = () => {
  const {loading, error, data, refetch} = useQuery(PRODUCT_QUERY, {
    variables: {id: 'NormalProduct'},
    returnPartialData: true
  });
  return (
    <>
      <ProductSelector onChange={variables => refetch(variables)} />
      {(() => {
        if (loading) {
          return <div>Loading...</div>;
        }
        if (error) {
          return <div>Error: {error.message}</div>;
        }
        if (data) {
          return <PriceBlock prices={data.product.prices} />;
        }
        return null;
      })()}
    </>
  );
};

export default ProductBlock;
