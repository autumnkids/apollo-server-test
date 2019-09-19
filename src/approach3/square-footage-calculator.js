import React from 'react';
import gql from 'graphql-tag';

export const SQUARE_FOOTAGE_CALCULATOR_FRAGMENT = gql`
  fragment SquareFootageCalculator on Product {
    unitPrice {
      customerPrice
    }
    quantityPrice(quantity: $quantity) {
      customerPrice
    }
  }
`;

const SquareFootageCalculator = ({product}) => {
  if (!product || !product.unitPrice || !product.quantityPrice) {
    return null;
  }
  const {unitPrice, quantityPrice} = product;
  return (
    <>
      <p>1 Box = {unitPrice.customerPrice}</p>
      <p>Total Price: {quantityPrice.customerPrice}</p>
    </>
  );
};

export default SquareFootageCalculator;
