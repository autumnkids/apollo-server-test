const {products} = require('../common/data');

const getSalePrice = ({product}) => {
  const {
    quantityPerBox,
    id,
    salePrice,
    listPrice,
    suggestedRetailPrice,
    saleType
  } = product;
  const useQuantityPerBox = quantityPerBox && id !== 'WallpaperInDE';
  const price = useQuantityPerBox ? salePrice / quantityPerBox : salePrice;
  const listDiscountAmount = useQuantityPerBox
    ? (listPrice - salePrice) / quantityPerBox
    : listPrice - salePrice;
  const listDiscountPercent = parseInt(
    ((listPrice - salePrice) / listPrice) * 100
  );
  const suggestedRetailDiscountAmount = useQuantityPerBox
    ? (suggestedRetailPrice - salePrice) / quantityPerBox
    : suggestedRetailPrice - salePrice;
  const suggestedRetailDiscountPercent = parseInt(
    ((suggestedRetailPrice - salePrice) / suggestedRetailPrice) * 100
  );
  let min = null,
    max = null,
    isClearance = false;
  if (product.clearanceItems) {
    isClearance = true;
    (min = 9999), (max = -9999);
    product.clearanceItems.forEach(item => {
      if (min > item.price) {
        min = item.price;
      }
      if (max < item.price) {
        max = item.price;
      }
      if (min === max) {
        max = null;
      }
    });
  } else if (product.maxPrice) {
    min = product.minPrice || product.salePrice;
    max = product.maxPrice;
  } else if (product.minPrice) {
    min = product.minPrice;
  }
  let measurementUnit = 'REGULAR';
  if (useQuantityPerBox) {
    measurementUnit = 'AREA';
  } else if (id === 'WallpaperInDE') {
    measurementUnit = 'ROLL';
  }

  return {
    __typename: isClearance ? 'ClearancePrice' : 'CustomerPrice',
    currency: 'USD',
    price,
    min,
    max,
    measurementUnit,
    appliedDiscount: {
      appliedDiscountType: 'EVERYDAY',
      everydayDiscount: null,
      listDiscount:
        listDiscountAmount > 0
          ? {
              amount: listDiscountAmount,
              percent: listDiscountPercent
            }
          : null,
      suggestedRetailDiscount:
        suggestedRetailDiscountAmount > 0
          ? {
              amount: suggestedRetailDiscountAmount,
              percent: suggestedRetailDiscountPercent
            }
          : null
    },
    saleType: saleType || null
  };
};

const resolvers = {
  PriceInterface: {
    __resolveType(obj) {
      return obj.__typename;
    }
  },
  DiscountablePriceInterface: {
    __resolveType(obj) {
      return obj.__typename;
    }
  },
  RangePriceInterface: {
    __resolveType(obj) {
      return obj.__typename;
    }
  },
  Query: {
    product(root, {id, configuration}) {
      return {
        id() {
          return id;
        },
        prices() {
          const product = products[id];
          const prices = [];
          const useQuantityPerBox =
            product.quantityPerBox && id !== 'WallpaperInDE';

          if (product.restrictionReason) {
            prices.push({
              __typename: 'RestrictedPrice',
              currency: 'USD',
              price: null,
              measurementUnit: 'REGULAR',
              reason: 'SeePriceInCart'
            });
          } else {
            prices.push(getSalePrice({product}));

            if (product.minimumOrderQuantity) {
              prices.push({
                __typename: 'CustomerPrice',
                currency: 'USD',
                price: product.salePrice / product.minimumOrderQuantity,
                measurementUnit: 'SET'
              });
            }
          }

          if (product.listPrice) {
            prices.push({
              __typename: 'ListPrice',
              currency: 'USD',
              price: useQuantityPerBox
                ? product.listPrice / product.quantityPerBox
                : product.listPrice,
              measurementUnit: useQuantityPerBox ? 'AREA' : 'REGULAR'
            });
          }

          if (product.suggestedRetailPrice) {
            prices.push({
              __typename: 'SuggestedRetailPrice',
              currency: 'USD',
              price: useQuantityPerBox
                ? product.suggestedRetailPrice / product.quantityPerBox
                : product.suggestedRetailPrice,
              measurementUnit: useQuantityPerBox ? 'AREA' : 'REGULAR'
            });
          }

          if (product.clearanceMin) {
            const clearancePrice = {
              __typename: 'ClearancePrice',
              currency: 'USD',
              price: useQuantityPerBox
                ? product.clearanceMin / product.quantityPerBox
                : product.clearanceMin,
              min: useQuantityPerBox
                ? product.clearanceMin / product.quantityPerBox
                : product.clearanceMin,
              measurementUnit: useQuantityPerBox ? 'AREA' : 'REGULAR'
            };
            if (product.clearanceMax) {
              clearancePrice.max = useQuantityPerBox
                ? product.clearanceMax / product.quantityPerBox
                : product.clearanceMax;
            }
            prices.push(clearancePrice);
          }

          if (id === 'WallpaperInDE') {
            prices.push({
              __typename: 'CustomerPrice',
              currency: 'USD',
              price: product.salePrice / product.quantityPerBox,
              measurementUnit: 'AREA'
            });
          }

          if (product.quantityPerBox && configuration) {
            prices.push({
              __typename: 'CustomerPrice',
              currency: 'USD',
              price: product.salePrice,
              measurementUnit: 'REGULAR'
            });
            const {quantity} = configuration;
            prices.push({
              __typename: 'CustomerPrice',
              currency: 'USD',
              price: product.salePrice * quantity,
              measurementUnit: 'REGULAR'
            });
          }

          return prices;
        }
      };
    }
  }
};

exports.resolvers = resolvers;
