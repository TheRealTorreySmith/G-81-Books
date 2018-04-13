
$(document).ready(() => {
  $('.authorDelete').click((event) => {
    console.log("event:",event)
    console.log("target:",$( event.target ));
    console.log("parent:",$( event.target ).parent());
    const parent = $( event.target ).parent()
    const request = {
      first_name: parent.children("#authorFirstName")[0].innerText,
      last_name: parent.children("#authorLastName")[0].innerText,
    }
    console.log("request:",request)

      $.ajax({
        url: '/authors',
        type: 'DELETE',
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(request),
        success: (data) => {
          console.log('data success', data)
          window.location.reload()
        },
        error: (err) => {
          console.log('err', err)
        }
      }) // end ajax

  }) // end submit handler

}) // end doc ready
