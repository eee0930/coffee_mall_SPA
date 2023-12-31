import { fetchProductById } from "../api.js";
import OrderItem from "../components/OrderItem.js";

const TITLE = "상품 정보";
const SELECTED_TITLE = "선택된 상품";
const BUTTON_VALUE = "주문하기";
const SOLDOUT = "(품절) ";

class ProductDetailPage {
  constructor({ $target, productId, url }) {
    this.$target = $target;
    this.productId = productId;
    this.url = url;
    this.orderItem;
    this.productInfo = {};
    this.options = {};
  }

  renderProductDetail = () => {
    const $title = this.renderPageTitle();
    const $productDetail = createElement("div", "ProductDetail");
    const $img = createElement("img");
    const $productDetail__info = this.renderProductDetailInfo();
    $img.src = this.productInfo.imageUrl;
    $productDetail.append($img, $productDetail__info);
    this.$target.append($title, $productDetail);
  }

  renderPageTitle = () => {
    const $title = createElement("h1");
    $title.innerText = `${this.productInfo.name} ${TITLE}`;
    return $title;
  }

  renderProductDetailInfo = () => {
    const $productDetail__info = createElement("div", "ProductDetail__info");
    const $h2 = createElement("h2");
    const $productDetail__price = createElement("div", "ProductDetail__price");
    const $productDetail__selectedOptions = createElement("div", "ProductDetail__selectedOptions");
    const $h3 = createElement("h3");
    const $ul = createElement("ul");
    const $productDetail__totalPrice = createElement("div", "ProductDetail__totalPrice");
    const $orderButton = createElement("button", "OrderButton");
    const $select = this.renderProductOptionSelect();
    $productDetail__price.innerText = repaintPrice(this.productInfo.price);
    $h2.innerText = this.productInfo.name;
    $h3.innerText = SELECTED_TITLE;
    $orderButton.innerText = BUTTON_VALUE;
    $orderButton.addEventListener("click", this.handleClickOrderBtn);
    $productDetail__selectedOptions.append($h3, $ul, $productDetail__totalPrice, $orderButton);
    $productDetail__info.append($h2, $productDetail__price, $select, $productDetail__selectedOptions);
    return $productDetail__info;
  }

  renderProductOptionSelect = () => {
    const $select = createElement("select");
    $select.addEventListener("change", this.handleChangeOption);
    const $option = createElement("option");
    $option.innerText = "선택하세요.";
    $option.value = -1;
    $select.append($option);
    for(const key of Object.keys(this.options)) {
      const $option = this.settingSelectOptions(key, this.options[key]);
      $select.appendChild($option);
    }
    return $select;
  }

  renderOrderItems = () => {
    const orderItemList = this.orderItem.getOrderItemList();
    const $newUl = createElement("ul");
    Object.values(orderItemList).map(orderItem => {
      const { amount, name, price } = orderItem;
      const $li = createElement("li");
      const $div = createElement("div");
      const $input = createElement("input");
      $input.type = "number";
      $input.value = amount;
      $div.append($input, "개");
      const msg = `${this.productInfo.name} ${name} ${repaintPrice(price, true)} `;
      $li.append(msg, $div);
      $newUl.appendChild($li);
    });
    const $parent = document.querySelector(".ProductDetail__selectedOptions");
    const $oldUl = $parent.querySelector("ul");
    $parent.replaceChild($newUl, $oldUl);
  }
  
  renderTotalPrice = () => {
    const $price = document.querySelector(".ProductDetail__totalPrice");
    const totalPrice = this.orderItem.getTotalPrice();
    $price.innerText = repaintPrice(totalPrice, true);
  }

  updateOptionSelect = () => {
    const $productDetail__info = document.querySelector(".ProductDetail__info");
    const $oldSelect = $productDetail__info.querySelector("select");
    const $newSelect = this.renderProductOptionSelect();
    $productDetail__info.replaceChild($newSelect, $oldSelect);
  }

  handleChangeOption = (e) => {
    const value = e.target.value;
    if(value > -1) {
      this.settingOrderItems(value);
    }
  }

  handleClickOrderBtn = () => {
    const orderItemList = this.orderItem.getOrderItemList();
    const totalPrice = this.orderItem.getTotalPrice();
    const saveItem = {
      productInfo: this.productInfo,
      orderItemList,
      totalPrice,
    }
    localStorage.setItem("orderItemList", JSON.stringify(saveItem));
    location.pathname = this.url;
  }

  settingOrderItems = (optionId) => {
    this.setOptions(this.options, optionId);
    this.orderItem.setOrderItemList(optionId);
    this.renderOrderItems();
    this.renderTotalPrice();
    this.updateOptionSelect();
  }

  settingProductDetail = async () => {
    const productDetail = await fetchProductById(this.productId);
    this.productInfo = {
      name: productDetail.name,
      price: productDetail.price,
      imageUrl: productDetail.imageUrl,
    }
    this.setOptions(productDetail.productOptions);
    this.orderItem = new OrderItem({
      productPrice: this.productInfo.price, 
      options: this.options,
    });
    this.renderProductDetail();
  }

  settingSelectOptions = (optionId, optionValue) => {
    const $option = createElement("option");
    let optionName = "";
    const { stock, name, price } = optionValue;
    if(stock < 1) {
      optionName = SOLDOUT;
      $option.disabled = true;
    }
    if(price === 0) {
      optionName += `${this.productInfo.name} ${name}`;
    } else {
      optionName += `${this.productInfo.name} ${name} (+${repaintPrice(price, true)})`;
    }
    $option.value = optionId;
    $option.innerText = optionName;
    return $option;
  }

  setOptions = (options, optionId) => {
    let optionObj = {}
    if(optionId) {
      optionObj = options;
      optionObj[optionId].stock -= 1;
    } else {
      options.map(option => {
        optionObj[option.id] = {
          stock: option.stock, 
          name: option.name, 
          price: option.price,
        };
      })
    }
    this.options = optionObj;
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

const repaintPrice = (price, isOption) => {
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
  return `${priceArr.reverse().join("")}원${isOption ? '' : '~'}`;
}

export default ProductDetailPage;