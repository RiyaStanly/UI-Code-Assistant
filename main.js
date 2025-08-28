// Initialize CodeMirror
let editor = CodeMirror.fromTextArea(document.getElementById("codeEditor"), {
    mode: "htmlmixed",
    theme: "monokai",
    lineNumbers: true,
    autoCloseTags: true,
    autoCloseBrackets: true,
    matchBrackets: true,
    indentUnit: 4,
    lineWrapping: true
});

// UI Component Templates
const componentTemplates = {
    login: `
<div class="container mt-5">
    <div class="row justify-content-center">
        <div class="col-md-6">
            <div class="card">
                <div class="card-header">
                    <h3 class="text-center">Login</h3>
                </div>
                <div class="card-body">
                    <form id="loginForm">
                        <div class="mb-3">
                            <label for="email" class="form-label">Email address</label>
                            <input type="email" class="form-control" id="email" required>
                        </div>
                        <div class="mb-3">
                            <label for="password" class="form-label">Password</label>
                            <input type="password" class="form-control" id="password" required>
                        </div>
                        <div class="mb-3 form-check">
                            <input type="checkbox" class="form-check-input" id="rememberMe">
                            <label class="form-check-label" for="rememberMe">Remember me</label>
                        </div>
                        <button type="submit" class="btn btn-primary w-100">Sign In</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>`,
    navbar: `
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
        <a class="navbar-brand" href="#">Brand</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav me-auto">
                <li class="nav-item">
                    <a class="nav-link active" href="#">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Features</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Pricing</a>
                </li>
            </ul>
            <form class="d-flex">
                <input class="form-control me-2" type="search" placeholder="Search">
                <button class="btn btn-outline-light" type="submit">Search</button>
            </form>
        </div>
    </div>
</nav>`,
    cart: `
<div class="container mt-4">
    <div class="row">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">
                    <h4>Shopping Cart</h4>
                </div>
                <div class="card-body">
                    <div class="cart-items">
                        <div class="cart-item d-flex align-items-center mb-3">
                            <img src="https://via.placeholder.com/50" class="me-3" alt="Product">
                            <div class="flex-grow-1">
                                <h5 class="mb-0">Product Name</h5>
                                <p class="mb-0">$99.99</p>
                            </div>
                            <div class="quantity-controls">
                                <button class="btn btn-sm btn-outline-secondary">-</button>
                                <span class="mx-2">1</span>
                                <button class="btn btn-sm btn-outline-secondary">+</button>
                            </div>
                            <button class="btn btn-sm btn-danger ms-3">Remove</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="card">
                <div class="card-header">
                    <h4>Order Summary</h4>
                </div>
                <div class="card-body">
                    <div class="d-flex justify-content-between mb-2">
                        <span>Subtotal:</span>
                        <span>$99.99</span>
                    </div>
                    <div class="d-flex justify-content-between mb-2">
                        <span>Shipping:</span>
                        <span>$10.00</span>
                    </div>
                    <div class="d-flex justify-content-between mb-3">
                        <span>Total:</span>
                        <span class="fw-bold">$109.99</span>
                    </div>
                    <button class="btn btn-primary w-100">Checkout</button>
                </div>
            </div>
        </div>
    </div>
</div>`,
    registration: `
<div class="container mt-5">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">
                    <h3 class="text-center">User Registration</h3>
                </div>
                <div class="card-body">
                    <form id="registrationForm">
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label for="firstName" class="form-label">First Name</label>
                                <input type="text" class="form-control" id="firstName" required>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label for="lastName" class="form-label">Last Name</label>
                                <input type="text" class="form-control" id="lastName" required>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="email" class="form-label">Email address</label>
                            <input type="email" class="form-control" id="email" required>
                        </div>
                        <div class="mb-3">
                            <label for="password" class="form-label">Password</label>
                            <input type="password" class="form-control" id="password" required>
                            <div class="form-text">Password must be at least 8 characters long</div>
                        </div>
                        <div class="mb-3">
                            <label for="confirmPassword" class="form-label">Confirm Password</label>
                            <input type="password" class="form-control" id="confirmPassword" required>
                        </div>
                        <div class="mb-3 form-check">
                            <input type="checkbox" class="form-check-input" id="terms" required>
                            <label class="form-check-label" for="terms">I agree to the Terms and Conditions</label>
                        </div>
                        <button type="submit" class="btn btn-primary w-100">Register</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>`,
    productCard: `
<div class="container mt-4">
    <div class="row">
        <div class="col-md-4">
            <div class="card h-100">
                <img src="https://via.placeholder.com/300x200" class="card-img-top" alt="Product Image">
                <div class="card-body">
                    <h5 class="card-title">Product Name</h5>
                    <p class="card-text">This is a brief description of the product. It highlights the key features and benefits.</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="h5 mb-0">$99.99</span>
                        <div class="d-flex align-items-center">
                            <div class="me-2">
                                <span class="badge bg-success">In Stock</span>
                            </div>
                            <button class="btn btn-primary">Add to Cart</button>
                        </div>
                    </div>
                </div>
                <div class="card-footer bg-white">
                    <div class="d-flex justify-content-between">
                        <button class="btn btn-sm btn-outline-secondary">Add to Wishlist</button>
                        <button class="btn btn-sm btn-outline-info">Compare</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>`,
    searchBar: `
<div class="container mt-4">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-body">
                    <div class="search-container">
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="Search for products..." id="searchInput">
                            <button class="btn btn-primary" type="button">
                                <i class="bi bi-search"></i> Search
                            </button>
                        </div>
                        <div class="autosuggest-container mt-2 d-none" id="autosuggestContainer">
                            <div class="list-group">
                                <a href="#" class="list-group-item list-group-item-action">Product 1</a>
                                <a href="#" class="list-group-item list-group-item-action">Product 2</a>
                                <a href="#" class="list-group-item list-group-item-action">Product 3</a>
                                <a href="#" class="list-group-item list-group-item-action">Product 4</a>
                            </div>
                        </div>
                        <div class="mt-2">
                            <span class="badge bg-secondary me-2">Popular: </span>
                            <a href="#" class="text-decoration-none me-2">Electronics</a>
                            <a href="#" class="text-decoration-none me-2">Clothing</a>
                            <a href="#" class="text-decoration-none me-2">Books</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>`,
    modal: `
<!-- Button trigger modal -->
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch Confirmation Modal
</button>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Confirm Action</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p>Are you sure you want to proceed with this action? This cannot be undone.</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-primary">Confirm</button>
      </div>
    </div>
  </div>
</div>`,
    profileEditor: `
<div class="container mt-5">
    <div class="row">
        <div class="col-md-4">
            <div class="card">
                <div class="card-body text-center">
                    <img src="https://via.placeholder.com/150" class="rounded-circle mb-3" alt="Profile Picture">
                    <h5 class="card-title">John Doe</h5>
                    <p class="text-muted">Member since: January 2023</p>
                    <button class="btn btn-outline-primary btn-sm">Change Photo</button>
                </div>
            </div>
            <div class="card mt-3">
                <div class="card-body">
                    <h6 class="card-title">Account Settings</h6>
                    <div class="list-group list-group-flush">
                        <a href="#" class="list-group-item list-group-item-action active">Profile Information</a>
                        <a href="#" class="list-group-item list-group-item-action">Security</a>
                        <a href="#" class="list-group-item list-group-item-action">Notifications</a>
                        <a href="#" class="list-group-item list-group-item-action">Privacy</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">
                    <h5 class="card-title mb-0">Edit Profile</h5>
                </div>
                <div class="card-body">
                    <form>
                        <div class="row mb-3">
                            <div class="col-md-6">
                                <label for="firstName" class="form-label">First Name</label>
                                <input type="text" class="form-control" id="firstName" value="John">
                            </div>
                            <div class="col-md-6">
                                <label for="lastName" class="form-label">Last Name</label>
                                <input type="text" class="form-control" id="lastName" value="Doe">
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="email" class="form-label">Email</label>
                            <input type="email" class="form-control" id="email" value="john.doe@example.com">
                        </div>
                        <div class="mb-3">
                            <label for="bio" class="form-label">Bio</label>
                            <textarea class="form-control" id="bio" rows="3">Web developer with 5 years of experience.</textarea>
                        </div>
                        <div class="mb-3">
                            <label for="location" class="form-label">Location</label>
                            <input type="text" class="form-control" id="location" value="New York, USA">
                        </div>
                        <div class="mb-3">
                            <label for="website" class="form-label">Website</label>
                            <input type="url" class="form-control" id="website" value="https://johndoe.com">
                        </div>
                        <button type="submit" class="btn btn-primary">Save Changes</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>`,
    orderSummary: `
<div class="container mt-4">
    <div class="row">
        <div class="col-md-8">
            <div class="card mb-4">
                <div class="card-header">
                    <h4>Order #12345</h4>
                    <p class="text-muted mb-0">Placed on January 15, 2023</p>
                </div>
                <div class="card-body">
                    <h5 class="card-title">Order Items</h5>
                    <div class="table-responsive">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <div class="d-flex align-items-center">
                                            <img src="https://via.placeholder.com/50" class="me-3" alt="Product">
                                            <div>
                                                <h6 class="mb-0">Product Name</h6>
                                                <small class="text-muted">SKU: PRD-001</small>
                                            </div>
                                        </div>
                                    </td>
                                    <td>$99.99</td>
                                    <td>1</td>
                                    <td>$99.99</td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="d-flex align-items-center">
                                            <img src="https://via.placeholder.com/50" class="me-3" alt="Product">
                                            <div>
                                                <h6 class="mb-0">Another Product</h6>
                                                <small class="text-muted">SKU: PRD-002</small>
                                            </div>
                                        </div>
                                    </td>
                                    <td>$49.99</td>
                                    <td>2</td>
                                    <td>$99.98</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            
            <div class="card">
                <div class="card-header">
                    <h5 class="card-title mb-0">Shipping Information</h5>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-6">
                            <h6>Shipping Address</h6>
                            <p>
                                John Doe<br>
                                123 Main St<br>
                                Apt 4B<br>
                                New York, NY 10001<br>
                                United States
                            </p>
                        </div>
                        <div class="col-md-6">
                            <h6>Shipping Method</h6>
                            <p>
                                Express Shipping<br>
                                Estimated Delivery: January 18, 2023
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="col-md-4">
            <div class="card">
                <div class="card-header">
                    <h5 class="card-title mb-0">Order Summary</h5>
                </div>
                <div class="card-body">
                    <div class="d-flex justify-content-between mb-2">
                        <span>Subtotal:</span>
                        <span>$199.97</span>
                    </div>
                    <div class="d-flex justify-content-between mb-2">
                        <span>Shipping:</span>
                        <span>$10.00</span>
                    </div>
                    <div class="d-flex justify-content-between mb-2">
                        <span>Tax:</span>
                        <span>$16.00</span>
                    </div>
                    <hr>
                    <div class="d-flex justify-content-between mb-3">
                        <strong>Total:</strong>
                        <strong>$225.97</strong>
                    </div>
                    <div class="d-grid gap-2">
                        <button class="btn btn-primary">Track Order</button>
                        <button class="btn btn-outline-secondary">Download Invoice</button>
                    </div>
                </div>
            </div>
            
            <div class="card mt-3">
                <div class="card-header">
                    <h5 class="card-title mb-0">Payment Information</h5>
                </div>
                <div class="card-body">
                    <p>
                        <strong>Payment Method:</strong><br>
                        Visa ending in 4242
                    </p>
                    <p>
                        <strong>Billing Address:</strong><br>
                        John Doe<br>
                        123 Main St<br>
                        Apt 4B<br>
                        New York, NY 10001<br>
                        United States
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>`,
    contactForm: `
<div class="container mt-5">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">
                    <h3 class="text-center">Contact Us</h3>
                </div>
                <div class="card-body">
                    <form id="contactForm" class="needs-validation" novalidate>
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label for="name" class="form-label">Full Name</label>
                                <input type="text" class="form-control" id="name" required>
                                <div class="invalid-feedback">
                                    Please enter your name.
                                </div>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label for="email" class="form-label">Email</label>
                                <input type="email" class="form-control" id="email" required>
                                <div class="invalid-feedback">
                                    Please enter a valid email address.
                                </div>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="subject" class="form-label">Subject</label>
                            <input type="text" class="form-control" id="subject" required>
                            <div class="invalid-feedback">
                                Please enter a subject.
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="message" class="form-label">Message</label>
                            <textarea class="form-control" id="message" rows="5" required></textarea>
                            <div class="invalid-feedback">
                                Please enter your message.
                            </div>
                        </div>
                        <div class="mb-3">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="newsletter">
                                <label class="form-check-label" for="newsletter">
                                    Subscribe to our newsletter
                                </label>
                            </div>
                        </div>
                        <div class="d-grid">
                            <button type="submit" class="btn btn-primary">Send Message</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
// Form validation script
(function() {
    'use strict';
    
    // Fetch all forms with the 'needs-validation' class
    const forms = document.querySelectorAll('.needs-validation');
    
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            
            form.classList.add('was-validated');
        }, false);
    });
})();
</script>`,
    navbarDropdown: `
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
        <a class="navbar-brand" href="#">Brand</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav me-auto">
                <li class="nav-item">
                    <a class="nav-link active" href="#">Home</a>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown1" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Products
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="navbarDropdown1">
                        <li><a class="dropdown-item" href="#">Category 1</a></li>
                        <li><a class="dropdown-item" href="#">Category 2</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" href="#">Category 3</a></li>
                    </ul>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown2" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Services
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="navbarDropdown2">
                        <li><a class="dropdown-item" href="#">Service 1</a></li>
                        <li><a class="dropdown-item" href="#">Service 2</a></li>
                        <li><a class="dropdown-item" href="#">Service 3</a></li>
                    </ul>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">About</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Contact</a>
                </li>
            </ul>
            <form class="d-flex">
                <input class="form-control me-2" type="search" placeholder="Search">
                <button class="btn btn-outline-light" type="submit">Search</button>
            </form>
            <ul class="navbar-nav ms-3">
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown3" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="bi bi-person-circle"></i> Account
                    </a>
                    <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown3">
                        <li><a class="dropdown-item" href="#">Profile</a></li>
                        <li><a class="dropdown-item" href="#">Orders</a></li>
                        <li><a class="dropdown-item" href="#">Settings</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" href="#">Logout</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</nav>`
};

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Navigation
    document.getElementById('codeGeneratorBtn').addEventListener('click', showCodeGenerator);
    document.getElementById('codeAnalyzerBtn').addEventListener('click', showCodeAnalyzer);
    document.getElementById('designCritiqueBtn').addEventListener('click', showDesignCritique);

    // Component Generation - for both buttons and dropdown items
    document.querySelectorAll('[data-component]').forEach(element => {
        element.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default for dropdown items
            generateComponent(element.dataset.component);
        });
    });

    // Custom Component Generation
    document.getElementById('generateComponentBtn').addEventListener('click', generateCustomComponent);

    // Code Analysis
    document.getElementById('analyzeCode').addEventListener('click', analyzeCode);

    // Design Critique
    document.getElementById('startCritique').addEventListener('click', startDesignCritique);
    
    // Copy and Clear Code
    document.getElementById('copyCode').addEventListener('click', copyCode);
    document.getElementById('clearCode').addEventListener('click', clearCode);
    
    // Show code generator by default
    showCodeGenerator();
});

// Navigation Functions
function showCodeGenerator() {
    hideAllTools();
    document.getElementById('codeGeneratorTools').classList.remove('d-none');
}

function showCodeAnalyzer() {
    hideAllTools();
    document.getElementById('codeAnalyzerTools').classList.remove('d-none');
}

function showDesignCritique() {
    hideAllTools();
    document.getElementById('designCritiqueTools').classList.remove('d-none');
}

function hideAllTools() {
    document.querySelectorAll('.tool-section').forEach(section => {
        section.classList.add('d-none');
    });
}

// Copy and Clear Code Functions
function copyCode() {
    const code = editor.getValue();
    navigator.clipboard.writeText(code).then(() => {
        // Show a temporary success message
        const copyBtn = document.getElementById('copyCode');
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="bi bi-check me-1"></i>Copied!';
        copyBtn.classList.add('btn-success');
        copyBtn.classList.remove('btn-outline-secondary');
        
        setTimeout(() => {
            copyBtn.innerHTML = originalText;
            copyBtn.classList.remove('btn-success');
            copyBtn.classList.add('btn-outline-secondary');
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy code: ', err);
        alert('Failed to copy code to clipboard');
    });
}

function clearCode() {
    if (confirm('Are you sure you want to clear the editor?')) {
        editor.setValue('');
    }
}

// Component Generation
function generateComponent(componentType) {
    if (componentTemplates[componentType]) {
        editor.setValue(componentTemplates[componentType]);
        
        // Show a brief success message
        const dropdownBtn = document.getElementById('templateDropdown');
        const originalText = dropdownBtn.innerHTML;
        dropdownBtn.innerHTML = '<i class="bi bi-check me-1"></i>Template Applied!';
        dropdownBtn.classList.add('btn-success');
        dropdownBtn.classList.remove('btn-outline-primary');
        
        setTimeout(() => {
            dropdownBtn.innerHTML = originalText;
            dropdownBtn.classList.remove('btn-success');
            dropdownBtn.classList.add('btn-outline-primary');
        }, 2000);
    }
}

// Custom Component Generation
function generateCustomComponent() {
    const prompt = document.getElementById('componentPrompt').value.trim();
    if (!prompt) {
        alert('Please describe the component you want to create');
        return;
    }

    // Check for specific component keywords
    const promptLower = prompt.toLowerCase();
    
    // Check for the 10 specific components
    if (promptLower.includes('login') || promptLower.includes('sign in')) {
        editor.setValue(componentTemplates.login);
    } else if (promptLower.includes('shopping cart') || promptLower.includes('cart')) {
        editor.setValue(componentTemplates.cart);
    } else if (promptLower.includes('navigation') && promptLower.includes('dropdown')) {
        editor.setValue(componentTemplates.navbarDropdown);
    } else if (promptLower.includes('registration') || promptLower.includes('sign up')) {
        editor.setValue(componentTemplates.registration);
    } else if (promptLower.includes('product card') || promptLower.includes('product display')) {
        editor.setValue(componentTemplates.productCard);
    } else if (promptLower.includes('search') && (promptLower.includes('auto') || promptLower.includes('suggestion'))) {
        editor.setValue(componentTemplates.searchBar);
    } else if (promptLower.includes('modal') || promptLower.includes('popup')) {
        editor.setValue(componentTemplates.modal);
    } else if (promptLower.includes('profile') && promptLower.includes('edit')) {
        editor.setValue(componentTemplates.profileEditor);
    } else if (promptLower.includes('order summary') || promptLower.includes('order details')) {
        editor.setValue(componentTemplates.orderSummary);
    } else if (promptLower.includes('contact') && promptLower.includes('form')) {
        editor.setValue(componentTemplates.contactForm);
    } else if (promptLower.includes('nav') || promptLower.includes('menu')) {
        editor.setValue(componentTemplates.navbar);
    } else {
        // Generate a basic custom component based on the prompt
        const generatedCode = generateBasicComponent(prompt);
        editor.setValue(generatedCode);
    }
}

function generateBasicComponent(prompt) {
    // Extract key elements from the prompt
    const elements = prompt.toLowerCase().split(' ');
    let componentStructure = '<div class="container mt-4">\n';
    componentStructure += '    <div class="row justify-content-center">\n';
    componentStructure += '        <div class="col-md-8">\n';
    componentStructure += '            <div class="card">\n';
    componentStructure += '                <div class="card-header">\n';
    componentStructure += '                    <h3 class="text-center">Custom Component</h3>\n';
    componentStructure += '                </div>\n';
    componentStructure += '                <div class="card-body">\n';

    // Add form elements based on keywords
    if (elements.includes('form')) {
        componentStructure += '                    <form>\n';
    }

    // Add input fields based on keywords
    if (elements.includes('email')) {
        componentStructure += `                    <div class="mb-3">
                        <label for="email" class="form-label">Email address</label>
                        <input type="email" class="form-control" id="email" required>
                    </div>\n`;
    }
    if (elements.includes('password')) {
        componentStructure += `                    <div class="mb-3">
                        <label for="password" class="form-label">Password</label>
                        <input type="password" class="form-control" id="password" required>
                    </div>\n`;
    }
    if (elements.includes('button')) {
        componentStructure += `                    <button type="submit" class="btn btn-primary w-100">Submit</button>\n`;
    }

    if (elements.includes('form')) {
        componentStructure += '                    </form>\n';
    }

    componentStructure += '                </div>\n';
    componentStructure += '            </div>\n';
    componentStructure += '        </div>\n';
    componentStructure += '    </div>\n';
    componentStructure += '</div>';

    return componentStructure;
}

// Code Analysis
function analyzeCode() {
    const code = editor.getValue().trim();
    const analysisResults = document.getElementById('analysisResults');
    
    // Check if there's code to analyze
    if (!code) {
        analysisResults.innerHTML = '<div class="alert alert-warning">Please enter or generate some code in the editor before analyzing.</div>';
        return;
    }
    
    // MDN-based analysis categories with detailed explanations and solutions
    const analysisCategories = {
        htmlStructure: {
            title: "HTML Structure",
            issues: []
        },
        semantics: {
            title: "Semantics & Accessibility",
            issues: []
        },
        css: {
            title: "CSS & Styling",
            issues: []
        },
        javascript: {
            title: "JavaScript & Interactivity",
            issues: []
        },
        performance: {
            title: "Performance",
            issues: []
        },
        responsive: {
            title: "Responsive Design",
            issues: []
        }
    };
    
    // HTML Structure Analysis
    if (!code.includes('<!DOCTYPE html>')) {
        analysisCategories.htmlStructure.issues.push({
            severity: "warning",
            message: "Missing DOCTYPE declaration. According to MDN, all HTML documents should start with <!DOCTYPE html>.",
            explanation: "The DOCTYPE declaration tells browsers which version of HTML the page is using. Without it, browsers may render your page in quirks mode, which can lead to inconsistent layouts and styling.",
            solution: "Add <!DOCTYPE html> as the very first line of your HTML document. This ensures modern rendering mode across all browsers."
        });
    }
    
    if (!code.includes('<html')) {
        analysisCategories.htmlStructure.issues.push({
            severity: "error",
            message: "Missing <html> element. This is required for valid HTML documents.",
            explanation: "The <html> element is the root element of an HTML document. It contains all other HTML elements and defines the language of the document.",
            solution: "Add <html lang=\"en\"> as the root element of your document. The lang attribute helps screen readers and search engines understand the language of your content."
        });
    }
    
    if (!code.includes('<head')) {
        analysisCategories.htmlStructure.issues.push({
            severity: "error",
            message: "Missing <head> element. The head should contain metadata and resource links.",
            explanation: "The <head> element contains metadata about the document, including title, character set, stylesheets, and scripts that should be loaded before the page content.",
            solution: "Add a <head> section with essential metadata like <title>, <meta charset=\"UTF-8\">, and links to your CSS and JavaScript files."
        });
    }
    
    if (!code.includes('<body')) {
        analysisCategories.htmlStructure.issues.push({
            severity: "error",
            message: "Missing <body> element. The body contains the visible content of the page.",
            explanation: "The <body> element contains all the visible content of your webpage, including text, images, links, and other elements.",
            solution: "Add a <body> element that contains all your visible content. This should come after the <head> element."
        });
    }
    
    if (code.includes('<script>')) {
        analysisCategories.htmlStructure.issues.push({
            severity: "warning",
            message: "Inline scripts detected. MDN recommends placing scripts at the end of the body or using the 'defer' attribute.",
            explanation: "Inline scripts can block page rendering and make your code harder to maintain. They also don't benefit from browser caching.",
            solution: "Move your scripts to external files and place them at the end of the body, or use the 'defer' attribute: <script src=\"script.js\" defer></script>"
        });
    }
    
    // Semantics & Accessibility Analysis
    if (!code.includes('aria-')) {
        analysisCategories.semantics.issues.push({
            severity: "info",
            message: "Consider adding ARIA attributes for better accessibility. MDN provides guidelines for making content accessible.",
            explanation: "ARIA (Accessible Rich Internet Applications) attributes help screen readers understand the purpose and state of elements that aren't naturally accessible.",
            solution: "Add appropriate ARIA attributes to your elements. For example, use aria-label=\"Close\" for close buttons, aria-expanded=\"true/false\" for expandable content, and aria-hidden=\"true\" for decorative elements."
        });
    }
    
    if (code.includes('<div') && !code.includes('role=') && code.includes('onclick=')) {
        analysisCategories.semantics.issues.push({
            severity: "warning",
            message: "Interactive <div> elements should have appropriate ARIA roles. Consider using semantic elements like <button> instead.",
            explanation: "Using <div> elements with onclick handlers creates accessibility issues because screen readers don't recognize them as interactive elements.",
            solution: "Replace interactive <div> elements with semantic elements like <button> or add appropriate ARIA roles: <div role=\"button\" tabindex=\"0\" aria-label=\"Action description\">"
        });
    }
    
    if (code.includes('<img') && !code.includes('alt=')) {
        analysisCategories.semantics.issues.push({
            severity: "warning",
            message: "Images should have alt attributes for accessibility. MDN recommends descriptive alt text for all images.",
            explanation: "Without alt text, screen readers cannot describe images to visually impaired users, making your content inaccessible.",
            solution: "Add descriptive alt attributes to all images: <img src=\"image.jpg\" alt=\"Description of what the image shows\">. For decorative images, use alt=\"\"."
        });
    }
    
    if (code.includes('<form') && !code.includes('label')) {
        analysisCategories.semantics.issues.push({
            severity: "warning",
            message: "Form controls should have associated labels. MDN recommends using <label> elements for all form inputs.",
            explanation: "Form inputs without labels are difficult to use for all users and impossible for screen reader users to understand their purpose.",
            solution: "Add <label> elements for all form inputs: <label for=\"input-id\">Label text</label><input id=\"input-id\" type=\"text\">"
        });
    }
    
    // CSS & Styling Analysis
    if (code.includes('style=')) {
        analysisCategories.css.issues.push({
            severity: "warning",
            message: "Inline styles detected. MDN recommends separating content (HTML) from presentation (CSS).",
            explanation: "Inline styles make your code harder to maintain, reduce reusability, and can lead to specificity conflicts.",
            solution: "Move all styles to external CSS files or <style> tags in the head. Use classes and IDs to target elements: <div class=\"card\"> with .card { /* styles */ }"
        });
    }
    
    if (code.includes('!important')) {
        analysisCategories.css.issues.push({
            severity: "warning",
            message: "!important declarations found. MDN suggests avoiding !important as it breaks the natural cascading of styles.",
            explanation: "Using !important overrides the normal CSS cascade, making your stylesheets harder to maintain and debug.",
            solution: "Refactor your CSS to use proper specificity instead of !important. Use more specific selectors or restructure your CSS to avoid conflicts."
        });
    }
    
    if (code.includes('float:') && !code.includes('clearfix')) {
        analysisCategories.css.issues.push({
            severity: "info",
            message: "Consider using modern layout techniques like Flexbox or Grid instead of floats. MDN provides comprehensive guides on these.",
            explanation: "Float-based layouts are outdated and can be difficult to maintain, especially for responsive designs.",
            solution: "Replace float layouts with Flexbox or Grid: display: flex; or display: grid;. These modern techniques offer better control and responsiveness."
        });
    }
    
    // JavaScript & Interactivity Analysis
    if (code.includes('onclick=')) {
        analysisCategories.javascript.issues.push({
            severity: "warning",
            message: "Inline event handlers detected. MDN recommends using addEventListener() for better separation of concerns.",
            explanation: "Inline event handlers mix HTML and JavaScript, making code harder to maintain and limiting functionality like event delegation.",
            solution: "Use addEventListener() in your JavaScript file: element.addEventListener('click', function() { /* handler code */ });"
        });
    }
    
    if (code.includes('document.write')) {
        analysisCategories.javascript.issues.push({
            severity: "error",
            message: "document.write() is not recommended. MDN warns that it can overwrite the entire document if used after page load.",
            explanation: "document.write() can completely replace your page content if used after the page has loaded, causing a poor user experience.",
            solution: "Use DOM manipulation methods instead: document.createElement(), element.appendChild(), or innerHTML for simple content updates."
        });
    }
    
    if (code.includes('eval(')) {
        analysisCategories.javascript.issues.push({
            severity: "error",
            message: "eval() is dangerous and should be avoided. MDN warns about security risks and performance issues.",
            explanation: "eval() executes arbitrary JavaScript code from strings, creating security vulnerabilities and performance problems.",
            solution: "Replace eval() with safer alternatives. For JSON parsing, use JSON.parse(). For dynamic code execution, consider using Function constructors or restructuring your code."
        });
    }
    
    // Performance Analysis
    if (code.includes('<link') && code.includes('stylesheet') && code.includes('media=')) {
        analysisCategories.performance.issues.push({
            severity: "info",
            message: "Good use of media attributes for stylesheets. MDN recommends this for optimizing resource loading.",
            explanation: "Using media attributes allows browsers to prioritize critical stylesheets and defer non-critical ones, improving page load performance.",
            solution: "Continue using media attributes for conditional stylesheets: <link rel=\"stylesheet\" href=\"print.css\" media=\"print\">"
        });
    }
    
    if (code.includes('<script') && !code.includes('defer') && !code.includes('async')) {
        analysisCategories.performance.issues.push({
            severity: "info",
            message: "Consider using 'defer' or 'async' attributes for scripts. MDN explains how these can improve page load performance.",
            explanation: "Scripts without defer or async block page rendering until they're downloaded and executed, slowing down your page load.",
            solution: "Add defer to scripts that don't need to execute immediately: <script src=\"script.js\" defer></script>. Use async for independent scripts that can load in any order."
        });
    }
    
    // Responsive Design Analysis
    if (!code.includes('viewport')) {
        analysisCategories.responsive.issues.push({
            severity: "error",
            message: "Missing viewport meta tag. MDN requires this for proper responsive design on mobile devices.",
            explanation: "Without a viewport meta tag, mobile browsers will display your page at desktop width and scale it down, making it difficult to read and use.",
            solution: "Add the viewport meta tag in your head: <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">"
        });
    }
    
    if (!code.includes('container') && !code.includes('container-fluid')) {
        analysisCategories.responsive.issues.push({
            severity: "info",
            message: "Consider using Bootstrap containers for responsive layout. MDN recommends fluid layouts for different screen sizes.",
            explanation: "Containers provide consistent margins and maximum widths, helping your content adapt to different screen sizes.",
            solution: "Wrap your main content in a container: <div class=\"container\"> or <div class=\"container-fluid\"> for full-width content."
        });
    }
    
    if (code.includes('width:') && code.includes('px')) {
        analysisCategories.responsive.issues.push({
            severity: "info",
            message: "Fixed widths in pixels may cause issues on different screen sizes. MDN recommends using relative units like %, em, or rem.",
            explanation: "Fixed pixel widths don't adapt to different screen sizes, causing horizontal scrolling on smaller devices.",
            solution: "Replace fixed pixel widths with relative units: width: 100%, max-width: 1200px, or use Bootstrap's responsive grid classes."
        });
    }
    
    // Display results with detailed explanations and solutions
    let html = '';
    let hasIssues = false;
    
    for (const category in analysisCategories) {
        const categoryData = analysisCategories[category];
        if (categoryData.issues.length > 0) {
            hasIssues = true;
            html += `<div class="mb-4">
                <h6 class="fw-bold text-primary">${categoryData.title}</h6>`;
            
            categoryData.issues.forEach(issue => {
                let alertClass = "alert-info";
                if (issue.severity === "warning") alertClass = "alert-warning";
                if (issue.severity === "error") alertClass = "alert-danger";
                
                html += `<div class="alert ${alertClass} mb-3">
                    <div class="d-flex align-items-center mb-2">
                        <i class="bi ${issue.severity === 'error' ? 'bi-exclamation-triangle-fill' : issue.severity === 'warning' ? 'bi-exclamation-circle-fill' : 'bi-info-circle-fill'} me-2"></i>
                        <strong>${issue.message}</strong>
                    </div>`;
                
                if (issue.explanation) {
                    html += `<div class="mb-2">
                        <strong>Why this matters:</strong> ${issue.explanation}
                    </div>`;
                }
                
                if (issue.solution) {
                    html += `<div>
                        <strong>How to fix it:</strong> ${issue.solution}
                    </div>`;
                }
                
                html += `</div>`;
            });
            
            html += `</div>`;
        }
    }
    
    if (!hasIssues) {
        html = '<div class="alert alert-success"><i class="bi bi-check-circle-fill me-2"></i>No major issues found! Your code follows MDN best practices.</div>';
    }
    
    analysisResults.innerHTML = html;
}

// Design Critique
function startDesignCritique() {
    const code = editor.getValue().trim();
    const critiqueResults = document.getElementById('critiqueResults');
    
    // Check if there's code to critique
    if (!code) {
        critiqueResults.innerHTML = '<div class="alert alert-warning">Please enter or generate some code in the editor before requesting a design critique.</div>';
        return;
    }
    
    // Design critique templates by category
    const designCritiques = {
        objectivesAndGoals: [
            {
                condition: code.includes('form') && code.includes('submit'),
                message: 'Clear form submission flow indicates well-defined user objectives.'
            },
            {
                condition: code.includes('navbar') && code.includes('active'),
                message: 'Navigation highlights current section, supporting clear user goals.'
            },
            {
                condition: code.includes('card') && code.includes('card-header'),
                message: 'Card headers provide clear context for user objectives.'
            }
        ],
        informationArchitecture: [
            {
                condition: code.includes('container'),
                message: 'Good use of containers for organizing content hierarchy.'
            },
            {
                condition: code.includes('row') && code.includes('col'),
                message: 'Grid system creates clear visual hierarchy and organization.'
            },
            {
                condition: code.includes('card-body'),
                message: 'Card body structure helps organize related content effectively.'
            }
        ],
        navigation: [
            {
                condition: code.includes('navbar'),
                message: 'Navigation structure is clear and consistent.'
            },
            {
                condition: code.includes('nav-link'),
                message: 'Navigation links are properly structured for easy access.'
            },
            {
                condition: code.includes('active'),
                message: 'Active state indicators help users understand their current location.'
            }
        ],
        visualDesign: [
            {
                condition: code.includes('btn-primary'),
                message: 'Consistent button styling supports brand identity.'
            },
            {
                condition: code.includes('text-center'),
                message: 'Text alignment creates visual balance and hierarchy.'
            },
            {
                condition: code.includes('card'),
                message: 'Card components provide visual structure and consistency.'
            }
        ],
        labelsAndText: [
            {
                condition: code.includes('form-label'),
                message: 'Clear form labels improve user understanding.'
            },
            {
                condition: code.includes('placeholder'),
                message: 'Placeholder text provides helpful context for users.'
            },
            {
                condition: code.includes('h3') || code.includes('h4'),
                message: 'Proper heading hierarchy improves content organization.'
            }
        ],
        accessibility: [
            {
                condition: code.includes('form-label') && code.includes('for='),
                message: 'Form labels with "for" attributes improve accessibility.'
            },
            {
                condition: code.includes('alt='),
                message: 'Image alt attributes support screen reader accessibility.'
            },
            {
                condition: code.includes('aria-'),
                message: 'ARIA attributes enhance accessibility for assistive technologies.'
            }
        ],
        interactions: [
            {
                condition: code.includes('btn') && code.includes('hover'),
                message: 'Button hover states provide clear interaction feedback.'
            },
            {
                condition: code.includes('form-check'),
                message: 'Checkbox interactions follow standard patterns.'
            },
            {
                condition: code.includes('collapse'),
                message: 'Collapsible elements support progressive disclosure.'
            }
        ],
        mobileResponsiveness: [
            {
                condition: code.includes('col-md'),
                message: 'Responsive grid classes support mobile adaptability.'
            },
            {
                condition: code.includes('navbar-toggler'),
                message: 'Mobile navigation toggle supports smaller screens.'
            },
            {
                condition: code.includes('container-fluid'),
                message: 'Fluid containers adapt well to different screen sizes.'
            }
        ],
        usability: [
            {
                condition: code.includes('required'),
                message: 'Required field indicators improve form usability.'
            },
            {
                condition: code.includes('d-flex') && code.includes('justify-content-between'),
                message: 'Flex layout improves content alignment and usability.'
            },
            {
                condition: code.includes('w-100'),
                message: 'Full-width elements improve touch targets on mobile.'
            }
        ],
        performance: [
            {
                condition: code.includes('mb-3'),
                message: 'Consistent spacing utilities improve maintainability.'
            },
            {
                condition: code.includes('class="'),
                message: 'Bootstrap classes support efficient styling without custom CSS.'
            },
            {
                condition: code.includes('container') && !code.includes('style='),
                message: 'Using Bootstrap containers without inline styles improves performance.'
            }
        ]
    };

    // Collect all applicable critiques
    const allApplicableCritiques = [];
    
    for (const category in designCritiques) {
        const applicableCritiques = designCritiques[category]
            .filter(critique => critique.condition)
            .map(critique => ({
                category: formatCategoryName(category),
                message: critique.message
            }));
        
        allApplicableCritiques.push(...applicableCritiques);
    }
    
    // Randomly select 3-4 critiques
    const numberOfCritiques = Math.floor(Math.random() * 2) + 3; // Random number between 3 and 4
    const selectedCritiques = allApplicableCritiques
        .sort(() => Math.random() - 0.5)
        .slice(0, numberOfCritiques);

    // Display results with category headers
    if (selectedCritiques.length > 0) {
        let html = '';
        selectedCritiques.forEach(critique => {
            html += `<div class="alert alert-info">
                <strong>${critique.category}:</strong> ${critique.message}
            </div>`;
        });
        critiqueResults.innerHTML = html;
    } else {
        critiqueResults.innerHTML = '<div class="alert alert-warning">No specific design patterns detected in the code.</div>';
    }
}

function formatCategoryName(category) {
    // Convert camelCase to Title Case with spaces
    return category
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase());
} 