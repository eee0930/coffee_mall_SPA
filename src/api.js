const ROOT = "https://h6uc5l8b1g.execute-api.ap-northeast-2.amazonaws.com/dev/products";

export async function fetchProductList() {
  try {
    const response = await fetch(ROOT);
    const data = await response.json();
    return data;
  } catch(e) {
    console.log("❌", e);
    return;
  }
}

export async function fetchProductById(id) {
  try {
    const response = await fetch(`${ROOT}/${id}`);
    const data = await response.json();
    return data;
  } catch(e) {
    console.log("❌", e);
    return;
  }
}