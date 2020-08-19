import { addToCart } from './cart.js';

const makeStore = (array, titles = false) => {
  $("#store").html("");
  array.forEach((item, index) => {
    switch (titles) {
      case true:
        $("#store").removeClass("card-columns");
        $("#store").append(`<div>${item.title} | ${item.price}</div>`);
        break;
      default:
        $("#store").addClass("card-columns");
        $("#store").append(
          `<div class="card">
                  <img class="card-img-top" src=${item.image} alt=${
            item.title
          } style="height: 400px;">
                  <div class="card-body" style="height: 200px;">
                    <div class="sale-badge">${
                      item.featured
                        ? `<span class="badge badge-success">FEATURED</span>`
                        : ""
                    }</div>
                    <h5 class="card-title">${item.title}</h5>
                    <p class="card-text">Price: $${item.price}</p>
                    <button class="btn btn-danger" id="cart-add-${index}">Add to Cart</button>
                  </div>
                </div>`
        );
    }
    addToCart(array, index);
  });
};

const emptyStore = () => {
  $("#store").removeClass("card-columns");
  $("#store").html("<h1>No Items with that title.</h1>");
};

export { makeStore, emptyStore }
