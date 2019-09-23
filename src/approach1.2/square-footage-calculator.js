import React from 'react';
import gql from 'graphql-tag';
import SimplePrice, {SIMPLE_PRICE_FRAGMENT} from './core/simple-price';

export const SQUARE_FOOTAGE_CALCULATOR_FRAGMENT = gql`
  fragment SquareFootageCalculator on Price {
    unitPrice {
      ...SimplePrice
    }
    configuredPrice {
      ...SimplePrice
    }
  }
  ${SIMPLE_PRICE_FRAGMENT}
`;

const SquareFootageCalculator = ({productPrice}) => {
  if (
    !productPrice ||
    !productPrice.unitPrice ||
    !productPrice.configuredPrice
  ) {
    return null;
  }
  return (
    <div>
      {`1 Box = `}
      <SimplePrice priceInfo={productPrice.unitPrice} />
      <p>
        {`Total Price: `}
        <SimplePrice priceInfo={productPrice.configuredPrice} />
      </p>
    </div>
  );
};

export default SquareFootageCalculator;
