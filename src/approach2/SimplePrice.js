import React from 'react';
import {gql} from 'apollo-boost';
import BasePrice from './BasePrice';

function SimplePrice({price}) {
  return <BasePrice price={price.price} unit={price.unitType} />;
}
SimplePrice.fragment = gql`
  fragment SimplePrice on Price {
    ... on SimplePrice {
      price
      unitType
    }
  }
`;

export default SimplePrice;
