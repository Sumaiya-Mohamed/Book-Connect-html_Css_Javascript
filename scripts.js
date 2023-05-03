import {BOOKS_PER_PAGE, authors, genres , books} from "./data.js" // authors = oject , genres = object, books = array.

const matches = books;
const page = 1;
/*Both variables were not declared properly with a variable keyword , because its a global 
 variable it should remain constant and be declared with const.*/

if (!books && !Array.isArray(books)) throw new Error('Source required') 
if (!range && range.length < 2) throw new Error('Range must be an array with two numbers') // The array with 2 numbers will be ([0,1]).

const day = {  // Declared the variable with const
    dark: '10, 10, 20',
    light: '255, 255, 255',
}

const night = { // Declared the variable with const
    dark: '255, 255, 255',
    light: '10, 10, 20',
}

const fragment = document.createDocumentFragment();     //Declared the variables with const .
const extracted = matches.slice(0, 36)        // Slice starts at index 0 and ends before index 36 , It will only go from index 0-35.

 
for (let i = 0 ; i < extracted.length ; i++) {  

    const preview = createPreview({ //Assigning the  properties of preview to the values of the properties in matches array.
        author: matches[8],
        id: matches[0],
        image: matches[4],
        title: matches[3],
    })

    fragment.appendChild(preview)
}

const bookList = document.querySelector('.list');
const  booksOfTheList = bookList.querySelector('[data-list-items]');
booksOfTheList.appendChild(fragment)
/* The above code appends a fragment that was created to display thr book information.
*Above I fetched a parent element and then a child element through 
their class names instead of using data-attributes that
was previously used.
 */

const selectWrapper = document.querySelector('[data-search-genres]'); // Fetching the element via class name.

// Create an "All Genres" option
const allGenresOption = document.createElement("option");
allGenresOption.value = "All Genres"; //What it actually is.
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


const selectWrapper2 = document.querySelector('[data-search-authors]'); // Fetching the element via class name.

// Create an "All Authors" option
const allAuthorsOption = document.createElement("option");
allAuthorsOption.value = "All Authors"; //What it actually is.
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


//Code for theme settings.
const settingsButton = document.querySelector('[data-header-settings]');
const settingsDialog = document.querySelector('[data-settings-overlay]');
const themeSelect = document.querySelector('[data-settings-theme]'); //This gets the select field.

// Shows the dialog when the settings button is clicked
settingsButton.addEventListener('click', () => {
  settingsDialog.setAttribute('open', true);
});

// Sets the color scheme when the theme is changed
// I change the code again and saved the first changes in notes.
themeSelect.addEventListener('changes', () => { 
  const isDarkTheme = themeSelect.value === 'night' && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const css = {
    night: {
      dark: '#333',
      light: '#eee'
    },
    day: {
      dark: '#ddd',
      light: '#222'
    }
  };
  const root = document.documentElement;
  root.style.setProperty('--color-dark', isDarkTheme ? css.night.dark : css.day.dark);
  root.style.setProperty('--color-light', isDarkTheme ? css.night.light : css.day.light);
});

//The code below handles displaying more books.
const loadMoreButton = document.querySelector('[data-list-button]');
BOOKS_PER_PAGE; //imported from data.js
let currentPage = 1;

loadMoreButton.addEventListener('click', () => {
  const booksList = document.querySelector('[data-list-items]');
  const startIndex = (currentPage - 1) * BOOKS_PER_PAGE; // Starts at index 0.
  const endIndex = startIndex + BOOKS_PER_PAGE; // Ends at index 35 although endIndex = 36.

  const booksToRender = books.slice(startIndex, endIndex);

  for (let i = 0; i < booksToRender.length; i++) {
    const bookListElement = document.createElement('ul')
    booksList.appendChild(bookListElement) //Here I am adding a ul element to the div where the books will be listed.
    const bookElement = document.createElement('li');
    bookElement.textContent = `${booksToRender[i].image} ${booksToRender[i].title} ${booksToRender[i].author}`;
    bookListElement.appendChild(bookElement); // Here I am adding the li element I created to the ul element.
  }

  currentPage++;

  if (currentPage > Math.ceil(books.length / BOOKS_PER_PAGE)) {
    loadMoreButton.style.display = 'none';
  } else {
    loadMoreButton.setAttribute('data-list-button', `Show more (${books.length - endIndex})`);
  }
});


const searchCancel = document.querySelector('[ data-search-cancel]');
searchCancel.addEventListener('click', () => {
     const searchDialog = document.querySelector('[ data-search-overlay]')
    searchDialog.setAttribute('open', false) // This code should enable the button to  close the dialog(overlay).
    })

const settingsCancel = document.querySelector('[data-settings-cancel]');
settingsCancel.addEventListener('click', () => {
    const settingsDialog = document.querySelector('[data-settings-overlay]');
    settingsDialog.setAttribute('open', false)
})

data-settings-form.submit() { actions.settings.submit }
data-list-close.click() { data-list-active.open === false }

data-list-button.click() {
    document.querySelector([data-list-items]).appendChild(createPreviewsFragment(matches, page x BOOKS_PER_PAGE, {page + 1} x BOOKS_PER_PAGE]))
    actions.list.updateRemaining()
    page = page + 1
}

data-header-search.click() {
    data-search-overlay.open === true ;
    data-search-title.focus();
}

data-search-form.click(filters) {
    preventDefault()
    const formData = new FormData(event.target)
    const filters = Object.fromEntries(formData)
    result = []

    for (book; booksList; i++) {
        titleMatch = filters.title.trim() = '' && book.title.toLowerCase().includes[filters.title.toLowerCase()]
        authorMatch = filters.author = 'any' || book.author === filters.author

        {
            genreMatch = filters.genre = 'any'
            for (genre; book.genres; i++) { if singleGenre = filters.genre { genreMatch === true }}}
        }

        if titleMatch && authorMatch && genreMatch => result.push(book)
    }

    if display.length < 1 
    data-list-message.class.add('list__message_show')
    else data-list-message.class.remove('list__message_show')
    

    data-list-items.innerHTML = ''
    const fragment2 = document.createDocumentFragment()
    const extracted2 = source.slice(range[0], range[1])

    for ({ author, image, title, id }; extracted; i++) {
        const { author: authorId, id, image, title } = props

        element = document.createElement('button')
        element.classList = 'preview'
        element.setAttribute('data-preview', id)

        element.innerHTML = /* html */ `
            <img
                class="preview__image"
                src="${image}"
            />
            
            <div class="preview__info">
                <h3 class="preview__title">${title}</h3>
                <div class="preview__author">${authors[authorId]}</div>
            </div>
        `

        fragment.appendChild(element)
    }
    
    data-list-items.appendChild(fragments)
    initial === matches.length - [page * BOOKS_PER_PAGE]
    remaining === hasRemaining ? initial : 0
    data-list-button.disabled = initial > 0

    data-list-button.innerHTML = /* html */ `
        <span>Show more</span>
        <span class="list__remaining"> (${remaining})</span>
    `

    window.scrollTo({ top: 0, behavior: 'smooth' });
    data-search-overlay.open = false
}

/*data-settings-overlay.submit; {
    preventDefault()
    const formData = new FormData(event.target)
    const result = Object.fromEntries(formData)
    document.documentElement.style.setProperty('--color-dark', css[result.theme].dark);
    document.documentElement.style.setProperty('--color-light', css[result.theme].light);
    data-settings-overlay).open === false
*/

data-list-items.click() {
    pathArray = Array.from(event.path || event.composedPath())
    active;

    for (node; pathArray; i++) {
        if active break;
        const previewId = node?.dataset?.preview
    
        for (const singleBook of books) {
            if (singleBook.id === id) active = singleBook
        } 
    }
    
    if !active return
    data-list-active.open === true
    data-list-blur + data-list-image === active.image
    data-list-title === active.title
    
    data-list-subtitle === '${authors[active.author]} (${Date(active.published).year})'
    data-list-description === active.description
}
