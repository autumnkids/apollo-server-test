import React from 'react';
import gql from 'graphql-tag';
import SimplePrice, {SIMPLE_PRICE_FRAGMENT} from './simple-price';
import RangePrice, {RANGE_PRICE_FRAGMENT} from './range-price';
import PriceRestriction, {
  PRICE_RESTRICTION_FRAGMENT
} from './price-restriction';

export const PRICE_FRAGMENT = gql`
  fragment Price on PriceInterface {
    ...SimplePrice
    ... on RangePriceInterface {
      ...RangePrice
    }
    ... on RestrictedPrice {
      ...PriceRestriction
    }
  }
  ${SIMPLE_PRICE_FRAGMENT}
  ${RANGE_PRICE_FRAGMENT}
  ${PRICE_RESTRICTION_FRAGMENT}
`;

const Price = ({priceInfo}) => {
  if (priceInfo.min || priceInfo.max) {
    return <RangePrice priceInfo={priceInfo} />;
  }
  if (priceInfo.price) {
    return <SimplePrice priceInfo={priceInfo} />;
  }
  if (priceInfo.reason) {
    return <PriceRestriction priceInfo={priceInfo} />;
  }
  return null;
};

export default Price;
