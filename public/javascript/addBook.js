
$(document).ready(() => {
        const selectedAuthor = $('#author-select-list').find(":selected").text();
        $('authors-container').append(`<li>${selectedAuthor}</li>`)
})
