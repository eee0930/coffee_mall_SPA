import { fetchProductById } from "../api.js";

const TITLE = "상품정보";

class ProductDetailPage {
  constructor({ $target, productId, url }) {
    this.$target = $target;
    this.productId = productId;
    this.url = url;
  }

  renderProductDetail = (product) => {
    const { name, price, imageUrl, productOptions } = product;

    const $title = document.createElement("h1");
    const $productDetail = document.createElement("div");
    const $img = document.createElement("img");
    const $productDetail__info = document.createElement("div");
    const $h2 = document.createElement("h2");
    const $productDetail__price = document.createElement("div");
    const $select = document.createElement("select");
    const $productDetail__selectedOptions = document.createElement("div");
    const $h3 = document.createElement("h3");
    const $ul = document.createElement("ul");
    const $productDetail__totalPrice = document.createElement("div");
    const $orderButton = document.createElement("button");

    $title.innerText = `${name} ${TITLE}`;

    $productDetail.classList.add("ProductDetail");
    $img.src = imageUrl;

    $productDetail__info.classList.add("ProductDetail__info");
    $h2.innerText = name;
    $productDetail__price.classList.add("$ProductDetail__price");
    $productDetail__price.innerText = this.renamePrice(price);
    $productDetail.append($img, $productDetail__info);
    productOptions.map(option => {
      const $option = this.settingOptions(name, option);
      $select.appendChild($option);
    });
    $productDetail__selectedOptions.classList.add("ProductDetail__selectedOptions");
    $h3.innerText = "선택된 상품";
    $productDetail__totalPrice.classList.add("ProductDetail__totalPrice");
    $orderButton.innerText = "주문하기";
    $orderButton.addEventListener("click", this.handleClickOrderBtn);
    $productDetail__selectedOptions.append($h3, $ul, $productDetail__totalPrice, $orderButton);
    $productDetail__info.append($h2, $productDetail__price, $select, $productDetail__selectedOptions);

    $productDetail.append($img, $productDetail__info);
    this.$target.append($title, $productDetail);
  }

  handleClickOrderBtn = () => {

  }

  settingProductDetail = async () => {
    const productDetail = await fetchProductById(this.productId);
    this.renderProductDetail(productDetail);
  }

  settingOptions = (productName, option) => {
    const $option = document.createElement("option");
    let optionName = "";
    const { id, name, price, stock } = option;
    if(stock === 0) {
      optionName = "(품절) ";
      $option.disabled = true;
    }
    if(price === 0) {
      optionName += `${productName} ${name}`;
    } else {
      optionName += `${productName} ${name} (+${this.renamePrice(price)}원)`;
    }
    $option.value = id;
    $option.innerText = optionName;
    return $option;
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

export default ProductDetailPage;