function renderCart() {
  const getAllProducts = JSON.parse(localStorage.getItem("productList"));
  let allCartProducs = JSON.parse(localStorage.getItem("productsInCart"));

  //console.log(getAllProducts); //for test
  //console.log(allCartProducs); //for test
  if (allCartProducs === null) {
    $("total-price").text("0");
    return;
  }
  //console.log("före loopen");

  let cartProducts = document.querySelector(".all-products-in-cart");

  Object.values(allCartProducs).forEach((e) => {
    //console.log("Inne i loopen");
    cartProducts.innerHTML += `  
    <div class="cart-product" id="${e.id}">
        <div class="image-div">
          <img src="${e.image}" class="cart-img">
          <p class="cart-product-name">${e.productName}</p>
        </div>  
        <div class="cart-price">
            <p>${e.price}kr</p>
        </div>
        <div class="cart-quantity">
        <button type="button" class="subtract" id="${e.id}">-</button>
            <span id="quantity${e.id}" class="quantity">${e.cartQuantity}</span>
            <button type="button" class="add" id="${e.id}">+</button>
        </div>
        <div class="cart-total">
            <p id="price${e.id}">${e.price * e.cartQuantity}kr</p>
        </div>
    </div>
    `;
  });
}

function addActionListenerAddBtn() {
  const temp = document.querySelectorAll(".add");
  let allCartProducs = JSON.parse(localStorage.getItem("productsInCart"));
  Object.values(temp).forEach((e) => {
    e.addEventListener("click", function () {
      addToCart(allCartProducs[e.id]);
    });
  });
  localStorage.setItem("productsInCart", JSON.stringify(allCartProducs));
}

function addActionListenerRemoveBtn() {
  const temp = document.querySelectorAll(".subtract");
  let allCartProducs = JSON.parse(localStorage.getItem("productsInCart"));
  Object.values(temp).forEach((e) => {
    e.addEventListener("click", function () {
      removeFromCart(allCartProducs[e.id]);
    });
  });
  localStorage.setItem("productsInCart", JSON.stringify(allCartProducs));
}

function addToCart(product) {
  let cartProducs = JSON.parse(localStorage.getItem("productsInCart"));
  if (cartProducs === null) {
    product.cartQuantity = 1;
    cartProducs = {
      [product.id]: product,
    };
  } else {
    if (cartProducs[product.id] === undefined) {
      product.cartQuantity = 1;
      cartProducs = {
        ...cartProducs,
        [product.id]: product,
      };
    } else {
      cartProducs[product.id].cartQuantity += 1;
    }
  }
  localStorage.setItem("productsInCart", JSON.stringify(cartProducs));

  //console.log(cartProducs);
  cartQuantity("add");
}

function removeFromCart(product) {
  let cartProducs = JSON.parse(localStorage.getItem("productsInCart"));
  if (cartProducs[product.id].cartQuantity === 0) {
    return;
  } else {
    cartProducs[product.id].cartQuantity -= 1;
  }

  localStorage.setItem("productsInCart", JSON.stringify(cartProducs));

  console.log(cartProducs);
  cartQuantity("remove");
}

function calculateTotalPrice() {
  let allCartProducs = JSON.parse(localStorage.getItem("productsInCart"));
  let totalCartPrice = 0;
  if (allCartProducs===null){
    return;
  }
  Object.values(allCartProducs).forEach((e) => {
    let price = parseInt(e.price);
    let quantity = parseInt(e.cartQuantity);
    totalCartPrice += price * quantity;
  });
  console.log(totalCartPrice);
  let totalPrice = document.querySelector("#total-price");

  totalPrice.innerHTML = ` ${totalCartPrice} kr`;
}

function cartQuantity(addOrRemove) {
  let productQuantity = parseInt(localStorage.getItem("cartQuantity"));

  if (productQuantity) {
    if (addOrRemove === "add") {
      localStorage.setItem("cartQuantity", productQuantity + 1);
      document.querySelector(".navigation-cart span").textContent =
        productQuantity + 1;
    } else if (addOrRemove === "remove") {
      localStorage.setItem("cartQuantity", productQuantity - 1);
      document.querySelector(".navigation-cart span").textContent =
        productQuantity - 1;
    }
  } else {
    localStorage.setItem("cartQuantity", 1);
    document.querySelector(".navigation-cart span").textContent = 0;
  }
  update();
}

function addActionListenerOnAdd(input) {
  let cartProducts = JSON.parse(localStorage.getItem("productsInCart"));
  let btns = document.querySelectorAll(input);
  btns.addEventListener("click", function () {
    cartProducts.cartQuantity += 1;
  });
}

function update() {
  let productQuantity = parseInt(localStorage.getItem("cartQuantity"));
  let allCartProducs = JSON.parse(localStorage.getItem("productsInCart"));
  document.querySelector(".navigation-cart span").textContent = productQuantity;

  if (allCartProducs===null){
    return;
  }
  let totalCartSum = 0;
  Object.values(allCartProducs).forEach(e => {
    totalCartSum += (e.price * e.cartQuantity)
    document.querySelector(`#quantity${e.id}`).textContent = e.cartQuantity;
    document.querySelector(`#price${e.id}`).textContent = (e.price * e.cartQuantity) + "kr";
  });
  document.querySelector(`#total-price`).textContent = (totalCartSum) + "kr";
}

window.onload = () => {
  renderCart();
  calculateTotalPrice();
  addActionListenerAddBtn();
  addActionListenerRemoveBtn();
  update();
};
