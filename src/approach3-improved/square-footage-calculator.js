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
    priceInfo =>
      priceInfo.__typename === 'CustomerPrice' &&
      priceInfo.measurementUnit === 'REGULAR'
  );
  console.log(customerPrices);
  if (customerPrices.length === 2) {
    return (
      <>
        <p>{`1 Box = $${customerPrices[0].price}`}</p>
        <p>{`Total Price: $${customerPrices[1].price}`}</p>
      </>
    );
  }
  return null;
};

export default SquareFootageCalculator;
