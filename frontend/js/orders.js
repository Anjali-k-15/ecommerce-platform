const API_URL = 'http://localhost:5000/api';

const token = localStorage.getItem('token');

async function loadOrders() {

    if (!token) {

        alert('Please Login First');
        window.location.href = 'login.html';
        return;

    }

    try {

        const response = await fetch(
            `${API_URL}/orders`,
            {
                headers: {
                    Authorization: token
                }
            }
        );

        const orders = await response.json();

        const container =
            document.getElementById(
                'orders-container'
            );

        container.innerHTML = '';

        if (!orders || orders.length === 0) {

            container.innerHTML = `
                <div class="alert alert-warning text-center">
                    No Orders Found
                </div>
            `;

            return;

        }

        orders.forEach(order => {

            let placed = 'text-secondary';
            let shipped = 'text-secondary';
            let out = 'text-secondary';
            let delivered = 'text-secondary';

            let badgeColor = 'bg-primary';

            if (order.tracking_status === 'Order Placed') {

                placed = 'text-success fw-bold';
                badgeColor = 'bg-primary';

            }

            else if (order.tracking_status === 'Shipped') {

                placed = 'text-success fw-bold';
                shipped = 'text-success fw-bold';
                badgeColor = 'bg-info';

            }

            else if (order.tracking_status === 'Out for Delivery') {

                placed = 'text-success fw-bold';
                shipped = 'text-success fw-bold';
                out = 'text-success fw-bold';
                badgeColor = 'bg-warning text-dark';

            }

            else if (order.tracking_status === 'Delivered') {

                placed = 'text-success fw-bold';
                shipped = 'text-success fw-bold';
                out = 'text-success fw-bold';
                delivered = 'text-success fw-bold';
                badgeColor = 'bg-success';

            }

            container.innerHTML += `

            <div class="card shadow-lg mb-4 border-0">

                <div class="card-header bg-dark text-white">

                    <div class="d-flex justify-content-between">

                        <h5>
                            Order #${order.id}
                        </h5>

                        <h5>
                            ₹${order.total}
                        </h5>

                    </div>

                </div>

                <div class="card-body">

                    <div class="text-center mb-4">

                        <span class="badge ${badgeColor} p-3 fs-5">

                            ${order.tracking_status}

                        </span>

                    </div>

                    <p>
                        <strong>Payment Status:</strong>
                        ${order.status}
                    </p>

                    <hr>

                    <div class="row text-center">

                        <div class="col">

                            <div class="${placed}">
                                📦
                                <br>
                                Order Placed
                            </div>

                        </div>

                        <div class="col">

                            <div class="${shipped}">
                                🚚
                                <br>
                                Shipped
                            </div>

                        </div>

                        <div class="col">

                            <div class="${out}">
                                🏠
                                <br>
                                Out for Delivery
                            </div>

                        </div>

                        <div class="col">

                            <div class="${delivered}">
                                ✅
                                <br>
                                Delivered
                            </div>

                        </div>

                    </div>

                    <hr>

                    <p class="text-muted">

                        Ordered On:
                        ${new Date(
                            order.created_at
                        ).toLocaleString()}

                    </p>

                </div>

            </div>

            `;

        });

    } catch (error) {

        console.log(error);

    }

}

loadOrders();
