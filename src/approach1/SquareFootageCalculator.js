import React from 'react';
import gql from 'graphql-tag';

const SquareFootageCalculator = ({prices}) => {
  const pricesHash = prices.reduce((acc, price) => {
    acc[price.priceDescriptor] = price;
    return acc;
  }, {});
  const smallestPurchasablePrice = pricesHash['SmallestPurchasablePrice'];
  const configuredPrice = pricesHash['ConfiguredPrice'];
  console.log('yzhou', {smallestPurchasablePrice, configuredPrice});
  if (!smallestPurchasablePrice || !configuredPrice) {
    return null;
  }
  return (
    <>
      <p>1 Box = {smallestPurchasablePrice.price}</p>
      <p>Total Price: {configuredPrice.price}</p>
    </>
  );
};
SquareFootageCalculator.fragment = gql`
  fragment SquareFootageCalculator on Price {
    ... on SimplePrice {
      price
    }
    ... on PriceInterface {
      priceDescriptor
    }
  }
`;

export default SquareFootageCalculator;
