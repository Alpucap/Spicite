  // Tangkap formulir saat disubmit
document.getElementById('contact-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Hindari perilaku bawaan pengiriman formulir

    // Kirim data formulir ke server menggunakan Fetch API
    const form = event.target;
    const formData = new FormData(form);
    const response = await fetch(form.action, {
      method: 'POST',
      body: formData
    });

    // Tampilkan pesan respons dari server
    const responseMessage = document.getElementById('response-message');
    if (response.ok) {
      responseMessage.textContent = 'Form data saved successfully';
      responseMessage.classList.add('success-message');
    } else {
      responseMessage.textContent = 'Failed to save form data';
      responseMessage.classList.add('error-message');
    }
    
});

document.addEventListener("DOMContentLoaded", () => {
  const insightHistoryButton = document.querySelector('.linked-button');

  insightHistoryButton.addEventListener('click', () => {
      fetch('/check-login') // Permintaan ke server untuk memeriksa status login
          .then(response => {
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              return response.json();
          })
          .then(data => {
              if (data.isLoggedIn) {
                  // Pengguna sudah login, arahkan ke Insight History
                  window.location.href = '/InsightHistory';
              } else {
                  // Pengguna belum login, arahkan ke halaman login
                  window.location.href = '/Login';
              }
          })
          .catch(error => console.error('Error checking login status:', error));
  });
});