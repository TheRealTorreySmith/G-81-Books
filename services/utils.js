const authorsTable = 'authors'
const booksTable = 'books'
const linksTable = 'books_authors'
const bookFields = ['authors.id as author_id', 'authors.first_name as first_name',
  'authors.last_name as last_name', 'authors.biography as biography',
  'authors.portrait_url as portrait_url', 'books.id as book_id',
  'books.title as book_title', 'books.genre as book_genre',
  'books.description as book_description', 'books.cover_url as book_cover_url']

module.exports = {
  authorsTable,
  booksTable,
  linksTable,
  bookFields
}
