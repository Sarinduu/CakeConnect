import React, { useEffect, useState } from "react";
import { getMyOrders } from "../services/orderService";
import "../styles/myOrdersStyles.css";

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getMyOrders();
        setOrders(data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const statusSteps = ["pending", "processing", "shipped", "delivered"];

  const renderStatusChart = (status) => (
    <div className="myorders-status-bar">
      {statusSteps.map((step, index) => (
        <div
          key={index}
          className={`myorders-step ${
            statusSteps.indexOf(status) >= index ? "active" : ""
          }`}
        >
          {step}
        </div>
      ))}
    </div>
  );

  if (loading) return <div className="myorders-loading">Loading orders...</div>;

  return (
    <div className="myorders-page">
      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <p className="myorders-empty">You have no orders yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="myorders-card">
            <h3>Order #{order._id}</h3>
            <p>
              <strong>Ordered At:</strong>{" "}
              {new Date(order.orderedAt).toLocaleString()}
            </p>
            <p>
              <strong>Total Price:</strong> LKR{" "}
              {order.totalPrice.toLocaleString()}
            </p>
            <p>
              <strong>Shipping Address:</strong>
              <br />
              {order.shippingAddress.address}, {order.shippingAddress.city},
              <br />
              {order.shippingAddress.postalCode},{" "}
              {order.shippingAddress.country}
            </p>

            {order.bakerOrders.map((bo, i) => (
              <div key={i} className="myorders-baker-section">
                <h4>Baker: {bo.baker.name}</h4>

                {renderStatusChart(bo.status)}

                <div className="myorders-products">
                  {bo.products.map((p, j) => (
                    <div key={j} className="myorders-product-card">
                      <img src={p.product.imageUrl} alt={p.product.name} />
                      <div>
                        <p>{p.product.name}</p>
                        <p>Qty: {p.quantity}</p>
                        <p>Price: LKR {p.price.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p>
                  <strong>Subtotal:</strong> LKR {bo.subtotal.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrdersPage;
