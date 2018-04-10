const papa = require('papaparse')
const fs = require('fs')

function normalize(filepath) {
  // First, read in the file as a string
  const contents = fs.readFileSync(filepath, 'utf-8')

  /*
    These are optional but will help make working with the data more clear.
    For more information, visit the docs:
    http://papaparse.com/docs#config-details
  */
  const options = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true
  }
  const result = papa.parse(contents, options)
  const books = []
  const authors = []
  const mapping = []
  let authorId = 1
  for (let i = 0; i < result.data.length; i++) {
    const row = result.data[i]
    books.push({
      id: (i + 1),
      title: row['Book Title'],
      genre: row['Book Genre'],
      description: row['Book Description'],
      cover_url: row['Book Cover URL']
    })
    let author = {
      id: authorId++,
      first_name: row['Author 1 First Name'],
      last_name: row['Author 1 Last Name'],
      biography: row['Author 1 Biography'],
      portrait_url: row['Author 1 Portrait URL']
    }
    mapping.push({
      book_id: (i + 1),
      author_id: author.id
    })
    authors.push(author)
    if (row['Author 2 First Name']) {
      author = {
        id: authorId++,
        first_name: row['Author 2 First Name'],
        last_name: row['Author 2 Last Name'],
        biography: row['Author 2 Biography'],
        portrait_url: row['Author 2 Portrait URL']
      }
      mapping.push({
        book_id: (i + 1),
        author_id: author.id
      })
      authors.push(author)
    }
    if (row['Author 3 First Name']) {
      author = {
        id: authorId++,
        first_name: row['Author 3 First Name'],
        last_name: row['Author 3 Last Name'],
        biography: row['Author 3 Biography'],
        portrait_url: row['Author 3 Portrait URL']
      }
      mapping.push({
        book_id: (i + 1),
        author_id: author.id
      })
      authors.push(author)
    }
  }
  return {
    books, authors, mapping
  }
}

module.exports = normalize
