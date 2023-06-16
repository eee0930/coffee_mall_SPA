const TITLE = "장바구니";
const BUTTON_VALUE = "주문하기";

class CartPage {
  constructor({ $target }) {
    this.$target = $target;
    this.productInfo = {};
    this.orderItemList = {};
    this.totalPrice = 0;
  }
 
  renderCartPage = () => {
    const $h1 = createElement("h1");
    const $cart = createElement("div", "Cart");
    const $ul = this.renderCartItems();
    const $totalPrice = this.renderTotalPrice();
    const $OrderButton = createElement("button", "OrderButton");
    $OrderButton.innerText = BUTTON_VALUE;
    $h1.innerText = TITLE;
    $cart.append($ul, $totalPrice, $OrderButton);
    this.$target.append($h1, $cart);
  }
 
  renderCartItems = () => {
    const $ul = createElement("ul");
    Object.values(this.orderItemList).map(orderItem => {
      const $li = createElement("li", "Cart__item");
      const $img = createElement("img");
      const $Cart__itemDesription = createElement("div", "Cart__itemDesription");
      const $name = createElement("div");
      const $price = createElement("div");
      $img.src = this.productInfo.imageUrl;
      $name.innerText = `${this.productInfo.name} ${orderItem.name} ${repaintPrice(orderItem.price, true)} ${orderItem.amount}개`;
      $price.innerText = repaintPrice(orderItem.allPrice, true);
      $Cart__itemDesription.append($name, $price);
      $li.append($img, $Cart__itemDesription);
      $ul.appendChild($li);
    });
    return $ul;
  }
   
  renderTotalPrice = () => {
    const $Cart__totalPrice = createElement("div", "Cart__totalPrice");
    $Cart__totalPrice.innerText = `총 상품가격 ${repaintPrice(this.totalPrice, true)}`;
    return $Cart__totalPrice;
  }

  settingCartItems = () => {
    const localItem = localStorage.getItem("orderItemList");
    localStorage.removeItem("orderItemList");
    const parcedItem = JSON.parse(localItem);
    this.productInfo = parcedItem.productInfo;
    this.orderItemList = parcedItem.orderItemList;
    this.totalPrice = parcedItem.totalPrice;
    this.renderCartPage();
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

export default CartPage;