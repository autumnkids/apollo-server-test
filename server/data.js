const NormalProduct = {
  id: 'NormalProduct',
  salePrice: 100,
  listPrice: 200,
  maxPrice: 0,
  suggestedRetailPrice: 210
};

const ProductWithMinPrice = {
  id: 'ProductWithMinPrice',
  salePrice: 50,
  minPrice: 50,
  listPrice: 200
};

const ProductWithClearanceAvailable = {
  id: 'ProductWithClearanceAvailable',
  salePrice: 100,
  listPrice: 200,
  clearanceMin: 50,
  clearanceMax: 100
};

const ProductWithSets = {
  id: 'ProductWithSets',
  salePrice: 20,
  minimumOrderQuantity: 2
};

const FlooringProduct = {
  id: 'FlooringProduct',
  salePrice: 100,
  listPrice: 200,
  quantityPerBox: 20
};

const RugProduct = {
  id: 'RugProduct',
  salePrice: 50,
  listPrice: 100,
  maxPrice: 200
};

const ClearanceProduct = {
  id: 'ClearanceProduct',
  salePrice: 100,
  clearanceItems: [
    {
      id: 1,
      price: 20
    },
    {
      id: 2,
      price: 50
    }
  ]
};

const KitProduct = {
  id: 'KitProduct',
  salePrice: 100,
  children: [
    {
      id: 1,
      subgroup: 'A',
      masterId: 1,
      salePrice: 10
    },
    {
      id: 2,
      subgroup: 'A',
      masterId: 1,
      salePrice: 5
    },
    {
      id: 3,
      subgroup: 'A',
      masterId: 1,
      salePrice: 5
    },
    {
      id: 4,
      subgroup: 'B',
      masterId: 4,
      salePrice: 30
    },
    {
      id: 5,
      subgroup: 'C',
      masterId: 5,
      salePrice: 50
    }
  ]
};

const OnSaleProduct = {
  id: 'OnSaleProduct',
  salePrice: 50,
  listPrice: 100,
  saleType: 'ON_SALE'
};

const RestrictedProduct = {
  id: 'RestrictedProduct',
  restrictionReason: 'See Price In Cart'
};

exports.products = {
  NormalProduct,
  ProductWithClearanceAvailable,
  ProductWithSets,
  FlooringProduct,
  RugProduct,
  ClearanceProduct,
  KitProduct,
  RestrictedProduct,
  ProductWithMinPrice,
  OnSaleProduct
};
