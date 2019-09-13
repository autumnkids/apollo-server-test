import React from 'react';
import {gql} from 'apollo-boost';
import BasePrice from './BasePrice';

function FullRangePrice({price}) {
  return (
    <>
      <BasePrice price={price.min} unit={price.unitType} />
      {' - '}
      <BasePrice price={price.max} unit={price.unitType} />
    </>
  );
}
FullRangePrice.fragment = gql`
  fragment FullRangePrice on Price {
    ... on RangePrice {
      min
      max
      unitType
    }
  }
`;

function StartingPrice({price}) {
  return (
    <>
      <span>from </span>
      <BasePrice price={price.min} unit={price.unitType} />
    </>
  );
}
StartingPrice.fragment = gql`
  fragment StartingPrice on Price {
    ... on RangePrice {
      min
      unitType
    }
  }
`;

function RangePrice({price}) {
  return price.max ? (
    <FullRangePrice price={price} />
  ) : (
    <StartingPrice price={price} />
  );
}
RangePrice.fragment = gql`
  fragment RangePrice on Price {
    ...FullRangePrice
    ...StartingPrice
  }

  ${FullRangePrice.fragment}
  ${StartingPrice.fragment}
`;

export default RangePrice;
