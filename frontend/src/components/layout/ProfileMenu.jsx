import "./ProfileMenu.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuthSession, isAuthenticated, logout } from "../../api/auth";

function ProfileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [session, setSession] = useState(getAuthSession());
  const navigate = useNavigate();

  const isLoggedIn = isAuthenticated();

  useEffect(() => {
    const syncSession = () => setSession(getAuthSession());

    window.addEventListener("auth-change", syncSession);
    window.addEventListener("storage", syncSession);

    return () => {
      window.removeEventListener("auth-change", syncSession);
      window.removeEventListener("storage", syncSession);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate("/login");
  };

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
              <h4>{session?.user?.username || "My Profile"}</h4>

              <Link to="/profile" className="popup-link">
                View Profile
              </Link>

              <Link to="/settings" className="popup-link">
                Settings
              </Link>

              <Link to="/about" className="popup-link">
                About
              </Link>

              <button className="logout-btn" type="button" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default ProfileMenu;
