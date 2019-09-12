import React from 'react';
import gql from 'graphql-tag';
import SalePrice, {SALE_PRICE_FRAGMENT} from './sale-price';
import ListPrice, {LIST_PRICE_FRAGMENT} from './list-price';
import SuggestedRetailPrice, {
  SUGGESTED_RETAIL_PRICE_FARGMENT
} from './suggested-retail-price';
import PerItemPrice, {PER_ITEM_PRICE_FRAGMENT} from './per-item-price';

export const PRICE_BLOCK_GRAGMENT = gql`
  fragment PriceBlock on Price {
    salePrice {
      ...SalePrice
    }
    listPrice {
      ...ListPrice
    }
    suggestedRetailPrice {
      ...SuggestedRetailPrice
    }
    perItemPrice {
      ...PerItemPrice
    }
    discount {
      savedPercent
    }
    saleType
  }
  ${SALE_PRICE_FRAGMENT}
  ${LIST_PRICE_FRAGMENT}
  ${SUGGESTED_RETAIL_PRICE_FARGMENT}
  ${PER_ITEM_PRICE_FRAGMENT}
`;

const PriceBlock = ({productPrice}) => (
  <>
    {productPrice.salePrice && <SalePrice priceInfo={productPrice.salePrice} />}
    {productPrice.perItemPrice && (
      <PerItemPrice priceInfo={productPrice.perItemPrice} />
    )}
    {productPrice.discount && (
      <>
        {productPrice.listPrice && (
          <ListPrice priceInfo={productPrice.listPrice} />
        )}
        {productPrice.suggestedRetailPrice && (
          <SuggestedRetailPrice priceInfo={productPrice.suggestedRetailPrice} />
        )}
        {`${productPrice.discount.savedPercent}% Off`}
      </>
    )}
    {productPrice.saleType !== 'REGULAR' && <p>{productPrice.saleType}</p>}
  </>
);

export default PriceBlock;
