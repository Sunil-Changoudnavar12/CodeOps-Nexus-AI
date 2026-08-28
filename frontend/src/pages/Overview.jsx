function Overview() {
  return (
    <section className="dashboard-page">
      <div className="dashboard-hero page-card">
        <div>
          <p className="eyebrow">Welcome back to CodeOps Nexus AI</p>
          <h1>Insights for your engineering workflow</h1>
          <p className="hero-copy">
            Track releases, review code, monitor security, and stay productive with an AI-first DevOps dashboard.
          </p>
        </div>
        <div className="hero-actions">
          <button className="primary-btn">Create new project</button>
          <button className="secondary-btn">View repo stats</button>
        </div>
      </div>

      <div className="dashboard-grid">
        <section className="metric-card page-card">
          <h2>Active projects</h2>
          <p>12 repositories connected across teams.</p>
          <strong>8 running</strong>
        </section>

        <section className="metric-card page-card">
          <h2>Open issues</h2>
          <p>Track bugs and tasks in your sprint backlog.</p>
          <strong>24 unresolved</strong>
        </section>

        <section className="metric-card page-card">
          <h2>Deployment health</h2>
          <p>Live pipeline status and production readiness.</p>
          <strong>5 pipelines</strong>
        </section>

        <section className="metric-card page-card">
          <h2>Security score</h2>
          <p>Code scans, dependency alerts, and risk trends.</p>
          <strong>92 / 100</strong>
        </section>
      </div>
    </section>
  )
}

export default Overview;