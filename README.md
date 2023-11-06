# book-buddy-base

Link to deployed application: https://marydesh.github.io/book-buddy-base/

Link to Github Repo: https://github.com/Marydesh/book-buddy-base
User Story: 

As a user I want to search for a book to read. Once I find the book I want I go to the Open Library to check it out. If I came across words I do not know, I want to search for the words to find out the definicion, synonyms, antonyms, examples and rhymes. 

Acceptance Criteria:

When I search for a book by title or author, 
then I am presented with cards displaying book information that include book cover, book title, first year published, number of pages, first sentence, number of people that are currently reading the book, E-Book access and a link to Amazon where the user can purchase the book in case the book is not available to checkout. 

When I click on the "Checkout this book now", the page redirects to the Open Libary page with this book.

When I click on the Amazon link, it takes me to the Amazon page with the current book.

When I click on the link in the header "Go to Dictionary", the link takes me to the section of the page where I can search for the word.

When I type in the word and choose the type of information I want to see from the dropdown, I am presented with cards displaying information requested.


This application is designed for kids who love books or who want an easy access to books. Our team used Open Library API to access book information available. We also used Word API to access a dictionary. The application is interactive and requires user input. 


In this application we used: fetch API, we used async function to wait umtil the data finishes loading. I used form element and preventDefault for it. We used set attribute; create and append element to create cards to display data; event listener on click to call functions that search API; local storage; JQuery to hide a show the html section ;  google fonts, bootstrap for dropdown field. 