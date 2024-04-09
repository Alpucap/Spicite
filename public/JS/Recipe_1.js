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