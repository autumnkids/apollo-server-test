import React from 'react';
import {gql} from 'apollo-boost';
import SimplePrice from './SimplePrice';
import RangePrice from './RangePrice';
import RestrictedPrice from './RestrictedPrice';
import PriceDiscount from './PriceDiscount';

const priceTypeMapping = {
  SimplePrice: SimplePrice,
  RangePrice: RangePrice,
  RestrictedPrice: RestrictedPrice,
  PriceDiscount: PriceDiscount,
};

const Price = ({price}) => {
  const PriceComponent = priceTypeMapping[price.__typename];

  return PriceComponent ? <PriceComponent price={price} /> : null;
};
Price.fragment = gql`
  fragment Price on Price {
    ...SimplePrice
    ...RangePrice
    ...RestrictedPrice
    ...PriceDiscount
  }

  ${SimplePrice.fragment}
  ${RangePrice.fragment}
  ${RestrictedPrice.fragment}
  ${PriceDiscount.fragment}
`;

export default Price;
