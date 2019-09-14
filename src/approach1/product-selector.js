import React from 'react';

const ProductSelector = ({onChange}) => (
  <div>
    <select onChange={e => onChange({id: e.target.value})}>
      <option value="NormalProduct">NormalProduct</option>
      <option value="ProductWithClearanceAvailable">
        ProductWithClearanceAvailable
      </option>
      <option value="ProductWithSets">ProductWithSets</option>
      <option value="FlooringProduct">FlooringProduct</option>
      <option value="WallpaperInDE">WallpaperInDE</option>
      <option value="RugProduct">RugProduct</option>
      <option value="ClearanceProduct">ClearanceProduct</option>
      <option value="OnSaleProduct">OnSaleProduct</option>
      <option value="RestrictedProduct">RestrictedProduct</option>
    </select>
    <select onChange={e => onChange({quantity: parseInt(e.target.value)})}>
      {[1, 2, 3, 4, 5].map(quantity => (
        <option value={quantity}>{quantity}</option>
      ))}
    </select>
  </div>
);

export default ProductSelector;
