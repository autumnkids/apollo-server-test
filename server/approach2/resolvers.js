const {products} = require('../common/data');

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
  PerItemPrice: {
    __resolveType(obj) {
      return 'SimplePrice';
    }
  },
  MeasurementPrice: {
    __resolveType(obj) {
      return 'SimplePrice';
    }
  },
  ConfiguredPrice: {
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
    product(root, {id, configuration}) {
      return {
        id() {
          return id;
        },
        price() {
          const product = products[id];
          return {
            salePrice() {
              if (product.restrictionReason) {
                return {
                  restrictionReason: product.restrictionReason
                };
              }
              if (product.clearanceItems) {
                let min = 9999,
                  max = -9999;
                product.clearanceItems.forEach(item => {
                  if (item.price < min) {
                    min = item.price;
                  }
                  if (item.price > max) {
                    max = item.price;
                  }
                });
                if (min < max) {
                  return {
                    min,
                    max,
                    unitType: 'REGULAR'
                  };
                }
                return {
                  min,
                  unitType: 'REGULAR'
                };
              }
              if (product.maxPrice) {
                return {
                  min: product.salePrice,
                  max: product.maxPrice,
                  unitType: 'REGULAR'
                };
              }
              if (product.minPrice) {
                return {
                  min: product.minPrice,
                  unitType: 'REGULAR'
                };
              }
              if (product.quantityPerBox && id !== 'WallpaperInDE') {
                return {
                  price: product.salePrice / product.quantityPerBox,
                  unitType: 'AREA'
                };
              }
              const price =
                id !== 'WallpaperInDE' &&
                configuration &&
                configuration.quantity
                  ? product.salePrice * configuration.quantity
                  : product.salePrice;
              return {
                price,
                unitType: 'REGULAR'
              };
            },
            listPrice() {
              if (product.listPrice) {
                if (product.quantityPerBox) {
                  return {
                    price: product.listPrice / product.quantityPerBox,
                    unitType: 'AREA'
                  };
                }
                const price =
                  configuration && configuration.quantity
                    ? product.listPrice * configuration.quantity
                    : product.listPrice;
                return {
                  price,
                  unitType: product.quantityPerBox ? 'AREA' : 'REGULAR'
                };
              }
              return null;
            },
            suggestedRetailPrice() {
              if (product.suggestedRetailPrice) {
                if (product.quantityPerBox) {
                  return {
                    price:
                      product.suggestedRetailPrice / product.quantityPerBox,
                    unitType: 'AREA'
                  };
                }
                const price =
                  configuration && configuration.quantity
                    ? product.suggestedRetailPrice * configuration.quantity
                    : product.suggestedRetailPrice;
                return {
                  price,
                  unitType: product.quantityPerBox ? 'AREA' : 'REGULAR'
                };
              }
              return null;
            },
            clearancePrice() {
              if (product.clearanceMax) {
                return {
                  min: product.clearanceMin,
                  max: product.clearanceMax,
                  unitType: product.quantityPerBox ? 'AREA' : 'REGULAR'
                };
              }
              if (product.clearanceMin) {
                return {
                  min: product.clearanceMin,
                  unitType: product.quantityPerBox ? 'AREA' : 'REGULAR'
                };
              }
              if (product.clearancePrice) {
                return {
                  price: product.clearancePrice,
                  unitType: product.quantityPerBox ? 'AREA' : 'REGULAR'
                };
              }
              return null;
            },
            unitPrice() {
              if (product.salePrice) {
                return {
                  price: product.salePrice,
                  unitType: 'REGULAR'
                };
              }
              return null;
            },
            perItemPrice() {
              if (product.minimumOrderQuantity > 1) {
                return {
                  price: product.salePrice / product.minimumOrderQuantity,
                  unitType: 'SET'
                };
              }
              return null;
            },
            measurementPrice() {
              if (id === 'WallpaperInDE' && product.quantityPerBox) {
                return {
                  price: product.salePrice / product.quantityPerBox,
                  unitType: 'AREA'
                };
              }
              return null;
            },
            configuredPrice() {
              if (
                configuration &&
                configuration.quantity &&
                product.salePrice
              ) {
                return {
                  price: product.salePrice * configuration.quantity,
                  unitType: 'REGULAR'
                };
              }
              return null;
            },
            discount() {
              if (product.listPrice - product.salePrice > 0) {
                return {
                  savedPercent:
                    ((product.listPrice - product.salePrice) /
                      product.listPrice) *
                    100
                };
              }
              return null;
            },
            saleType() {
              if (product.saleType) {
                return product.saleType;
              }
              return 'REGULAR';
            }
          };
        }
      };
    }
  }
};

exports.resolvers = resolvers;
