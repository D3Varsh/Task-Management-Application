document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('/api/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.token) {
            console.log('Logged in:', data);
            localStorage.setItem('token', data.token);  // Store the token
            // Redirect or enable product management functionality
            window.location.href = 'product.html'; // Redirect to product management page
        } else {
            throw new Error('Failed to log in');
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Login failed: ' + error.message);
    });
});
