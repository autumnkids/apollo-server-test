import React from 'react';
import gql from 'graphql-tag';
import {useQuery} from '@apollo/react-hooks';
import PriceBlock, {PRODUCT_PRICE_FRAGMENT} from './price-block';
import ProductSelector from '../common/product-selector';
import SquareFootageCalculator, {
  SQUARE_FOOTAGE_CALCULATOR_FRAGMENT
} from './square-footage-calculator';

const PRODUCT_QUERY = gql`
  query product($id: ProductId!, $quantity: Int) {
    product(id: $id) {
      id
      prices {
        ...ProductPrice
      }
      ...SquareFootageCalculator
    }
  }
  ${PRODUCT_PRICE_FRAGMENT}
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
          const {id} = data.product;
          const showSquareFootageCalculator =
            id === 'FlooringProduct' || id === 'WallpaperInDE';
          return (
            <>
              <PriceBlock prices={data.product.prices} />
              {showSquareFootageCalculator && (
                <SquareFootageCalculator product={data.product} />
              )}
            </>
          );
        }
      })()}
    </>
  );
};

export default ProductBlock;
