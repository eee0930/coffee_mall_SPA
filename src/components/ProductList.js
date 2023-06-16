import { fetchProductList } from "../api.js";

class ProductList {
  constructor() {
    this.productList = [];
  }

  getProductList = async() => {
    const productList = await fetchProductList();
    this.productList = productList;
    return this.productList;
  }
}

export default ProductList;