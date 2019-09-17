import React from 'react';
import gql from 'graphql-tag';

export const SALE_PRICE_FRAGMENT = gql`
  fragment SalePrice on CustomerPrice {
    price
    display
    appliedDiscount {
      appliedDiscountType
      listDiscount {
        percent
      }
    }
    saleType
  }
`;

const SalePrice = ({priceInfo}) => <div>{JSON.stringify(priceInfo)}</div>;

export default SalePrice;
