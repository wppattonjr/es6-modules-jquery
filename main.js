
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

const featured = bookInfo.filter((book) => {
  return book.featured;
});

const titles = bookInfo.map((book) => {
  return { title: book.title, price: book.price};
})

const cart = [];

const setCart = (book) => {
  cart.push(book);
}

const getCart = () => {
  return cart;
}

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
    addToCart(array, index);
  });
};

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
    $('#charge-it').click(() => {
      const ccNum = $('#credit-card').val();
      chargeIt(ccNum);
    })

    showCartItems();
}

const addToCart = (array, index) => {
  const cartButton = $(`#cart-add-${index}`);

  cartButton.on('click', () => {
    setCart(array[index]);
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
        <td>$${obj[title].price.toFixed(2)}</td>
      </tr>`
    )
  })
}

const cartTotal = () => {
  const myCart = getCart();
  const total = myCart.reduce((a, cartItem) => {return a + cartItem.price;}, 0);

  return total;
}

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

const init = () => {
  navigationEvents();
  makeStore(bookInfo);
};

init();
