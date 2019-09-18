import React from 'react';
import gql from 'graphql-tag';

export const PRICE_RESTRICTION_FRAGMENT = gql`
  fragment PriceRestriction on RestrictedPrice {
    reason
  }
`;

const PriceRestriction = ({priceInfo}) => {
  if (priceInfo.reason) {
    return <span>{priceInfo.reason}</span>;
  }
  return null;
};

export default PriceRestriction;
