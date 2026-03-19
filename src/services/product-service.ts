// src/services/product-service.ts
import { APIRequestContext } from '@playwright/test';
import { Product } from '../entities/product-entity';

export class ProductService {
  constructor(private request: APIRequestContext) {}

  // Your API List
  public async createProduct(product: Product) {
    return await this.request.post('/api/products', { data: product });
  }

  public async deleteProduct(id: string) {
    return await this.request.delete(`/api/products/${id}`);
  }
}

// //Now look how clean your test becomes. It reads like a story, but has all the power of your old Cypress setup.
// import { test } from '@playwright/test';
// import { ProductFactory } from '../services/factories/product-factory';
// import { ProductService } from '../services/product-service';

// test('Solo QA Gold Standard Flow', async ({ request }) => {
//     const productService = new ProductService(request);

//     // 1. GIVEN: I grab a pre-set product from the Warehouse
//     const myShirt = ProductFactory.standardRetro();

//     // 2. WHEN: I send it via the API Service
//     await test.step('Create product via API', async () => {
//         const response = await productService.createProduct(myShirt);
//         // expect(response.ok()).toBeTruthy();
//     });

//     // 3. THEN: Proceed to UI steps...
// });

// Entities: The Shape.

// Builders: The Customizer (The Chef).

// Factories (api-data-factory.ts): The Inventory (The Menu).

// Services: The Delivery (The API POST/GET calls).
