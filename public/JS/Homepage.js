//Carousel
function carousel() {
    const carousel = document.querySelector('.carousel');
    const carouselInner = document.querySelector('.carousel-inner');
    const items = Array.from(document.querySelectorAll('.carousel-item'));
    const itemWidth = carousel.clientWidth;

    let currentIndex = 0;
    let interval;

    function moveCarousel() {
        carouselInner.style.transition = 'transform 0.5s ease'; 
        carouselInner.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    }

    function startCarousel() {
        interval = setInterval(() => {
            currentIndex = (currentIndex + 1) % items.length;
            moveCarousel();
        }, 3000);
    }

    function stopCarousel() {
        clearInterval(interval);
    }

    carousel.addEventListener('mouseenter', stopCarousel);
    carousel.addEventListener('mouseleave', startCarousel);

    moveCarousel();
    startCarousel();
}

carousel();


// INTRO ANIMATION
document.addEventListener('DOMContentLoaded', function() {
    var introItems = document.querySelectorAll('.Intro-items');
    var screenPosition = window.innerHeight / 1.2;

    window.addEventListener('scroll', function() {
        introItems.forEach(function(item) {
            var itemPosition = item.getBoundingClientRect().top;

            if (itemPosition < screenPosition) {
                item.classList.add('animate');
            } else {
                item.classList.remove('animate');
            }
        });
    });
});


// NEWS ANIMATION
document.addEventListener("DOMContentLoaded", function () {
  const newsItems = document.querySelectorAll('.News-Items');

  const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('visible');
          }
      });
  }, { threshold: 0.5 });

  newsItems.forEach(item => {
      observer.observe(item);
  });
});

// QUOTES
document.addEventListener("DOMContentLoaded", function () {
  const quoteitem = document.querySelectorAll('.Quote-Item');

  const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('visible');
          }
      });
  }, { threshold: 0.5 });

  quoteitem.forEach(item => {
      observer.observe(item);
  });
});

// FOOTER
document.addEventListener("DOMContentLoaded", function () {
  const footer = document.querySelectorAll('footer');

  const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('visible');
          }
      });
  }, { threshold: 0.5 });

  footer.forEach(item => {
      observer.observe(item);
  });
});
