async function handleSubmit(event) {
    event.preventDefault()
    const inputValue = document.querySelector(".js-search-input").value
    const searchQuery = inputValue.trim()

    try {
        const results = await searchWikipedia(searchQuery)
        displayResults(results)
    } catch (err) {
        console.log(err)
        alert("Failed to search wikipedia")
    }
}

async function searchWikipedia(searchQuery) {
    const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${searchQuery}`
    const response = await fetch(endpoint)
    if (!response.ok) {
        throw Error(response.statusText)
    }
    const json = await response.json()
    return json
}

function displayResults(results) {
    const searchResults = document.querySelector(".js-search-results")

    results.query.search.forEach((result) => {
        const url = `https://en.wikipedia.org/?curid=${result.pageid}`

        searchResults.insertAdjacentHTML(
            "beforeend",
            `<div class="result-item">
          <h3 class="result-title">
            <a href="${url}" target="_blank" rel="noopener">${result.title}</a>
          </h3>
          <a href="${url}" class="result-link" target="_blank" rel="noopener">${url}</a>
          <span class="result-snippet">${result.snippet}</span><br>
        </div>`,
        )
    })
}

const form = document.querySelector(".js-search-form")
form.addEventListener("submit", handleSubmit)

window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.style.backgroundColor = '#222';
    } else {
        header.style.backgroundColor = '#333';
    }
});