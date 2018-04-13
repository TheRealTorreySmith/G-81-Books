//FUNCTION FOR SMALL DELETE BUTTON
const smallDelete = (event) => {
   const id = event.target.name
   window.location.href = `http://localhost:3000/books/${id}/delete`
   $('.remove-button').hide()
   $('.edit-button').hide()
}






//DOCUMENT READY
$(document).ready(() => {

//CLICK EVENT HANDLER FOR SMALL DELETE BUTTON
$('.remove-button').on('click', smallDelete)

})
