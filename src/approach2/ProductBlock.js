import React from 'react';
import gql from 'graphql-tag';
import {useQuery} from '@apollo/react-hooks';
import PriceBlock from './PriceBlock';
import RandomPrice from './RandomPrice';

const PRODUCT_QUERY = gql`
  query {
    product(id: NormalProduct) {
      prices {
        ...PriceBlock
      }
    }
  }

  ${PriceBlock.fragment}
`;

const ProductBlock = () => {
  const {loading, error, data, ...rest} = useQuery(PRODUCT_QUERY, {
    returnPartialData: true,
  });

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
};

export default ProductBlock;
