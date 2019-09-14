import React from 'react';

const BasePrice = ({price, unit}) => (
  <span>
    {(() => {
      switch (unit) {
        case 'BOX':
        case 'AREA':
          return `$${price}/sq ft`;
        case 'LENGTH':
          return `$${price}/sq m`;
        case 'ROLL':
          return `$${price}/roll`;
        case 'SET':
          return `(per item $${price})`;
        default:
          return `$${price}`;
      }
    })()}
  </span>
);

export default BasePrice;
