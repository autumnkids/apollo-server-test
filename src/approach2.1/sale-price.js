import React from 'react';
import gql from 'graphql-tag';
import SimplePrice, {SIMPLE_PRICE_FRAGMENT} from './simple-price';
import RangePrice, {RANGE_PRICE_FRAGMENT} from './range-price';
import PriceRestriction, {RESTRICTED_PRICE_FRAGMENT} from './price-restriction';

export const SALE_PRICE_FRAGMENT = gql`
  fragment SalePrice on SalePrice {
    ...SimplePrice
    ...RangePrice
    ...RestrictedPrice
  }
  ${SIMPLE_PRICE_FRAGMENT}
  ${RANGE_PRICE_FRAGMENT}
  ${RESTRICTED_PRICE_FRAGMENT}
`;

const SalePrice = ({priceInfo}) => {
  if (priceInfo.__typename === 'SimplePrice') {
    return <SimplePrice priceInfo={priceInfo} />;
  }
  if (priceInfo.__typename === 'RangePrice') {
    return <RangePrice priceInfo={priceInfo} />;
  }
  if (priceInfo.__typename === 'RestrictedPrice') {
    return <PriceRestriction priceInfo={priceInfo} />;
  }
  return null;
};

export default SalePrice;
