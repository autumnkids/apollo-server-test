import React from 'react';
import gql from 'graphql-tag';

export const SALE_TYPE_FRAGMENT = gql`
  fragment SaleType on Price {
    saleType
  }
`;

const SaleType = ({price}) =>
  price.saleType !== 'REGULAR' && <p>{price.saleType}</p>;

export default SaleType;
