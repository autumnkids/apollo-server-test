const {products} = require('./data');

const getUnitType = ({id, key}) => {
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
  return Object.keys(product)
    .map(key => {
      const unitType = getUnitType({id: product.id, key});
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
          __typename: 'SalePrice',
          price,
          unitType
        };
        if (savedAmount) {
          salePrice.discount = {
            savedAmount,
            savedPercent: (savedAmount / product.listPrice) * 100
          };
        }
        if (product.maxPrice || maxPrice) {
          salePrice.min = price;
          salePrice.max = product.maxPrice || maxPrice;
        }
        return salePrice;
      } else if (key === 'listPrice') {
        return {
          __typename: 'ListPrice',
          price: product[key],
          unitType
        };
      } else if (key === 'suggestedRetailPrice') {
        return {
          __typename: 'SuggestedRetailPrice',
          price: product[key],
          unitType
        };
      } else if (key === 'clearanceMin') {
        const clearancePrice = {
          __typename: 'ClearancePrice',
          price: product[key],
          min: product[key],
          unitType
        };
        if (product.clearanceMax) {
          clearancePrice.max = product.clearanceMax;
        }
        return clearancePrice;
      } else if (key === 'minimumOrderQuantity') {
        return {
          __typename: 'PerItemPrice',
          price: product.salePrice / 2,
          unitType
        };
      } else if (key === 'quantityPerBox') {
        return {
          __typename: 'SmallestPurchasablePrice',
          price: product.salePrice,
          unitType
        };
      } else if (key === 'restrictionReason') {
        return {
          __typename: 'RestrictedPrice',
          restrictionReason: product[key]
        };
      }
    })
    .filter(Boolean);
};

const resolvers = {
  SalePrice: {
    __resolveType(obj) {
      if (obj.min) {
        return 'RangePrice';
      }
      if (obj.restrictionReason) {
        return 'RestrictedPrice';
      }
      return 'SimplePrice';
    }
  },
  ListPrice: {
    __resolveType(obj) {
      return 'SimplePrice';
    }
  },
  SuggestedRetailPrice: {
    __resolveType(obj) {
      return 'SimplePrice';
    }
  },
  ClearancePrice: {
    __resolveType(obj) {
      if (obj.min) {
        return 'RangePrice';
      }
      return 'SimplePrice';
    }
  },
  UnitPrice: {
    __resolveType(obj) {
      return 'SimplePrice';
    }
  },
  QuantityPrice: {
    __resolveType(obj) {
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
    product(root, {id}) {
      return {
        id() {
          return id;
        },
        price() {
          return {
            salePrice() {
              return 0;
            }
          };
        }
      };
    }
  }
};

exports.resolvers = resolvers;
