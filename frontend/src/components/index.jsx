import Topbar from './layout/Topbar'
import Sidebar from './layout/Sidebar'
// import Login from '../pages/login'

function Layout({ children }) {
  return (
    <div className="app">
      <nav-position>  
             <Topbar />
      </nav-position>
      <div className="app-shell">
        <Sidebar />
        {/* <Login /> */}

        <main className="app-content" role="main">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;
