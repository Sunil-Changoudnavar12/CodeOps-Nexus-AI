import "./ProfileMenu.css";
import { useState } from "react";
import { Link } from "react-router-dom";

function ProfileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  // For now false because login system is not ready
  const isLoggedIn = false;

  return (
    <div className="profile-menu">
      <button
        className="profile-btn"
        type="button"
        aria-label="Account menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      >
        {"\uD83D\uDC64"}
      </button>

      {isOpen && (
        <div className="profile-popup">
          {!isLoggedIn ? (
            <>
              <h4>Account</h4>

              <Link to="/login" className="popup-link">
                Login
              </Link>

              <Link to="/SignUp" className="popup-link">
                Signup
              </Link>
            </>
          ) : (
            <>
              <h4>My Profile</h4>

              <Link to="/profile" className="popup-link">
                View Profile
              </Link>

              <Link to="/settings" className="popup-link">
                Settings
              </Link>

              <Link to="/about" className="popup-link">
                About
              </Link>

              <button className="logout-btn">Logout</button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default ProfileMenu;
