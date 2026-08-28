import Topbar from './layout/Topbar'
import Sidebar from './layout/Sidebar'
// import Login from '../pages/login'

function Layout({ children }) {
  return (
    <div className="app">
      <div className="nav-position">
        <Topbar />
      </div>
      <div className="app-shell">
        <Sidebar />
        <main className="app-content" role="main">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;
