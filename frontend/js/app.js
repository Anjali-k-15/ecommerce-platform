alert("NEW APP JS LOADED");
const API_URL = 'http://localhost:5000/api';

async function loadProducts() {

    try {

        const response = await fetch(`${API_URL}/products`);

        const products = await response.json();

        displayProducts(products);

        const search = document.getElementById('search');

        if (search) {

            search.addEventListener('input', (e) => {

                const filtered = products.filter(product =>
                    product.name.toLowerCase().includes(
                        e.target.value.toLowerCase()
                    )
                );

                displayProducts(filtered);

            });

        }

    } catch (error) {

        console.log(error);

    }

}

function displayProducts(products) {

    const productList =
        document.getElementById('product-list');

    productList.innerHTML = '';

    products.forEach(product => {

        productList.innerHTML += `
        <div class="col-md-4 mb-4">

            <div class="card h-100 shadow">

                <img
                    src="${product.image}"
                    class="card-img-top"
                    alt="${product.name}">

                <div class="card-body d-flex flex-column">

                    <h4>${product.name}</h4>

                    <p>${product.description}</p>

                    <h3 class="text-success">
                        ₹${product.price}
                    </h3>

                    <button
                        class="btn btn-warning mt-auto"
                        onclick="addToCart(${product.id})">

                        Add To Cart

                    </button>

                </div>

            </div>

        </div>
        `;

    });

}

async function addToCart(productId) {

    const token =
        localStorage.getItem('token');

    if (!token) {

        alert('Please Login First');

        window.location.href = 'login.html';

        return;

    }

    try {

        const response =
            await fetch(`${API_URL}/cart/add`, {

                method: 'POST',

                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token
                },

                body: JSON.stringify({
                    product_id: productId,
                    quantity: 1
                })

            });

        const data =
            await response.json();

        showToast(
            data.message || 'Product Added To Cart'
        );

    } catch (error) {

        console.log(error);

    }

}

function showToast(message) {

    const toast =
        document.getElementById('toast');

    if (!toast) {

        alert(message);

        return;

    }

    toast.innerText = message;

    toast.style.display = 'block';

    setTimeout(() => {

        toast.style.display = 'none';

    }, 3000);

}

function logout() {

    localStorage.removeItem('token');

    window.location.href = 'login.html';

}

loadProducts();