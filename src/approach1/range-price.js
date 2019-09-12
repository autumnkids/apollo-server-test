import React from 'react';
import BasePrice from './base-price';
import gql from 'graphql-tag';

const FULL_RANGE_PRICE_FRAGMENT = gql`
  fragment FullRangePrice on RangePrice {
    min
    max
    unitType
  }
`;

const FullRangePrice = ({priceInfo}) => (
  <>
    <BasePrice price={priceInfo.min} unit={priceInfo.unitType} />
    {' - '}
    <BasePrice price={priceInfo.max} unit={priceInfo.unitType} />
  </>
);

const STARTING_PRICE_FRAGMENT = gql`
  fragment StartingPrice on RangePrice {
    min
    unitType
  }
`;

const StartingPrice = ({priceInfo}) => (
  <span>
    {'from '}
    <BasePrice price={priceInfo.min} unit={priceInfo.unitType} />
  </span>
);

export const RANGE_PRICE_FRAGMENT = gql`
  fragment RangePrice on RangePrice {
    ...FullRangePrice
    ...StartingPrice
  }
  ${FULL_RANGE_PRICE_FRAGMENT}
  ${STARTING_PRICE_FRAGMENT}
`;

const RangePrice = ({priceInfo}) => {
  return priceInfo.max ? (
    <FullRangePrice priceInfo={priceInfo} />
  ) : (
    <StartingPrice priceInfo={priceInfo} />
  );
};

export default RangePrice;
