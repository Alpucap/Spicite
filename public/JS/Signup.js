function goBack() {
    window.history.back();
}

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
  
  function validateForm() {
    // Memeriksa apakah CAPTCHA telah diselesaikan
    var captchaResponse = grecaptcha.getResponse();
    if (!captchaResponse) {
        alert('Please complete the CAPTCHA.');
        return false;
    }

    // Memeriksa apakah nama diisi
    var name = document.getElementById('name').value;
    if (name.trim() === '') {
        alert('Please enter your name.');
        return false;
    }

    // Memeriksa apakah email diisi dan dalam format yang valid
    var email = document.getElementById('email').value;
    if (email.trim() === '') {
        alert('Please enter your email.');
        return false;
    } else if (!isValidEmail(email)) {
        alert('Please enter a valid email address.');
        return false;
    }

    // Memeriksa apakah password diisi
    var password = document.getElementById('password').value;
    if (password.trim() === '') {
        alert('Please enter your password.');
        return false;
    }

    // Jika semua validasi berhasil, form dapat disubmit
    return true;
}

// Fungsi untuk memeriksa validitas alamat email
function isValidEmail(email) {
    // Format email regex
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}