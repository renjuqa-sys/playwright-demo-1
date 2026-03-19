// Create files here for every data type ( Product,Customer, Order). Define the Interface here.
// 1. ENTITY: The Blueprint
export interface Product {
  name: string;
  price: number;
  category: 'Retro' | 'Modern';
}
