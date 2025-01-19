class EnhancedSlider {
    constructor(options) {
        this.slides = options.slides;
        this.currentSlideIndex = 0;
        this.autoPlayInterval = options.interval || 3000;
        this.intervalId = null;
        this.currentScreenSize = this.getScreenSize();

        // DOM elements
        this.box = document.querySelector('.box');
        this.prevButton = document.querySelector('.fa-angle-left');
        this.nextButton = document.querySelector('.fa-angle-right');
        this.barLoad = document.querySelector('.bar-load');

        // Add resize listener
        window.addEventListener('resize', () => {
            const newScreenSize = this.getScreenSize();
            if (newScreenSize !== this.currentScreenSize) {
                this.currentScreenSize = newScreenSize;
                this.updateSlide(this.currentSlideIndex);
            }
        });

        this.initializeSlider();
    }

    getScreenSize() {
        if (window.innerWidth <= 480) return 'mobile';
        if (window.innerWidth <= 768) return 'tablet';
        return 'desktop';
    }

    getImageUrl(slide) {
        if (typeof slide === 'string') return slide; // Backwards compatibility
        return slide[this.currentScreenSize] || slide.desktop; // Fallback to desktop if size not found
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

        // Add touch support for mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        this.box.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        this.box.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe(touchStartX, touchEndX);
        });
    }

    handleSwipe(startX, endX) {
        const swipeThreshold = 50;
        const diff = startX - endX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left
                this.navigate(1);
            } else {
                // Swipe right
                this.navigate(-1);
            }
            this.resetAutoPlay();
        }
    }

    updateSlide(index) {
        this.currentSlideIndex = this.normalizeIndex(index);
        const currentSlide = this.slides[this.currentSlideIndex];
        const imageUrl = this.getImageUrl(currentSlide);
        this.box.style.backgroundImage = `url('${imageUrl}')`;
        
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
        {
            mobile: 'https://i.pinimg.com/736x/35/90/d5/3590d5a23ea61e7d79c585e9d0d2619d.jpg',
            tablet: 'path/to/tablet-image-1.jpg',
            desktop: 'https://tork.news/__export/1680273193924/sites/tork/img/2023/03/31/2024-lamborghini-revuelto-124-641a1d51138cd.jpg_195160521.jpg'
        },
        {
            mobile: 'https://i.pinimg.com/736x/24/c2/1e/24c21efd40ee2ea137b5ee18c1944be5.jpg',
            tablet: 'path/to/tablet-image-2.jpg',
            desktop: 'https://gtspirit.com/wp-content/uploads/2023/03/GTspirit-Lamborghini-Revuelto-Studio-11.jpg'
        },
        {
            mobile: 'https://i.pinimg.com/736x/3b/42/94/3b4294188c00388364690b92c0f2ca97.jpg',
            tablet: 'path/to/tablet-image-3.jpg',
            desktop: 'https://wallpaperaccess.com/full/9075779.jpg'
        }
    ];

    const slider = new EnhancedSlider({
        slides: slides,
        interval: 3000
    });
});
