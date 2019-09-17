import React from 'react';
import gql from 'graphql-tag';
import Price from './price';
import '../common/price-block.css';

export const PRODUCT_PRICE_FRAGMENT = gql`
  fragment ProductPrice on PriceInterface {
    price
    display
    ... on CustomerPrice {
      appliedDiscount {
        listDiscount {
          percent
        }
        suggestedRetailDiscount {
          percent
        }
      }
      saleType
    }
  }
`;

const processPrices = ({prices}) => {
  return prices.reduce((acc, priceInfo, index) => {
    const isSpecialUnit = priceInfo.display.includes('PRICE_PER_AREA_UNIT');
    if (priceInfo.display.includes('RESTRICTED')) {
      acc['PriceRestricted'] = 'See Price In Cart';
    } else if (priceInfo.display.includes('MIN')) {
      const nextPrice = prices[index + 1];
      const priceKey =
        priceInfo.__typename === 'ClearancePrice' && acc['SalePrice']
          ? 'ClearancePrice'
          : 'SalePrice';
      acc[priceKey] = {
        min: priceInfo.price,
        unit: isSpecialUnit ? 'AREA' : 'REGULAR'
      };
      if (nextPrice && nextPrice.display.includes('MAX')) {
        acc[priceKey].max = nextPrice.price;
      }
    } else if (priceInfo.display.includes('MAX')) {
    } else if (priceInfo.display.includes('PRICE_PER_ITEM')) {
      acc['PricePerItem'] = {
        price: priceInfo.price,
        unit: 'SET'
      };
    } else if (priceInfo.__typename === 'ListPrice') {
      acc['ListPrice'] = {
        price: priceInfo.price,
        unit: isSpecialUnit ? 'AREA' : 'REGULAR'
      };
    } else if (priceInfo.__typename === 'SuggestedRetailPrice') {
      acc['SuggestedRetailPrice'] = {
        price: priceInfo.price,
        unit: isSpecialUnit ? 'AREA' : 'REGULAR'
      };
    } else if (!acc['SalePrice']) {
      acc['SalePrice'] = {
        price: priceInfo.price,
        unit: isSpecialUnit ? 'AREA' : 'REGULAR'
      };
    } else if (isSpecialUnit) {
      acc['MeasurementPrice'] = {
        price: priceInfo.price,
        unit: 'AREA'
      };
    }
    if (priceInfo.appliedDiscount) {
      const {listDiscount, suggestedRetailDiscount} = priceInfo.appliedDiscount;
      if (listDiscount && suggestedRetailDiscount) {
        acc['Discount'] =
          listDiscount.percent > suggestedRetailDiscount.percent
            ? listDiscount.percent
            : suggestedRetailDiscount.percent;
      } else if (listDiscount) {
        acc['Discount'] = listDiscount.percent;
      } else if (suggestedRetailDiscount) {
        acc['Discount'] = suggestedRetailDiscount.percent;
      }
    }
    if (priceInfo.saleType) {
      acc['SaleMessage'] = priceInfo.saleType;
    }
    return acc;
  }, {});
};

const PriceBlock = ({prices}) => {
  const pricesMap = processPrices({prices});
  return (
    <>
      {pricesMap['SalePrice'] && (
        <span className="PriceBlock-salePrice">
          <Price priceInfo={pricesMap['SalePrice']} />
        </span>
      )}
      {pricesMap['PricePerItem'] && (
        <Price priceInfo={pricesMap['PricePerItem']} />
      )}
      {pricesMap['ListPrice'] && (
        <span className="PriceBlock-strikethrough">
          {'List: '}
          <Price priceInfo={pricesMap['ListPrice']} />
        </span>
      )}
      {pricesMap['SuggestedRetailPrice'] && (
        <span className="PriceBlock-strikethrough">
          {'RRP: '}
          <Price priceInfo={pricesMap['SuggestedRetailPrice']} />
        </span>
      )}
      {pricesMap['Discount'] && (
        <span className="PriceBlock-percentageOff">
          {pricesMap['Discount']}% Off
        </span>
      )}
      {pricesMap['MeasurementPrice'] && (
        <span className="PriceBlock-secondaryPrice">
          <Price priceInfo={pricesMap['MeasurementPrice']} />
        </span>
      )}
      {pricesMap['ClearancePrice'] && (
        <p>
          {'Open Box Price: '}
          <Price priceInfo={pricesMap['ClearancePrice']} />
        </p>
      )}
      {pricesMap['SaleMessage'] && <p>{pricesMap['SaleMessage']}</p>}
    </>
  );
};

export default PriceBlock;
