
class EnhancedSlider {
    constructor(options) {
        this.slides = options.slides;
        this.currentSlideIndex = 0;
        this.autoPlayInterval = options.interval || 3000;
        this.intervalId = null;

        // DOM elements
        this.box = document.querySelector('.box');
        this.prevButton = document.querySelector('.fa-angle-left');
        this.nextButton = document.querySelector('.fa-angle-right');
        this.barLoad = document.querySelector('.bar-load');

        this.initializeSlider();
    }

    initializeSlider() {
        // Add overlay background to box
        this.box.style.position = 'relative';
        
        // Set initial slide
        this.updateSlide(0);

        // Add event listeners
        this.prevButton.addEventListener('click', () => {
            this.navigate(-1);
            this.resetAutoPlay();
        });

        this.nextButton.addEventListener('click', () => {
            this.navigate(1);
            this.resetAutoPlay();
        });

        // Start autoplay
        this.startAutoPlay();

        // Add keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.navigate(-1);
                this.resetAutoPlay();
            } else if (e.key === 'ArrowRight') {
                this.navigate(1);
                this.resetAutoPlay();
            }
        });
    }

    updateSlide(index) {
        this.currentSlideIndex = this.normalizeIndex(index);
        this.box.style.backgroundImage = `url('${this.slides[this.currentSlideIndex]}')`;
        
        // Add a semi-transparent overlay for better text readability
        this.box.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        this.box.style.backgroundBlendMode = 'overlay';
        
        this.resetProgressBar();
    }

    normalizeIndex(index) {
        return (index + this.slides.length) % this.slides.length;
    }

    navigate(direction) {
        this.updateSlide(this.currentSlideIndex + direction);
    }

    resetProgressBar() {
        this.barLoad.style.transition = 'none';
        this.barLoad.style.width = '0%';
        
        // Force reflow
        this.barLoad.offsetHeight;
        
        this.barLoad.style.transition = 'width 3s linear';
        this.barLoad.style.width = '100%';
    }

    startAutoPlay() {
        this.intervalId = setInterval(() => {
            this.navigate(1);
        }, this.autoPlayInterval);
    }

    resetAutoPlay() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
        this.startAutoPlay();
    }
}

// Initialize the slider
document.addEventListener('DOMContentLoaded', () => {
    const slides = [
        'https://tork.news/__export/1680273193924/sites/tork/img/2023/03/31/2024-lamborghini-revuelto-124-641a1d51138cd.jpg_195160521.jpg',
        'https://gtspirit.com/wp-content/uploads/2023/03/GTspirit-Lamborghini-Revuelto-Studio-11.jpg',
        'https://wallpaperaccess.com/full/9075779.jpg',
    ];

    const slider = new EnhancedSlider({
        slides: slides,
        interval: 3000
    });
});