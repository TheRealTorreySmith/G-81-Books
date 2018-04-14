// // //FUNCTION FOR SMALL DELETE BUTTON
// // const smallDelete = (event) => {
// //   console.log($( event.target ).parent())
// //    // const id = event.target.name
// //    // window.location.href = `/authors/${id}/delete`
// //    // $('.remove-button').hide()
// //    // $('.edit-button').hide()
// // }
// //
// //
// //
// //
// //
// //
// // //DOCUMENT READY
// // $(document).ready(() => {
// //
// // //CLICK EVENT HANDLER FOR SMALL DELETE BUTTON
// // $('.authorDelete').on('click', smallDelete)
// //
// // })
// $(document).ready(() => {
//   $('.authorDelete').click((event) => {
//     const parent = $( event.target ).parent()
//     console.log(parent)
//     const request = {
//       first_name: parent.children("#authorFirstName")[0].innerText,
//       last_name: parent.children("#authorLastName")[0].innerText
//     }
//     console.log(request)
//
//       $.ajax({
//         url: `/authors`,
//         type: 'DELETE',
//         dataType: "json",
//         contentType: "application/json; charset=utf-8",
//         data: JSON.stringify(request),
//         success: (data) => {
//           console.log('dataaaaa', data)
//         },
//         error: (err) => {
//           console.log('ajax err', err)
//         }
//       }) // end ajax
//
//   }) // end submit handler
//
// }) // end doc ready
