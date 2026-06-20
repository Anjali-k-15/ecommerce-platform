alert("NEW CART JS LOADED");
console.log("CART JS STARTED");

const API_URL = 'http://localhost:5000/api';

const token = localStorage.getItem('token');

async function loadCart() {

    if (!token) {

        alert('Please Login First');
        window.location.href = 'login.html';
        return;

    }

    try {

        const response = await fetch(
            `${API_URL}/cart`,
            {
                headers: {
                    Authorization: token
                }
            }
        );

        const cart = await response.json();

        console.log("CART DATA:", cart);

        const cartItems =
            document.getElementById('cart-items');

        cartItems.innerHTML = '';

        let total = 0;

        cart.forEach(item => {

            total += Number(item.price) * Number(item.quantity);

            cartItems.innerHTML += `
                <tr>

                    <td>${item.name}</td>

                    <td>₹${item.price}</td>

                    <td>

                        <button
                            class="btn btn-danger btn-sm"
                            onclick="decreaseQty(${item.id})">

                            -

                        </button>

                        <span class="mx-2">
                            ${item.quantity}
                        </span>

                        <button
                            class="btn btn-success btn-sm"
                            onclick="increaseQty(${item.id})">

                            +

                        </button>

                    </td>

                    <td>

                        <button
                            class="btn btn-warning btn-sm"
                            onclick="removeItem(${item.id})">

                            ❌ Remove

                        </button>

                    </td>

                </tr>
            `;

        });

        document.getElementById('total').innerHTML =
            `Total Amount: ₹${total}`;

        window.cartTotal = total;

    } catch (error) {

        console.log("ERROR:", error);

    }

}

async function increaseQty(cartId) {

    await fetch(
        `${API_URL}/cart/increase/${cartId}`,
        {
            method: 'PUT',
            headers: {
                Authorization: token
            }
        }
    );

    loadCart();

}

async function decreaseQty(cartId) {

    await fetch(
        `${API_URL}/cart/decrease/${cartId}`,
        {
            method: 'PUT',
            headers: {
                Authorization: token
            }
        }
    );

    loadCart();

}

async function removeItem(cartId) {

    try {

        const response = await fetch(
            `${API_URL}/cart/remove/${cartId}`,
            {
                method: 'DELETE',

                headers: {
                    Authorization: token
                }
            }
        );

        const data = await response.json();

        alert(data.message);

        loadCart();

    } catch (error) {

        console.log(error);

    }

}

function checkout() {

    localStorage.setItem(
        'cartTotal',
        window.cartTotal
    );

    window.location.href =
        'payment.html';

}

loadCart();

