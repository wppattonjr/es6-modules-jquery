"use strict";

const bookInfo = [
  {
    price: 25.99,
    title: "Fifty Shades of Chicken",
    image: "chicken.jpg",
    featured: false,
  },
  {
    price: 15.45,
    title: "Fifty Shades of Bacon",
    image: "bacon.jpg",
    featured: true,
  },
  {
    price: 5,
    title: "Fifty Shades of Kale",
    image: "kale.jpg",
    featured: false,
  },
  {
    price: 2,
    title: "Fifteen Shades for Grey",
    image: "animals.jpeg",
    featured: false,
  },
  {
    price: 50,
    title: "Fifty Shades of Zombie",
    image: "zombie.jpg",
    featured: true,
  },
  {
    price: 0.75,
    title: "Fifty Shades of Gravy",
    image: "gravy.jpg",
    featured: false,
  },
];

const cart = [];

// *********** ARRAY METHODS ********* //
const featured = bookInfo.filter((book) => {
  return book.featured;
});

const titles = bookInfo.map((book) => {
  return { title: book.title, price: book.price};
})

const makeStore = (array, titles = false) => {
  $("#store").html("");

  array.forEach((item, index) => {
    switch(titles) {
      case true:
        $("#store").removeClass('card-columns')
        $("#store").append(`<div>${item.title} | ${item.price}</div>`)
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

    addToCartEvent(array, index);

  });
};


const addToCart = (array, index) => {
  cart.push(array[index]);

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
          <div class="modal-body">
            
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
          <div>$${getCart().reduce((a, cartItem) => {return a + cartItem.price;}, 0).toFixed(2)}</div>
        </div>
          <button class="btn btn-danger" data-toggle="modal" data-target="#buy-modal" id="checkout">Checkout</button>
      </div>`
    );
}

// NAVIGATION EVENTS
const navigationEvents = () => {
  $("#all-books").on("click", () => {
    makeStore(bookInfo);
  });

  $("#featured-books").on("click", () => {
    makeStore(featured);
  });

  $("#titles").on("click", () => {
    makeStore(titles, true)
  });
};

const addToCartEvent = (array, index) => {
  const cartButton = $(`#cart-add-${index}`);

  cartButton.on('click', () => {
    addToCart(array, index)
  })
}

const getCart = () => {
  return cart;
}



const init = () => {
  navigationEvents();
  makeStore(bookInfo);
};

init();
