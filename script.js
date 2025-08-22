       // Global variables
        let currentUser = null;
        let currentUserType = null;
        let selectedTable = null;
        let currentOrder = [];
        let orderTotal = 0;

        // Development mode - set to true when working on specific sections
const DEV_MODE = true;
const DEV_SECTION = 'customer'; // 'customer' or 'employee'

// Override default display when in dev mode
document.addEventListener('DOMContentLoaded', function() {
    if (DEV_MODE) {
        document.getElementById('loginSection').style.display = 'none';
        
        if (DEV_SECTION === 'customer') {
            document.getElementById('customerDashboard').style.display = 'block';
            currentUser = 'dev-customer';
            currentUserType = 'customer';
            document.getElementById('customerName').textContent = currentUser;
            initializeCustomerDashboard();
        } else if (DEV_SECTION === 'employee') {
            document.getElementById('employeeDashboard').style.display = 'block';
            currentUser = 'dev-employee';
            currentUserType = 'employee';
            document.getElementById('employeeName').textContent = currentUser;
            initializePOS();
        }
    }
});

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
            // renderFeedback();
            setMinDate();
                loadCafeImage('cafe_layout_2d_real.png');
                initializeTableSelection(); // Add this line

                // Debug - call after a delay to ensure DOM is ready
    setTimeout(() => {
        
        initializeTableSelection();
    }, 500);
            
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

//         function handleReservation(event) {
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
//     console.log('Current reservations list:', reservationsList); // Debug line
    
//     document.getElementById('successMessage').classList.add('show');
    
//     setTimeout(() => {
//         document.getElementById('reservationForm').reset();
//         document.getElementById('successMessage').classList.remove('show');
//     }, 3000);
// }

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
//         function renderFeedback() {
//     const feedbackContainer = document.getElementById('feedbackList');
//     feedbackContainer.innerHTML = '<h3>Community Reviews & Photos</h3>';
    
//     feedbackList.forEach(feedback => {
//         const feedbackItem = document.createElement('div');
        
//         if (feedback.hasPhoto) {
//             feedbackItem.className = 'feedback-item with-photo';
//             feedbackItem.innerHTML = `
//                 <img src="${feedback.photo}" alt="Customer photo" class="feedback-photo">
//                 <div class="feedback-content">
//                     <div class="feedback-author">${feedback.author} 📸</div>
//                     <div class="feedback-date">${feedback.date}</div>
//                     <div class="feedback-text">${feedback.content}</div>
//                 </div>
//             `;
//         } else {
//             feedbackItem.className = 'feedback-item';
//             feedbackItem.innerHTML = `
//                 <div class="feedback-author">${feedback.author}</div>
//                 <div class="feedback-date">${feedback.date}</div>
//                 <div class="feedback-text">${feedback.content}</div>
//             `;
//         }
        
//         feedbackContainer.appendChild(feedbackItem);
//     });
// }
//         // Submit feedback
//         function submitFeedback() {
//             const feedbackText = document.getElementById('feedbackText').value.trim();
//             if (feedbackText) {
//                 const newFeedback = {
//                     author: currentUser,
//                     date: new Date().toISOString().split('T')[0],
//                     content: feedbackText
//                 };
//                 feedbackList.unshift(newFeedback);
//                 document.getElementById('feedbackText').value = '';
//                 renderFeedback();
//                 alert('Thank you for your feedback!');
//             }
//         }

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
        tableNumber: reservationData.tableNumber,
        name: reservationData.name,
        contact: reservationData.contact,
        diners: reservationData.diners,
        reservationDate: reservationData.date,
        time: reservationData.time,
        notes: reservationData.notes || 'None'
    };
    
    reservationsList.unshift(newReservation);
    console.log('Added reservation:', newReservation);
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
        <div><strong>Table Number:</strong> ${reservation.tableNumber}</div>
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

// Table selection variables (MOVE THIS TO TOP OF FILE)
let selectedTableId = null;
let occupiedTables = [];

// Initialize table selection
function initializeTableSelection() {
    console.log('Initializing table selection...'); // Debug log
    const tableSpots = document.querySelectorAll('.table-spot');
    console.log('Found table spots:', tableSpots.length); // Debug log
    
    tableSpots.forEach(spot => {
        const tableId = spot.getAttribute('data-id');
        console.log('Setting up table:', tableId); // Debug log
        
        // Set initial state
        if (occupiedTables.includes(tableId)) {
            spot.classList.add('occupied');
        } else {
            spot.classList.add('available');
        }
        
        // Add click event
        spot.addEventListener('click', function() {
            console.log('Table clicked:', tableId); // Debug log
            selectTable(tableId, spot);
        });
    });
}

function selectTable(tableId, spotElement) {
    console.log('Selecting table:', tableId); // Debug log
    
    // Don't allow selection of occupied tables
    if (spotElement.classList.contains('occupied')) {
        alert('This table is already occupied. Please select another table.');
        return;
    }
    
    // Remove previous selection
    document.querySelectorAll('.table-spot.selected').forEach(spot => {
        spot.classList.remove('selected');
        spot.classList.add('available');
    });
    
    // Select new table
    selectedTableId = tableId;
    spotElement.classList.remove('available');
    spotElement.classList.add('selected');
    
    // Update UI
    updateSelectedTableInfo(tableId);
}

function updateSelectedTableInfo(tableId) {
    const selectedTableInfo = document.getElementById('selectedTableInfo');
    const selectedTableNumber = document.getElementById('selectedTableNumber');
    
    if (selectedTableNumber) {
        selectedTableNumber.textContent = tableId;
    }
    
    selectedTableInfo.classList.add('show');
}

function updateTableStatus(tableId, status) {
    const tableSpot = document.querySelector(`.table-spot[data-id="${tableId}"]`);
    if (tableSpot) {
        tableSpot.classList.remove('available', 'selected', 'occupied');
        tableSpot.classList.add(status);
    }
}

// Update the handleReservation function (REPLACE THE EXISTING ONE)
function handleReservation(event) {
    event.preventDefault();

    // Check if table is selected
    if (!selectedTableId) {
        alert('Please select a table before making a reservation.');
        return;
    }

    const formData = new FormData(event.target);
    const reservationData = {
        tableNumber: selectedTableId,
        name: formData.get('customerName'),
        contact: formData.get('contactNumber'),
        diners: formData.get('numberOfDiners'),
        date: formData.get('reservationDate'),
        time: formData.get('reservationTime'),
        notes: formData.get('notes')
    };

    console.log('Reservation Data:', reservationData);
    addReservation(reservationData);
    
    // Mark table as occupied
    occupiedTables.push(selectedTableId);
    updateTableStatus(selectedTableId, 'occupied');
    
    document.getElementById('successMessage').classList.add('show');
    
    setTimeout(() => {
        document.getElementById('reservationForm').reset();
        document.getElementById('successMessage').classList.remove('show');
        document.getElementById('selectedTableInfo').classList.remove('show');
        selectedTableId = null;
    }, 3000);
    function debugTableSpots() {
    console.log('=== DEBUG TABLE SPOTS ===');
    const container = document.getElementById('tableOverlays');
    console.log('Table overlays container:', container);
    const spots = document.querySelectorAll('.table-spot');
    console.log('Number of table spots found:', spots.length);
    spots.forEach((spot, index) => {
        console.log(`Spot ${index}:`, spot, 'data-id:', spot.getAttribute('data-id'));
    });
}
}
let selectedSpot = null;
let bulletinPhotos = {}; // Store photos for each spot

// Function to show bulletin board placeholder when image fails to load
function showBulletinPlaceholder() {
    document.getElementById('bulletinBoardImage').style.display = 'none';
    document.getElementById('bulletinPlaceholder').style.display = 'block';
}

// Function to load bulletin board image when URL is provided
function loadBulletinImage(imageUrl) {
    const img = document.getElementById('bulletinBoardImage');
    const placeholder = document.getElementById('bulletinPlaceholder');
    
    img.src = imageUrl;
    img.style.display = 'block';
    placeholder.style.display = 'none';
    
    img.onerror = showBulletinPlaceholder;
}

// Open photo upload modal for specific spot
function openPhotoModal(spotNumber) {
    selectedSpot = spotNumber;
    document.getElementById('photoModal').style.display = 'block';
    
    // Clear previous form data
    document.getElementById('photoSubmissionForm').reset();
    document.getElementById('modalPhotoPreview').style.display = 'none';
    
    // Pre-fill user name if available
    if (currentUser) {
        document.getElementById('modalUserName').value = currentUser;
    }
}

// Close photo upload modal
function closePhotoModal() {
    document.getElementById('photoModal').style.display = 'none';
    selectedSpot = null;
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('photoModal');
    if (event.target === modal) {
        closePhotoModal();
    }
}

// Preview uploaded photo in modal
function previewModalPhoto(event) {
    const file = event.target.files[0];
    const preview = document.getElementById('modalPhotoPreview');
    
    if (file) {
        // Check file size (limit to 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('Please choose an image smaller than 5MB.');
            event.target.value = '';
            preview.style.display = 'none';
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            preview.src = e.target.result;
            preview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    } else {
        preview.style.display = 'none';
    }
}

// Submit photo to bulletin board
function submitPhotoToBulletin(event) {
    event.preventDefault();
    
    if (!selectedSpot) {
        alert('Error: No spot selected.');
        return;
    }
    
    const photoInput = document.getElementById('modalPhotoInput');
    const reviewText = document.getElementById('modalReviewText').value.trim();
    const userName = document.getElementById('modalUserName').value.trim();
    
    if (!photoInput.files[0]) {
        alert('Please select a photo to upload.');
        return;
    }
    
    if (!reviewText) {
        alert('Please write a review to go with your photo.');
        return;
    }
    
    if (!userName) {
        alert('Please enter your name.');
        return;
    }
    
    // Process the image
    const file = photoInput.files[0];
    const reader = new FileReader();
    
    reader.onload = function(e) {
        // Store the photo data
        bulletinPhotos[selectedSpot] = {
            image: e.target.result,
            author: userName,
            review: reviewText,
            date: new Date().toLocaleDateString()
        };
        
        // Update the visual spot
        updatePhotoSpot(selectedSpot, bulletinPhotos[selectedSpot]);
        
        // Close modal
        closePhotoModal();
        
        // Show success message
        showSuccessMessage('Your photo has been pinned to the bulletin board!');
    };
    
    reader.readAsDataURL(file);
}

// Update photo spot with submitted photo
function updatePhotoSpot(spotNumber, photoData) {
    const spot = document.getElementById(`spot${spotNumber}`);
    
    if (spot) {
        spot.classList.add('filled');
        
        // Create the photo content
        spot.innerHTML = `
            <div class="photo-placeholder-spot">
                <img src="${photoData.image}" alt="Community photo" class="submitted-photo">
                <div class="photo-author">📝 ${photoData.author}</div>
            </div>
        `;
        
        // Add click event to view full photo and review
        spot.onclick = function() {
            viewPhotoDetails(spotNumber);
        };
    }
}

// View photo details in modal
function viewPhotoDetails(spotNumber) {
    const photoData = bulletinPhotos[spotNumber];
    
    if (!photoData) return;
    
    // Create a view-only modal
    const modal = document.createElement('div');
    modal.className = 'photo-modal';
    modal.style.display = 'block';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>📸 ${photoData.author}'s Experience</h3>
                <button class="modal-close" onclick="this.closest('.photo-modal').remove()">&times;</button>
            </div>
            <div style="padding: 25px 30px 30px;">
                <img src="${photoData.image}" alt="Community photo" style="width: 100%; max-height: 400px; object-fit: contain; border-radius: 10px; margin-bottom: 20px;">
                <div style="background: #f8f9fa; padding: 20px; border-radius: 10px;">
                    <h4 style="margin: 0 0 10px 0; color: #667eea;">Review:</h4>
                    <p style="margin: 0; line-height: 1.6;">${photoData.review}</p>
                    <p style="margin-top: 15px; font-size: 0.9rem; color: #666;">Shared on ${photoData.date}</p>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close when clicking outside
    modal.onclick = function(event) {
        if (event.target === modal) {
            modal.remove();
        }
    };
}

// Show success message
function showSuccessMessage(message) {
    // Create success notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(45deg, #28a745, #20c997);
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 1001;
        font-weight: bold;
        animation: slideInRight 0.5s ease-out;
    `;
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 1.2rem;">✅</span>
            <span>${message}</span>
        </div>
    `;
    
    // Add animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideInRight 0.5s ease-out reverse';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 500);
    }, 3000);
}

// Initialize bulletin board (call this when customer dashboard loads)
function initializeBulletinBoard() {
    // You can pre-load some sample photos here if needed
    // For now, all spots start empty
    console.log('Bulletin board initialized');
}
