import ProfileMenu from "./ProfileMenu";
import { Link } from 'react-router-dom'

function Topbar() {
  return (
    <nav className="navbar">
      <Link to="/Overview" className="navbar-brand">
        <h2>CodeOps Nexus AI</h2>
      </Link>

      <div className="navbar-right">
        <input
          type="text"
          placeholder="Search..."
          className="topbar-search"
        />
        <button className="topbar-icon" aria-label="Notifications">
          {"\uD83D\uDD14"}
        </button>
        <button className="topbar-icon" aria-label="Toggle theme">
          {"\uD83C\uDF19"}
        </button>
        <ProfileMenu />
      </div>
    </nav>
  )
}

export default Topbar;
