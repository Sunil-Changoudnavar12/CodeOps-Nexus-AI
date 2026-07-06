
import "./CodeReview.css";

function CodeReview() {
  return (
    <div className="code-review-page">

      <div className="review-grid">
        <div className="review-card large-card">
          <div className="card-header">
            <h2>Unified AI Review</h2>
            <span className="success">+42</span>
          </div>

          <div className="code-box">
            <p>async function auth() &#123;</p>
            <p>const user = db.query(</p>
            <p className="danger-line">
              "SELECT * FROM users WHERE id = " + user_id
            </p>
            <p>&#125;</p>
          </div>

          <div className="risk-box">
            <h3>High Risk</h3>
            <p>Potential SQL Injection vulnerability detected in auth.py.</p>
          </div>
        </div>

        <div className="review-card">
          <h2>Issues</h2>

          <div className="issue-item danger">
            <h3>High Risk</h3>
            <p>Vulnerability found in auth.py</p>
            <button>AI Fix Pending Approval</button>
          </div>

          <div className="issue-item warning">
            <h3>Code Smell</h3>
            <p>Duplicate logic found in service file</p>
            <button>View Suggestion</button>
          </div>
        </div>

        <div className="review-card">
          <h2>AI Quality Score</h2>

          <div className="score-circle">
            <h1>94</h1>
          </div>

          <p className="score-text">94/100</p>
          <p className="success">+12 points improved</p>
        </div>

        <div className="review-card large-card">
          <h2>Self-Healing Actions</h2>

          <div className="timeline-item">
            <span></span>
            <p>Bug fixed in order_service.py. New PR created.</p>
          </div>

          <div className="timeline-item">
            <span></span>
            <p>Rollback triggered for checkout-service.</p>
          </div>

          <div className="timeline-item">
            <span></span>
            <p>Infrastructure scaled due to traffic burst.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CodeReview;