import React from 'react';
import gql from 'graphql-tag';
import SalePrice, {SALE_PRICE_FRAGMENT} from './sale-price';
import PerItemPrice, {PER_ITEM_PRICE_FRAGMENT} from './per-item-price';
import DiscountPrice, {DISCOUNT_PRICE_FRAGMENT} from './discount-price';
import MeasurementPrice, {
  MEASUREMENT_PRICE_FRAGMENT,
} from './measurement-price';
import ClearancePrice, {CLEARANCE_PRICE_FRAGMENT} from './clearance-price';
import SaleType, {SALE_TYPE_FRAGMENT} from './sale-type';
import '../../common/price-block.css';

export const PRICE_BLOCK_GRAGMENT = gql`
  fragment PriceBlock on Price {
    ...SalePrice
    ...PerItemPrice
    ...DiscountPrice
    ...MeasurementPrice
    ...ClearancePrice
    ...SaleType
  }
  ${SALE_PRICE_FRAGMENT}
  ${PER_ITEM_PRICE_FRAGMENT}
  ${DISCOUNT_PRICE_FRAGMENT}
  ${MEASUREMENT_PRICE_FRAGMENT}
  ${CLEARANCE_PRICE_FRAGMENT}
  ${SALE_TYPE_FRAGMENT}
`;

const PriceBlock = ({productPrice}) => (
  <>
    <SalePrice price={productPrice} />
    <PerItemPrice price={productPrice} />
    <DiscountPrice price={productPrice} />
    <MeasurementPrice price={productPrice} />
    <ClearancePrice price={productPrice} />
    <SaleType price={productPrice} />
  </>
);

export default PriceBlock;
