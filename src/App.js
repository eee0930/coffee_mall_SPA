import ProductListPage from "./routes/ProductListPage.js";
import ProductDetailPage from "./routes/ProductDetailPage.js";
import CartPage from "./routes/CartPage.js";

const PRODUCTLIST_URL = "/";
const PRODUCTDETAIL_URL = "/products/";
const CART_URL = "/cart";

class App {
  constructor($target) {
    this.$target = document.querySelector($target);
    this.settingPage();
  }

  render = ($page) => {
    this.$target.append($page);
  }

  settingPage = () => {
    const { pathname } = location;
    const $page = document.createElement("div");
    if(pathname === PRODUCTLIST_URL) {
      $page.classList.add("ProductListPage");
      this.settingProductListPage($page);
    } else if (pathname.startsWith(PRODUCTDETAIL_URL)) {
      const id = pathname.slice(PRODUCTDETAIL_URL.length);
      $page.classList.add("ProductDetailPage");
      this.settingProductDetailPage($page, id);
    } else {
      $page.classList.add("CartPage");
      this.settingCartPage($page);
    }
    this.render($page);
  }

  settingProductListPage = ($target) => {
    const productListPage = new ProductListPage({ 
      $target,
      url: PRODUCTDETAIL_URL
    });
    productListPage.settingProductList();
  }

  settingProductDetailPage = ($target, id) => {
    const productDetailPage = new ProductDetailPage({ 
      $target,
      productId: id,
      url: CART_URL
    });
    productDetailPage.settingProductDetail();
  }

  settingCartPage = ($target) => {
    const cartPage = new CartPage({ 
      $target 
    });
  }
}

export default App;