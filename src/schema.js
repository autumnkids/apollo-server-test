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

  interface PriceInterface {
    price: Float!
    min: Float
    max: Float
    unitType: Unit!
  }

  type SalePrice implements PriceInterface {
    price: Float!
    min: Float
    max: Float
    unitType: Unit!
    discount: Discount
  }

  type ListPrice implements PriceInterface {
    price: Float!
    min: Float
    max: Float
    unitType: Unit!
  }

  type SuggestedRetailPrice implements PriceInterface {
    price: Float!
    min: Float
    max: Float
    unitType: Unit!
  }

  type ClearancePrice implements PriceInterface {
    price: Float!
    min: Float
    max: Float
    unitType: Unit!
  }

  type SmallestPurchasablePrice implements PriceInterface {
    price: Float!
    min: Float
    max: Float
    unitType: Unit!
  }

  type PerItemPrice implements PriceInterface {
    price: Float!
    min: Float
    max: Float
    unitType: Unit!
  }

  type ConfiguredPrice implements PriceInterface {
    price: Float!
    min: Float
    max: Float
    unitType: Unit!
  }

  type RestrictedPrice {
    restrictionReason: String!
  }

  union Price =
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
    prices(display: Display): [Price]!
  }

  type Query {
    product(id: ProductId!): Product!
  }
`;

exports.typeDefs = typeDefs;
