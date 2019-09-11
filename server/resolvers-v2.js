const { products } = require('./data');

const getUnitType = ({ id, key }) => {
  switch (id) {
    case 'ProductWithSets': {
      if (key === 'minimumOrderQuantity') {
        return 'SET';
      }
      return 'REGULAR';
    }
    case 'FlooringProduct':
      if (key === 'quantityPerBox') {
        return 'REGULAR';
      }
      return 'AREA';
    default:
      return 'REGULAR';
  }
};

const resolvePricingData = product => {
  let savedPercent;
  const pricingData = Object.keys(product)
    .map(key => {
      const unitType = getUnitType({ id: product.id, key });
      if (key === 'salePrice') {
        const savedAmount = product.listPrice
          ? product.listPrice - product.salePrice
          : 0;
        let price, maxPrice;
        if (product.quantityPerBox) {
          price = product[key] / product.quantityPerBox;
        } else if (product.clearanceItems) {
          price = product.clearanceItems[0].price;
          maxPrice = product.clearanceItems[1].price;
        } else {
          price = product[key];
        }
        const salePrice = {
          unitType,
          priceDiscriptor: 'SalePrice'
        };
        if (savedAmount) {
          savedPercent = savedAmount / product.listPrice;
        }
        if (product.maxPrice || maxPrice) {
          salePrice.min = price;
          salePrice.max = product.maxPrice || maxPrice;
        } else {
          salePrice.price = price;
        }
        return salePrice;
      } else if (key === 'listPrice') {
        return {
          price: product[key],
          unitType,
          priceDiscriptor: 'ListPrice'
        };
      } else if (key === 'suggestedRetailPrice') {
        return {
          price: product[key],
          unitType,
          priceDiscriptor: 'SuggestedRetailPrice'
        };
      } else if (key === 'clearanceMin') {
        const clearancePrice = {
          min: product[key],
          unitType,
          priceDiscriptor: 'ClearancePrice'
        };
        if (product.clearanceMax) {
          clearancePrice.max = product.clearanceMax;
        }
        return clearancePrice;
      } else if (key === 'minimumOrderQuantity') {
        return {
          price: product.salePrice / 2,
          unitType,
          priceDiscriptor: 'PerItemPrice'
        };
      } else if (key === 'quantityPerBox') {
        return {
          price: product.salePrice,
          unitType,
          priceDiscriptor: 'SmallestPurchasablePrice'
        };
      } else if (key === 'restrictionReason') {
        return {
          restrictionReason: product[key],
          priceDiscriptor: 'RestrictedPrice'
        };
      }
    })
    .filter(Boolean);
  if (savedPercent) {
    pricingData.push({
      savedPercent
    });
  }
  return pricingData;
};

const resolvers = {
  Price: {
    __resolveType(obj) {
      if (obj.min) {
        return 'RangePrice';
      } else if (obj.restrictionReason) {
        return 'RestrictedPrice';
      } else if (obj.savedPercent) {
        return 'PriceDiscount';
      }
      return 'SimplePrice';
    }
  },
  PriceInterface: {
    __resolveType(obj) {
      if (obj.min) {
        return 'RangePrice';
      }
      return 'SimplePrice';
    }
  },
  Query: {
    product(root, { id }) {
      return {
        id() {
          return id;
        },
        prices() {
          return resolvePricingData(products[id]);
        }
      };
    }
  }
};

exports.resolvers = resolvers;
