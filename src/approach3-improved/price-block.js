import React from 'react';
import gql from 'graphql-tag';
import Price, {PRICE_FRAGMENT} from './price';
import '../common/price-block.css';

export const PRICE_BLOCK_FRAGMENT = gql`
  fragment PriceBlock on PriceInterface {
    ... on DiscountablePriceInterface {
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
    ...Price
  }
  ${PRICE_FRAGMENT}
`;

const processPrices = ({prices}) => {
  return prices.reduce((acc, priceInfo) => {
    if (priceInfo.__typename === 'CustomerPrice') {
      if (!acc['SalePrice']) {
        acc['SalePrice'] = priceInfo;
      } else if (priceInfo.measurementUnit === 'SET') {
        acc['PricePerItem'] = priceInfo;
      } else if (priceInfo.measurementUnit === 'AREA') {
        acc['MeasurementPrice'] = priceInfo;
      }
      const {appliedDiscount} = priceInfo;
      if (appliedDiscount) {
        const {listDiscount, suggestedRetailDiscount} = appliedDiscount;
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
      const {saleType} = priceInfo;
      if (saleType) {
        acc['SaleMessage'] = saleType;
      }
    } else if (priceInfo.__typename === 'ListPrice') {
      acc['ListPrice'] = priceInfo;
    } else if (priceInfo.__typename === 'SuggestedRetailPrice') {
      acc['SuggestedRetailPrice'] = priceInfo;
    } else if (priceInfo.__typename === 'ClearancePrice') {
      if (!acc['SalePrice']) {
        acc['SalePrice'] = priceInfo;
      } else {
        acc['ClearancePrice'] = priceInfo;
      }
    } else if (priceInfo.__typename === 'RestrictedPrice') {
      acc['SalePrice'] = priceInfo;
    }
    return acc;
  }, {});
};

const PriceBlock = ({prices}) => {
  const priceMapping = processPrices({prices});

  return (
    <>
      {priceMapping['SalePrice'] && (
        <span className="PriceBlock-salePrice">
          <Price priceInfo={priceMapping['SalePrice']} />
        </span>
      )}
      {priceMapping['PricePerItem'] && (
        <Price priceInfo={priceMapping['PricePerItem']} />
      )}
      {priceMapping['Discount'] && (
        <>
          {priceMapping['ListPrice'] && (
            <span className="PriceBlock-strikethrough">
              {'List: '}
              <Price priceInfo={priceMapping['ListPrice']} />
            </span>
          )}
          {priceMapping['SuggestedRetailPrice'] && (
            <span className="PriceBlock-strikethrough">
              {'RRP: '}
              <Price priceInfo={priceMapping['SuggestedRetailPrice']} />
            </span>
          )}
          {priceMapping['Discount'] && (
            <span className="PriceBlock-percentageOff">
              {priceMapping['Discount']}% Off
            </span>
          )}
        </>
      )}
      {priceMapping['MeasurementPrice'] && (
        <span className="PriceBlock-secondaryPrice">
          <Price priceInfo={priceMapping['MeasurementPrice']} />
        </span>
      )}
      {priceMapping['ClearancePrice'] && (
        <p>
          {'Open Box Price: '}
          <Price priceInfo={priceMapping['ClearancePrice']} />
        </p>
      )}
      {priceMapping['SaleMessage'] && <p>{priceMapping['SaleMessage']}</p>}
    </>
  );
};

export default PriceBlock;
