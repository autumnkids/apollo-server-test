import React from 'react';
import gql from 'graphql-tag';
import SimplePrice, {SIMPLE_PRICE_FRAGMENT} from '../core/simple-price';
import RangePrice, {RANGE_PRICE_FRAGMENT} from '../core/range-price';
import PriceRestriction, {
  RESTRICTED_PRICE_FRAGMENT,
} from '../core/price-restriction';

export const SALE_PRICE_FRAGMENT = gql`
  fragment SalePrice on Price {
    salePrice {
      ...SimplePrice
      ...RangePrice
      ...RestrictedPrice
    }
  }
  ${SIMPLE_PRICE_FRAGMENT}
  ${RANGE_PRICE_FRAGMENT}
  ${RESTRICTED_PRICE_FRAGMENT}
`;

const InnerSalePrice = ({price}) => {
  if (price.__typename === 'SimplePrice') {
    return <SimplePrice priceInfo={price} />;
  }
  if (price.__typename === 'RangePrice') {
    return <RangePrice priceInfo={price} />;
  }
  if (price.__typename === 'RestrictedPrice') {
    return <PriceRestriction priceInfo={price} />;
  }
  return null;
};

const SalePrice = ({price}) => {
  if (!price.salePrice) {
    return null;
  }

  return (
    <span className="PriceBlock-salePrice">
      <InnerSalePrice price={price.salePrice} />
    </span>
  );
};

export default SalePrice;
