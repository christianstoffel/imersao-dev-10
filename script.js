let cardContainer = document.querySelector(".card-container");
let dados = [];

// Carrega os dados do JSON uma vez quando a página é carregada
window.addEventListener('load', async () => {
    const resposta = await fetch("data.json");
    dados = await resposta.json();
    renderizarCards(dados); // Exibe todos os cards inicialmente
});

async function iniciarBusca() {
    const campoBusca = document.getElementById("campo-busca");
    const termoBusca = campoBusca.value.toLowerCase();

    if (termoBusca.trim() === '') {
        renderizarCards(dados); // Se a busca estiver vazia, mostra todos
        return;
    }

    const dadosFiltrados = dados.filter(dado => 
        dado.nome.toLowerCase().includes(termoBusca) || 
        dado.descricao.toLowerCase().includes(termoBusca)
    );

    renderizarCards(dadosFiltrados);
}

function renderizarCards(dados) {
    cardContainer.innerHTML = ""; // Limpa os cards existentes antes de renderizar novos
    for (let dado of dados) {
        let article = document.createElement("article");
        article.classList.add("card");
        article.innerHTML = `
            <h2>${dado.nome}</h2>
            <p>${dado.data_criacao}</p>
            <p>${dado.descricao}</p>
            <a href="${dado.link}" target="_blank">Saiba mais</a>
        `        
        cardContainer.appendChild(article);    
    }
}