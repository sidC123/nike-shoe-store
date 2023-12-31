import type { Schema, Attribute } from '@strapi/strapi';

export interface PopularProductsPopularProducts extends Schema.Component {
  collectionName: 'components_popular_products_popular_products';
  info: {
    displayName: 'popular-products';
  };
  attributes: {
    title: Attribute.String;
    subtitle: Attribute.String;
    products: Attribute.Relation<
      'popular-products.popular-products',
      'oneToMany',
      'api::product.product'
    >;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'popular-products.popular-products': PopularProductsPopularProducts;
    }
  }
}
