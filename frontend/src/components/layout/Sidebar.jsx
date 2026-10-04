import { NavLink } from 'react-router-dom'

function Sidebar() {
    return (
        <aside className="sidebar">
            <ul>

                <li className="sidebar-item">
                    <NavLink to="/" end>
                        📊 Overview
                    </NavLink>
                </li>

                <li className="sidebar-item">
                    <NavLink to="/code-review">
                        📝 Code Review
                    </NavLink>
                </li>

                <li className="sidebar-item">
                    <NavLink to="/cicd-pipeline">
                        🔄 CI/CD Pipeline
                    </NavLink>
                </li>

                <li className="sidebar-item">
                    <NavLink to="/issues">
                        🕵️‍♂️ Issues
                    </NavLink>
                </li>

                <li className="sidebar-item">
                    <NavLink to="/deployments">
                        🚀 Deployments
                    </NavLink>
                </li>

                <li className="sidebar-item">
                    <NavLink to="/analytics">
                        📊 Analytics
                    </NavLink>
                </li>

                <li className="sidebar-item">
                    <NavLink to="/security">
                        🔒 Security
                    </NavLink>
                </li>

                <li className="sidebar-item">
                    <NavLink to="/repositories">
                        📁 Repositories
                    </NavLink>
                </li>

                <li className="sidebar-item">
                    <NavLink to="/settings">
                        ⚙️ Settings
                    </NavLink>
                </li>

            </ul>
        </aside>
    )
}

export default Sidebar