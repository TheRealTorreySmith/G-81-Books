$(document).ready(() => {
  $('.authorDelete').click((event) => {
    const parent = $( event.target ).parent()
    const request = {
      first_name: parent.children("#authorFirstName")[0].innerText,
      last_name: parent.children("#authorLastName")[0].innerText,
    }

      $.ajax({
        url: '/authors',
        type: 'DELETE',
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(request),
        success: (data) => {
          window.location.reload()
        },
        error: (err) => {
        }
      }) // end ajax

  }) // end submit handler

}) // end doc ready
