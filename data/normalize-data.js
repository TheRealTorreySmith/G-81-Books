const papa = require('papaparse')
const fs = require('fs')

function parseAuthor(firstNameKey, lastNameKey, biographyKey, coverUrlKey, i, row, authors, mappings) {
  let firstName = row[firstNameKey]
  let lastName = row[lastNameKey]

  const existingAuthor = authors.filter((author) => author.first_name === firstName &&
    author.last_name === lastName)

  let author = null
  if (existingAuthor.length === 0) {
    author = {
      id: authors.length + 1,
      first_name: firstName,
      last_name: lastName,
      biography: row[biographyKey],
      portrait_url: row[coverUrlKey]
    }
    authors.push(author)
    mappings.push({
      book_id: (i + 1),
      author_id: author.id
    })
  }
  else {
    mappings.push({
      book_id: (i + 1),
      author_id: existingAuthor[0].id
    })
  }
}

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

    parseAuthor('Author 1 First Name', 'Author 1 Last Name', 'Author 1 Biography',
      'Author 1 Portrait URL', i, row, authors, mapping)

    if (row['Author 2 First Name']) {
      parseAuthor('Author 2 First Name', 'Author 2 Last Name', 'Author 2 Biography',
        'Author 2 Portrait URL', i, row, authors, mapping)
    }
    if (row['Author 3 First Name']) {
      parseAuthor('Author 3 First Name', 'Author 3 Last Name', 'Author 3 Biography',
        'Author 3 Portrait URL', i, row, authors, mapping)
    }
  }
  return {
    books, authors, mapping
  }
}

module.exports = normalize
