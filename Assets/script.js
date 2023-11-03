// var seachButton = document.getElementById('')
const booksElement = document.querySelector('#books')

async function search(query) {
  requestURL = "https://openlibrary.org/search.json?q="
  let res = await fetch(requestURL+query)
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
async function searchOpenLibrary() {
  let books = await search('tom sawyer')
  books = books.slice(0, 10)
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
    appendProperty('First sentence', book.first_sentence?.[0,1])
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
searchOpenLibrary()

//seachButton.addEventListener('click', searchOpenLibrary)

var subject = "animals"

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

