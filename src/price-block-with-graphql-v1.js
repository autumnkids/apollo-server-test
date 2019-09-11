import React from 'react';
import {useQuery} from '@apollo/react-hooks';
import {gql} from 'apollo-boost';
import Price from './price';
import './price-block.css';

function PriceBlock({prices}) {
  const pricesHash = prices.reduce((acc, p) => {
    acc[p.priceDescriptor || p.__typename] = p;
    return acc;
  }, {});

  return <div>
    <SalePriceDisplay price={pricesHash["SalePrice"]} />
    <SuggestedRetailPrice price={pricesHash["SuggestedRetailPrice"]} />
    <ListPrice price={pricesHash["ListPrice"]} />
    <OnSalePrice price={pricesHash["OnSalePrice"]} />
  </div>;
}
PriceBlock.fragment = gql`
  fragment PriceBlock on Price {
    ...on PriceInterface {
      priceDescriptor
    }
  }
`;

const productPrices = gql`
  query productPrices($id: ProductId!) {
    product(id: $id) {
      prices(filter: [ONLYTHESE]) {
        ...Price
        ...PriceBlock
      }
    }
  }

  ${Price.fragment}
  ${PriceBlock.fragment}
`;

const PriceWithGraphQL = () => {
  const {loading, error, data, ...rest} = useQuery(productPrices, {
    variables: {id: 'NormalProduct'},
    returnPartialData: true
  });

  console.log('yzhou', {data, error, loading, rest});
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error: {JSON.stringify(error)}</p>;
  }
  return <>
      <PriceBlock prices={data.product.prices} />
      <div>Somwhere else on the page...</div>
      <NotPriceBlock data={data} />
    </>;
};

function NotPriceBlock({data}) {
  const randomPrice = data.product.prices[0];

  return randomPrice ? <Price price={randomPrice} /> : null;
}

function SalePriceDisplay({price}) {
  return price ? <Price price={price} /> : null;
}
function SuggestedRetailPrice({price}) {
  return price ? <Price price={price} /> : null;
}
function ListPrice({price}) {
  return price ? <Price price={price} /> : null;
}
function OnSalePrice({price}) {
  return price ? (<span className="PriceBlock-salePrice"><Price price={price} /><span> On Sale</span></span>) : null;
}


export default PriceWithGraphQL;
