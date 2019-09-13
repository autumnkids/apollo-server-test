import React from 'react';
import {gql} from 'apollo-boost';

function PriceDiscount({price}) {
  return <span>{price.savedPercent}% Off</span>;
}
PriceDiscount.fragment = gql`
  fragment PriceDiscount on Price {
    ... on PriceDiscount {
      savedPercent
    }
  }
`;

export default PriceDiscount;
