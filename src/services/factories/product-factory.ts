// The "Orchestrator" (The Chef)
import { ProductBuilder } from '../../builders/product-builders';

export const productFactory = {
  // Example 1: The Fluent Way
  shirt1: () =>
    new ProductBuilder()
      .asRetro()
      .with({ price: 99.99, name: 'Special Edition' }) // <--- Like your Cypress params
      .build(),
  // Example 2: The "Quick Override" Way (Exactly like Cypress)
  shirt2: () => new ProductBuilder().with({ category: 'Retro', price: 10 }).build(),
};
