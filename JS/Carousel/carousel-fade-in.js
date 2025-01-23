(function () {
  const track = document.querySelector('.closure .closure-carousel-track');
  const items = document.querySelectorAll('.closure .closure-carousel-item');
  const indicators = document.querySelectorAll('.closure .closure-carousel-indicators div');

  let currentIndex = 0;

  function updateCarousel() {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      indicators.forEach((indicator, index) => {
          indicator.classList.toggle('active', index === currentIndex);
      });
  }

  function goToNextSlide() {
      currentIndex = (currentIndex + 1) % items.length;
      updateCarousel();
  }

  indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
          currentIndex = index;
          updateCarousel();
      });
  });

  setInterval(goToNextSlide, 4000); // 4 segundos entre transições
})();
