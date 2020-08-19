const tableOfContents = () => {
// *********** TOC ********* //
// 1. BOOK DATA
    // Book Info Object 
    // featured books filter method
    // titles map method 
// 2. CART DATA
    // Cart array 
    // getCart returns cart array
    //TODO: setCart 
    //TODO: emptyCart
// 3. COMPONENTS
  // STORE
    // makeStore function accepts 2 arguments (array, titles = false)
    //TODO: Add empty store DOM function
  // CART
    // addToCart function accepts 2 arguments (array, index)
    //TODO: cartTotal
    //TODO: chargeIt function
    // makeCart function create/updates the cart
  // NAVIGATION
    // Navigation events
}

// 1. *********** BOOK DATA ********* //
// data array for books
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

// 2. *********** CART DATA ********* //
// ARRAY FOR ADDING ITEMS TO THE CART
const cart = [];

//TODO: add setCart function
const setCart = (book) => {
  cart.push(book);
}

// GETTER function for getting the cart array
const getCart = () => {
  return cart;
}

//TODO: add emptyCart function


// 3. ****** COMPONENTS ******** //

// STORE
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
    addToCart(array, index);


  });
};
// TODO: Add empty store DOM function


// CART
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
      </div>`
    );

    //TODO: ADD EVENT LISTENER To modal "Charge It" button AFTER BUTTON IS ON THE DOM
    $('#charge-it').click(() => {
      const ccNum = $('#credit-card').val();
      chargeIt(ccNum);
    })

    showCartItems();
}
// Add the item to the cart array AND update the DOM cart 
const addToCart = (array, index) => {
  
  // getting the specific dynamically set ID on the button
  const cartButton = $(`#cart-add-${index}`);

  // adding an click event listener to the button above
  cartButton.on('click', () => {
    // passing the arguments to add to cart so that they can be used in the function that adds the item to the cart array and build the DOM element
  
    setCart(array[index]);
    // refresh the cart on the addition of a new item
    makeCart();
  })
}

const showCartItems = () => {

  let obj = {};

  getCart().forEach((item) => {
    if (item.title in obj) {
      obj[item.title].quantity++;
      obj[item.title].price += item.price;
    } else {
      obj[item.title] = { quantity: 1, price: item.price }
    }
  });

  Object.keys(obj).map((title) => {
    $("tbody").append(
      `<tr>
        <td>${title}</td>
        <td>${obj[title].quantity}</td>
        <td>${obj[title].price.toFixed(2)}</td>
      </tr>`
    )
  })
}

//add cartTotal function
const cartTotal = () => {
  const myCart = getCart();
  const total = myCart.reduce((a, cartItem) => {return a + cartItem.price;}, 0);

  return total;
}

//TODO: chargeIt function
const chargeIt = (ccNum) => {
  if (ccNum === "") {
    $('#error-message').html("Please enter a credit card number");
  } else {
    emptyCart();
    $(".modal-backdrop").remove();
    $("#buy-modal").modal("hide");

    $("#cart").html(
      `<h2 style="margin-top: 100px;">Thank you for your order.</h2>
      <p>Your credit card number was ${ccNum} has been charged.</p>`
    )
  }
}

const emptyCart = () => {
  cart.length = 0;
}

// NAVIGATION
const navigationEvents = () => {

  // "All Books" link in nav click event
  $("#all-books").on("click", () => {
    makeStore(bookInfo);
  });

  // "Featured Books" link in nav click event
  $("#featured-books").on("click", () => {
    makeStore(featured);
  });

  // "List of Titles" link in nav click event
  $("#titles").on("click", () => {
    makeStore(titles, true)
  });

  //TODO: Add search functionality
  // as the user types, searches through array of objects
  // returns the items that match
  // if no matches, clear DOM and provide a message that reads "No Items"

  $('#search').keyup((e) => {
    const searchValue = $('#search').val().toLowerCase();

    const searches = bookInfo.filter((book) => {
      return book.title.toLowerCase().includes(searchValue);
    })

    console.log(searches);
    if (searches.length === 0) {
      emptyStore();
    } else {
      makeStore(searches);
    }

    if (e.keyCode === 13) {
      $('#search').val("");
    }

  })
};

const emptyStore = () => {
  $("#store").removeClass('card-columns');
  $('#store').html("<h1>No Items with that title.</h1>");
}


// Start the program
const init = () => {
  navigationEvents();
  makeStore(bookInfo);
};

init();
