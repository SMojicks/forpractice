 
        // Global variables
        let currentUser = null;
        let currentUserType = null;
        let selectedTable = null;
        let currentOrder = [];
        let orderTotal = 0;

        // Sample data
        const menuItems = [
            { id: 1, name: "Espresso", description: "Rich and bold coffee shot", price: 2.50 },
            { id: 2, name: "Cappuccino", description: "Espresso with steamed milk foam", price: 3.75 },
            { id: 3, name: "Latte", description: "Smooth espresso with steamed milk", price: 4.25 },
            { id: 4, name: "Americano", description: "Espresso with hot water", price: 3.00 },
            { id: 5, name: "Mocha", description: "Chocolate and espresso delight", price: 4.75 },
            { id: 6, name: "Croissant", description: "Buttery, flaky pastry", price: 2.95 },
            { id: 7, name: "Blueberry Muffin", description: "Fresh baked with real blueberries", price: 3.25 },
            { id: 8, name: "Avocado Toast", description: "Multigrain bread with fresh avocado", price: 5.50 }
        ];

        let feedbackList = [
            { author: "Sarah M.", date: "2025-08-01", content: "Amazing coffee and cozy atmosphere! Will definitely come back." },
            { author: "John D.", date: "2025-07-30", content: "The latte art here is incredible. Baristas are true artists!" }
        ];

        // Function to show placeholder when image fails to load
        function showPlaceholder() {
            document.getElementById('cafeImage').style.display = 'none';
            document.getElementById('imagePlaceholder').style.display = 'block';
        }

        // Function to load image when URL is provided
        function loadCafeImage(imageUrl) {
            const img = document.getElementById('cafeImage');
            const placeholder = document.getElementById('imagePlaceholder');
            
            img.src = imageUrl;
            img.style.display = 'block';
            placeholder.style.display = 'none';
            
            img.onerror = showPlaceholder;
        }

        // Handle login
        function handleLogin(userType) {
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();

            if (!email || !password) {
                alert('Please enter both email and password.');
                return;
            }

            currentUser = email.split('@')[0];
            currentUserType = userType;
            
            document.getElementById('loginSection').style.display = 'none';
            
            if (userType === 'customer') {
    document.getElementById('customerName').textContent = currentUser;
    document.getElementById('customerLanding').style.display = 'block';
    
    // Initialize carousel after a short delay to ensure DOM is ready
    setTimeout(() => {
        initializeCarousel();
    }, 100);
        } else {
                document.getElementById('employeeName').textContent = currentUser;
                document.getElementById('employeeDashboard').style.display = 'block';
                initializePOS();
            }
        }

        // Initialize login event listeners
        document.addEventListener('DOMContentLoaded', function() {
            document.getElementById('login-button').addEventListener('click', function() {
                handleLogin('customer');
            });
            
            document.getElementById('employee-login-btn').addEventListener('click', function() {
                const email = document.getElementById('email').value.trim();
                const password = document.getElementById('password').value.trim();
                
                if (!email || !password) {
                    alert('Please enter both email and password to login as employee.');
                    return;
                }
                
                handleLogin('employee');
            });
        });

        // Initialize customer dashboard
        function initializeCustomerDashboard() {
            renderMenu();
            renderFeedback();
            setMinDate();
                loadCafeImage('cafe_layout_2d.jpg');
            
            const form = document.getElementById('reservationForm');
            if (form) {
                form.addEventListener('submit', handleReservation);
            }

            // You can call this function with your image URL
            // loadCafeImage('YOUR_IMAGE_URL_HERE');
        }

        // Set minimum date to today
        function setMinDate() {
            const today = new Date();
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);
            
            const dateInput = document.getElementById('reservationDate');
            dateInput.min = tomorrow.toISOString().split('T')[0];
        }

        // // Handle form submission
        // function handleReservation(event) {
        //     event.preventDefault();

        //     const formData = new FormData(event.target);
        //     const reservationData = {
        //         name: formData.get('customerName'),
        //         contact: formData.get('contactNumber'),
        //         diners: formData.get('numberOfDiners'),
        //         date: formData.get('reservationDate'),
        //         time: formData.get('reservationTime'),
        //         notes: formData.get('notes')
        //     };

        //     console.log('Reservation Data:', reservationData);
        //     addReservation(reservationData);
            
        //     document.getElementById('successMessage').classList.add('show');
            
        //     setTimeout(() => {
        //         document.getElementById('reservationForm').reset();
        //         document.getElementById('successMessage').classList.remove('show');
        //     }, 3000);
        // }

// Carousel functionality - Updated
let currentSlideIndex = 0;
let slides = [];
let dots = [];
let carouselInterval;
 function enterCustomerDashboard() {
    stopCarousel(); // Stop the carousel when leaving landing page
    document.getElementById('customerLanding').style.display = 'none';
    document.getElementById('customerDashboard').style.display = 'block';
    initializeCustomerDashboard();
}
function initializeCarousel() {
    slides = document.querySelectorAll('.carousel-slide');
    dots = document.querySelectorAll('.nav-dot');
    
    if (slides.length > 0) {
        showSlide(0);
        startCarousel();
    }
}

function showSlide(index) {
    if (slides.length === 0) return;
    
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

function changeSlide(direction) {
    if (slides.length === 0) return;
    
    currentSlideIndex += direction;
    if (currentSlideIndex >= slides.length) currentSlideIndex = 0;
    if (currentSlideIndex < 0) currentSlideIndex = slides.length - 1;
    showSlide(currentSlideIndex);
}

function currentSlide(index) {
    currentSlideIndex = index - 1;
    showSlide(currentSlideIndex);
}

function startCarousel() {
    // Clear any existing interval
    if (carouselInterval) {
        clearInterval(carouselInterval);
    }
    
    // Start new interval
    carouselInterval = setInterval(() => {
        changeSlide(1);
    }, 5000);
}

function stopCarousel() {
    if (carouselInterval) {
        clearInterval(carouselInterval);
    }
}

        function handleReservation(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const reservationData = {
        name: formData.get('customerName'),
        contact: formData.get('contactNumber'),
        diners: formData.get('numberOfDiners'),
        date: formData.get('reservationDate'),
        time: formData.get('reservationTime'),
        notes: formData.get('notes')
    };

    console.log('Reservation Data:', reservationData);
    addReservation(reservationData);
    console.log('Current reservations list:', reservationsList); // Debug line
    
    document.getElementById('successMessage').classList.add('show');
    
    setTimeout(() => {
        document.getElementById('reservationForm').reset();
        document.getElementById('successMessage').classList.remove('show');
    }, 3000);
}

        // Render menu
        function renderMenu() {
            const menuGrid = document.getElementById('menuGrid');
            menuGrid.innerHTML = '';
            
            menuItems.forEach(item => {
                const menuItem = document.createElement('div');
                menuItem.className = 'menu-item';
                menuItem.innerHTML = `
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <div class="price">$${item.price.toFixed(2)}</div>
                `;
                menuGrid.appendChild(menuItem);
            });
        }

        // Render feedback
        function renderFeedback() {
            const feedbackContainer = document.getElementById('feedbackList');
            feedbackContainer.innerHTML = '<h3>Customer Reviews</h3>';
            
            feedbackList.forEach(feedback => {
                const feedbackItem = document.createElement('div');
                feedbackItem.className = 'feedback-item';
                feedbackItem.innerHTML = `
                    <div class="feedback-author">${feedback.author}</div>
                    <div class="feedback-date">${feedback.date}</div>
                    <div>${feedback.content}</div>
                `;
                feedbackContainer.appendChild(feedbackItem);
            });
        }

        // Submit feedback
        function submitFeedback() {
            const feedbackText = document.getElementById('feedbackText').value.trim();
            if (feedbackText) {
                const newFeedback = {
                    author: currentUser,
                    date: new Date().toISOString().split('T')[0],
                    content: feedbackText
                };
                feedbackList.unshift(newFeedback);
                document.getElementById('feedbackText').value = '';
                renderFeedback();
                alert('Thank you for your feedback!');
            }
        }

        // Initialize POS
        function initializePOS() {
            renderPOSMenu();
            renderEmployeeFeedback();
            renderInventory()
            renderTransactionHistory();
            renderReservationsList();
            updateOrderSummary();
        }

        // Render POS menu
        function renderPOSMenu() {
            const posMenu = document.getElementById('posMenu');
            posMenu.innerHTML = '';
            
            menuItems.forEach(item => {
                const posItem = document.createElement('button');
                posItem.className = 'pos-item';
                posItem.onclick = () => addToOrder(item);
                posItem.innerHTML = `
                    <h4>${item.name}</h4>
                    <p>${item.price.toFixed(2)}</p>
                `;
                posMenu.appendChild(posItem);
            });
        }

        // Add to order
        function addToOrder(item) {
            const existingItem = currentOrder.find(orderItem => orderItem.id === item.id);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                currentOrder.push({...item, quantity: 1});
            }
            updateOrderSummary();
        }

        // Remove from order
        function removeFromOrder(itemId) {
            currentOrder = currentOrder.filter(item => item.id !== itemId);
            updateOrderSummary();
        }

        // Update order summary
        function updateOrderSummary() {
            const orderItems = document.getElementById('orderItems');
            const orderTotalElement = document.getElementById('orderTotal');
            
            orderItems.innerHTML = '';
            orderTotal = 0;
            
            currentOrder.forEach(item => {
                const itemTotal = item.price * item.quantity;
                orderTotal += itemTotal;
                
                const orderItem = document.createElement('div');
                orderItem.className = 'order-item';
                orderItem.innerHTML = `
                    <div>
                        <strong>${item.name}</strong><br>
                        Qty: ${item.quantity} × ${item.price.toFixed(2)}
                    </div>
                    <div>
                        ${itemTotal.toFixed(2)}
                        <button class="remove-btn" onclick="removeFromOrder(${item.id})">Remove</button>
                    </div>
                `;
                orderItems.appendChild(orderItem);
            });
            
            orderTotalElement.textContent = orderTotal.toFixed(2);
        }

        // Process order
        function processOrder() {
            if (currentOrder.length === 0) {
                alert('No items in order!');
                return;
            }
            addTransaction(currentOrder, orderTotal);
            alert(`Order processed successfully! Total: ${orderTotal.toFixed(2)}`);
            currentOrder = [];
            updateOrderSummary();
        }

        // Show tab
        function showTab(tabName) {
            document.querySelectorAll('.tab-content').forEach(tab => {
                tab.classList.remove('active');
            });
            document.querySelectorAll('.nav-tab').forEach(tab => {
                tab.classList.remove('active');
            });
            
            document.getElementById(tabName).classList.add('active');
            event.target.classList.add('active');
        }

        // Logout
        function logout() {
            stopCarousel();
            currentUser = null;
            currentUserType = null;
            selectedTable = null;
            currentOrder = [];
            
            document.getElementById('email').value = '';
            document.getElementById('password').value = '';
            
            document.getElementById('customerDashboard').style.display = 'none';
            document.getElementById('employeeDashboard').style.display = 'none';
            document.getElementById('loginSection').style.display = 'flex';
        }
        // Additional global variables
let inventoryItems = [];
let transactionHistory = [];
let reservationsList = [];
let isOwnerLoggedIn = false;

// Show employee tabs
function showEmployeeTab(tabName) {
    // Hide all employee tabs
    document.querySelectorAll('#employeeDashboard .tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('#employeeDashboard .nav-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show selected tab
    document.getElementById(tabName).classList.add('active');
    event.target.classList.add('active');
    
    // Load data for specific tabs
    if (tabName === 'pos') renderPOSMenu();
    if (tabName === 'inventory') renderInventory();
    if (tabName === 'history') renderTransactionHistory();
    if (tabName === 'employee-reservations') renderReservationsList();
    if (tabName === 'customerFeedback') renderEmployeeFeedback();
}

// Inventory Management
function addInventoryItem() {
    const name = document.getElementById('itemName').value.trim();
    const quantity = parseInt(document.getElementById('itemQuantity').value);
    
    if (!name || !quantity || quantity < 0) {
        alert('Please enter valid item name and quantity.');
        return;
    }
    
    const existingItem = inventoryItems.find(item => item.name.toLowerCase() === name.toLowerCase());
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        inventoryItems.push({
            id: Date.now(),
            name: name,
            quantity: quantity
        });
    }
    
    document.getElementById('itemName').value = '';
    document.getElementById('itemQuantity').value = '';
    renderInventory();
    alert('Item added successfully!');
}

function deleteInventoryItem(itemId) {
    inventoryItems = inventoryItems.filter(item => item.id !== itemId);
    renderInventory();
    alert('Item deleted successfully!');
}

function renderInventory() {
    const container = document.getElementById('inventoryItems');
    container.innerHTML = '';
    
    inventoryItems.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'inventory-item';
        itemDiv.innerHTML = `
            <div>
                <strong>${item.name}</strong><br>
                <span>Quantity: ${item.quantity}</span>
            </div>
            <button class="delete-btn" onclick="deleteInventoryItem(${item.id})">Delete</button>
        `;
        container.appendChild(itemDiv);
    });
}

// Transaction History
function addTransaction(orderData, total) {
    transactionHistory.unshift({
        id: Date.now(),
        date: new Date().toLocaleString(),
        items: [...orderData],
        total: total
    });
}

function renderTransactionHistory() {
    const container = document.getElementById('transactionHistory');
    container.innerHTML = '<h3>Recent Transactions</h3>';
    
    transactionHistory.forEach(transaction => {
        const transactionDiv = document.createElement('div');
        transactionDiv.className = 'transaction-item';
        transactionDiv.innerHTML = `
            <div class="transaction-date">${transaction.date}</div>
            <div><strong>Transaction ID:</strong> #${transaction.id}</div>
            <div><strong>Items:</strong> ${transaction.items.map(item => `${item.name} (x${item.quantity})`).join(', ')}</div>
            <div><strong>Total:</strong> $${transaction.total.toFixed(2)}</div>
        `;
        container.appendChild(transactionDiv);
    });
}

// // Reservations Management
// function addReservation(reservationData) {
//     reservationsList.unshift({
//         id: Date.now(),
//         date: new Date().toLocaleString(),
//          reservationDate: reservationData.date,
//         ...reservationData
//     });
// }

function addReservation(reservationData) {
    const newReservation = {
        id: Date.now(),
        bookingDate: new Date().toLocaleString(),
        name: reservationData.name,
        contact: reservationData.contact,
        diners: reservationData.diners,
        reservationDate: reservationData.date,
        time: reservationData.time,
        notes: reservationData.notes || 'None'
    };
    
    reservationsList.unshift(newReservation);
    console.log('Added reservation:', newReservation);
    console.log('Total reservations:', reservationsList.length);
}

// function renderReservationsList() {
//     const container = document.getElementById('reservationsList');
//     container.innerHTML = '<h3>Customer Reservations</h3>';
    
//     reservationsList.forEach(reservation => {
//         const reservationDiv = document.createElement('div');
//         reservationDiv.className = 'reservation-item';
//         reservationDiv.innerHTML = `
//             <div class="reservation-date">Booked: ${reservation.date}</div>
//             <div><strong>Name:</strong> ${reservation.name}</div>
//             <div><strong>Contact:</strong> ${reservation.contact}</div>
//             <div><strong>Diners:</strong> ${reservation.diners}</div>
//             <div><strong>Reservation Date:</strong> ${reservation.date} at ${reservation.time}</div>
//             ${reservation.notes ? `<div><strong>Notes:</strong> ${reservation.notes}</div>` : ''}
//         `;
//         container.appendChild(reservationDiv);
//     });
// } old version

function renderReservationsList() {
    const container = document.getElementById('employeeReservationsList');
    
    if (!container) {
        console.error('employeeReservationsList container not found');
        return;
    }
    
    container.innerHTML = '<h3>Customer Reservations</h3>';
    
    if (reservationsList.length === 0) {
        container.innerHTML += '<p style="padding: 20px; text-align: center; color: #666;">No reservations yet.</p>';
        return;
    }
    
    reservationsList.forEach(reservation => {
        const reservationDiv = document.createElement('div');
        reservationDiv.className = 'reservation-item';
        reservationDiv.innerHTML = `
            <div class="reservation-date">Booked: ${reservation.bookingDate}</div>
            <div><strong>Name:</strong> ${reservation.name}</div>
            <div><strong>Contact:</strong> ${reservation.contact}</div>
            <div><strong>Diners:</strong> ${reservation.diners}</div>
            <div><strong>Reservation Date:</strong> ${reservation.reservationDate} at ${reservation.time}</div>
            <div><strong>Notes:</strong> ${reservation.notes}</div>
        `;
        container.appendChild(reservationDiv);
    });
}

// Employee Feedback View
function renderEmployeeFeedback() {
    const container = document.getElementById('employeeFeedbackList');
    container.innerHTML = '<h3>Customer Feedback</h3>';
    
    feedbackList.forEach(feedback => {
        const feedbackDiv = document.createElement('div');
        feedbackDiv.className = 'feedback-item';
        feedbackDiv.innerHTML = `
            <div class="feedback-author">${feedback.author}</div>
            <div class="feedback-date">${feedback.date}</div>
            <div>${feedback.content}</div>
        `;
        container.appendChild(feedbackDiv);
    });
}

// Owner Account Management
function ownerLogin() {
    const name = document.getElementById('ownerName').value.trim();
    const password = document.getElementById('ownerPassword').value.trim();
    
    // Simple authentication (in real app, use proper authentication)
    if (name === 'owner' && password === 'admin123') {
        isOwnerLoggedIn = true;
        document.getElementById('ownerLoginSection').style.display = 'none';
        document.getElementById('accountPanel').style.display = 'block';
        updateAccountStats();
        alert('Welcome, Owner!');
    } else {
        alert('Invalid credentials!');
    }
}

function ownerLogout() {
    isOwnerLoggedIn = false;
    document.getElementById('ownerLoginSection').style.display = 'block';
    document.getElementById('accountPanel').style.display = 'none';
    document.getElementById('ownerName').value = '';
    document.getElementById('ownerPassword').value = '';
}

function updateAccountStats() {
    document.getElementById('totalTransactions').textContent = transactionHistory.length;
    document.getElementById('totalRevenue').textContent = transactionHistory.reduce((sum, t) => sum + t.total, 0).toFixed(2);
    document.getElementById('totalInventoryItems').textContent = inventoryItems.length;
}