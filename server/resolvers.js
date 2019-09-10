const {products} = require('./data');

const resolvers = {
  Price: {
    __resolveType(obj) {
      return obj.__typename;
    }
  },
  PriceInterface: {
    __resolveType(obj) {
      return 'SalePrice';
    }
  },
  Query: {
    product(root, {id}) {
      if (id === 'NormalProduct') {
        const {normalProduct} = products;
        return {
          id() {
            return normalProduct.id;
          },
          prices() {
            const savedAmount = normalProduct.listPrice - normalProduct.salePrice;
            return [
              {
                __typename: 'SalePrice',
                price: normalProduct.salePrice,
                unitType: 'REGULAR',
                discount: {
                  savedAmount,
                  savedPercent: savedAmount / normalProduct.listPrice
                }
              }
            ];
          }
        };
      }
    }
  }
};

exports.resolvers = resolvers;
