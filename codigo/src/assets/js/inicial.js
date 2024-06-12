function renderCard(product) {
    const cardDiv = document.createElement("div");
    cardDiv.className = "col-sm-6 col-md-4 col-lg-3 mb-4 card-pistas";

    cardDiv.innerHTML = `
    <div class="card h-100">
        <img src="${product.mainImg}" class="card-img-top object-fit-cover" height="350px">
        <div class="card-body">
            <h5 class="card-title">${product.title}</h5>
            <br>
            <button id="button-${product.id}" class="btn btn-primary details" data-action="add">Ver Detalhes</button>
            <a href="${product.link}" class="btn-secondary">Saiba mais</a>
        </div>
    </div>
`;

    return cardDiv;
}

async function calcularCompatibilidade() {
    // Obtém a lista de gostos do localStorage
    let listaGosto = JSON.parse(localStorage.getItem('listaGosto'));

    try {
        // Faz a requisição GET ao documento JSON
        let response = await fetch('assets/data/data.json');
        
        if (!response.ok) {
            throw new Error('Erro ao buscar os dados');
        }

        // Obtém os dados do documento JSON
        let cards = await response.json();

        // Calcula a compatibilidade para cada card
        cards.forEach(card => {
            let totalGeneros = card.genres.length;
            let generosCompativeis = card.genres.filter(genre => listaGosto.includes(genre.trim())).length;
            let percentualCompatibilidade = (generosCompativeis / totalGeneros) * 100;

            // Define o nível de compatibilidade com base no percentual
            if (percentualCompatibilidade === 100) {
                card.compatibility = "100% compatível com o usuário";
            } else if (percentualCompatibilidade > 0) {
                card.compatibility = `${percentualCompatibilidade}% compatível com o usuário`;
            } else {
                card.compatibility = "0% compatível com o usuário";
            }
        });

        // Retorna todos os cards atualizados
        return cards;

    } catch (error) {
        console.error(error);
        return []; // Retorna um array vazio em caso de erro
    }
}


async function renderPage() {
    const cardContainer = document.getElementById('card-container');
    const products = await fetchProducts();

    for (let i = 0; i < products.length; i++) {
        const product = products[i];
        const card = renderCard(product);
        cardContainer.appendChild(card);

        createAndFillModal(product);
    }
}


async function createAndFillModal(product) {
    const modalButton = document.getElementById(`button-${product.id}`);
    modalButton.addEventListener("click", async function () {
        document.getElementById("product-info").textContent = `${product.releaseDate} ° ${product.movieLength}`;
        document.getElementById("product-name").textContent = product.name;
        document.getElementById("product-genre").textContent = `${product.genres.join(', ')}`;
        document.getElementById("product-age-rate").textContent = `${product.ageRating}`;
        document.getElementById("product-description").textContent = product.description;
        document.getElementById("product-cast").textContent = `Elenco: ${product.cast.join(', ')}`;
        document.getElementById("product-image").src = product.images;

        // Calcula a compatibilidade
        const cards = await calcularCompatibilidade();
        const card = cards.find(card => card.id === product.id);
        if (card) {
            document.getElementById("product-comp").textContent = card.compatibility;
        }

        const productModal = new bootstrap.Modal(document.getElementById('productModal'));
        productModal.show();
    });
}


async function fetchProducts() {
    const response = await fetch('assets/data/data.json');
    const data = await response.json();
    return data;
}

document.addEventListener("DOMContentLoaded", function () {
    renderPage();
});



