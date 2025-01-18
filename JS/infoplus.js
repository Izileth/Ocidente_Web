 // JavaScript para funcionalidades adicionais (opcional)
 document.querySelectorAll('.machines ').forEach(item => {
    item.addEventListener('click', function() {
        // Remove active de todos os itens
        document.querySelectorAll('.machines').forEach(li => {
            li.classList.remove('active');
        });
        
        // Adiciona active no item clicado
        this.classList.add('active');
    });
});