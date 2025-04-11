/*!
* Start Bootstrap - Business Casual v7.0.9 (https://startbootstrap.com/theme/business-casual)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-business-casual/blob/master/LICENSE)
*/
// Highlights current date on contact page
window.addEventListener('DOMContentLoaded', event => {
    const listHoursArray = document.body.querySelectorAll('.list-hours li');
    listHoursArray[new Date().getDay()].classList.add(('today'));
});
// Check if the current page is login.html
if (window.location.pathname.endsWith('login.html')) {
    document.getElementById('loginButton').addEventListener('click', function () {
        // Redirect to index.html
        window.location.href = 'index.html';
    });
}


document.addEventListener('DOMContentLoaded', () => {
    const reviewsList = document.getElementById('reviews-list');
    const reviewForm = document.getElementById('review-form');
    const reviewNameInput = document.getElementById('review-name');
    const reviewTextInput = document.getElementById('review-text');

    // Mock reviews
    const renderReviews = (reviews) => {
        reviewsList.innerHTML = ''; // Clear the reviews list
        reviews.forEach(review => {
            const reviewDiv = document.createElement('div');
            reviewDiv.className = 'review card mb-3 shadow-sm';
            reviewDiv.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title text-primary">${review.Customer_Name}</h5>
                    <p class="card-text text-muted">${review.Review}</p>
                </div>
            `;
            reviewsList.appendChild(reviewDiv);
        });
    };

    const fetchReviews = async () => {
        try {
            const response = await fetch('http://localhost:5005/api/reviews');
            const data = await response.json();
            renderReviews(data);
        } catch (err) {
            console.error("Error loading reviews:", err);
        }
    };

    // Submit event listener for the form
    reviewForm.addEventListener('submit', async (e) => {
        e.preventDefault();
    
        const name = reviewNameInput.value.trim();
        const text = reviewTextInput.value.trim();
        const customerId = document.getElementById('review-customer-id').value.trim();
    
        if (name && text && customerId) {
            try {
                await fetch('http://localhost:5005/api/reviews', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        Customer_Name: name,
                        Review: text,
                        Customer_id: parseInt(customerId)
                    })
                });
    
                reviewNameInput.value = '';
                reviewTextInput.value = '';
                document.getElementById('review-customer-id').value = '';
    
                // Reload reviews from database
                fetchReviews();
            } catch (err) {
                console.error('Error submitting review:', err);
                alert("Failed to submit review");
            }
        }
    });
    fetchReviews();
});
let listProductHTML = document.querySelector('.listProduct');
let listCartHTML = document.querySelector('.listCart');
let iconCart = document.querySelector('.icon-cart');
let iconCartSpan = document.querySelector('.icon-cart span');
let body = document.querySelector('body');
let closeCart = document.querySelector('.close');
let products = [];
let cart = [];

document.addEventListener('DOMContentLoaded', () => {
    // Load products from the JSON file
    fetch('http://localhost:5005/api/menu') // Ensure the correct path to product.json
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(products => {
            const productList = document.querySelector('.listProduct'); // Target product list container
            const filters = document.querySelectorAll('#filters button');
            const cartList = document.querySelector('.listCart'); // Target cart container
            const cartCounter = document.querySelector('.icon-cart span'); // Cart counter element

            // Load cart from localStorage or initialize an empty cart
            let cart = JSON.parse(localStorage.getItem('cart')) || [];

            // Function to save cart to localStorage
            const saveCart = () => {
                localStorage.setItem('cart', JSON.stringify(cart));
            };

            // Function to update cart counter
            const updateCartCounter = () => {
                const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
                cartCounter.textContent = totalItems;
            };

            // Function to render products
            const renderProducts = (filter = 'all') => {
                if (!productList) return; // Skip if productList is not on this page
                productList.innerHTML = ''; // Clear the product list

                products.forEach(product => {
                    if (filter === 'all' || product.Category === filter) {
                        const productDiv = document.createElement('div');
                        productDiv.className = 'product card mb-4 shadow-sm';
                        productDiv.setAttribute('data-category', product.Category);
                        productDiv.innerHTML = `
                            <img src="${product.Image.replace('{category}', product.Category.toLowerCase())}" alt="${product.Nameame}" class="card-img-top">
                            <div class="card-body">
                                <h5 class="card-title">${product.Name}</h5>
                                <p class="card-text">Price: $${product.Price}</p>
                                <p class="card-text">Calories: ${product.Calories} kcal</p>
                                <button class="btn btn-primary add-to-cart" data-id="${product.itemid}">Add to Cart</button>
                            </div>
                        `;
                        productList.appendChild(productDiv);
                    }
                });

                // Attach "Add to Cart" functionality after rendering
                const addToCartButtons = document.querySelectorAll('.add-to-cart');
                addToCartButtons.forEach(button => {
                    button.addEventListener('click', () => {
                        const productId = parseInt(button.getAttribute('data-id'));
                        addToCart(productId);
                    });
                });
            };

            // Function to render the cart
            const renderCart = () => {
                if (!cartList) return; // Skip if cartList is not on this page
                cartList.innerHTML = ''; // Clear the cart

                let total = 0;

                cart.forEach(item => {
                    total += item.price * item.quantity;

                    const cartItem = document.createElement('div');
                    cartItem.className = 'cart-item d-flex justify-content-between align-items-center mb-3';
                    cartItem.innerHTML = `
                        <span>${item.Name} - $${item.Price} x ${item.quantity}</span>
                        <div>
                            <button class="btn btn-sm btn-secondary decrement" data-id="${item.itemid}">-</button>
                            <button class="btn btn-sm btn-secondary increment" data-id="${item.itemid}">+</button>
                        </div>
                    `;
                    cartList.appendChild(cartItem);
                });

                // Update existing checkout button with the total
                const checkoutButton = document.querySelector('.checkOut');
                if (checkoutButton) {
                    checkoutButton.innerHTML = `Check Out - Total: $${total.toFixed(2)}`;
                }

                // Attach increment and decrement functionality
                const decrementButtons = document.querySelectorAll('.decrement');
                const incrementButtons = document.querySelectorAll('.increment');

                decrementButtons.forEach(button => {
                    button.addEventListener('click', () => {
                        const productId = parseInt(button.getAttribute('data-id'));
                        updateCart(productId, -1);
                    });
                });

                incrementButtons.forEach(button => {
                    button.addEventListener('click', () => {
                        const productId = parseInt(button.getAttribute('data-id'));
                        updateCart(productId, 1);
                    });
                });

                // Update cart counter
                updateCartCounter();
            };

            // Function to add/update items in the cart
            const addToCart = (productId) => {
                const product = products.find(p => p.id === productId);
                const cartItem = cart.find(item => item.id === productId);

                if (cartItem) {
                    cartItem.quantity += 1; // Increment quantity
                } else {
                    cart.push({ ...product, quantity: 1 }); // Add new product to the cart
                }

                saveCart(); // Save cart to localStorage
                renderCart();
            };

            // Function to update cart quantities
            const updateCart = (productId, delta) => {
                const cartItem = cart.find(item => item.id === productId);

                if (cartItem) {
                    cartItem.quantity += delta;

                    if (cartItem.quantity <= 0) {
                        // Remove item from cart if quantity is zero
                        cart = cart.filter(item => item.id !== productId);
                    }

                    saveCart(); // Save updated cart
                    renderCart();
                }
            };

            // Attach event listeners to filter buttons
            filters.forEach(filter => {
                filter.addEventListener('click', () => {
                    const category = filter.getAttribute('data-filter');
                    renderProducts(category); // Render products based on the filter
                    updateActiveFilter(filter); // Update the active button styling
                });
            });

            // Initial rendering of products and cart
            renderProducts(); // Display all products initially
            renderCart(); // Initialize cart from localStorage

            // Checkout button logic
            const checkoutButton = document.querySelector('.checkOut');
            if (checkoutButton) {
                checkoutButton.addEventListener('click', () => {
                    // Show the custom modal
                    const customModal = document.getElementById('customModal');
                    customModal.style.display = 'block';

                    // Clear the cart after checkout
                    cart = [];
                    saveCart();
                    renderCart();

                    // Close the modal when clicking the close button
                    const closeModalButtons = document.querySelectorAll('.close, .close-modal');
                    closeModalButtons.forEach(button => {
                        button.addEventListener('click', () => {
                            customModal.style.display = 'none';
                        });
                    });

                    // Close the modal when clicking outside the modal content
                    window.addEventListener('click', (event) => {
                        if (event.target === customModal) {
                            customModal.style.display = 'none';
                        }
                    });
                });
            }
        })
        .catch(error => console.error('Error loading products:', error));
});





iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
})
closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
})

    const addDataToHTML = () => {
    // remove datas default from HTML

        // add new datas
        if(products.length > 0) // if has data
        {
            products.forEach(product => {
                let newProduct = document.createElement('div');
                newProduct.dataset.id = product.itemid;
                newProduct.classList.add('item');
                newProduct.innerHTML = 
                `<img src="${product.Image}" alt="">
                <h2>${product.Name}</h2>
                <div class="price">$${product.Price}</div>
                <button class="addCart">Add To Cart</button>`;
                listProductHTML.appendChild(newProduct);
            });
        }
    }
    listProductHTML.addEventListener('click', (event) => {
        let positionClick = event.target;
        if(positionClick.classList.contains('addCart')){
            let id_product = positionClick.parentElement.dataset.id;
            addToCart(id_product);
        }
    })
const addToCart = (product_id) => {
    let positionThisProductInCart = cart.findIndex((value) => value.product_id == product_id);
    if(cart.length <= 0){
        cart = [{
            product_id: product_id,
            quantity: 1
        }];
    }else if(positionThisProductInCart < 0){
        cart.push({
            product_id: product_id,
            quantity: 1
        });
    }else{
        cart[positionThisProductInCart].quantity = cart[positionThisProductInCart].quantity + 1;
    }
    addCartToHTML();
    addCartToMemory();
}
const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
}
const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    if (cart.length > 0) {
        cart.forEach(item => {
            totalQuantity += item.quantity;
            let newItem = document.createElement('div');
            newItem.classList.add('item');
            newItem.dataset.id = item.product_id;

            let positionProduct = products.findIndex(value => value.id == item.product_id);
            let info = products[positionProduct];
            listCartHTML.appendChild(newItem);
            newItem.innerHTML = `
            <div class="image">
                <img src="${info.Image}">
            </div>
            <div class="name">
                ${info.Name}
            </div>
            <div class="totalPrice">$${info.Price * item.quantity}</div>
            <div class="quantity">
                <button class="minus">-</button>
                <span>${item.quantity}</span>
                <button class="plus">+</button>
            </div>
            `;
        });
    }
    iconCartSpan.innerText = totalQuantity;
};

listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains('minus') || positionClick.classList.contains('plus')){
        let product_id = positionClick.parentElement.parentElement.dataset.id;
        let type = 'minus';
        if(positionClick.classList.contains('plus')){
            type = 'plus';
        }
        changeQuantityCart(product_id, type);
    }
})
const changeQuantityCart = (product_id, type) => {
    let positionItemInCart = cart.findIndex((value) => value.product_id == product_id);
    if(positionItemInCart >= 0){
        let info = cart[positionItemInCart];
        switch (type) {
            case 'plus':
                cart[positionItemInCart].quantity = cart[positionItemInCart].quantity + 1;
                break;
        
            default:
                let changeQuantity = cart[positionItemInCart].quantity - 1;
                if (changeQuantity > 0) {
                    cart[positionItemInCart].quantity = changeQuantity;
                }else{
                    cart.splice(positionItemInCart, 1);
                }
                break;
        }
    }
    addCartToHTML();
    addCartToMemory();
}

const initApp = () => {
    // get data product
    fetch('http://localhost:5005/api/menu')
    .then(response => response.json())
    .then(data => {
        products = data;
        addDataToHTML();

        // get data cart from memory
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'));
            addCartToHTML();
        }
        console.log("Products fetched:", products);
    })
}
initApp();


