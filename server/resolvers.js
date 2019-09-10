const data = {
  salePrice: 10
};

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
      return {
        prices({display}) {
          if (display === 'A') {
            return [
              {
                __typename: 'SalePrice',
                price: 10,
                min: 5,
                max: 20,
                unitType: 'REGULAR'
              },
              {
                __typename: 'ListPrice',
                price: 20,
                unitType: 'REGULAR'
              },
              {
                __typename: 'ClearancePrice',
                price: 5,
                unitType: 'REGULAR'
              },
              {
                __typename: 'PerItemPrice',
                price: 2.5,
                unitType: 'SET'
              }
            ];
          } else if (display === 'B') {
            return [
              {
                __typename: 'SalePrice',
                price: 100,
                unitType: 'REGULAR'
              },
              {
                __typename: 'RestrictedPrice',
                restrictionReason: 'Restriced'
              }
            ];
          }
        }
      };
    }
  }
};

exports.resolvers = resolvers;
