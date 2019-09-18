import React from 'react';
import gql from 'graphql-tag';
import BasePrice from '../common/base-price';

export const SIMPLE_PRICE_FRAGMENT = gql`
  fragment SimplePrice on PriceInterface {
    price
    measurementUnit
  }
`;

const SimplePrice = ({priceInfo}) => (
  <BasePrice price={priceInfo.price} unit={priceInfo.measurementUnit} />
);

export default SimplePrice;
