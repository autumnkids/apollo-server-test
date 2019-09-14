import React from 'react';
import gql from 'graphql-tag';
import {useQuery} from '@apollo/react-hooks';
import PriceBlock, {PRICE_BLOCK_GRAGMENT} from './price-block';
import ProductSelector from './product-selector';
import SquareFootageCalculator, {
  SQUARE_FOOTAGE_CALCULATOR_FRAGMENT
} from './square-footage-calculator';

const PRODUCT_QUERY = gql`
  query product($id: ProductId!, $quantity: Int) {
    product(id: $id, configuration: {quantity: $quantity}) {
      id
      price {
        ...PriceBlock
        ...SquareFootageCalculator
      }
    }
  }
  ${PRICE_BLOCK_GRAGMENT}
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
          const showSquareFootageCalculator =
            data.product.id === 'FlooringProduct' ||
            data.product.id === 'WallpaperInDE';
          return (
            <>
              <PriceBlock productPrice={data.product.price} />
              {showSquareFootageCalculator && (
                <SquareFootageCalculator productPrice={data.product.price} />
              )}
            </>
          );
        }
        return null;
      })()}
    </>
  );
};

export default ProductBlock;
