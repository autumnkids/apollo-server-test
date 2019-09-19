import React from 'react';
import {gql} from 'apollo-boost';
import Price from './Price';
import '../common/price-block.css';

function SalePriceDisplay({price}) {
  return price ? (
    <span className="PriceBlock-salePrice">
      <Price price={price} />
    </span>
  ) : null;
}

function RestrictedPrice({price}) {
  return price ? (
    <span className="PriceBlock-salePrice">{price.restrictionReason}</span>
  ) : null;
}

function SuggestedRetailPrice({price}) {
  return price ? <Price price={price} /> : null;
}

function ListPrice({price}) {
  return price ? <Price price={price} /> : null;
}

function PriceBlock({prices}) {
  const pricesHash = prices.reduce((acc, p) => {
    acc[p.priceDescriptor || p.__typename] = p;
    return acc;
  }, {});

  return (
    <>
      {pricesHash['RestrictedPrice'] ? (
        <RestrictedPrice price={pricesHash['RestrictedPrice']} />
      ) : (
        <SalePriceDisplay
          price={pricesHash['SalePrice'] || pricesHash['OnSalePrice']}
        />
      )}
      {pricesHash['PriceDiscount'] && (
        <>
          <span className="PriceBlock-strikethrough">
            <ListPrice price={pricesHash['ListPrice']} />
            <SuggestedRetailPrice price={pricesHash['SuggestedRetailPrice']} />
          </span>
          <span className="PriceBlock-percentageOff">
            {pricesHash['PriceDiscount'].savedPercent}% Off
          </span>
        </>
      )}
      {pricesHash['OnSalePrice'] && <p>On Sale</p>}
    </>
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
