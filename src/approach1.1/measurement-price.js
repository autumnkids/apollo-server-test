import React from 'react';
import gql from 'graphql-tag';
import SimplePrice, {SIMPLE_PRICE_FRAGMENT} from './simple-price';

export const MEASUREMENT_PRICE_FRAGMENT = gql`
  fragment MeasurementPrice on MeasurementPrice {
    ...SimplePrice
  }
  ${SIMPLE_PRICE_FRAGMENT}
`;

const MeasurementPrice = ({priceInfo}) => <SimplePrice priceInfo={priceInfo} />;

export default MeasurementPrice;
