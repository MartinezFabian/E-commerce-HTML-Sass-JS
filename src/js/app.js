const cart = document.querySelector(".cart");
const cartIcon = document.querySelector(".header__logo-icon");

cartIcon.addEventListener("click", () => {
  cart.classList.toggle("cart--hidden");
});
