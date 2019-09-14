import React from 'react';
import gql from 'graphql-tag';
import SalePrice, {SALE_PRICE_FRAGMENT} from './sale-price';
import ListPrice, {LIST_PRICE_FRAGMENT} from './list-price';
import SuggestedRetailPrice, {
  SUGGESTED_RETAIL_PRICE_FARGMENT
} from './suggested-retail-price';
import PerItemPrice, {PER_ITEM_PRICE_FRAGMENT} from './per-item-price';
import MeasurementPrice, {
  MEASUREMENT_PRICE_FRAGMENT
} from './measurement-price';
import ClearancePrice, {CLEARANCE_PRICE_FRAGMENT} from './clearance-price';
import '../price-block.css';

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
    measurementPrice {
      ...MeasurementPrice
    }
    clearancePrice {
      ...ClearancePrice
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
  ${MEASUREMENT_PRICE_FRAGMENT}
  ${CLEARANCE_PRICE_FRAGMENT}
`;

const PriceBlock = ({productPrice}) => (
  <>
    {productPrice.salePrice && (
      <span className="PriceBlock-salePrice">
        <SalePrice priceInfo={productPrice.salePrice} />
      </span>
    )}
    {productPrice.perItemPrice && (
      <PerItemPrice priceInfo={productPrice.perItemPrice} />
    )}
    {productPrice.discount && (
      <>
        <span className="PriceBlock-strikethrough">
          {productPrice.listPrice && (
            <ListPrice priceInfo={productPrice.listPrice} />
          )}
          {productPrice.suggestedRetailPrice && (
            <SuggestedRetailPrice
              priceInfo={productPrice.suggestedRetailPrice}
            />
          )}
        </span>
        <span className="PriceBlock-percentageOff">
          {`${productPrice.discount.savedPercent}% Off`}
        </span>
      </>
    )}
    {productPrice.measurementPrice && (
      <p>
        <MeasurementPrice priceInfo={productPrice.measurementPrice} />
      </p>
    )}
    {productPrice.clearancePrice && (
      <ClearancePrice priceInfo={productPrice.clearancePrice} />
    )}
    {productPrice.saleType !== 'REGULAR' && <p>{productPrice.saleType}</p>}
  </>
);

export default PriceBlock;
