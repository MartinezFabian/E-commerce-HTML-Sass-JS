// variables
const cart = document.querySelector(".cart");
const cartIcon = document.querySelector(".header__logo-icon");
const productList = document.querySelector(".products__grid");
const btnClearCart = document.querySelector("#clear-cart");

//functions

registerEventListeners();

function registerEventListeners() {
  cartIcon.addEventListener("click", toggleCart);
  productList.addEventListener("click", addProduct);
}

function toggleCart() {
  //.toggle() agrega o quita la clase del elemento dependiendo de si ya contiene la clase o no
  cart.classList.toggle("cart--hidden");
}

function addProduct(e) {
  // Verifica si el elemento que ha desencadenado el evento tiene la clase "add-to-cart"
  if (e.target.classList.contains("add-to-cart")) {
    //obtenemos el elemento HTML que contiene todo el producto
    const productHTML = e.target.parentElement.parentElement;
    readProductData(productHTML);
  }
}

function readProductData(productHTML) {
  //crear un objeto con los datos del producto seleccionado
  const productInfo = {
    id: productHTML.querySelector(".add-to-cart").getAttribute("data-id"),
    name: productHTML.querySelector(".product__name").textContent,
    price: productHTML.querySelector(".product__price").textContent,
    image: productHTML.querySelector(".product__image").src,
    quantity: 1,
  };

  console.log(productInfo);
}
