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
            // Check if the token is valid before redirecting
            checkTokenAndRedirect();
        } else {
            throw new Error('Failed to log in');
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Login failed: ' + error.message);
    });
});

function checkTokenAndRedirect() {
    const token = localStorage.getItem('token');
    if (token) {
        // Perform token validation on the server side (optional)
        // Assuming token is valid, redirect to product management page
        window.location.href = 'product.html';
    } else {
        // If token is not present, redirect to login page
        window.location.href = 'login.html';
    }
}
