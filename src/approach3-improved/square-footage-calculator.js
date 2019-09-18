import React from 'react';
import gql from 'graphql-tag';
import BasePrice from '../common/base-price';

export const SQUARE_FOOTAGE_CALCULATOR_FRAGMENT = gql`
  fragment SquareFootageCalculator on PriceInterface {
    ... on CustomerPrice {
      price
      measurementUnit
    }
  }
`;

const SquareFootageCalculator = ({prices}) => {
  const customerPrices = prices.filter(
    priceInfo => priceInfo.__typename === 'CustomerPrice'
  );
};

export default SquareFootageCalculator;
