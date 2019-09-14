import React from 'react';
import {useQuery} from '@apollo/react-hooks';
import {gql} from 'apollo-boost';
import Price from './Price';
import '../common/price-block.css';

function SalePriceDisplay({price}) {
  return price ? <Price price={price} /> : null;
}

function SuggestedRetailPrice({price}) {
  return price ? <Price price={price} /> : null;
}

function ListPrice({price}) {
  return price ? <Price price={price} /> : null;
}

function OnSalePrice({price}) {
  return price ? (
    <span className="PriceBlock-salePrice">
      <Price price={price} />
      <span> On Sale</span>
    </span>
  ) : null;
}

function PriceBlock({prices}) {
  const pricesHash = prices.reduce((acc, p) => {
    acc[p.priceDescriptor || p.__typename] = p;
    return acc;
  }, {});

  return (
    <div>
      <SalePriceDisplay price={pricesHash['SalePrice']} />
      <OnSalePrice price={pricesHash['OnSalePrice']} />
      <ListPrice price={pricesHash['ListPrice']} />
      <SuggestedRetailPrice price={pricesHash['SuggestedRetailPrice']} />
    </div>
  );
}
PriceBlock.fragment = gql`
  fragment PriceBlock on Price {
    ...Price
    ... on PriceInterface {
      priceDescriptor
    }
  }

  ${Price.fragment}
`;

export default PriceBlock;