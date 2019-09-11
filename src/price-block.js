import React from 'react';

const PriceBlock = ({
  salePrice,
  listPrice,
  suggestedRetailPrice,
  perItemPrice,
  savedPercent,
  secondaryPrice
}) => (
  <>
    {salePrice && <span>{salePrice}</span>}
    {listPrice && <span>{listPrice}</span>}
    {perItemPrice && <span>({perItemPrice})</span>}
    {suggestedRetailPrice && <span>{suggestedRetailPrice}</span>}
  </>
);
