//FUNCTION THAT SEARCHES BOOK
const goButton = () => {
  const bookName = $('#search-input').val()
    $.get('books', (data) => {
        const caps = bookName.trim().replace(/\w\S*/g, (x) => {return x.charAt(0).toUpperCase() + x.substr(1).toLowerCase()})
        const name = document.getElementsByName(caps)[0]
        if (name === undefined) {
          $('#search-alert').show()
          $('#spacer-3').show()
        } else {
          window.location.href = `http://localhost:3000/books/${name.id}`
        }
    })
}

//FUNCTION THAT CHECKS IF THE 'ENTER' KEY WAS PRESSED
const checkButton = () => {
  if (event.which == 13) {
      event.preventDefault()
      goButton()
  }
}

//FUNCTION THAT CLOSES ALERT
const closeAlert = () => {
  $('#search-alert').hide()
}

//DOCUMENT READY
$(document).ready(() => {
  $('#search-alert').hide()
  $('#spacer-3').hide()
//CLICK EVENT HANDLERS
$("#search-input").keypress(checkButton)
$('#go-button').on('click', goButton)
$('#close-alert').on('click', closeAlert)

})
