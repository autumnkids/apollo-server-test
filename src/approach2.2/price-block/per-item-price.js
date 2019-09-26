import React from 'react';
import gql from 'graphql-tag';
import SimplePrice, {SIMPLE_PRICE_FRAGMENT} from '../core/simple-price';

export const PER_ITEM_PRICE_FRAGMENT = gql`
  fragment PerItemPrice on Price {
    perItemPrice {
      ...SimplePrice
    }
  }
  ${SIMPLE_PRICE_FRAGMENT}
`;

const PerItemPrice = ({price}) =>
  price.perItemPrice && <SimplePrice priceInfo={price.perItemPrice} />;

export default PerItemPrice;
