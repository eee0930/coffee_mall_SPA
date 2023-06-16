class OrderItem {
  constructor({ productPrice, options }) {
    this.productPrice = productPrice;
    this.options = options;
    this.orderItemList = {};
  }

  setOrderItemList = (id) => {
    const { name, price } = this.options[id];
    const orderPrice = this.productPrice + price;
    if(this.orderItemList[id] === undefined) {
      this.orderItemList[id] = {
        amount: 1, 
        name: name,
        allPrice: orderPrice, 
        price: orderPrice,
      };
    } else {
      this.orderItemList[id].amount += 1;
      this.orderItemList[id].allPrice += orderPrice;
    }
  }

  getOrderItemList = () => {
    return this.orderItemList;
  }

  getTotalPrice = () => {
    let totalPrice = 0;
    for(const key in this.orderItemList) {
      const { allPrice } = this.orderItemList[key];
      totalPrice += allPrice;
    }
    return totalPrice;
  }
}

export default OrderItem;