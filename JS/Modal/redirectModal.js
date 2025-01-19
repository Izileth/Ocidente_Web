document.addEventListener('DOMContentLoaded', function() {
    const modal_redirect = document.getElementById("redirectModal");
    const btn_redirect = document.getElementById("redirectBtn");
    const span_redirect = document.getElementsByClassName("close-mid")[0];
    const searchForm_redirect = document.querySelector('.search-form-mid');

    // Abre o modal
    btn_redirect.addEventListener('click', function(e) {
        e.preventDefault(); // Previne qualquer comportamento padrão do botão
        modal_redirect.style.display = "block";
    });

    // Fecha o modal ao clicar no X
    span_redirect.addEventListener('click', function() {
        modal_redirect.style.display = "none";
    });

    // Fecha o modal ao clicar fora dele
    window.addEventListener('click', function(event) {
        if (event.target == modal_redirect) {
            modal_redirect.style.display = "none";
        }
    });

    // Previne que o clique dentro do modal feche ele
    modal_redirect.querySelector('.modal-content-mid').addEventListener('click', function(e) {
        e.stopPropagation();
    });

    // Manipula o envio do formulário
    searchForm_redirect.addEventListener('submit', function(e) {
        e.preventDefault();
        const searchTerm = this.querySelector('.search-input').value;
        console.log('Buscando por:', searchTerm);
        // Aqui você pode adicionar sua lógica de busca
    });
});