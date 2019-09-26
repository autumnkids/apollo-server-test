import React from 'react';
import ListPrice, {LIST_PRICE_FRAGMENT} from './list-price';
import SuggestedRetailPrice, {
  SUGGESTED_RETAIL_PRICE_FARGMENT,
} from './suggested-retail-price';
import gql from 'graphql-tag';

export const DISCOUNT_PRICE_FRAGMENT = gql`
  fragment DiscountPrice on Price {
    discount {
      savedPercent
    }
    ...ListPrice
    ...SuggestedRetailPrice
  }
  ${LIST_PRICE_FRAGMENT}
  ${SUGGESTED_RETAIL_PRICE_FARGMENT}
`;

const DiscountPrice = ({price}) => {
  if (!price.discount) {
    return null;
  }

  return (
    <>
      <span className="PriceBlock-strikethrough">
        <ListPrice price={price} />
        <SuggestedRetailPrice price={price} />
      </span>
      <span className="PriceBlock-percentageOff">
        {`${price.discount.savedPercent}% Off`}
      </span>
    </>
  );
};

export default DiscountPrice;
