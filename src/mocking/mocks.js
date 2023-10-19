import { fakerEN as faker } from "@faker-js/faker";

class MockingGenerate {
  generateProducts(num) {
    let products = [];
    if (Number.isInteger(num) && num > 0) {
      for (let i = 0; i < num; i++) {
        const product = {
          _id: faker.database.mongodbObjectId(),
          title: faker.commerce.productName(),
          description: faker.commerce.productDescription(),
          code: faker.number.int(1000),
          price: faker.number.int({ min: 10, max: 600 }),
          status: faker.datatype.boolean(0.9),
          stock: faker.number.int(200),
          category: faker.commerce.department(),
        };
        products.push(product);
      }
      return products;
    }
    else return false;
  }
//   Se le debe pasar como argumento la cantidad de productos que queremos que se creen.
}

export const mockingGenerate = new MockingGenerate();
