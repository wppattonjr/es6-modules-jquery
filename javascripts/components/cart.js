import { setCart, getCart, emptyCart } from './../helpers/data/cartData.js';


const makeCart = () => {
  $("#cart").html(` 
      <div class="modal fade" id="buy-modal" tabindex="-1" role="dialog" aria-labelledby="buy-modalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="buy-modalLabel">Order Total</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="cart-items">
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Price</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>
            <div class="modal-body">
              <b>Your total is: $${cartTotal().toFixed(2)}</b>
              <div id="error-message" style="color: red;"></div>
              <input class="form-control mr-sm-2" id="credit-card" type="number" placeholder="Enter Credit Card Number" aria-label="Credit Card">
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" id="charge-it">Charge it!</button>
            </div>
          </div>
        </div>
      </div>
  
      <i class="fas fa-shopping-cart cart"></i>
        <div id="cart-stuff">
          <h3>My Cart</h3>
          <div id="cart-thumb"></div>
          <div id="cart-price">
            <div>$${cartTotal().toFixed(2)}</div>
          </div>
            <button class="btn btn-danger" data-toggle="modal" data-target="#buy-modal" id="checkout">Checkout</button>
        </div>`);
  $("#charge-it").click(() => {
    const ccNum = $("#credit-card").val();
    chargeIt(ccNum);
  });

  showCartItems();
};

const addToCart = (array, index) => {
  const cartButton = $(`#cart-add-${index}`);

  cartButton.on("click", () => {
    setCart(array[index]);
    makeCart();
  });
};

const showCartItems = () => {
  let obj = {};

  getCart().forEach((item) => {
    if (item.title in obj) {
      obj[item.title].quantity++;
      obj[item.title].price += item.price;
    } else {
      obj[item.title] = { quantity: 1, price: item.price };
    }
  });

  Object.keys(obj).map((title) => {
    $("tbody").append(
      `<tr>
          <td>${title}</td>
          <td>${obj[title].quantity}</td>
          <td>$${obj[title].price.toFixed(2)}</td>
        </tr>`
    );
  });
};

const cartTotal = () => {
  const myCart = getCart();
  const total = myCart.reduce((a, cartItem) => {
    return a + cartItem.price;
  }, 0);

  return total;
};

const chargeIt = (ccNum) => {
  if (ccNum === "") {
    $("#error-message").html("Please enter a credit card number");
  } else {
    emptyCart();
    $(".modal-backdrop").remove();
    $("#buy-modal").modal("hide");

    $("#cart").html(
      `<h2 style="margin-top: 100px;">Thank you for your order.</h2>
        <p>Your credit card number was ${ccNum} has been charged.</p>`
    );
  }
};

export { makeCart, addToCart }

