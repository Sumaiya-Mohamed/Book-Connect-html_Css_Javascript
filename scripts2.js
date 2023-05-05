import { BOOKS_PER_PAGE, authors, genres, books } from "./data.js";

const matches = books;
const page = 1;

if (!books || !Array.isArray(books)) {
  throw new Error('Source required');
}

const range = [0, 36];

if (!range || range.length < 2) {
  throw new Error('Range must be an array with two numbers');
}

/** The code below deals with displaying the book lists.
 *  @param {object}  booksToRender
 */




const bookList = document.querySelector('[data-list-items]');
const fragment = document.createDocumentFragment(); // modify fragment1 to fragment
let currentPage = 1; // add currentPage variable to keep track of the current page


const createBookOverlay = (booksToRender) => { // modify function to receive a parameter of books to render
  for (let i = 0; i < booksToRender.length; i++) {
    const { author: authorId, id, image, title } = booksToRender[i];

    const element = document.createElement('button');
    element.className = 'preview';
    element.setAttribute('data-preview', id);

    element.innerHTML = /* html */ `
      <img class="preview__image" src="${image}" />
      <div class="preview__info">
        <h3 class="preview__title">${title}</h3>
        <div class="preview__author">${authors[authorId]}</div>
      </div>
    `;

    fragment.appendChild(element); // modify fragment1 to fragment
  
   
    // Add a click event listener to the button element
    element.addEventListener('click', (event) => {
      const button = event.target;
      console.log(button);
    });
   }
bookList.appendChild(fragment); // modify fragment1 to fragment
};

document.addEventListener("DOMContentLoaded", () => {
  const startIndex = 0; // start rendering books from the beginning
  const endIndex = startIndex + BOOKS_PER_PAGE; // render only `BOOKS_PER_PAGE` number of books
  const booksToRender = matches.slice(startIndex, endIndex); // get the books to render from the matches array

  createBookOverlay(booksToRender); // render the books

  if (booksToRender.length < BOOKS_PER_PAGE) { // if there are less books than `BOOKS_PER_PAGE`, hide the load more button
    loadMoreButton.style.display = 'none';
  }
});

//Code that handles displaying more books.
const loadMoreButton = document.querySelector('[data-list-button]');

loadMoreButton.addEventListener('click', () => {
 
  const startIndex = currentPage * BOOKS_PER_PAGE; // get the starting index of the books to render
  const endIndex = startIndex + BOOKS_PER_PAGE; // get the ending index of the books to render
  const booksToRender = matches.slice(startIndex, endIndex); // get the books to render from the matches array

  createBookOverlay(booksToRender); // render the books

  currentPage++; // increment the current page
  
  
  if (booksToRender.length < BOOKS_PER_PAGE) { // if there are less books than `BOOKS_PER_PAGE`, hide the load more button
    loadMoreButton.style.display = 'none';
  } else {
    loadMoreButton.innerHTML = `Show more (${matches.length - endIndex})`;
  }
});





// Code for the book summary.
 
const bookSummaryClose = document.querySelector('[data-list-close]');
const bookDialog = document.querySelector('[data-list-active]');

bookSummaryClose.addEventListener('click', () => {
  bookDialog.close();
});

bookList.addEventListener('click', (event) => {
  let active = null;
  const pathArray = Array.from(event.path || event.composedPath());

  for (let i = 0; i < pathArray.length; i++) {
    const node = pathArray[i];

    if (node?.dataset?.preview) {
      const previewId = node.dataset.preview;

      for (const singleBook of books) {
        if (singleBook.id === previewId) {
          active = singleBook;
          break;
        }
      }
    }
  }

  if (!active) {
    return;
  }

  bookDialog.setAttribute('open', true);

  const bookBlur = document.querySelector('[data-list-blur]');
  const bookImage = document.querySelector('[data-list-image]');
  const bookTitle = document.querySelector('[data-list-title]');
  const bookSubtitle = document.querySelector('[data-list-subtitle]');
  const bookDescription = document.querySelector('[data-list-description]');

  bookBlur.style.backgroundImage = `url(${active.image})`;
  bookImage.src = active.image;
  bookTitle.textContent = active.title;
  bookSubtitle.textContent = `${authors[active.author]} (${new Date(active.published).getFullYear()})`;
  bookDescription.textContent = active.description;
});



