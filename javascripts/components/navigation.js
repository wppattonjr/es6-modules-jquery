import { getBooks } from './../helpers/data/bookData.js';
import { makeStore, emptyStore } from './store.js';

const navigationEvents = () => {
  $("#all-books").on("click", () => {
    makeStore(getBooks('all'));
  });

  $("#featured-books").on("click", () => {
    makeStore(getBooks('featured'));
  });

  $("#titles").on("click", () => {
    makeStore(getBooks('titles'), true);
  });

  $("#search").keyup((e) => {
    const searchValue = $("#search").val().toLowerCase();

    const searches = getBooks('all').filter((book) => {
      return book.title.toLowerCase().includes(searchValue);
    });

    console.log(searches);
    if (searches.length === 0) {
      emptyStore();
    } else {
      makeStore(searches);
    }

    if (e.keyCode === 13) {
      $("#search").val("");
    }
  });
};

export { navigationEvents }
