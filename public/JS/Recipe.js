// Recipe
document.addEventListener("DOMContentLoaded", function () {
    const recipeitem = document.querySelectorAll('.Recipe-Item');
  
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.5 });
  
    recipeitem.forEach(item => {
        observer.observe(item);
    });
});


// Intro (Carousel)
function carousel() {
    const carousel = document.querySelector('.carousel');
    const carouselInner = document.querySelector('.carousel-inner');
    const items = Array.from(document.querySelectorAll('.carousel-item'));
    const itemWidth = carousel.clientWidth;
    const prevButton = carousel.querySelector('.prev');
    const nextButton = carousel.querySelector('.next');
  
    let currentIndex = 0;
  
    function moveCarousel() {
      carouselInner.style.transition = 'transform 0.5s ease'; 
      carouselInner.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    }
  
    function moveToNextSlide() {
      currentIndex = (currentIndex + 1) % items.length;
      moveCarousel();
    }
  
    function moveToPrevSlide() {
      currentIndex = (currentIndex - 1 + items.length) % items.length;
      moveCarousel();
    }
  
    function handlePrevButtonClick() {
      currentIndex = (currentIndex - 1 + items.length) % items.length;
      moveCarousel();
    }
  
    function handleNextButtonClick() {
      moveToNextSlide();
    }
  
    prevButton.addEventListener('click', handlePrevButtonClick);
    nextButton.addEventListener('click', handleNextButtonClick);
  
    moveCarousel();
}

carousel();
  
  