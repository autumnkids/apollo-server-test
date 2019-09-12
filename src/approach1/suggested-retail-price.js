import React from 'react';
import gql from 'graphql-tag';
import SimplePrice, {SIMPLE_PRICE_FRAGMENT} from './simple-price';

export const SUGGESTED_RETAIL_PRICE_FARGMENT = gql`
  fragment SuggestedRetailPrice on SuggestedRetailPrice {
    ...SimplePrice
  }
  ${SIMPLE_PRICE_FRAGMENT}
`;

const SuggestedRetailPrice = ({priceInfo}) => (
  <SimplePrice priceInfo={priceInfo} />
);

export default SuggestedRetailPrice;
