// JavaScript para controlar o modal
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById("searchModal");
    const btn = document.getElementById("searchBtn");
    const span = document.getElementsByClassName("close")[0];
    const searchForm = document.querySelector('.search-form');

    // Abre o modal
    btn.addEventListener('click', function(e) {
        e.preventDefault(); // Previne qualquer comportamento padrão do botão
        modal.style.display = "block";
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
        const searchTerm = this.querySelector('.search-input').value;
        console.log('Buscando por:', searchTerm);
        // Aqui você pode adicionar sua lógica de busca
    });
});