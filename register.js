document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.user && data.token) {
            console.log('Registration successful:', data);
            // Redirect to login page or home page
            window.location.href = '/login.html';
        } else {
            throw new Error('Registration failed');
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Failed to register: ' + error.message);
    });
});
