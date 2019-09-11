import React from 'react';
import {gql} from 'apollo-boost';

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

function SimplePrice({price}) {
  return <BasePrice price={price.price} unit={price.unitType} />
}
SimplePrice.fragment = gql`
  fragment SimplePrice on Price {
    ... on SimplePrice {
      price
      unitType
    }
  }
`;

function FullRangePrice({price}) {
  return (
    <>
      <BasePrice price={price.min} unit={price.unitType} />
      {' - '}
      <BasePrice price={price.max} unit={price.unitType} />
    </>
  );
}
FullRangePrice.fragment = gql`
  fragment FullRangePrice on Price {
    ... on RangePrice {
      min
      max
      unitType
    }
  }
`;

function StartingPrice({price}) {
  return (
    <>
        <span>from </span>
        <BasePrice price={price.min} unit={price.unitType} />
    </>
  );
}
StartingPrice.fragment = gql`
  fragment StartingPrice on Price {
    ... on RangePrice {
      min
      unitType
    }
  }
`;

function RangePrice({price}) {
  return price.max ? <FullRangePrice price={price} /> : <StartingPrice price={price}/>
}
RangePrice.fragment = gql`
  fragment RangePrice on Price {
    ...FullRangePrice
    ...StartingPrice
  }

  ${FullRangePrice.fragment}
  ${StartingPrice.fragment}
`;

function RestrictedPrice({price}) {
  return price.restrictionReason;
}
RestrictedPrice.fragment = gql`
  fragment RestrictedPrice on Price {
    ... on RestrictedPrice {
      restrictionReason
    }
  }
`;

function PriceDiscount({price}) {
  return <span>{price.savedPercent}% Off</span>;
}
PriceDiscount.fragment = gql`
  fragment PriceDiscount on Price {
    ... on PriceDiscount {
      savedPercent
    }
  }
`;

const priceTypeMapping = {
  'SimplePrice': SimplePrice,
  'RangePrice': RangePrice,
  'RestrictedPrice': RestrictedPrice,
  'PriceDiscount': PriceDiscount,
}

const Price = ({price}) => {
  const PriceComponent = priceTypeMapping[price.__typename];

  return PriceComponent ? <PriceComponent price={price} /> : null;
};
Price.fragment = gql`
  fragment Price on Price {
    ...SimplePrice
    ...RangePrice
    ...RestrictedPrice
    ...PriceDiscount
  }

  ${SimplePrice.fragment}
  ${RangePrice.fragment}
  ${RestrictedPrice.fragment}
  ${PriceDiscount.fragment}
`;

export default Price;
