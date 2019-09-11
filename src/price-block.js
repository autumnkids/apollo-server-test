import React from 'react';
import Price from './price';
import './price-block.css';

const PriceBlock = ({
  salePrice,
  listPrice,
  suggestedRetailPrice,
  perItemPrice,
  savedPercent,
  secondaryPrice
}) => (
  <>
    {salePrice && (
      <Price
        price={salePrice.price}
        min={salePrice.min}
        max={salePrice.max}
        unit={salePrice.unit}
        className="PriceBlock-salePrice"
      />
    )}{' '}
    {perItemPrice && (
      <Price
        price={perItemPrice.price}
        min={perItemPrice.min}
        max={perItemPrice.max}
        unit={perItemPrice.unit}
      />
    )}{' '}
    {listPrice && (
      <Price
        price={listPrice.price}
        min={listPrice.min}
        max={listPrice.max}
        unit={listPrice.unit}
        className="PriceBlock-strikethrough"
      />
    )}{' '}
    {suggestedRetailPrice && (
      <Price
        price={suggestedRetailPrice.price}
        min={suggestedRetailPrice.min}
        max={suggestedRetailPrice.max}
        unit={suggestedRetailPrice.unit}
        className="PriceBlock-strikethrough"
      />
    )}{' '}
    {savedPercent && <span>{savedPercent}% Off</span>}
    {secondaryPrice && (
      <Price
        price={secondaryPrice.price}
        min={secondaryPrice.min}
        max={secondaryPrice.max}
        unit={secondaryPrice.unit}
        className="PriceBlock-secondaryPrice"
      />
    )}
  </>
);

export default PriceBlock;
