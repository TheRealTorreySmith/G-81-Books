
$(document).ready(() => {

  const createRequest = () => { return {
    first_name: $('#first_name').val(),
    last_name: $('#last_name').val(),
    biography: $('#biography').val(),
    portrait_url: $('#portrait_url').val()
  } }

  // Handle submit event
  $('#createAuthor').submit((event) => {
    event.preventDefault()
      // Clear out any msgs
      $('#server-side-validation-errors').empty()
      // Make POST request with form field data as POST body
      $.ajax({
        url: '/authors/new',
        type: 'POST',
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(createRequest()),
        success: (data) => {
          $('#server-status').text(data.status)
        },
        error: (err) => {
          $('#server-status').text(err.responseJSON.status)
        }
      }) // end ajax

  }) // end submit handler

}) // end doc ready