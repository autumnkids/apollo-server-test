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
  const listDiscountPercent = (listPrice - salePrice) / listPrice;
  const suggestedRetailDiscountAmount = useQuantityPerBox
    ? (suggestedRetailPrice - salePrice) / quantityPerBox
    : suggestedRetailPrice - salePrice;
  const suggestedRetailDiscountPercent =
    (suggestedRetailPrice - salePrice) / suggestedRetailPrice;
  let min = null,
    max = null;
  if (product.clearanceItems) {
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
  let display = [];
  if (useQuantityPerBox) {
    display.push('PRICE_PER_AREA_UNIT');
  }

  return {
    __typename: 'CustomerPrice',
    currency: 'USD',
    price,
    min,
    max,
    display,
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
  DiscountableProductPriceInterface: {
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

          if (!product.restrictionReason) {
            const {
              min: minSalePrice,
              max: maxSalePrice,
              ...rest
            } = getSalePrice({
              product
            });
            if (minSalePrice) {
              prices.push({
                ...rest,
                price: minSalePrice,
                display: rest.display.concat('MIN')
              });
              if (maxSalePrice) {
                prices.push({
                  ...rest,
                  price: maxSalePrice,
                  display: rest.display.concat('MAX')
                });
              }
            } else {
              prices.push({
                ...rest,
                display: rest.display.concat('DEFAULT')
              });
            }

            if (product.minimumOrderQuantity) {
              prices.push({
                __typename: 'CustomerPrice',
                currency: 'USD',
                price: product.salePrice / product.minimumOrderQuantity,
                display: ['PRICE_PER_ITEM']
              });
            }
          }

          if (product.listPrice) {
            prices.push({
              __typename: 'ListPrice',
              currency: 'USD',
              price:
                product.quantityPerBox && id !== 'WallpaperInDE'
                  ? product.listPrice / product.quantityPerBox
                  : product.listPrice,
              display: ['DEFAULT', 'PREVIOUS']
            });
          }

          if (product.suggestedRetailPrice) {
            prices.push({
              __typename: 'SuggestedRetailPrice',
              currency: 'USD',
              price:
                product.quantityPerBox && id !== 'WallpaperInDE'
                  ? product.suggestedRetailPrice / product.quantityPerBox
                  : product.suggestedRetailPrice,
              display: ['DEFAULT', 'PREVIOUS']
            });
          }

          if (product.clearanceMin) {
            prices.push({
              __typename: 'ClearancePrice',
              currency: 'USD',
              price:
                product.quantityPerBox && id !== 'WallpaperInDE'
                  ? product.clearanceMin / product.quantityPerBox
                  : product.clearanceMin,
              display: ['MIN']
            });
            if (product.clearanceMax) {
              prices.push({
                __typename: 'ClearancePrice',
                currency: 'USD',
                price:
                  product.quantityPerBox && id !== 'WallpaperInDE'
                    ? product.clearanceMax / product.quantityPerBox
                    : product.clearanceMax,
                display: ['MAX']
              });
            }
          }

          if (id === 'WallpaperInDE') {
            prices.push({
              __typename: 'CustomerPrice',
              currency: 'USD',
              price: product.salePrice / product.quantityPerBox,
              display: 'DEFAULT'
            });
          }

          return prices;
        }
      };
    }
  }
};

exports.resolvers = resolvers;
