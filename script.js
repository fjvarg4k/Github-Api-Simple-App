const searchURL = 'https://api.github.com';

function displayResults(responseJson) {
  console.log(responseJson);
  $('.resultsDiv').empty();

  for (let i = 0; i < responseJson.length; i++) {
    $('.resultsDiv').append(
      `<h3><a href=${responseJson[i].html_url} target="_blank">${responseJson[i].name}</a></h3>`
    );
  }
}

function getRepos(searchInput) {
  const url = `${searchURL}/users/${searchInput}/repos`;
  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').on('submit', event => {
    event.preventDefault();
    let searchTerm = $('#user-search-input').val();
    getRepos(searchTerm);
  });
}

$(watchForm);
