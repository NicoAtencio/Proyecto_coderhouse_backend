import { existsSync, promises } from "fs";
import { __dirname } from "../utils.js";

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async getProducts() {
    if (existsSync(this.path)) {
      try {
        const productos = await promises.readFile(this.path, "utf-8");
        return JSON.parse(productos);
      } catch (error) {
        return error;
      }
    } else {
      return [];
    }
  }

  async addProduct(obj) {
    try {
      const arreglo = await this.getProducts();
      const id = arreglo.length ? arreglo[arreglo.length - 1].id + 1 : 1;
      arreglo.push({ id, ...obj });
      await promises.writeFile(this.path, JSON.stringify(arreglo));
      return [{ id, ...obj }];
    } catch (error) {
      return error;
    }
  }

  async getProductId(id) {
    try {
      if (!existsSync(this.path))
        return "No hay productos guardados en el archivo.";
      else {
        const arreglo = await this.getProducts();
        const producto = arreglo.find((p) => p.id == id);
        if (!producto) return `No existe el producto con el id ${id}`;
        else return producto;
      }
    } catch (error) {
      return error;
    }
  }

  async updateProduct(id, obj) {
    try {
      const arreglo = await this.getProducts();
      const arregloIndice = arreglo.findIndex((p) => p.id == id);
      if (arregloIndice === -1) return `No existe el producto con el id ${id}`;
      else {
        const producto = arreglo[arregloIndice];
        const productoActualizado = { ...producto, ...obj };
        arreglo[arregloIndice] = productoActualizado;
        await promises.writeFile(this.path, JSON.stringify(arreglo));
        return productoActualizado;
      }
    } catch (error) {
      return error;
    }
  }

  async deleteProduct(id) {
    try {
      const arreglo = await this.getProducts();
      const arregloIndice = arreglo.findIndex((p) => p.id == id);
      if (arregloIndice === -1) return `No existe el producto con el id ${id}`;
      else {
        const nuevoArreglo = arreglo.filter((p) => p.id != id);
        await promises.writeFile(this.path, JSON.stringify(nuevoArreglo));
        return nuevoArreglo;
      }
    } catch (error) {
      return error;
    }
  }
}

const product = new ProductManager(__dirname + "/data/products.json");
export default product;