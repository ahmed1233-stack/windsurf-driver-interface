// Store active orders
let activeOrders = [];

// DOM Elements
const loginContainer = document.getElementById('loginContainer');
const customerContainer = document.getElementById('customerContainer');
const driverContainer = document.getElementById('driverContainer');
const orderContainer = document.getElementById('orderContainer');
const ordersList = document.getElementById('ordersList');

// Toast notification function
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        ${message}
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// Login function
function login(userType) {
    loginContainer.classList.add('hidden');
    
    if (userType === 'customer') {
        customerContainer.classList.remove('hidden');
        showToast('Logged in as Customer', 'success');
    } else {
        driverContainer.classList.remove('hidden');
        showToast('Logged in as Driver', 'success');
        displayOrders();
    }
}

// Logout function
function logout() {
    loginContainer.classList.remove('hidden');
    customerContainer.classList.add('hidden');
    driverContainer.classList.add('hidden');
    showToast('Logged out successfully', 'success');
}

// Submit order function
function submitOrder() {
    const pickupLocation = document.getElementById('pickupLocation').value;
    const deliveryLocation = document.getElementById('deliveryLocation').value;
    const orderDescription = document.getElementById('orderDescription').value;
    const orderType = document.getElementById('orderType').value;
    const estimatedWeight = document.getElementById('estimatedWeight').value;

    if (!pickupLocation || !deliveryLocation || !orderDescription || !orderType || !estimatedWeight) {
        showToast('Please fill in all fields', 'error');
        return;
    }

    const order = {
        id: Date.now(),
        pickupLocation,
        deliveryLocation,
        orderDescription,
        orderType,
        estimatedWeight,
        status: 'pending',
        timestamp: new Date().toLocaleString()
    };

    activeOrders.push(order);
    resetForm();
    showToast('Order placed successfully', 'success');
    displayOrders(); // Update driver's view if active
}

// Reset form function
function resetForm() {
    document.getElementById('pickupLocation').value = '';
    document.getElementById('deliveryLocation').value = '';
    document.getElementById('orderDescription').value = '';
    document.getElementById('orderType').value = '';
    document.getElementById('estimatedWeight').value = '';
}

// Display orders in driver interface
function displayOrders() {
    ordersList.innerHTML = '';
    
    if (activeOrders.length === 0) {
        ordersList.innerHTML = `
            <div class="order-card">
                <p style="text-align: center; color: #6b7280;">No active orders available</p>
            </div>
        `;
        return;
    }

    activeOrders.forEach(order => {
        if (order.status === 'pending') {
            const orderCard = createOrderCard(order);
            ordersList.appendChild(orderCard);
        }
    });
}

// Create order card element
function createOrderCard(order) {
    const card = document.createElement('div');
    card.className = 'order-card';
    
    const orderTypeIcon = getOrderTypeIcon(order.orderType);
    
    card.innerHTML = `
        <div class="order-header">
            <span class="order-type">
                <i class="${orderTypeIcon}"></i>
                ${capitalizeFirstLetter(order.orderType)}
            </span>
            <span class="order-time">${order.timestamp}</span>
        </div>
        
        <div class="order-locations">
            <div class="location-item">
                <i class="fas fa-map-marker-alt location-icon"></i>
                <div class="location-details">
                    <div class="location-label">Pickup Location</div>
                    <div class="location-address">${order.pickupLocation}</div>
                </div>
            </div>
            
            <div class="location-item">
                <i class="fas fa-flag-checkered location-icon"></i>
                <div class="location-details">
                    <div class="location-label">Delivery Location</div>
                    <div class="location-address">${order.deliveryLocation}</div>
                </div>
            </div>
        </div>
        
        <div class="order-description">
            <p>${order.orderDescription}</p>
        </div>
        
        <div class="order-footer">
            <span class="order-weight">
                <i class="fas fa-weight-hanging"></i>
                ${order.estimatedWeight} kg
            </span>
            <button class="accept-order-btn" onclick="acceptOrder(${order.id})">
                <i class="fas fa-check"></i>
                Accept Order
            </button>
        </div>
    `;
    
    return card;
}

// Accept order function
function acceptOrder(orderId) {
    const order = activeOrders.find(o => o.id === orderId);
    if (order) {
        order.status = 'accepted';
        showToast('Order accepted successfully', 'success');
        displayOrders();
    }
}

// Helper functions
function getOrderTypeIcon(type) {
    const icons = {
        food: 'fas fa-utensils',
        package: 'fas fa-box',
        grocery: 'fas fa-shopping-basket'
    };
    return icons[type] || 'fas fa-box';
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Add smooth animations to input fields
document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        const wrapper = input.parentElement;
        
        input.addEventListener('focus', () => {
            wrapper.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                wrapper.classList.remove('focused');
            }
        });

        // Initialize state for inputs with values
        if (input.value) {
            wrapper.classList.add('focused');
        }
    });

    // Initialize the interface
    displayOrders();
});
