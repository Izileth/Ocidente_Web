// Seleciona todos os botões com a classe "buttonRedirect"
const buttons = document.querySelectorAll('.btn-cta');

// Adiciona um evento de clique a cada botão selecionado
buttons.forEach(button => {
    button.addEventListener('click', () => {
        window.location.href = 'https://manifestoriental.netlify.app';
    });
});