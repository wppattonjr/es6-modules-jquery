import { setCart } from '../helpers/data/cartData.js';
import { cartTotal } from './cartTotal.js'
import { chargeIt, showCartItems } from './cartModal'


const makeCart = () => {
  $("#cart").html(` 
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




export { makeCart, addToCart }

