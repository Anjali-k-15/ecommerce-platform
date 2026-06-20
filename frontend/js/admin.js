alert("ADMIN JS LOADED");

const API_URL = 'http://localhost:5000/api';

async function loadOrders() {

    try {

        const response =
            await fetch(`${API_URL}/admin/orders`);

        const orders =
            await response.json();

        console.log("ADMIN ORDERS:", orders);

        const table =
            document.getElementById('ordersTable');

        console.log("TABLE:", table);

        table.innerHTML = '';

        if (!orders || orders.length === 0) {

            table.innerHTML = `
                <tr>
                    <td colspan="4" class="text-center">
                        No Orders Found
                    </td>
                </tr>
            `;

            return;

        }

        orders.forEach(order => {

            table.innerHTML += `
                <tr>

                    <td>${order.id}</td>

                    <td>₹${order.total}</td>

                    <td>${order.tracking_status}</td>

                    <td>

                        <select
                            id="status-${order.id}"
                            class="form-select">

                            <option value="Order Placed">
                                Order Placed
                            </option>

                            <option value="Processing" selected>
                                Processing
                            </option>

                            <option value="Shipped">
                                Shipped
                            </option>

                            <option value="Out For Delivery">
                                Out For Delivery
                            </option>

                            <option value="Delivered">
                                Delivered
                            </option>

                        </select>

                        <button
                            class="btn btn-success mt-2"
                            onclick="updateStatus(${order.id})">

                            Update

                        </button>

                    </td>

                </tr>
            `;

        });

    } catch (error) {

        console.log("ADMIN ERROR:", error);

    }

}

async function updateStatus(orderId) {

    const status =
        document.getElementById(
            `status-${orderId}`
        ).value;

    try {

        const response =
            await fetch(
                `${API_URL}/admin/orders/${orderId}`,
                {
                    method: 'PUT',

                    headers: {
                        'Content-Type':
                        'application/json'
                    },

                    body: JSON.stringify({
                        tracking_status: status
                    })
                }
            );

        const data =
            await response.json();

        alert(data.message);

        loadOrders();

    } catch (error) {

        console.log("UPDATE ERROR:", error);

    }

}

loadOrders();