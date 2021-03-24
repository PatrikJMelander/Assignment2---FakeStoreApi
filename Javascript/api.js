const products = [];
const tempProducts = [];

function getAllProducts() {
  fetch("http://webacademy.se/fakestore/")
    .then((res) => res.json())
    .then((data) => data.forEach((e) => tempProducts.push(e)))
    .then(() => productRender())
    .then(() => addToCartBtn());
    
}

function productRender() {
  let productSection = document.querySelector(".product-section");
  if (productSection) {
    productSection.innerHTML = "";
    Object.values(tempProducts).map((e) => {
      let productName = e.title;
      productName = productName.substring(0, productName.indexOf(" "));
      let price = parseInt(e.price);
      const product = {
        id: e.id,
        title: e.title,
        price: price,
        category: e.category,
        description: e.description,
        image: e.image,
        cartQuantity: 0,

        productName: productName,
      };
      products.push(product);
      productSection.innerHTML += `
        <div class="product-div">
            <h2>${product.title}</h2>
            <img class="product-img"src="${product.image}" alt="product image">
            <p class="product-description" >${product.description}</p>
            <h3 class="price">${product.price}kr</h3>
            <button class="add-to-cart" id="${product.id}">Add to cart</button>
        </div>
        `;
    });
  }
  localStorage.setItem("productList", JSON.stringify(products));
}

function addToCartBtn() {
  let btns = document.querySelectorAll(".add-to-cart");
  for (let i = 0; i < btns.length; i++) {
    const e = btns[i];
    e.addEventListener("click", function () {
      console.log(e.id);
      addToCart(products[e.id - 1]);
    });
  }
}

function addToCart(product) {
  let cartProducs = JSON.parse(localStorage.getItem("productsInCart"));
  console.log(product); //for test
  if (cartProducs === null) {
    product.cartQuantity = 1;
    cartQuantity("add")
    console.log(product); //for test
    cartProducs = {
      [product.id]: product,
    };
  } else {
    if (cartProducs[product.id] === undefined) {
      product.cartQuantity = 1;
      cartQuantity("add")
      cartProducs = {
        ...cartProducs,
        [product.id]: product,
      };
    } else {
      cartProducs[product.id].cartQuantity += 1;
      cartQuantity("add")
    }
  }
  localStorage.setItem("productsInCart", JSON.stringify(cartProducs));

  console.log(cartProducs);
}

function cartQuantity(addOrRemove){
  let productQuantity = parseInt(localStorage.getItem("cartQuantity"));

  if (productQuantity) {
    if (addOrRemove === "add") {
      localStorage.setItem("cartQuantity", productQuantity + 1);
      document.querySelector(".navigation-cart span").textContent = productQuantity + 1;
    } else if (addOrRemove === "remove") {
      localStorage.setItem("cartQuantity", productQuantity - 1);
      document.querySelector(".navigation-cart span").textContent = productQuantity - 1;
    }
  } else {
    localStorage.setItem("cartQuantity", 1);
    document.querySelector(".navigation-cart span").textContent = 1;
  }
}

function update(){
  document.querySelector(".navigation-cart span").textContent = 0;

  let productQuantity = parseInt(localStorage.getItem("cartQuantity"));
  if (productQuantity > 0){
    document.querySelector(".navigation-cart span").textContent = productQuantity;
  }
  
}

window.onload = () => {
  getAllProducts();
  update()
};
