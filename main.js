// TODO: Connect Search
// TODO: Update getter/setter functions
// TODO: cartTotal, chargeIt, update cart total with cartTotal



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

// *********** ARRAY METHODS ********* //
// featured books
// creates a new array without modifying existing array
const featured = bookInfo.filter((book) => {
  return book.featured;
});

// titles of the books ONLY
// creates new array without modifying existing array
const titles = bookInfo.map((book) => {
  return { title: book.title, price: book.price};
})


// ****** DOM FUNCTIONS ******** //
// create/modify the store (reuseable function)
const makeStore = (array, titles = false) => {
  // Clear the DOM each time this function is run
  $("#store").html("");

  // The forEach() method calls a function once for each element in an array, in order.
  // Syntax: array.forEach(function(currentValue, index, arr), thisValue)
  array.forEach((item, index) => {

    // The switch expression is evaluated once.
    // The value of the expression is compared with the values of each case.
    // If there is a match, the associated block of code is executed.
    // If there is no match, the default code block is executed.
    switch(titles) {

      // CHECKING TO SEE IF THE ARGUMENT 'TITLES' IS TRUE 
      case true:
        $("#store").removeClass('card-columns')
        $("#store").append(`<div>${item.title} | ${item.price}</div>`)

        // When JavaScript reaches a break keyword, it breaks out of the switch block.
        // This will stop the execution of inside the block.
        // Note: If you omit the break statement, the next case will be executed even if the evaluation does not match the case.
        break;

      // If there is no match, the default code block is executed.
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

    // adding a dynmic click event to each "Add To Cart" button on the DOM
    // it is passing the ARRAY argument and the INDEX argument to the function so that they can be used later. 
    addToCartEvent(array, index);
  });
};

// TODO: Walk through breaking this function from the setter
// create/modify the cart
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

const addToCartEvent = (array, index) => {
  // getting the specific dynamically set ID on the button
  const cartButton = $(`#cart-add-${index}`);

  // adding an click event listener to the button above
  cartButton.on('click', () => {

    // passing the arguments to add to cart so that they can be used in the function that adds the item to the cart array and build the DOM element
    addToCart(array, index)
  })
}

// Add the item to the cart array AND update the DOM cart 
const addToCart = (array, index) => {

  //TODO: Update this to use a setter function
  cart.push(array[index]);

  // refresh the cart on the addition of a new item
  makeCart();
}

// GETTER function for getting the cart array
const getCart = () => {
  return cart;
}




// Start the program
const init = () => {
  navigationEvents();
  makeStore(bookInfo);
};

init();
