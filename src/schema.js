const {gql} = require('apollo-server');

const typeDefs = gql`
  enum Unit {
    LENGTH
    BOX
    AREA
    ROLL
    SET
    REGULAR
  }

  type Discount {
    savedPercent: Float!
    savedAmount: Float!
  }

  interface Price {
    price: Float!
    min: Float
    max: Float
    unitType: Unit!
  }

  type SalePrice implements Price {
    price: Float!
    min: Float
    max: Float
    unitType: Unit!
    discount: Discount
  }

  type ListPrice implements Price {
    price: Float!
    min: Float
    max: Float
    unitType: Unit!
  }

  type SuggestedRetailPrice implements Price {
    price: Float!
    min: Float
    max: Float
    unitType: Unit!
  }

  type ClearancePrice implements Price {
    price: Float!
    min: Float
    max: Float
    unitType: Unit!
  }

  type SmallestPurchasablePrice implements Price {
    price: Float!
    min: Float
    max: Float
    unitType: Unit!
  }

  type PerItemPrice implements Price {
    price: Float!
    min: Float
    max: Float
    unitType: Unit!
  }

  type ConfiguredPrice implements Price {
    price: Float!
    min: Float
    max: Float
    unitType: Unit!
  }

  type RestrictedPrice {
    restrictionReason: String!
  }

  union Prices =
      SalePrice
    | ListPrice
    | SuggestedRetailPrice
    | ClearancePrice
    | SmallestPurchasablePrice
    | PerItemPrice
    | ConfiguredPrice
    | RestrictedPrice

  enum Display {
    A
    B
  }

  enum ProductId {
    A
    B
  }

  type Product {
    id: ProductId
    prices(display: Display): [Prices]!
  }

  type Query {
    product(id: ProductId!): Product!
  }
`;

exports.typeDefs = typeDefs;
