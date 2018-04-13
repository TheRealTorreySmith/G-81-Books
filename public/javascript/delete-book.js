//FUNCTION FOR SMALL DELETE BUTTON
const smallDelete = (event) => {
   const id = event.target.name
   window.location.href = `http://localhost:3000/books/${id}/delete`
}

//FUNCTION TO GO BACK TO ALL BOOKS PAGE
const goBack = () => {
    window.location.href = 'http://localhost:3000/books/'
}

//MODAL TO PERMANENTLY DELETE A BOOK
const permDelete = () => {
$('#modal-book-title').text(`${'This will permanently delete:'} ` + $('#searched-title').text())
$('#delete-modal').modal('show')
}

//DOCUMENT READY
$(document).ready(() => {

//CLICK EVENT HANDLER FOR SMALL DELETE BUTTON
$('.remove-button').on('click', smallDelete)
$('.back-button').on('click', goBack)
$('#big-delete-button').on('click', permDelete)

})
