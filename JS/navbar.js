// Ajustes na NavBar
document.querySelector('.nav-bar').addEventListener('click', function() {
    this.classList.toggle('active');
    document.querySelector('.nav-links').classList.toggle('active');
});

// Função para fechar o menu mobile

function closeMenu() {
    const navLinks = document.querySelector('.nav-links');
    const mobileMenuBtn = document.querySelector('.nav-bar');
    
    navLinks.classList.remove('active');
    mobileMenuBtn.classList.remove('active');
}

// Adiciona eventos de clique em todos os links de navegação
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', () => {
        closeMenu(); // Fecha o menu ao clicar em qualquer link
    });
});