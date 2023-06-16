import { fetchProductList } from "../api.js";

const TITLE = "상품목록";

class ProductListPage {
  constructor({ $target, url }) {
    this.$target = $target;
    this.url = url;
  }

  renderProductList = (productList) => {
    const $title = document.createElement("h1");
    $title.innerText = TITLE;
    const $ul = document.createElement("ul");
    productList.map(product => {
      const { id, name, price, imageUrl } = product;
      const $product = document.createElement("li");
      const $img = document.createElement("img");
      const $productInfo = document.createElement("div");
      const $productName = document.createElement("div");
      const $productPrice = document.createElement("div"); 
      $img.src = imageUrl;
      $productName.innerText = name;
      $productPrice.innerText = this.renamePrice(price);
      $productInfo.append($productName, $productPrice);
      $productInfo.classList.add("Product__info");
      $product.append($img, $productInfo);
      $product.addEventListener("click", () => this.handleClickProductLi(id));
      $product.classList.add("Product");
      $ul.appendChild($product);
    });
    this.$target.append($title, $ul);
  }

  settingProductList = async () => {
    const productList = await fetchProductList();
    this.renderProductList(productList);
  }

  handleClickProductLi = (id) => {
    location.pathname = `${this.url}${id}`;
  }

  renamePrice = (price) => {
    const priceStr = String(price);
    const length = priceStr.length;
    const priceArr = [];
    for(let i = 0; i < length; i++) {
      let char = priceStr[length - i - 1];
      if((i + 1) % 3 === 0 && i !== length - 1) {
        char = `,${char}`;
      }
      priceArr.push(char);
    }
    return `${priceArr.reverse().join("")}원~`;
  }

}

export default ProductListPage;