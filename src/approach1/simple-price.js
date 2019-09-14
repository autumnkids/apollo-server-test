import React from 'react';
import BasePrice from '../common/base-price';
import gql from 'graphql-tag';

export const SIMPLE_PRICE_FRAGMENT = gql`
  fragment SimplePrice on SimplePrice {
    price
    unitType
  }
`;

const SimplePrice = ({priceInfo}) => (
  <BasePrice price={priceInfo.price} unit={priceInfo.unitType} />
);

export default SimplePrice;
