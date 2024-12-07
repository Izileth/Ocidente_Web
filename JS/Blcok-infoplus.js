// JavaScript para interação em dispositivos móveis
document.addEventListener('DOMContentLoaded', () => {
    const listItems = document.querySelectorAll('.models .container .box > div ul li');

    listItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active de todos os itens
            listItems.forEach(li => {
                if (li !== this) li.classList.remove('active');
            });

            // Toggles active no item clicado
            this.classList.toggle('active');
        });
    });
});