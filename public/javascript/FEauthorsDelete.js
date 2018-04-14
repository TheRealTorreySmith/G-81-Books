$(document).ready(() => {
  $('.authorDelete').click((event) => {
    const parent = $( event.target ).parent()
    console.log('author id:', parent.children("#authorId")[0])
    const id = parent.children("#authorId")[0].innerText
    console.log('redicrected to /authors/',id,'/delete')
    window.location.href = `/authors/${id}/delete`


    // $.ajax({
    //   url: `authors/${request.first_name}&${request.first_name}/delete`,
    //   type: 'GET',
    //   dataType: "json",
    //   contentType: "application/json; charset=utf-8",
    //   data: JSON.stringify(request),
    //   success: (data) => {
    //     console.log('dataaaa', data)
    //     //window.location.reload()
    //   },
    //   error: (err) => {
    //     console.log('ajax inside', err)
    //   }
    // }) // end ajax



  }) // end submit handler

}) // end doc ready
