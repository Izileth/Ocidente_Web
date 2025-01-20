// JavaScript para controlar o modal
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById("searchModal");
    const btn = document.getElementById("searchBtn");
    const span = document.getElementsByClassName("close")[0];
    const searchForm = document.querySelector('.search-form');
    const searchInput = document.querySelector('.search-input');
    const resultsContainer = document.querySelector('.search-results');
    const keywords = [
        { keyword: 'JavaScript', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
        { keyword: 'CSS', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
        { keyword: 'HTML', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
        { keyword: 'React', url: 'https://react.dev/' },
        { keyword: 'Node.js', url: 'https://nodejs.org/' },
        { keyword: 'Default', url: 'https://app.netlify.com/teams/izileth/sites' },
    ];

    // Abre o modal
    btn.addEventListener('click', function(e) {
        e.preventDefault(); // Previne qualquer comportamento padrão do botão
        modal.style.display = "block";
        searchInput.focus(); // Foca no campo de busca
    });

    // Fecha o modal ao clicar no X
    span.addEventListener('click', function() {
        modal.style.display = "none";
    });

    // Fecha o modal ao clicar fora dele
    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });

    // Previne que o clique dentro do modal feche ele
    modal.querySelector('.modal-content').addEventListener('click', function(e) {
        e.stopPropagation();
    });

    // Manipula o envio do formulário
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            console.log('Buscando por:', searchTerm);
            // Você pode adicionar a lógica de envio para o servidor aqui, se necessário
        }
    });

    // Lógica de filtro ao digitar
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase();
        resultsContainer.innerHTML = ''; // Limpa os resultados anteriores

        if (query) {
            const filteredKeywords = keywords.filter(item =>
                item.keyword.toLowerCase().includes(query)
            );

            // Exibe os resultados filtrados
            filteredKeywords.forEach(item => {
                const resultItem = document.createElement('div');
                resultItem.classList.add('search-result-item');
                resultItem.textContent = item.keyword;
                resultItem.style.cursor = 'pointer';

                // Adiciona o redirecionamento ao clicar na palavra-chave
                resultItem.addEventListener('click', () => {
                    window.open(item.url, '_blank'); // Abre a URL em uma nova aba
                });

                resultsContainer.appendChild(resultItem);
            });

        }
    });
});