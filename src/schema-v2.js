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

  enum PriceDiscriptor {
    SalePrice
    ListPrice
    SuggestedRetailPrice
    ClearancePrice
    SmallestPurchasablePrice
    ConfiguredPrice
    PricePerItem
    UnitPrice
    RestrictedPrice
  }

  enum SaleEnum {
    OnSale
    Closeout
  }

  interface PriceInterface {
    priceDiscriptor: PriceDiscriptor!
    unitType: Unit!
    saleType: SaleEnum
  }

  type BasePrice implements PriceInterface {
    price: Float!
    unitType: Unit!
    priceDiscriptor: PriceDiscriptor!
    savedPercent: Float
    saleType: SaleEnum
  }

  type RangePrice implements PriceInterface {
    min: Float!
    max: Float
    unitType: Unit!
    priceDiscriptor: PriceDiscriptor!
    saleType: SaleEnum
  }

  type RestrictedPrice {
    restrictionReason: String!
  }

  union Price = BasePrice | RangePrice | RestrictedPrice

  enum PriceUseCase {
    BrowseProductCard
    PDPMainPriceBlock
    SquareFootageCalculator
    ClearanceOfferLink
    ShopTheLookPhoto
    AllAvailablePrices
  }

  type Product {
    prices(useFor: PriceUseCase): [Price]!
  }

  enum ProductEnum {
    NormalSku
    UkSku
    RangeSku
    RestrictedPrice
  }

  type Query {
    product(type: ProductEnum): Product
  }
`;

exports.typeDefs = typeDefs;
