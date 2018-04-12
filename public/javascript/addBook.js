// GET A LIST OF ALL THE AUTHORS WHO HAVE BEEN ADDED
// CHECK IF AUTHOR HAS ALREADY BEEN ADDED



const isAuthorAdded = () => {
  let selectedAuthor = $("#authors-select-list").find(":selected").text()
  if(arrayOfLi.includes(selectedAuthor)){
    return true
  } else {
    return false
  }
}
let arrayOfLi = []
// ADD AN AUTHOR FUNCTIONALITY
// AND UPDATE ARRAY OF AUTHORS ADDED
const addAuthor = () => {

  // ADD AUTHOR
  let selectedAuthor = $("#authors-select-list").find(":selected").text()

  $('#authors-container').append(`<li>${selectedAuthor}</li>`)
  //UPDATE ARRAY
  const allLi = $('#authors-container').children()
  for (let i = 0; i < allLi.length; i++) {
    arrayOfLi.push(selectedAuthor)
  }
}

const clearAllAuthors = () => {
  $('#authors-container').empty()
  arrayOfLi = []
}

$(document).ready((event) => {
// UPON CLICKING OF THE ADD AUTHOR BUTTON,
// IF THE AUTHOR HAS NOT YET BEEN ADDED,
// THEN ADD THEM.
  $('#add-author-button').click((event) => {
      event.preventDefault()
      if(!isAuthorAdded()) {
          addAuthor()
      }
  })

  $('#clear-authors-button').click((event) => {
      event.preventDefault()
      clearAllAuthors()
  })
})
