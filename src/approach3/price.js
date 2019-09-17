import React from 'react';
import BasePrice from '../common/base-price';

const Price = ({priceInfo}) => {
  if (priceInfo.max) {
    return (
      <>
        <BasePrice price={priceInfo.min} unit={priceInfo.unit} />
        {' - '}
        <BasePrice price={priceInfo.max} unit={priceInfo.unit} />
      </>
    );
  }
  if (priceInfo.min) {
    return (
      <>
        {'from '}
        <BasePrice price={priceInfo.min} unit={priceInfo.unit} />
      </>
    );
  }
  return <BasePrice price={priceInfo.price} unit={priceInfo.unit} />;
};

export default Price;
