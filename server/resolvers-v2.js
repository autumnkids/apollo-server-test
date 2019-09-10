const NORMAL_SKU_PRICE = [
  {
    price: 100,
    unitType: 'REGULAR',
    priceDiscriptor: 'SalePrice',
    savedPercent: 0.5
  },
  {
    price: 200,
    unitType: 'REGULAR',
    priceDiscriptor: 'ListPrice'
  }
];

const UK_SKU_PRICE = [
  {
    price: 100,
    unitType: 'REGULAR',
    priceDiscriptor: 'SalePrice',
    savedPercent: 0.33,
    saleType: 'OnSale'
  },
  {
    price: 200,
    unitType: 'REGULAR',
    priceDiscriptor: 'ListPrice'
  },
  {
    price: 300,
    unitType: 'REGULAR',
    priceDiscriptor: 'SuggestedRetailPrice'
  }
];

const RANGE_SKU_PRICE = [
  {
    min: 10,
    max: 100,
    unitType: 'AREA',
    priceDiscriptor: 'SalePrice'
  },
  {
    price: 150,
    unitType: 'AREA',
    priceDiscriptor: 'ListPrice'
  }
];

const RESTRICTED_PRICE = [
  {
    restrictionReason: 'Restricted'
  }
];

const resolvers = {
  Price: {
    __resolveType(obj) {
      if (obj.min) {
        return 'RangePrice';
      } else if (obj.restrictionReason) {
        return 'RestrictedPrice';
      }
      return 'BasePrice';
    }
  },
  PriceInterface: {
    __resolveType(obj) {
      if (obj.min) {
        return 'RangePrice';
      }
      return 'BasePrice';
    }
  },
  Query: {
    product(root, {type}) {
      switch (type) {
        case 'NormalSku': {
          return {
            prices(args) {
              return NORMAL_SKU_PRICE;
            }
          };
        }
        case 'UkSku': {
          return {
            prices(args) {
              return UK_SKU_PRICE;
            }
          };
        }
        case 'RangeSku': {
          return {
            prices(args) {
              return RANGE_SKU_PRICE;
            }
          };
        }
        case 'RestrictedPrice': {
          return {
            prices(args) {
              return RESTRICTED_PRICE;
            }
          };
        }
        default: {
          return {
            prices(args) {
              return RESTRICTED_PRICE;
            }
          };
        }
      }
    }
  }
};

exports.resolvers = resolvers;
