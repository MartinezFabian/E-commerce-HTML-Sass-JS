document.addEventListener("DOMContentLoaded", () => {
  main();
});

function main() {
  // variables
  const cart = document.querySelector(".cart");
  const cartProducts = document.querySelector(".cart__products");
  const cartIcon = document.querySelector(".header__logo-icon");
  const productsGrid = document.querySelector(".products__grid");
  const btnClearCart = document.querySelector("#clear-cart");
  const productCounter = document.querySelector("#product-counter");
  const productCounterContainer = document.querySelector(".cart__count");
  let products = [];

  //functions

  //traemos los datos guardados en local storage
  getDataLocalStorage();

  function getDataLocalStorage() {
    // Verificar si hay datos almacenados en el local storage con la clave products
    if (localStorage.getItem("products")) {
      // Obtener los datos almacenados y convertirlos de nuevo a un array
      products = JSON.parse(localStorage.getItem("products"));

      // actualizar el contenido HTML con los datos obtenidos
      updateCartHTML();

      //Actualizar el contador del carrito en base a los datos obtenidos
      updateProductCounter();
    }
  }

  registerEventListeners();

  function registerEventListeners() {
    cartIcon.addEventListener("click", toggleCart);
    productsGrid.addEventListener("click", addProduct);
    cartProducts.addEventListener("click", deleteProduct);
    btnClearCart.addEventListener("click", () => {
      products = []; //vaciar array
      clearCartProductsHTML(); //limpiar HTML del carrito
      updateProductCounter(); // Actualiza el contador de productos
      syncLocalStorage(); //Limpia el array en local storage
    });
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

  function deleteProduct(e) {
    // Verifica si el elemento que ha desencadenado el evento tiene la clase "cart__delete-icon"
    if (e.target.classList.contains("cart__delete-icon")) {
      // Obtiene el valor del atributo 'data-id' del elemento que se debe eliminar
      const idProductToBeRemoved = e.target.getAttribute("data-id");

      // obtener un nuevo array sin el producto que tiene el mismo 'id' que el elemento a eliminar
      products = products.filter((product) => product.id !== idProductToBeRemoved);

      // Actualiza la representación visual del carrito de compras
      updateCartHTML();
      // Actualiza el contador de productos
      updateProductCounter();
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
    const productExist = products.some((product) => product.id === productInfo.id);

    if (productExist) {
      //obtener el indice del producto que ya existe para actualizar la cantidad
      const index = products.findIndex((product) => product.id === productInfo.id);

      products[index].quantity++;
    } else {
      //Agregar el objeto producto al arreglo products
      products.push(productInfo);
      updateProductCounter();
    }

    updateCartHTML();
  }

  function updateCartHTML() {
    //Limpiar el HTML del carrito
    clearCartProductsHTML();

    //Generar HTML para cada product del array y agregarlo al carrito
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

    //Agrega los productos actuales a local storage
    syncLocalStorage();
  }

  //eliminar todos los elementos hijos del contenedor cartProducts
  function clearCartProductsHTML() {
    // Mientras exista un primer hijo en el contenedor cartProduct
    while (cartProducts.firstChild) {
      // Remover el primer hijo del contenedor cartProducts
      cartProducts.removeChild(cartProducts.firstChild);
    }
  }

  function updateProductCounter() {
    productCounter.textContent = products.length;

    if (products.length > 0) {
      productCounterContainer.classList.add("cart__count--red");
    } else {
      productCounterContainer.classList.remove("cart__count--red");
    }
  }

  //Guarda el array products en local storage
  function syncLocalStorage() {
    localStorage.setItem("products", JSON.stringify(products));
  }
}
