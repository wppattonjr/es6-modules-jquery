import { navigationEvents } from './components/navigation.js';
import { makeStore } from './components/store.js';
import { getBooks } from './helpers/data/bookData.js';

const init = () => {
  navigationEvents();
  makeStore(getBooks('all'));
};

init();
