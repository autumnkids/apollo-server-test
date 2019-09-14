import React from 'react';
import gql from 'graphql-tag';
import SimplePrice, {SIMPLE_PRICE_FRAGMENT} from './simple-price';

export const LIST_PRICE_FRAGMENT = gql`
  fragment ListPrice on ListPrice {
    ...SimplePrice
  }
  ${SIMPLE_PRICE_FRAGMENT}
`;

const ListPrice = ({priceInfo}) => (
  <>
    {'List: '}
    <SimplePrice priceInfo={priceInfo} />
  </>
);

export default ListPrice;
