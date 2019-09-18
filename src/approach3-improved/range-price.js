import React from 'react';
import gql from 'graphql-tag';
import BasePrice from '../common/base-price';

export const RANGE_PRICE_FRAGMENT = gql`
  fragment RangePrice on PriceInterface {
    measurementUnit
    ... on RangePriceInterface {
      min
      max
    }
  }
`;

const RangePrice = ({priceInfo}) => {
  if (priceInfo.min && priceInfo.max) {
    return (
      <>
        <BasePrice price={priceInfo.min} unit={priceInfo.measurementUnit} />
        {' - '}
        <BasePrice price={priceInfo.max} unit={priceInfo.measurementUnit} />
      </>
    );
  }
  if (priceInfo.min) {
    return (
      <>
        {'from '}
        <BasePrice price={priceInfo.min} unit={priceInfo.measurementUnit} />
      </>
    );
  }
  return null;
};

export default RangePrice;
