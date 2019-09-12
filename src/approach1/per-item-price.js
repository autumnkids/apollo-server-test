import React from 'react';
import gql from 'graphql-tag';
import SimplePrice, {SIMPLE_PRICE_FRAGMENT} from './simple-price';

export const PER_ITEM_PRICE_FRAGMENT = gql`
  fragment PerItemPrice on PerItemPrice {
    ...SimplePrice
  }
  ${SIMPLE_PRICE_FRAGMENT}
`;

const PerItemPrice = ({priceInfo}) => (
  <SimplePrice priceInfo={priceInfo} />
);

export default PerItemPrice;
