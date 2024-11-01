// Login functionality
document.getElementById('login-btn').addEventListener('click', function() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (username === 'admin13' && password === 'Faraz') {
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('pos-container').style.display = 'block';
    } else {
        alert('Invalid credentials');
    }
});

// Tab switching
document.querySelectorAll('nav button').forEach(button => {
    button.addEventListener('click', function() {
        document.querySelectorAll('.tab-content').forEach(content => {
            content.style.display = 'none';
        });
        document.getElementById(this.dataset.tab).style.display = 'block';
    });
});

// Initialize data structures
let inventory = [];
let employees = [];
let customers = [];
let cart = [];

// Sales functionality
function updateProductList() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    inventory.forEach(product => {
        const productElem = document.createElement('div');
        productElem.innerHTML = `
            ${product.name} - $${product.price} (Stock: ${product.stock})
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productList.appendChild(productElem);
    });
}

function addToCart(productId) {
    const product = inventory.find(p => p.id === productId);
    if (product && product.stock > 0) {
        cart.push({ ...product, quantity: 1 });
        product.stock--;
        updateCart();
        updateProductList();
    }
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${item.name} - $${item.price} x ${item.quantity}
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        cartItems.appendChild(li);
        total += item.price * item.quantity;
    });
    cartTotal.textContent = total.toFixed(2);
}

function removeFromCart(index) {
    const item = cart[index];
    const product = inventory.find(p => p.id === item.id);
    product.stock += item.quantity;
    cart.splice(index, 1);
    updateCart();
    updateProductList();
}

document.getElementById('checkout-btn').addEventListener('click', function() {
    if (cart.length === 0) {
        alert('Cart is empty');
        return;
    }
    alert('Checkout successful!');
    cart = [];
    updateCart();
});

// Inventory management
document.getElementById('add-product-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('product-name').value;
    const price = parseFloat(document.getElementById('product-price').value);
    const stock = parseInt(document.getElementById('product-stock').value);
    const id = inventory.length + 1;
    inventory.push({ id, name, price, stock });
    updateProductList();
    updateInventoryList();
    this.reset();
});

function updateInventoryList() {
    const inventoryList = document.getElementById('inventory-list');
    inventoryList.innerHTML = '';
    inventory.forEach(product => {
        const li = document.createElement('li');
        li.textContent = `${product.name} - $${product.price} (Stock: ${product.stock})`;
        inventoryList.appendChild(li);
    });
}

// Employee management
document.getElementById('add-employee-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('employee-name').value;
    const role = document.getElementById('employee-role').value;
    const id = employees.length + 1;
    employees.push({ id, name, role });
    updateEmployeeList();
    this.reset();
});

function updateEmployeeList() {
    const employeeList = document.getElementById('employee-list');
    employeeList.innerHTML = '';
    employees.forEach(employee => {
        const li = document.createElement('li');
        li.textContent = `${employee.name} - ${employee.role}`;
        employeeList.appendChild(li);
    });
}

// Customer management
document.getElementById('add-customer-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('customer-name').value;
    const loyalty = parseInt(document.getElementById('customer-loyalty').value);
    const id = customers.length + 1;
    customers.push({ id, name, loyalty });
    updateCustomerList();
    this.reset();
});

function updateCustomerList() {
    const customerList = document.getElementById('customer-list');
    customerList.innerHTML = '';
    customers.forEach(customer => {
        const li = document.createElement('li');
        li.textContent = `${customer.name} - Loyalty Points: ${customer.loyalty}`;
        customerList.appendChild(li);
    });
}

// Reports
document.getElementById('generate-sales-report').addEventListener('click', function() {
    const reportOutput = document.getElementById('report-output');
    let report = '<h3>Sales Report</h3>';
    if (cart.length === 0) {
        report += '<p>No sales data available.</p>';
    } else {
        let total = 0;
        report += '<ul>';
        cart.forEach(item => {
            report += `<li>${item.name} - $${item.price} x ${item.quantity}</li>`;
            total += item.price * item.quantity;
        });
        report += '</ul>';
        report += `<p>Total Sales: $${total.toFixed(2)}</p>`;
    }
    reportOutput.innerHTML = report;
});

document.getElementById('generate-inventory-report').addEventListener('click', function() {
    const reportOutput = document.getElementById('report-output');
    let report = '<h3>Inventory Report</h3>';
    if (inventory.length === 0) {
        report += '<p>No inventory data available.</p>';
    } else {
        report += '<ul>';
        inventory.forEach(product => {
            report += `<li>${product.name} - Stock: ${product.stock}</li>`;
        });
        report += '</ul>';
    }
    reportOutput.innerHTML = report;
});

// Initialize the application
updateProductList();
updateInventoryList();
updateEmployeeList();
updateCustomerList();