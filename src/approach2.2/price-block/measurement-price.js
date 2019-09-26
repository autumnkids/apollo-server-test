import React from 'react';
import gql from 'graphql-tag';
import SimplePrice, {SIMPLE_PRICE_FRAGMENT} from '../core/simple-price';

export const MEASUREMENT_PRICE_FRAGMENT = gql`
  fragment MeasurementPrice on Price {
    measurementPrice {
      ...SimplePrice
    }
  }
  ${SIMPLE_PRICE_FRAGMENT}
`;

const MeasurementPrice = ({price}) =>
  price.measurementPrice && (
    <p>
      <SimplePrice priceInfo={price.measurementPrice} />
    </p>
  );

export default MeasurementPrice;
