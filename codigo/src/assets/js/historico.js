// função para obter os filmes do localStorage e converte-los em um array
function getMoviesFromLocalStorage() {
    // recupera os filmes do localStorage e converte de JSON para array
    const moviesJSON = localStorage.getItem("movies");
    return moviesJSON ? JSON.parse(moviesJSON) : [];
}

// função para exibir os filmes na tabela
function displayMovies() {
    // obtem a lista de filmes do localStorage
    const movies = getMoviesFromLocalStorage();
    // seleciona a tabela na qual os filmes serão exibidos
    const table = document.getElementById("tblListar");

    // limpa a tabela
    table.innerHTML = "";

    // preenche a tabela com os filmes armazenados
    movies.forEach((movie, index) => {
        const row = table.insertRow();
        // insere as informações do filme em células da tabela
        const titleCell = row.insertCell(0);
        const directorCell = row.insertCell(1);
        const genreCell = row.insertCell(2);
        const yearCell = row.insertCell(3);

        titleCell.innerHTML = movie.title;
        directorCell.innerHTML = movie.director;
        genreCell.innerHTML = movie.genre;
        yearCell.innerHTML = movie.year;

        // adiciona um botão para remover o filme
        const removeButton = document.createElement("button");
        removeButton.innerText = "Remover";
        removeButton.addEventListener("click", () => removeMovie(index));
        row.appendChild(removeButton);
    });
}

// função para adicionar um filme ao localStorage
function addMovieToLocalStorage(movie) {
    // obtem a lista de filmes do localStorage
    const movies = getMoviesFromLocalStorage();
    // adiciona o novo filme à lista
    movies.push(movie);
    // salva a lista atualizada no localStorage em formato JSON
    localStorage.setItem("movies", JSON.stringify(movies));
}

// função para remover um filme do localStorage
function removeMovie(index) {
    // obtém a lista de filmes do localStorage
    const movies = getMoviesFromLocalStorage();
    // remove o filme da lista com base no indice
    movies.splice(index, 1);
    // atualiza a lista no localStorage
    localStorage.setItem("movies", JSON.stringify(movies));
    // reexibe os filmes na tabela após a remoção
    displayMovies();
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("frmCadastro");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const title = document.getElementById("title").value;
        const director = document.getElementById("director").value;
        const genre = document.getElementById("genre").value;
        const year = document.getElementById("year").value;

        if (title && director && genre && year) {
            // cria um objeto de filme com as informações do formulário
            const movie = {
                title,
                director,
                genre,
                year
            };

            // adiciona o filme ao localStorage
            addMovieToLocalStorage(movie);
            
            // exibe os filmes atualizados na tabela
            displayMovies();

            // limpa o formulário após a submissão.
            form.reset();
        }
    });

    // exibe os filmes cadastrados ao carregar a página
    displayMovies();
});

