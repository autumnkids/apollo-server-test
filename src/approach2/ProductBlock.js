import React from 'react';
import gql from 'graphql-tag';
import {useQuery} from '@apollo/react-hooks';
import PriceBlock from './PriceBlock';
import RandomPrice from './RandomPrice';
import ProductSelector from '../common/product-selector';

const PRODUCT_QUERY = gql`
  query product($id: ProductId!) {
    product(id: $id) {
      prices {
        ...PriceBlock
      }
    }
  }

  ${PriceBlock.fragment}
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
          </>
        );
      })()}
    </>
  );
};

export default ProductBlock;