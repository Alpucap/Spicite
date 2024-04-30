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

function redirectToHistory() {
    window.location.href = "/history"; // Change "/history" to the actual URL of your history page
}
