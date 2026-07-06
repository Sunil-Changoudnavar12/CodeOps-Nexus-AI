import { Link } from 'react-router-dom'

function Sidebar() {
    return (
        <aside className="sidebar">


            <ul>
        
                <li class="sidebar-item"><Link to="/">📊Overview</Link></li>
                <li class="sidebar-item"><Link to="/code-review">📝 Code Review</Link></li>
                <li class="sidebar-item"><Link to="/cicd-pipeline">🔄 CI/CD Pipeline</Link></li>
                <li class="sidebar-item"><Link to="/issues">🕵️‍♂️ Issues</Link></li>
                <li class="sidebar-item"><Link to="/deployments">🚀 Deployments</Link></li>
                <li class="sidebar-item"><Link to="/analytics">📊 Analytics</Link></li>
                <li class="sidebar-item"><Link to="/security">🔒 Security</Link></li>
                <li class="sidebar-item"><Link to="/repositories">📁 Repositories</Link></li>
                <li class="sidebar-item"><Link to="/settings">⚙️ Settings</Link></li>
            </ul>
        </aside>
    )
}

export default Sidebar