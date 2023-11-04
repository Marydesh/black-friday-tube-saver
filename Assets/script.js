// var seachButton = document.getElementById('')
var searchInput = document.getElementById('search-bar');
var searchButton = document.getElementById('search-button');
const booksElement = document.querySelector('#books');
var searchInputVal = searchInput.value;
var wordInput = document.getElementById('word-input');
var wordInputVal = wordInput.value
var wordSearchButton =document.getElementById('word-search-button'); 
var dropDownOptions= document.getElementById('resultType'); 




async function search(query) {
  requestURL = "https://openlibrary.org/search.json?q="
  let res = await fetch(requestURL + query)
  let data = await res.json()
  return data.docs
}
/*
  <div class="book card">
      <h2 class="title">Tom Sawyer Abroad</h2>
      <p class="subtitle">Mark Twain</p>
      <p></p>
  </div>


*/
async function searchOpenLibrary(searchInputVal) {
  let books = await search(searchInputVal)
  //books = books.slice(0, 10)
  console.log(books)
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
    appendProperty('Amazon id', book.id_amazon?.[0])
    appendProperty('First year published', book.first_publish_year)
    appendProperty('Number of pages', book.number_of_pages_median)
    appendProperty('First sentence', book.first_sentence?.[0, 1])
    appendProperty('Currently reading', book.currently_reading_count)
    appendProperty('E-Book access', book.ebook_access)

    var bookCover = document.createElement("img");
      bookCover.setAttribute("src", 'https://covers.openlibrary.org/b/id/' + book.cover_i + '.jpg');
      bookCover.setAttribute("height", "140");
      bookCover.setAttribute("width", "140");
      

    booksElement.append(cardDiv)
    cardDiv.append(bookCover)

    function appendProperty(title, value) {
      let p = document.createElement('p')
      p.innerHTML = `${title}: ${value}`
      cardDiv.append(p)
    }
  })
}
//searchOpenLibrary()

searchButton.addEventListener('click', formSearchButton)


function formSearchButton(event) {
  event.preventDefault();

  var searchInputVal = searchInput.value

  if (!searchInputVal) {
    console.error('Enter the title of the book or the author name');
    return;
  }
  localStorage.setItem('search', searchInputVal)

  console.log(searchInputVal);

  searchOpenLibrary(searchInputVal)
  search(searchInputVal)
}

wordSearchButton.addEventListener('click', wordSearch)

function searchWord(wordInputVal) {

  const wordURL = 'https://wordsapiv1.p.rapidapi.com/words/';
  //var word = wordInput.value;
  // var synonyms = []
  // var antonyms = []
  // var rhymes = []
  // var definition = []
  // var example = []

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'c2cec6dc1amsha61515a761a8c29p11765cjsn69c9ea2d72f4',
      'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
    }
  };

  fetch(wordURL + wordInputVal, options)
  // + synonyms || antonyms || rhymes || definition || example, options)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)

    })
  }


searchWord()

function wordSearch(event) {
    event.preventDefault();
  
    var wordInputVal = wordInput.value
  
    if (!wordInputVal) {
      console.error('Enter the word!');
      return;
    }
    localStorage.setItem('The word you search:', wordInputVal)
  
    console.log(wordInputVal);
  
    searchWord(wordInputVal)
}

