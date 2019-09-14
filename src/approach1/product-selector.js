import React from 'react';

const ProductSelector = ({onChange}) => (
  <div>
    <select onChange={e => onChange({id: e.target.value})}>
      <option key="NormalProduct" value="NormalProduct">
        NormalProduct
      </option>
      <option
        key="ProductWithClearanceAvailable"
        value="ProductWithClearanceAvailable"
      >
        ProductWithClearanceAvailable
      </option>
      <option key="ProductWithSets" value="ProductWithSets">
        ProductWithSets
      </option>
      <option key="FlooringProduct" value="FlooringProduct">
        FlooringProduct
      </option>
      <option key="WallpaperInDE" value="WallpaperInDE">
        WallpaperInDE
      </option>
      <option key="RugProduct" value="RugProduct">
        RugProduct
      </option>
      <option key="ClearanceProduct" value="ClearanceProduct">
        ClearanceProduct
      </option>
      <option key="OnSaleProduct" value="OnSaleProduct">
        OnSaleProduct
      </option>
      <option key="RestrictedProduct" value="RestrictedProduct">
        RestrictedProduct
      </option>
    </select>
    <select onChange={e => onChange({quantity: parseInt(e.target.value)})}>
      {[1, 2, 3, 4, 5].map(quantity => (
        <option key={quantity} value={quantity}>
          {quantity}
        </option>
      ))}
    </select>
  </div>
);

export default ProductSelector;
