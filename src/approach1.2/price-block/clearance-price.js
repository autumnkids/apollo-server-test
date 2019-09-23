import React from 'react';
import gql from 'graphql-tag';
import SimplePrice, {SIMPLE_PRICE_FRAGMENT} from '../core/simple-price';
import RangePrice, {RANGE_PRICE_FRAGMENT} from '../core/range-price';

export const CLEARANCE_PRICE_FRAGMENT = gql`
  fragment ClearancePrice on Price {
    clearancePrice {
      ...SimplePrice
      ...RangePrice
    }
  }
  ${SIMPLE_PRICE_FRAGMENT}
  ${RANGE_PRICE_FRAGMENT}
`;

const ClearancePrice = ({price}) =>
  price.clearancePrice && (
    <p>
      {'Open Box Price: '}
      {(() => {
        if (price.__typename === 'SimplePrice') {
          return <SimplePrice priceInfo={price.clearancePrice} />;
        }
        if (price.__typename === 'RangePrice') {
          return <RangePrice priceInfo={price.clearancePrice} />;
        }
        return null;
      })()}
    </p>
  );

export default ClearancePrice;
