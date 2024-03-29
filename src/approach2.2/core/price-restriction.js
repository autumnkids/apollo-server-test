import React from 'react';
import gql from 'graphql-tag';

export const RESTRICTED_PRICE_FRAGMENT = gql`
  fragment RestrictedPrice on RestrictedPrice {
    restrictionReason
  }
`;

const PriceRestriction = ({priceInfo}) => (
  <span>{priceInfo.restrictionReason}</span>
);

export default PriceRestriction;
