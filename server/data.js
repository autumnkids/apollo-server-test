const normalProduct = {
  id: 'normalProduct',
  salePrice: 100,
  listPrice: 200,
  maxPrice: 0,
  suggestedRetailPrice: 210
};

const productWithClearanceAvailable = {
  id: 'productWithClearanceAvailable',
  salePrice: 100,
  listPrice: 200,
  clearanceMin: 50,
  clearanceMax: 100
};

const productWithSets = {
  id: 'productWithSets',
  salePrice: 20,
  minimumOrderQuantity: 2
};

const flooringProduct = {
  id: 'flooringProduct',
  salePrice: 100,
  listPrice: 200,
  quantityPerBox: 20
};

const rugProduct = {
  id: 'rugProduct',
  salePrice: 50,
  listPrice: 100,
  maxPrice: 200
};

const clearanceProduct = {
  id: 'clearanceProduct',
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

const kitProduct = {
  id: 'kitProduct',
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

exports.products = {
  normalProduct,
  productWithClearanceAvailable,
  productWithSets,
  flooringProduct,
  rugProduct,
  clearanceProduct,
  kitProduct
};
