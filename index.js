import { menuArray } from "./data.js";

const menuContainer = document.getElementById("menu-container");
const orderContainer = document.getElementById("order-container");
const paymentContainer = document.getElementById("payment-container");
let orderArr = [];

// Rendering menu items, home page
function getMenu(menuArray) {
  menuArray.forEach((item) => {
    menuContainer.innerHTML += `
    <div class="item-card">
    <img src=${item.image} alt=${item.altText} class="item-img">
      <section class="item-description">
      <h2 class="item-title">${item.name}</h2>
      <p class="item-ingredients">${item.ingredients}</p>
      <p class="item-price">$${item.price}</p>
      </section>
      <button id="add-btn" class="add-btn" data-id="${item.id}">+</button>
      </div>
      `;
  });
  return menuContainer;
}
getMenu(menuArray);

// detecting click event
document.addEventListener("click", (e) => {
  if (e.target.dataset.id) {
    addOrderListToDom(e.target.dataset.id);
  } else if (e.target.dataset.removalid) {
    removeOrderItem(e.target.dataset.removalid);
  } else if (e.target.id === "comp-order-btn") {
    paymentForm();
  }
});

// Rendering order items
function renderOrder() {
  if (orderArr.length === 0) {
    orderContainer.innerHTML = ""; // Hide section if orderArr is empty
    return;
  }

  let orderItems = "";
  orderArr.forEach((item) => {
    orderItems += `
        <div class="order-items">
          <p>${item.name} <button class="remove-btn" data-removalid="${item.id}">remove</button> <span class="order-item-price">$${item.price}</span></p>
        </div>
    `;
  });

  let totalPrice = 0;
  orderArr.forEach((item) => {
    totalPrice += item.price;
  });

  orderContainer.innerHTML = `
    <h2 class="order-container-title">Your order</h2>
    ${orderItems}
    <h3 class="total-price">Total price: <span class="order-item-price">$${totalPrice}</span></h3>
    <button class="comp-order-btn" id="comp-order-btn">Complete Order</button>
  `;
}

function addOrderListToDom(itemId) {
  const targetItemObj = menuArray.filter((item) => {
    return item.id.toString() === itemId;
  })[0];
  orderArr.push(targetItemObj);
  renderOrder();
}

// Removing order item/items
function removeOrderItem(itemId) {
  // Find the first index in orderArr where id matches itemId
  const removeIndex = orderArr.findIndex(
    (item) => item.id.toString() === itemId
  );

  if (removeIndex > -1) {
    orderArr.splice(removeIndex, 1); // Remove that item
  }
  renderOrder();
}

function paymentForm() {
  paymentContainer.innerHTML = `
  <form action="" id="customer-details">
    <div class="form-inner">
        <h2 class="form-heading">Enter card details</h2>
        <input type="text" name="fullName" class="form-input-style" placeholder="Enter your name" required
          aria-label="Full Name">
        <input type="number" name="cardNumber" class="form-input-style" placeholder="Enter card number" required
          aria-label="Card number">
        <input type="number" name="CVV" class="form-input-style" placeholder="Enter CVV" required
          aria-label="CVV">
        <button type="submit" class="pay-btn" id="pay-btn">Pay</button>
    </div>
  </form>
  `;
  const form = document.getElementById("customer-details");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const data = new FormData(form);
    console.log(data);
    const name = data.get("fullName");
    console.log(name);

    paymentContainer.innerHTML = "";
    orderCompleteState(name);
  });
}

function orderCompleteState(name) {
  orderContainer.innerHTML = `<p class="feedback-msg">Thanks, ${name}! Your order is on its way!</p>`;
}
