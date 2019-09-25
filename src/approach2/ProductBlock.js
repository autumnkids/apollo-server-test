import React from 'react';
import gql from 'graphql-tag';
import {useQuery} from '@apollo/react-hooks';
import PriceBlock from './PriceBlock';
import SquareFootageCalculator from './SquareFootageCalculator';
import RandomPrice from './RandomPrice';
import ProductSelector from '../common/product-selector';

const PRODUCT_QUERY = gql`
  query product($id: ProductId!, $quantity: Int) {
    product(id: $id, configuration: {quantity: $quantity}) {
      prices(
        filter: [
          OnSalePrice
          NormalPrice
          ListPrice
          SuggestedRetailPrice
          ClearancePrice
          SmallestPurchasablePrice
          ConfiguredPrice
          PricePerItem
          UnitPrice
        ]
      ) {
        ...PriceBlock
        ...SquareFootageCalculator
      }
    }
  }

  ${PriceBlock.fragment}
  ${SquareFootageCalculator.fragment}
`;

const ProductBlock = () => {
  const {loading, error, data, refetch} = useQuery(PRODUCT_QUERY, {
    variables: {id: 'NormalProduct', quantity: 1},
    returnPartialData: true,
  });

  return (
    <>
      <ProductSelector onChange={variables => refetch(variables)} />
      {(() => {
        if (loading) {
          return 'Loading...';
        }
        if (error) {
          return `Error: ${JSON.stringify(error.message)}`;
        }

        return (
          <>
            <PriceBlock prices={data.product.prices} />
            <div>Somwhere else on the page...</div>
            <RandomPrice prices={data.product.prices} />
            <SquareFootageCalculator prices={data.product.prices} />
          </>
        );
      })()}
    </>
  );
};

export default ProductBlock;
