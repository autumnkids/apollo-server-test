import React from 'react';
import gql from 'graphql-tag';
import SimplePrice, {SIMPLE_PRICE_FRAGMENT} from '../core/simple-price';

export const SUGGESTED_RETAIL_PRICE_FARGMENT = gql`
  fragment SuggestedRetailPrice on Price {
    suggestedRetailPrice {
      ...SimplePrice
    }
  }
  ${SIMPLE_PRICE_FRAGMENT}
`;

const SuggestedRetailPrice = ({price}) =>
  price.suggestedRetailPrice && (
    <>
      {'RRP: '}
      <SimplePrice priceInfo={price.suggestedRetailPrice} />
    </>
  );

export default SuggestedRetailPrice;
