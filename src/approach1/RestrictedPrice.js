import React from 'react';
import {gql} from 'apollo-boost';

function RestrictedPrice({price}) {
  return price.restrictionReason;
}
RestrictedPrice.fragment = gql`
  fragment RestrictedPrice on Price {
    ... on RestrictedPrice {
      restrictionReason
    }
  }
`;

export default RestrictedPrice;
