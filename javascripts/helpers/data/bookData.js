const bookInfo = [
  {
    price: 25.99,
    title: "Fifty Shades of Chicken",
    image: "./assets/images/chicken.jpg",
    featured: false,
  },
  {
    price: 15.45,
    title: "Fifty Shades of Bacon",
    image: "./assets/images/bacon.jpg",
    featured: true,
  },
  {
    price: 5,
    title: "Fifty Shades of Kale",
    image: "./assets/images/kale.jpg",
    featured: false,
  },
  {
    price: 2,
    title: "Fifteen Shades for Grey",
    image: "./assets/images/animals.jpeg",
    featured: false,
  },
  {
    price: 50,
    title: "Fifty Shades of Zombie",
    image: "./assets/images/zombie.jpg",
    featured: true,
  },
  {
    price: 0.75,
    title: "Fifty Shades of Gravy",
    image: "./assets/images/gravy.jpg",
    featured: false,
  },
];

const featured = bookInfo.filter((book) => {
  return book.featured;
});

const titles = bookInfo.map((book) => {
  return { title: book.title, price: book.price };
});

const getBooks = (type) => {
    switch(type) {
        case 'all':
            return bookInfo;
            break;
        case 'featured':
            return featured;
            break;
        case 'titles':
            return titles;
            break;
        default:
            return;
    }
}

export { getBooks }