import ProductList from "../components/ProductList.js";

const TITLE = "상품목록";

class ProductListPage {
  constructor({ $target, url }) {
    this.$target = $target;
    this.url = url;
  }

  renderProductList = (productList) => {
    const $title = createElement("h1");
    $title.innerText = TITLE;
    const $ul = createElement("ul");
    productList.map(product => {
      const { id, name, price, imageUrl } = product;
      const $product = createElement("li", "Product");
      const $img = createElement("img");
      const $productInfo = createElement("div", "Product__info");
      const $productName = createElement("div");
      const $productPrice = createElement("div"); 
      $img.src = imageUrl;
      $productName.innerText = name;
      $productPrice.innerText = repaintPrice(price);
      $productInfo.append($productName, $productPrice);
      $product.append($img, $productInfo);
      $product.addEventListener("click", () => this.handleClickProductLi(id));
      $ul.appendChild($product);
    });
    this.$target.append($title, $ul);
  }

  settingProductList = async () => {
    const productList = new ProductList();
    const productArr = await productList.getProductList();
    this.renderProductList(productArr);
  }  

  handleClickProductLi = (id) => {
    location.pathname = `${this.url}${id}`;
  }

}

const createElement = (element, className) => {
  const $element = document.createElement(element);
  if(className) {
    if(typeof className === "string") {
      $element.classList.add(className);
    } else {
      $element.className = `${className.join(" ")}`;
    }
  }
  return $element;
}

const repaintPrice = (price) => {
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

export default ProductListPage;