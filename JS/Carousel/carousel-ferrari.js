document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".slide");
  const nextBtn = document.querySelector(".next");
  const prevBtn = document.querySelector(".prev");
  const barLoad = document.querySelector(".bar-load");

  let currentSlide = 0;
  let interval;

  function showSlide(index) {
      slides.forEach((slide, i) => {
          slide.classList.remove("active");
          if (i === index) {
              slide.classList.add("active");
          }
      });
  }

  function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
      resetBar();
  }

  function prevSlide() {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
      resetBar();
  }

  function resetBar() {
      barLoad.style.animation = "none";
      setTimeout(() => {
          barLoad.style.animation = "";
      }, 10);
  }

  function startAutoSlide() {
      interval = setInterval(nextSlide, 5000);
  }

  function stopAutoSlide() {
      clearInterval(interval);
  }

  nextBtn.addEventListener("click", () => {
      nextSlide();
      stopAutoSlide();
      startAutoSlide();
  });

  prevBtn.addEventListener("click", () => {
      prevSlide();
      stopAutoSlide();
      startAutoSlide();
  });

  startAutoSlide();
});
