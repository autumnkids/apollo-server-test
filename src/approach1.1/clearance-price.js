import React from 'react';
import gql from 'graphql-tag';
import SimplePrice, {SIMPLE_PRICE_FRAGMENT} from './simple-price';
import RangePrice, {RANGE_PRICE_FRAGMENT} from './range-price';

export const CLEARANCE_PRICE_FRAGMENT = gql`
  fragment ClearancePrice on ClearancePrice {
    ...SimplePrice
    ...RangePrice
  }
  ${SIMPLE_PRICE_FRAGMENT}
  ${RANGE_PRICE_FRAGMENT}
`;

const ClearancePrice = ({priceInfo}) => (
  <p>
    {'Open Box Price: '}
    {(() => {
      if (priceInfo.__typename === 'SimplePrice') {
        return <SimplePrice priceInfo={priceInfo} />;
      }
      if (priceInfo.__typename === 'RangePrice') {
        return <RangePrice priceInfo={priceInfo} />;
      }
      return null;
    })()}
  </p>
);

export default ClearancePrice;
