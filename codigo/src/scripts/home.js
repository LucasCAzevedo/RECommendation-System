document.addEventListener("DOMContentLoaded", async function () {
    try {
        const response = await fetch("assets/data/movies.json");
        const jsonData = await response.json();

        const filterSelector = document.getElementById('filterSelector');
        const searchButton = document.getElementById('searchButton');
        const filterForm = document.getElementById('filterForm');
        const movieSearch = document.getElementById('movieSearch');
        const movieContainer = document.getElementById('movieContainer');

        const uniqueCategories = [...new Set(jsonData.map(movie => movie.category))];

        populateFilterSelector(uniqueCategories, filterSelector);
        renderMovies(jsonData, '', 'all', movieContainer);

        searchButton.addEventListener('click', function () {
            const searchText = movieSearch.value.toLowerCase();
            const categoryFilter = filterSelector.value;
            renderMovies(jsonData, searchText, categoryFilter, movieContainer);
        });

        filterForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const searchText = movieSearch.value.toLowerCase();
            const categoryFilter = filterSelector.value;
            renderMovies(jsonData, searchText, categoryFilter, movieContainer);
        });
    } catch (error) {
        console.error("Error loading movie data:", error);
    }
});

function populateFilterSelector(categories, selector) {
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.toLowerCase();
        option.textContent = category;
        selector.appendChild(option);
    });
}

function renderMovies(movies, searchText, categoryFilter, container) {
    container.innerHTML = '';
    let resultsFound = false;

    movies.forEach((movie) => {
        const movieMatchesSearch = movie.title.toLowerCase().includes(searchText);
        const movieMatchesCategory = categoryFilter === 'all' || movie.category.toLowerCase() === categoryFilter;

        if (movieMatchesSearch && movieMatchesCategory) {
            resultsFound = true;

            const card = document.createElement("div");
            card.className = "col-sm-6 col-md-4 col-lg-3 mb-4";
            card.innerHTML = `
                <div class="card h-100">
                    <img src="${movie.image}" height="350px" class="card-img-top object-fit-cover" alt="${movie.title}">
                    <div class="card-body">
                        <h5 class="card-title">${movie.title}</h5>
                        <p class="card-text">${movie.description}</p>
                        <a href="${movie.link}" class="btn btn-primary btn-card">Saiba mais</a>
                    </div>
                </div>
            `;
            container.appendChild(card);
        }
    });

    if (!resultsFound) {
        const noResultsMessage = document.createElement("div");
        noResultsMessage.className = "alert alert-warning mt-3";
        noResultsMessage.role = "alert";
        noResultsMessage.innerHTML = `
            <strong>Ops!</strong> Nenhum resultado encontrado para a pesquisa realizada.
        `;
        container.appendChild(noResultsMessage);
    }
}