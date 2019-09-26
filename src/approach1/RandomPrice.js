import React from 'react';
import Price from './Price';

function RandomPrice({prices}) {
  const randomIndex = Math.floor(Math.random() * (prices.length - 1));
  const randomPrice = prices[randomIndex];

  return randomPrice ? <Price price={randomPrice} /> : null;
}

export default RandomPrice;
