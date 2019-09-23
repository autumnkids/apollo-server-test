import React from 'react';
import gql from 'graphql-tag';
import SimplePrice, {SIMPLE_PRICE_FRAGMENT} from '../core/simple-price';

export const LIST_PRICE_FRAGMENT = gql`
  fragment ListPrice on Price {
    listPrice {
      ...SimplePrice
    }
  }
  ${SIMPLE_PRICE_FRAGMENT}
`;

const ListPrice = ({price}) =>
  price.listPrice && (
    <>
      {'List: '}
      <SimplePrice priceInfo={price.listPrice} />
    </>
  );

export default ListPrice;
