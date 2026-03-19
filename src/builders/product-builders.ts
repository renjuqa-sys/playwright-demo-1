// src/builders/product-builder.ts
import { Product } from '../entities/product-entity';

export class ProductBuilder {
  // Start with default values so you don't always have to provide every field
  private product: Product = {
    name: 'Standard Football Shirt',
    price: 59.99,
    category: 'Modern',
  };

  // Fluent method: returns 'this' to allow chaining
  public withName(name: string): this {
    this.product.name = name;
    return this;
  }

  public withPrice(price: number): this {
    this.product.price = price;
    return this;
  }

  // Keep your Fluent methods for the "Common" stuff
  public asRetro() {
    this.product.category = 'Retro';
    return this;
  }

  //  THE MAGIC: This replaces "...params" from Cypress
  // Partial<Product> means "Any subset of the Product fields"
  public with(customParams: Partial<Product>) {
    this.product = {
      ...this.product,
      ...customParams,
    };
    return this;
  }

  // The final step that returns the actual Entity
  public build(): Product {
    return this.product;
  }
}
