
// Automação do carrosel em javascript

// Pegando os elementos necessários

 const carousel = document.querySelector('.testimonial-container');
 const items = document.querySelectorAll('.testimonial-box');
 let currentIndex = 0;
 const totalItems = items.length;

 // Função para mudar o slide
 function showNextSlide() {
     // Remove a classe "active" do slide atual
     items[currentIndex].classList.remove('testimonial-active');

     // Atualiza o índice para o próximo slide
     currentIndex = (currentIndex + 1) % totalItems;

     // Adiciona a classe "active" ao próximo slide
     items[currentIndex].classList.add('testimonial-active');

     // Move o container para mostrar o próximo comentário
     carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
 }

 // Alternar slides a cada 3 segundos
 setInterval(showNextSlide, 3000);