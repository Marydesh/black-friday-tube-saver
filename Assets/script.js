
var searchInput = document.getElementById('search-bar');
var searchButton = document.getElementById('search-button');
const booksElement = document.querySelector('#books');
var searchInputVal = searchInput.value;
var wordInput = document.getElementById('word-input');
var wordInputVal = wordInput.value
var wordSearchButton = document.getElementById('word-search-button');
var dropDownOptions = document.getElementById('resultType');

var wordResultDisplay = $('#word-result');
var wordResults = document.getElementById('word-box')

var wordList = document.querySelector('.wordList')
var clearButton =document.getElementById('clear-button'); 
var clearWordButton = document.getElementById('word-clear-button'); 

//event listener on keypress//
searchInput.addEventListener('keypress', function(e){
  if (e.key === "Enter") formSearchButton()
})

//hides search results on page load//
$(document).ready(function () {
  $('#word-result').hide()
})

async function search(query) {
  requestURL = "https://openlibrary.org/search.json?q="
  let res = await fetch(requestURL + query)
  let data = await res.json()
  return data.docs
}
//function to clear book search//
function clearBooks() {
  booksElement.innerHTML = ""
}

function clearWordSearch () {
  wordList.innerHTML = ""
}
//functio to filter children's book//
function isChildrensBook(book) {
  var subjects = ["children", "children's", "juvenile", "juvenile fiction", "kids", "kid's", "young adult"]
  if (book.subject) {
    book.subject = book.subject.map(subj => subj.toLowerCase())
  }
  // Higher order array methods
  return subjects.some(subj => book.subject?.includes(subj))
}

async function searchOpenLibrary(searchInputVal) {
  //creates a HTML element to display "searching"//
  booksElement.innerHTML = `
    <h1>Searching...</h1>
  `
  let books = await search(searchInputVal)
  console.log(books)
  books = books.filter(isChildrensBook)
  books = books.slice(0, 6)
  if (books.length === 0) {
    booksElement.innerHTML = `
      <h1>No results found</h1>
    `
    return
  }
  clearBooks()
  // for each book
  books.forEach(book => {
    // create card
    let cardDiv = document.createElement('div')
    cardDiv.classList = "book card p-5 m-5"
    // create the title element
    let titleH2 = document.createElement('h2')
    titleH2.classList = 'title is-size-1 is-size-3-mobile'
    titleH2.innerText = book.title

    cardDiv.append(titleH2)

    appendProperty('Author', book.author_name[0])
    appendProperty('First year published', book.first_publish_year)
    appendProperty('Number of pages', book.number_of_pages_median)
    appendProperty('First sentence', book.first_sentence?.[0])
    appendProperty('Currently reading', book.currently_reading_count)
    appendProperty('E-Book access', book.ebook_access)

    
    // creates a button as link to redirect to the Open Library 
    cardDiv.innerHTML += `
      <a href="https://openlibrary.org${book.seed[0]}" target="_blank">
        <button class="checkout-button">
          Check out this book now
        </button>
      </a>
    `

    // creates hyperlink to Amazon//
    var appendLink = document.createElement('a');
    appendLink.innerText = "Buy on Amazon";
    appendLink.href = 'https://www.amazon.com/s?k=' + book.id_amazon?.[0];
     
    

    //displays bookcover image//
    var bookCover = document.createElement("img");
    bookCover.setAttribute("src", 'https://covers.openlibrary.org/b/id/' + book.cover_i + '.jpg');
    bookCover.setAttribute("height", "140");
    bookCover.setAttribute("width", "140");


    booksElement.append(cardDiv)
    cardDiv.append(bookCover)
    cardDiv.append(appendLink)

    function appendProperty(title, value) {
      let p = document.createElement('p')
      p.innerHTML = `${title}: ${value}`
      cardDiv.append(p)
    }
  })
}

searchButton.addEventListener('click', formSearchButton)
clearButton.addEventListener('click', clearBooks)
clearWordButton.addEventListener('click', clearWordSearch)

function formSearchButton() {

  var searchInputVal = searchInput.value

  if (!searchInputVal) {
    console.error('Enter the title of the book or the author name');
    return;
  }
  //localStorage.setItem('Your search', searchInputVal)

  console.log(searchInputVal);

  searchOpenLibrary(searchInputVal)
  recentBookSearches()
}

wordSearchButton.addEventListener('click', wordSearch)

async function searchWord(wordInputVal) {

  const wordURL = 'https://wordsapiv1.p.rapidapi.com/words/';
  var searchType = dropDownOptions.value
  if (searchType == "default") return
  wordList.innerHTML = ""

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'c2cec6dc1amsha61515a761a8c29p11765cjsn69c9ea2d72f4',
      'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
    }
  };

  let endpoint = wordURL + wordInputVal + '/' + searchType

  let res = await fetch(endpoint, options)
  let data = await res.json()

  let results = data[searchType]
  if (searchType == "rhymes") results = results.all
  if (results.length === 0) {
    let card = createCard()
    card.innerText = "No results found"
    wordList.append(card)
    return
  }
  for (var i = 0; i < results.length; i++) {
    let result = results[i]
    let cardResult = createCard()

    if (searchType === 'definitions') {
      cardResult.innerText = result.definition
    } else {
      cardResult.innerText = result
    }

    wordList.append(cardResult)

  }

}

function createCard() {
  let card = document.createElement('div')
  card.classList = "card card-result p-5 m-5"
  return card
}

function wordSearch(event) {
  event.preventDefault();

  var wordInputVal = wordInput.value

  if (!wordInputVal) {
    console.error('Enter the word!');
    return;
  }

  searchWord(wordInputVal)
  //on change of options in dropdown
  dropDownOptions.onchange = dropDownOptionsPick()
  recentWordSearches()
}


function dropDownOptionsPick() {
  var q = dropDownOptions.value
  console.log('You selected:' + q)
  $('#word-result').show()
}

function recentBookSearches() {

  var bookSearches = JSON.parse(localStorage.getItem('bookSearches')) || []
  var searchInputVal = searchInput.value;
  bookSearches.push(searchInputVal);
  localStorage.setItem('bookSearches', JSON.stringify(bookSearches))
  console.log(bookSearches)
}

function recentWordSearches() {

  var wordSearches = JSON.parse(localStorage.getItem('wordSearches')) || []
  var wordInputVal = wordInput.value;
  wordSearches.push(wordInputVal);
  localStorage.setItem('wordSearches', JSON.stringify(wordSearches))
  console.log(wordSearches)
}

function historyBookSearch() {
  console.log(this.textContent)
  search(this.textContent);
}

