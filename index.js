import reddit from './redditapi'

const searchForm = document.getElementById('search-form')
const searchInput = document.getElementById('search-input')

// Form Event Listener
searchForm.addEventListener('submit', e => {
  // Get search term
  const searchTerm = searchInput.value
  // Get sort
  const sortBy = document.querySelector('input[name="sortby"]:checked').value
  // Get limit
  const searchLimit = document.getElementById('limit').value

  //Check input
  if (searchTerm === '') {
    // Show message
    showMessage('Please add a search term', 'alert-danger')
  }

  //Clear input
  searchInput.value = ''

  // Search Reddit
  reddit.search(searchTerm, searchLimit, sortBy)
  .then(results => {
    console.log(results);
    let output = '<div class="card-columns">'
    // Loop through posts
    results.forEach(post => {
      //Check for image
      const image = post.preview ? post.preview.images[0].source.url : 'https://cdn.comparitech.com/wp-content/uploads/2017/08/reddit-1.jpg'

      output += `
      <div class="card" style="width: 18rem;">
  <img class="card-img-top" src="${image}" alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title">${post.title}</h5>
    <p class="card-text">${truncateText(post.selftext, 100)}</p>
    <a href="${post.url}" target="_blank" class="btn btn-primary">Read more</a>
    <hr>
    <span classs="badge badge-secondary">Subreddit: ${post.subreddit}</span>
    <span classs="badge badge-dark">Score: ${post.score}</span>
  </div>
</div>
      `
    })
    output += '</div>'
    document.getElementById('results').innerHTML = output
  })

  e.preventDefault()
})

// Show Message
function showMessage(message, className) {
  // Create div
  const div = document.createElement('div')
  // Add classes
  div.className = `alert ${className}`
  
  div.appendChild(document.createTextNode(message))
  // Get parent
  const searchContainer = document.getElementById('search-container')
  const search = document.getElementById('search')

  // Insert message
  searchContainer.insertBefore(div, search)

  // Timeout alert
  setTimeout(() => document.querySelector('.alert').remove(), 3000)
}

// Truncate Text
function truncateText(text, limit) {
  const shortened = text.indexOf(' ', limit)
  if (shortened == -1) {
    return text
  } else {
    return text.substring(0, shortened)
  }
}
