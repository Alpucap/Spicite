

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

// FAQ
document.addEventListener("DOMContentLoaded", function () {
  const faqitem = document.querySelectorAll('.FAQ-Item');

  const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('visible');
          }
      });
  }, { threshold: 0.5 });

  faqitem.forEach(item => {
      observer.observe(item);
  });
});

