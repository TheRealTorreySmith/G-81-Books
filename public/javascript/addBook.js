// GET A LIST OF ALL THE AUTHORS WHO HAVE BEEN ADDED
// CHECK IF AUTHOR HAS ALREADY BEEN ADDED
const isAuthorAdded = () => {
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


  const createRequest = () => {
    const arrayOfAuthors = $('#authors-container').val().split('  ').map(x => x.trim())
    return {
    title: $('#title').val(),
    genre: $('#genre').val(),
    cover_url: $('#cover_url').val(),
    description: $('#description').val(),
    authors: arrayOfAuthors
  } }

  // Handle submit event
  $('#create-book-form').submit((event) => {
    event.preventDefault()
      // Make POST request with form field data as POST body
      const stringOfAuthors = $('#authors-container').val()
      if(stringOfAuthors.length < 1) {
        $('#exampleModalCenterBody').empty()
        $('#exampleModalCenterBody').append(`<p>Wait a second...</p>`)
        $('#exampleModalCenterBody').append(`<p>You need to add at least one author for this book.</p>`)
        $('#exampleModalCenter').modal('show')
      } else {
        $.ajax({
          url: '/books/new',
          type: 'POST',
          dataType: "json",
          contentType: "application/json; charset=utf-8",
          data: JSON.stringify(createRequest()),
          success: (data) => {
            console.log('data success', data);
            $('#exampleModalCenterBody').empty()
            $('#exampleModalCenterBody').append(`<p>Success!</p>`)
            $('#exampleModalCenterBody').append(`<p>${data.message}</p>`)            
            $('#exampleModalCenter').modal('show')
          },
          error: (err) => {
            console.log('err', err);
            $('#exampleModalCenterBody').empty()
            $('#exampleModalCenterBody').append(`<p>Addition Failed...</p>`)
            $('#exampleModalCenterBody').append(`<p>${err.responseJSON.message}</p>`)
            $('#exampleModalCenter').modal('show')
          }
        }) // end ajax
      }
  }) // end submit handler

})
