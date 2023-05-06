// variables
const cart = document.querySelector(".cart");
const cartProducts = document.querySelector(".cart__products");
const cartIcon = document.querySelector(".header__logo-icon");
const productsGrid = document.querySelector(".products__grid");
const btnClearCart = document.querySelector("#clear-cart");
const products = [];

//functions

registerEventListeners();

function registerEventListeners() {
  cartIcon.addEventListener("click", toggleCart);
  productsGrid.addEventListener("click", addProduct);
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

  //Verificar si el producto ya existe en el array products
  const productExist = products.some(
    (product) => product.id === productInfo.id
  );

  if (productExist) {
    //obtener el indice del producto que ya existe para actualizar la cantidad
    const index = products.findIndex(
      (product) => product.id === productInfo.id
    );

    products[index].quantity++;
  } else {
    //Agregar el objeto producto al arreglo products
    products.push(productInfo);
  }

  addHTMLProductToCart();
}

//Agregar los productos al carrito
function addHTMLProductToCart() {
  //Limpiar el HTML del carrito
  clearCartProductsHTML();

  //Generar HTML del card Product y agregarlo al carrito
  products.forEach((product) => {
    const { image, name, price, id, quantity } = product;
    const cardProduct = document.createElement("div");

    cartProducts.insertAdjacentHTML(
      "beforeend",
      `
        <div class="cart__product">
        <div class="cart__info">
          <img src=${image} class="cart__info-image">
          <p class="cart__info-name">${name}</p>
          <span class="cart__info-quantity">${quantity} ud.</span>
          <span class="cart__info-price">${price}</span>
        </div>

        <div class="cart__delete">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="cart__delete-icon"
            data-id="${id}"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </div>
      `
    );
  });
}

//eliminar todos los elementos hijos del contenedor cartProducts
function clearCartProductsHTML() {
  // Mientras exista un primer hijo en el contenedor cartProduct
  while (cartProducts.firstChild) {
    // Remover el primer hijo del contenedor cartProducts
    cartProducts.removeChild(cartProducts.firstChild);
  }
}
