
$(document).ready(() => {
        const selectedAuthor = $('#author-select-list').find(":selected").text();
        if($('#authors-container'))
        $('authors-container').append(`<li>${selectedAuthor}</li>`)
})
