import {BOOKS_PER_PAGE, authors, genres , books} from "./data.js" 
//@ts-check
const matches = books;


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
const fragment = document.createDocumentFragment(); 
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

    fragment.appendChild(element); 
  
   
    // Add a click event listener to the button element
    element.addEventListener('click', (event) => {
      const button = event.target;
      console.log(button);
    });
   }
bookList.appendChild(fragment); 
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

loadMoreButton.textContent = 'Show More';

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






// The code below deals with the day and night options and store them.
const day = {
  backgroundColor: '#FFFFFF',
  color: '#255255255'
};

const night = {
  backgroundColor:'#212121' ,
  color: '#F0F0F0'
};

const settingsButton = document.querySelector('[data-header-settings]');
const settingsDialog = document.querySelector('[data-settings-overlay]');
const settingsForm = document.querySelector('[data-settings-form]');
const themeSelect = document.querySelector('[data-settings-theme]');
const settingsSubmit = document.querySelector('[data-settings-submit]')
const settingsCancel = document.querySelector('[data-settings-cancel]');

const applyDayTheme = () => {
  document.body.style.backgroundColor = day.backgroundColor;
  document.body.style.color = day.color;
 /* for (let i = 0; i < books.length; i++) { // Blue button
  const button = document.querySelector('.preview')
  button.style.backgroundColor = 'blue'
  }*/
  localStorage.setItem('theme', 'day');
};

const applyNightTheme = () => {
  document.body.style.backgroundColor = night.backgroundColor;
  document.body.style.color = night.color;
  localStorage.setItem('theme', 'night');
};

const changeThemeColor = (selectedValue) => {
  if (selectedValue === 'night') {
    applyNightTheme();
  } else {
    applyDayTheme();
  }
};

// Listen for changes to the theme select dropdown
if (themeSelect) {
  themeSelect.addEventListener('change', () => {
    const selectedValue = themeSelect.value;
    changeThemeColor(selectedValue);
  });
}

// Retrieve the theme preference from local storage (if available)
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  if (savedTheme === 'night') {
    applyNightTheme();
  } else {
    applyDayTheme();
  }
}

// Listen for the settings form submission and apply the selected theme
if (settingsForm) {
  settingsForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const selectedValue = themeSelect.value;
    changeThemeColor(selectedValue);

    // Hide the settings dialog after the user has made a selection
    settingsDialog.hide();
  });
}

// Listen for the settings button click and show the settings dialog
settingsButton.addEventListener('click', () => {
  settingsDialog.show();
});

settingsSubmit.addEventListener('click', () => {
  settingsDialog.close();
})

settingsCancel.addEventListener('click', () => {
  const settingsDialog = document.querySelector('[data-settings-overlay]');
  settingsDialog.close();
})





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



// Code for the search form.

const searchButton = document.querySelector('[data-header-search]')
const selectWrapper = document.querySelector('[data-search-genres]'); // Genres select field.
const selectWrapper2 = document.querySelector('[data-search-authors]'); // Authors select field.
const searchCancel = document.querySelector('[ data-search-cancel]')
const searchOverlay = document.querySelector('[ data-search-overlay]')

searchButton.addEventListener('click', () => {
 searchOverlay.setAttribute('open', true)
})

searchCancel.addEventListener('click', () => {
 searchOverlay.close();
})

// Select the search form and add a submit event listener
const searchForm = document.querySelector('[data-search-form]');
searchForm.addEventListener('submit', (event) => {
 
  event.preventDefault(); // Prevent the form from submitting and reloading the page
  
  const formData = new FormData(searchForm); 
  const filters = Object.fromEntries(formData); // Get the form data as an object using FormData and Object.fromEntries.
 
  const result = [];  // Initialize an empty array to store the search results
  
  for (let i = 0; i < books.length; i++) { // Loop through the books and check if each book matches the search filters
    const book = books[i];
    const titleMatch = filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase());
    const authorMatch = filters.author === 'any' || book.author === filters.author;
    const genreMatch = filters.genre === 'any' || book.genres.includes(filters.genre);
    // Check if the book matches all the search filters
    if (titleMatch && authorMatch && genreMatch) {
      result.push(book);
    }
  }
  // Display the search results on the page
  displayResults(result);

 searchOverlay.close();
});

/**
 * Function to display the search results on the page
 *  @param {object} booksToRender
 */ 
  
  const displayResults = (booksToRender) => {

  const bookList = document.querySelector('[data-list-items]');
  const message = document.querySelector('[data-list-message]');
  const fragmentBookResult = document.createDocumentFragment();
  
  bookList.innerHTML = ''; // Clear the book list and message elements
  message.classList.remove('list__message_show');
  
  if (booksToRender.length < 1) {  // If there are no search results, show the message element and return
    message.classList.add('list__message_show');
    loadMoreButton.textContent = 'Back' 
    // When the loadMoreButton is clicked then the browser should refresh.
    return;
  }
  
  // Loop through the search results and create a new book element for each one
  for (let i = 0; i < booksToRender.length; i++) {
    const { author: authorId, id, image, title } = booksToRender[i];
    const newDiv = document.createElement('div')
    const bookElement = document.createElement('button');
    bookElement.className ='preview';
    bookElement.setAttribute('data-preview', id) // Fixed typo in setAttribute method call
    bookElement.innerHTML = `
    <img class="preview__image" src="${image}" />
    <div class="preview__info">
      <h3 class="preview__title">${title}</h3>
      <div class="preview__author">${authors[authorId]}</div>
    </div>
    `;
    fragmentBookResult.appendChild(bookElement);
  }
  bookList.appendChild(fragmentBookResult);
}

// Code for book summary of filtered books.

bookSummaryClose.addEventListener('click', () => {
  bookDialog.close();
});

const filteredBookSummary = (event) => {
  
  bookDialog.setAttribute('open', true)
  let filteredBooks = null;

  const authorFilter = document.querySelector('[data-search-authors]').value; // select field for authors.
  const genreFilter = document.querySelector('[data-search-genres]').value;   // select field for genres.

  filteredBooks = books.filter(book => {
    return (authorFilter === 'any' || book.author === authorFilter) && // Changed empty string to 'any'
           (genreFilter === 'any' || book.genre === genreFilter); // Changed empty string to 'any'
  });
  
  const pathArray = Array.from(event.path || event.composedPath());

  let newlyActive = null; // Added missing declaration

  for (let i = 0; i < pathArray.length; i++) {
    const node = pathArray[i];

    if (node?.dataset?.preview) {
      const previewId = node.dataset.preview;

      for (const singleBook of filteredBooks) {
        if (singleBook.id === previewId) {
          newlyActive = singleBook;
          break;
        }
      }
    }
  }

  

  const bookBlur = document.querySelector('[data-list-blur]');
  const bookImage = document.querySelector('[data-list-image]');
  const bookTitle = document.querySelector('[data-list-title]');
  const bookSubtitle = document.querySelector('[data-list-subtitle]');
  const bookDescription = document.querySelector('[data-list-description]');
 
  // Changed filteredBooks.image to newlyActive.image
  bookBlur.style.backgroundImage = `url(${newlyActive.image})`;
  bookImage.src = newlyActive.image;
  bookTitle.textContent = newlyActive.title;
  bookSubtitle.textContent = `${authors[newlyActive.author]} (${new Date(newlyActive.published).getFullYear()})`;
  bookDescription.textContent = newlyActive.description;

  if (!newlyActive) {
    return;
  }
}

bookList.addEventListener('click', filteredBookSummary)
  
// Create an "All Genres" option
const allGenresOption = document.createElement("option");
allGenresOption.value = "any"; //What it actually is.
allGenresOption.text = "All Genres"; // what it reads as.
selectWrapper.appendChild(allGenresOption);

// Loop through the genres object and create an option for each genre
for (const id in genres) {
    if (Object.hasOwnProperty.call(genres, id)) { // Getting the genre names that are property values
      const option = document.createElement("option");
      option.value = id;
      option.text = genres[id];
      selectWrapper.appendChild(option);
    }
  }


// Create an "All Authors" option
const allAuthorsOption = document.createElement("option");
allAuthorsOption.value = "any"; //What it actually is.
allAuthorsOption.text = "All Authors"; // what it reads as.
selectWrapper2.appendChild(allAuthorsOption);

// Loop through the authors object and create an option for each author
for (const id in authors) {
    if (Object.hasOwnProperty.call(authors, id)) {
      const option = document.createElement("option");
      option.value = id;
      option.text = authors[id];
      selectWrapper2.appendChild(option);
    }
  }






   


     
    
    


