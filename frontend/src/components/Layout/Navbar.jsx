import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Navbar.css";
import logo from "/images/logo.png";
import cart_icon from "/images/cart.png";
import { logoutUser } from "../../services/authService";
import { isAuthenticated, getUserFromToken } from "../../utils/auth";

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (isAuthenticated()) {
      const userData = getUserFromToken();
      setUser(userData);
    } else {
      setUser(null);
    }
  }, []);

  const handleLogout = () => {
    logoutUser();
  };

  const isLoggedIn = !!user;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="logo" onClick={() => navigate("/")}>
          <img src={logo} alt="Company Logo" style={{ cursor: "pointer" }} />
        </div>

        {/* Navigation Links */}
        <div className="nav-middle">
          <ul className="nav-links">
            {/* Admin Links */}
            {isLoggedIn && user?.role === "admin" && (
              <li>
                <Link to="/adminpanel" className="nav-link">
                  Admin Panel
                </Link>
              </li>
            )}

            {/* Baker Links */}
            {isLoggedIn && user?.role === "baker" && (
              <>
                <li>
                  <Link to="/bkdashboard" className="nav-link">
                    Baker Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/myproducts" className="nav-link">
                    My Products
                  </Link>
                </li>
              </>
            )}

            {/* Customer Links */}
            {isLoggedIn && user?.role === "customer" && (
              <>
                <li>
                  <Link to="/" className="nav-link">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/products" className="nav-link">
                    Products
                  </Link>
                </li>
                <li>
                  <Link to="/my-orders" className="nav-link">
                    My Orders
                  </Link>
                </li>
              </>
            )}

            {/* Common Links for Logged-in and Guests */}
            <li>
              <Link to="/about" className="nav-link">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="nav-link">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="nav-right">
          {isLoggedIn && user?.role === "customer" && (
            <Link to="/cart" className="cart-icon">
              <img src={cart_icon} alt="Cart" />
              {/* <span className="cart-count">0</span> */}
            </Link>
          )}

          {isLoggedIn ? (
            <div className="user-dropdown">
              <span className="user-greeting">Hello, {user?.name}</span>
              <div className="dropdown-content">
                <Link to="/profile">Profile</Link>
                <button onClick={handleLogout}>Logout</button>
              </div>
            </div>
          ) : (
            <Link to="/login" className="login-button">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
