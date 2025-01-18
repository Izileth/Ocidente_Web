class Carousel {
  constructor(options) {
    this.slides = options.slides || [];
    this.currentIndex = 0;
    this.interval = options.interval || 3000;
    this.timer = null;
    
    // Cache dos elementos DOM - Adaptado para nova estrutura
    this.elements = {
      box: document.querySelector('.closure .box'),
      prevBtn: document.querySelector('.closure .arrows .prev'),
      nextBtn: document.querySelector('.closure .arrows .next'),
      progressBar: document.querySelector('.closure .bar .bar-load')
    };

    // Inicialização
    this.init();
  }

  init() {
    if (!this.validateElements()) {
      console.error('Elementos necessários não encontrados');
      return;
    }
    
    this.setupEventListeners();
    this.showSlide(this.currentIndex);
    this.startAutoPlay();
  }

  validateElements() {
    return Object.values(this.elements).every(element => element !== null);
  }

  setupEventListeners() {
    // Navegação por botões
    this.elements.prevBtn.addEventListener('click', () => this.handleNavigation('prev'));
    this.elements.nextBtn.addEventListener('click', () => this.handleNavigation('next'));

    // Navegação por teclado
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.handleNavigation('prev');
      if (e.key === 'ArrowRight') this.handleNavigation('next');
    });

    // Navegação touch
    let touchStart = 0;
    this.elements.box.addEventListener('touchstart', (e) => {
      touchStart = e.changedTouches[0].screenX;
    });

    this.elements.box.addEventListener('touchend', (e) => {
      const touchEnd = e.changedTouches[0].screenX;
      const threshold = 50;
      
      if (Math.abs(touchStart - touchEnd) >= threshold) {
        this.handleNavigation(touchStart > touchEnd ? 'next' : 'prev');
      }
    });

    // Responsividade
    window.addEventListener('resize', () => this.updateProgressBar());
  }

  handleNavigation(direction) {
    this.currentIndex = direction === 'next' 
      ? (this.currentIndex + 1) % this.slides.length
      : (this.currentIndex - 1 + this.slides.length) % this.slides.length;

    this.showSlide(this.currentIndex);
    this.resetAutoPlay();
  }

  showSlide(index) {
    const img = new Image();
    img.src = this.slides[index];
    
    img.onload = () => {
      this.elements.box.style.opacity = '0';
      
      requestAnimationFrame(() => {
        this.elements.box.style.backgroundImage = `url('${img.src}')`;
        this.elements.box.style.opacity = '1';
        this.updateProgressBar();
      });
    };
  }

  updateProgressBar() {
    this.elements.progressBar.style.transition = 'none';
    this.elements.progressBar.style.width = '0';
    
    requestAnimationFrame(() => {
      this.elements.progressBar.style.transition = 'width 3s linear';
      this.elements.progressBar.style.width = '100%';
    });
  }

  startAutoPlay() {
    if (this.timer) clearInterval(this.timer);
    this.timer = setInterval(() => this.handleNavigation('next'), this.interval);
  }

  resetAutoPlay() {
    this.startAutoPlay();
  }
}

// Inicialização

document.addEventListener('DOMContentLoaded', () => {
  const slides = [
    'https://th.bing.com/th/id/R.668f9f773bccfbcf8a163404523f2fd4?rik=CRwGPvn%2bs0tInA&pid=ImgRaw&r=0',
    'https://th.bing.com/th/id/R.668f9f773bccfbcf8a163404523f2fd4?rik=CRwGPvn%2bs0tInA&pid=ImgRaw&r=0',
    'https://wallpaperaccess.com/full/9075779.jpg'
  ];

  new Carousel({ slides, interval: 3000 });
});

// Estilos CSS necessários
const styles = `
  .closure .box {
    transition: opacity 0.3s ease-in-out;
    background-size: cover;
    background-position: center;
    position: relative;
    height: 100%;
    width: 100%;
    overflow: hidden;
  }

  .closure .content {
    position: relative;
    z-index: 2;
  }

  .closure .bar-load {
    display: block;
    height: 2px;
    background-color: #fff;
    width: 0;
    transition: width 3s linear;
  }

  .closure .arrows span {
    cursor: pointer;
    opacity: 0.7;
    transition: opacity 0.3s ease;
  }

  .closure .arrows span:hover {
    opacity: 1;
  }

  @media (prefers-reduced-motion: reduce) {
    .closure .box,
    .closure .bar-load {
      transition: none;
    }
  }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);