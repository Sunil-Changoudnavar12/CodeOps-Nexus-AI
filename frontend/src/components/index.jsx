import Topbar from './layout/Topbar'
import Sidebar from './layout/Sidebar'

function Layout({ children }) {
  return (
    <div className="app">
      <Topbar />
      <div className="app-shell">
        <Sidebar />
        <main className="app-content" role="main">
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout
