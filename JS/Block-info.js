document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.machines .container .box .machines-painel .item');

    items.forEach(item => {
        const button = item.querySelector('.btn-painel');
        const list = item.querySelector('ul');

        // Evento de clique
        button.addEventListener('click', (event) => {
            event.stopPropagation(); // Impede propagação do evento
            item.classList.toggle('active');
        });

        // Evento de mouse enter
        button.addEventListener('mouseenter', () => {
            item.classList.add('active');
        });

        // Evento de mouse leave
        button.addEventListener('mouseleave', () => {
            item.classList.remove('active');
        });
    });

    // Fecha a lista se clicar fora
    document.addEventListener('click', () => {
        items.forEach(item => {
            item.classList.remove('active');
        });
    });
});