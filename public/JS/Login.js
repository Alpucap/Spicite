

document.addEventListener('DOMContentLoaded', function() {
  document.addEventListener('mousemove', function(e) {
    const trail = document.createElement('div');
    trail.classList.add('trail');
    document.body.appendChild(trail);

    const x = e.clientX;
    const y = e.clientY;

    trail.style.left = x + 'px';
    trail.style.top = y + 'px';

    // Tambahkan variasi ukuran dan opasitas
    const randomSize = Math.random() * 0.5 + 0.5; // Ukuran antara 0.5 dan 1
    const randomOpacity = Math.random() * 0.5 + 0.5; // Opasitas antara 0.5 dan 1

    trail.style.transform = `scale(${randomSize}) translate(-50%, -50%)`; // Atur ukuran
    trail.style.opacity = randomOpacity; // Atur opasitas

    // Hapus elemen trail setelah beberapa detik
    setTimeout(function() {
      trail.remove();
    }, 1000);
  });
});

