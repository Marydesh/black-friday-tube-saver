var seachButton = document.getElementById('')
function searchOpenLibrary() {
  requestURL = "https://openlibrary.org/search.json?q="
  var subject = "animals"
  var title = "tom sawyer"

  fetch(requestURL + title)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
      console.log('Title: '+ data.docs[0].title)
      console.log('Author: '+ data.docs[0].author_name[0])
      console.log('Amazon id: ' + data.docs[0].id_amazon[0])
      console.log('First year published: '+ data.docs[0].first_publish_year)
      console.log('Number of pages: ' + data.docs[0].number_of_pages_median)
      console.log('First sentence: '+ data.docs[0].first_sentence[0,1])
      console.log('Currently reading: ' + data.docs[0].currently_reading_count)
      console.log('E-Book access: '+ data.docs[0].ebook_access)
    })
}
searchOpenLibrary()

//seachButton.addEventListener('click', searchOpenLibrary)

var subject = "animals"