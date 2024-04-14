document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();

  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;
  var message = document.getElementById('message').value;

  // Send form data to server
  fetch('/submit-form', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, message }),
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return response.text();
  })
  .then(data => {
      console.log(data);
      alert('Pesan terkirim!');
      document.getElementById('contact-form').reset();
  })
  .catch(error => {
      console.error('There was a problem with your fetch operation:', error);
      alert('Gagal mengirim pesan!');
  });
});
