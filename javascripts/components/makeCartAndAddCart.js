import { setCart } from './../helpers/data/cartData.js';
import { makeTheCartPortion } from './../components/makeCart.js';
import { cartModal, chargeIt, showCartItems } from './../components/modal.js'


const makeCart = () => {
    $("#cart").html(`
        ${cartModal()}
        ${makeTheCartPortion()}`);
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
  
