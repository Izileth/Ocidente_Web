// Seleção dos elementos DOM
const nextDom = document.getElementById('next');
const prevDom = document.getElementById('prev');
const carouselDom = document.querySelector('.carousel');
const listItemDom = document.querySelector('.carousel .box');
const thumbnailDom = document.querySelector('.carousel .thumbnail');

// Configurações do carousel
const timeRunning = 3000; // Tempo da animação
const timeAutoNext = 7000; // Tempo para auto-play
let runInTime;
let runAutoRun;
let isAnimating = false;

// Função principal para mostrar os slides
function showSlider(type) {
    if (isAnimating) return;
    isAnimating = true;

    const itemSlider = document.querySelectorAll('.carousel .box .item');
    const itemThumbnail = document.querySelectorAll('.carousel .thumbnail .item');

    if (!itemSlider.length || !itemThumbnail.length) {
        console.error('Elementos do carousel não encontrados');
        return;
    }

    try {
        if (type === 'next') {
            // Adiciona classe para animação
            carouselDom.classList.add('next');
            
            // Move os elementos
            setTimeout(() => {
                listItemDom.appendChild(itemSlider[0]);
                thumbnailDom.appendChild(itemThumbnail[0]);
            }, 50);
        } else {
            // Move os elementos
            const lastSliderIndex = itemSlider.length - 1;
            const lastThumbIndex = itemThumbnail.length - 1;
            
            listItemDom.prepend(itemSlider[lastSliderIndex]);
            thumbnailDom.prepend(itemThumbnail[lastThumbIndex]);
            
            // Adiciona classe para animação
            carouselDom.classList.add('prev');
        }

        // Limpa os timers existentes
        clearTimeout(runInTime);
        clearTimeout(runAutoRun);

        // Remove as classes de animação e reinicia o auto-play
        runInTime = setTimeout(() => {
            carouselDom.classList.remove('next');
            carouselDom.classList.remove('prev');
            isAnimating = false;
            startAutoRun();
        }, timeRunning);
    } catch (error) {
        console.error('Erro ao trocar slides:', error);
        isAnimating = false;
    }
}

// Função para iniciar o auto-play
function startAutoRun() {
    clearTimeout(runAutoRun);
    runAutoRun = setTimeout(() => {
        showSlider('next');
    }, timeAutoNext);
}

// Event Listeners
nextDom.addEventListener('click', (e) => {
    e.preventDefault();
    showSlider('next');
});

prevDom.addEventListener('click', (e) => {
    e.preventDefault();
    showSlider('prev');
});

// Controladores de mouse para pausar/continuar o auto-play
carouselDom.addEventListener('mouseenter', () => {
    clearTimeout(runAutoRun);
});

carouselDom.addEventListener('mouseleave', () => {
    startAutoRun();
});

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    startAutoRun();
    
    // Configura z-index inicial
    const items = document.querySelectorAll('.carousel .box .item');
    items.forEach((item, index) => {
        item.style.zIndex = items.length - index;
    });
});

// Tratamento de visibilidade da página
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        clearTimeout(runAutoRun);
    } else {
        startAutoRun();
    }
});