document.getElementById('productForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('productName').value;
    const quantity = document.getElementById('productQuantity').value;
    const token = localStorage.getItem('token');  // Retrieve the stored token

    fetch('/api/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name, quantity }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Product added:', data);
        document.getElementById('productName').value = '';
        document.getElementById('productQuantity').value = '';
        fetchProducts();  // Refresh the product list
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Failed to add product: ' + error.message);
    });
});

function fetchProducts() {
    const token = localStorage.getItem('token');
    fetch('/api/products', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(products => {
        const productList = document.getElementById('productList');
        productList.innerHTML = '';  // Clear previous list
        products.forEach(product => {
            const li = document.createElement('li');
            li.textContent = `${product.name} - Quantity: ${product.quantity}`;
            productList.appendChild(li);
        });
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Failed to fetch products: ' + error.message);
    });
}

// Initialize product list on page load
document.addEventListener('DOMContentLoaded', fetchProducts);