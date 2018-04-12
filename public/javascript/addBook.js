// GET A LIST OF ALL THE AUTHORS WHO HAVE BEEN ADDED
// CHECK IF AUTHOR HAS ALREADY BEEN ADDED
const isAuthorAdded = () => {
  debugger
  let selectedAuthor = $("#authors-select-list").find(":selected").text().trim()
  const arrayOfAuthors = $('#authors-container').val().split('  ').map(x => x.trim())
  if(!arrayOfAuthors.includes(selectedAuthor)){
    return false
  } else {
    return true
  }
}

// ADD AN AUTHOR FUNCTIONALITY
const addAuthor = () => {
  let selectedAuthor = $("#authors-select-list").find(":selected").text()
  $('#authors-container').append(`${selectedAuthor}`)
  const arrayOfAuthors = $('#authors-container').val().split('  ').map(x => x.trim())
}

// CLEAR ALL AUTHORS
const clearAllAuthors = () => {
  $('#authors-container').empty()
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
