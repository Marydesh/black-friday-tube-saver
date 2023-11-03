// var seachButton = document.getElementById('')
var searchInput = document.getElementById('search-bar');
var searchButton = document.getElementById('search-button');
const booksElement = document.querySelector('#books');
var searchInputVal = searchInput.value;
var wordInput = document.getElementById('word-input');



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

    booksElement.append(cardDiv)

    function appendProperty(title, value) {
      let p = document.createElement('p')
      p.innerHTML = `${title}: ${value}`
      cardDiv.append(p)
    }
  })
}
//searchOpenLibrary()

searchButton.addEventListener('click', formSearchButton)


//   fetch(requestURL + title)
// .then(function (response) {
//   return response.json();
// })
// .then(function (data) {
//   console.log(data)
//   console.log('Title: '+ data.docs[0].title)
//   console.log('Author: '+ data.docs[0].author_name[0])
//   console.log('Amazon id: ' + data.docs[0].id_amazon[0])
//   console.log('First year published: '+ data.docs[0].first_publish_year)
//   console.log('Number of pages: ' + data.docs[0].number_of_pages_median)
//   console.log('First sentence: '+ data.docs[0].first_sentence[0,1])
//   console.log('Currently reading: ' + data.docs[0].currently_reading_count)
//   console.log('E-Book access: '+ data.docs[0].ebook_access)
// })
// }
// searchOpenLibrary()

function formSearchButton(event) {
  event.preventDefault();

  var searchInputVal = searchInput.value

  if (!searchInputVal) {
    console.error('Enter the title of the book or the author;s name');
    return;
  }
  localStorage.setItem('search', searchInputVal)

  console.log(searchInputVal);

  searchOpenLibrary(searchInputVal)
  search(searchInputVal)
}



//try {
//const response = await fetch(worsURL + word + '/' + synonyms || antonyms || rhymes || definition || example, options);

function searchWord() {

  const wordURL = 'https://wordsapiv1.p.rapidapi.com/words/';
  //var word = wordInput.value;
  var synonyms = []
  var antonyms = []
  var rhymes = []
  var definition = []
  var example = []

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'c2cec6dc1amsha61515a761a8c29p11765cjsn69c9ea2d72f4',
      'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
    }
  };

  fetch(wordURL + 'bank' + '/' + synonyms || antonyms || rhymes || definition || example, options)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)

    //   const response = await fetch(wordURL + bank + '/' + synonyms, options)
    //   const result = await response.text();
    //   console.log(result);
    // } catch (error) {
    //   console.error(error);


    })
  }

  searchWord()