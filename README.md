# book-buddy-base

Link to deployed application: https://marydesh.github.io/book-buddy-base/

Link to Github Repo: https://github.com/Marydesh/book-buddy-base

Link to the Applicatin Demo on YouTube - https://www.youtube.com/watch?v=E_WcL2Yg4QM

* User Story: 

As a user I want to search for a book to read. Once I find the book I want I go to the Open Library to check it out. If I came across words I do not know, I want to search for the words to find out the definicion, synonyms, antonyms, examples and rhymes. If the book is not available to checkout, I want to follow the link to Amazon listng on the book.

* Acceptance Criteria:

When I search (click on search button or press Enter) for a book by title or author, 
then I am presented with cards displaying book information that include book cover, book title, first year published, number of pages, first sentence, number of people that are currently reading the book, E-Book access and a link to Amazon where the user can purchase the book in case the book is not available to checkout. 

When I click on the "Checkout this book now", the page redirects to the Open Libary page with this book (opens in another tab).

When I click on the Amazon link, it takes me to the Amazon page with the current book.

When I click on the link in the header "Go to Dictionary", the link takes me to the section of the page where I can search for the word.

When I type in the word and choose the type of information I want to see from the dropdown, I am presented with cards displaying information requested.

When I click on Clear button on book search, it clears the book search.
When I click on Clear button on word search, it clears the word search.


- This application is designed for kids who love books or who want an easy access to books. Our team used Open Library API to access book information available. We also used Word API to access a dictionary. The application is interactive and requires user input. 


- In this application we used: fetch API, we used async function to wait until the data finishes loading. We used set attribute; create and append element to create cards to display data; event listener on click and on keypress to call functions that search API; local storage; JQuery to hide a show the html section ; google fonts, bootstrap for dropdown field. 


![Deployed Application 1](<Assets/images/Deployed Application 1.png>)
![Deployed Application ](<Assets/images/Deployed Application 2.png>)
![Deployed Application ](<Assets/images/Deployed Application 3.png>)


* Our tutor Doug assisted us in this Project and helped overcome the challange we had of displaying the data results as well as filtering for a ceratin book types:
- https://preply.com/en/tutor/3316660
