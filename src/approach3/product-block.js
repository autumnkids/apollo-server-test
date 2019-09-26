import React from 'react';
import gql from 'graphql-tag';
import {useQuery} from '@apollo/react-hooks';
import PriceBlock, {PRICE_BLOCK_FRAGMENT} from './price-block';
import ProductSelector from '../common/product-selector';
import SquareFootageCalculator, {
  SQUARE_FOOTAGE_CALCULATOR_FRAGMENT
} from './square-footage-calculator';

const PRODUCT_QUERY = gql`
  query product($id: ProductId!, $quantity: Int) {
    product(id: $id, configuration: {quantity: $quantity}) {
      id
      prices {
        ...PriceBlock
        ...SquareFootageCalculator
      }
    }
  }
  ${PRICE_BLOCK_FRAGMENT}
  ${SQUARE_FOOTAGE_CALCULATOR_FRAGMENT}
`;

const ProductBlock = () => {
  const {loading, error, data, refetch} = useQuery(PRODUCT_QUERY, {
    variables: {id: 'NormalProduct', quantity: 1},
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
          return (
            <>
              <PriceBlock prices={data.product.prices} />
              <SquareFootageCalculator prices={data.product.prices} />
            </>
          );
        }
        return null;
      })()}
    </>
  );
};

export default ProductBlock;
