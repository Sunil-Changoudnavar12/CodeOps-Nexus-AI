# CodeOps AI / Self-Healing AI-CI-CD — Full Project Structure
### Stack: React (Vite) + Flask + PostgreSQL

```
codeops-ai/
│
├── frontend/                                   # React App (Vite)
│   ├── public/
│   │   ├── index.html
│   │   ├── favicon.ico
│   │   └── manifest.json
│   │
│   ├── src/
│   │   ├── api/                                # Axios API layer (calls Flask backend)
│   │   │   ├── axiosConfig.js                  # base URL, interceptors, JWT header attach
│   │   │   ├── authApi.js                      # login, signup, refresh token
│   │   │   ├── pipelineApi.js                  # CI/CD pipeline status calls
│   │   │   ├── issuesApi.js                    # issues list/filter calls
│   │   │   ├── deploymentsApi.js
│   │   │   ├── metricsApi.js                   # AI quality score, MTTR, cycle time
│   │   │   ├── securityApi.js                  # vulnerability scan results
│   │   │   ├── agenticApi.js                   # agent orchestration / infra calls
│   │   │   └── selfHealApi.js                  # self-heal action log
│   │   │
│   │   ├── assets/
│   │   │   ├── images/
│   │   │   └── icons/
│   │   │
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Sidebar.jsx                 # left nav (Overview, Code Review...)
│   │   │   │   ├── Topbar.jsx                  # search, notifications, profile
│   │   │   │   └── Layout.jsx                  # wraps Sidebar+Topbar+page content
│   │   │   │
│   │   │   ├── common/
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Card.jsx
│   │   │   │   ├── Modal.jsx
│   │   │   │   ├── Loader.jsx
│   │   │   │   ├── Badge.jsx                   # High Risk / Medium / Low tags
│   │   │   │   ├── ProgressBar.jsx             # AI Fix Pending Approval bar
│   │   │   │   └── Tooltip.jsx                 # hover tooltip (AI Review Comments)
│   │   │   │
│   │   │   ├── dashboard/                      # Overview page widgets
│   │   │   │   ├── CodeQualityScoreGauge.jsx   # circular 94/100 gauge
│   │   │   │   ├── DeploymentFrequencyCard.jsx
│   │   │   │   ├── ResolutionTimeCard.jsx
│   │   │   │   ├── RollbackEventsCard.jsx
│   │   │   │   └── ChangeFailureRateChart.jsx  # line chart (Recharts)
│   │   │   │
│   │   │   ├── codeReview/
│   │   │   │   ├── CodeDiffViewer.jsx          # +/- line diff view
│   │   │   │   ├── AIReviewCommentCard.jsx     # "Hardcoded JWT secret detected"
│   │   │   │   ├── IssueTabs.jsx               # All / Critical / High / Medium / Low
│   │   │   │   └── VulnerabilityCard.jsx
│   │   │   │
│   │   │   ├── pipeline/
│   │   │   │   ├── PipelineStageTracker.jsx    # Commit->Review->Staging->Prod
│   │   │   │   ├── SelfHealActionLog.jsx       # timestamped self-heal events
│   │   │   │   └── DeploymentStatusBadge.jsx   # Success/Failed/Blocked
│   │   │   │
│   │   │   ├── issues/
│   │   │   │   ├── IssueList.jsx
│   │   │   │   ├── IssueCard.jsx
│   │   │   │   └── IssueFilterTabs.jsx
│   │   │   │
│   │   │   ├── deployments/
│   │   │   │   ├── DeploymentTable.jsx         # frontend/backend/auth/payments rows
│   │   │   │   └── ServicePodStatus.jsx        # pods, image version, usage %
│   │   │   │
│   │   │   ├── analytics/
│   │   │   │   ├── CycleTimeChart.jsx
│   │   │   │   ├── MTTRChart.jsx
│   │   │   │   └── AIReviewScoreTrendChart.jsx
│   │   │   │
│   │   │   ├── security/
│   │   │   │   ├── VulnerabilityScanner.jsx
│   │   │   │   └── SecurityScoreGauge.jsx
│   │   │   │
│   │   │   ├── agentic/
│   │   │   │   ├── AgentOrchestrationPanel.jsx
│   │   │   │   ├── InfrastructureMap.jsx
│   │   │   │   └── AgentStatusCard.jsx
│   │   │   │
│   │   │   └── auth/
│   │   │       ├── LoginForm.jsx
│   │   │       ├── SignupForm.jsx
│   │   │       └── ProtectedRoute.jsx          # route guard wrapper
│   │   │
│   │   ├── context/
│   │   │   ├── AuthContext.jsx                 # global user/token state
│   │   │   └── ThemeContext.jsx                # dark mode (matches UI)
│   │   │
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   ├── usePolling.js                   # auto-refresh every N sec (live feel)
│   │   │   └── useFetch.js
│   │   │
│   │   ├── pages/                              # 1 page = 1 sidebar item
│   │   │   ├── Overview.jsx
│   │   │   ├── CodeReview.jsx
│   │   │   ├── CICDPipelines.jsx
│   │   │   ├── Issues.jsx
│   │   │   ├── Deployments.jsx
│   │   │   ├── Analytics.jsx
│   │   │   ├── Security.jsx
│   │   │   ├── Repositories.jsx
│   │   │   ├── AgenticOrchestration.jsx
│   │   │   ├── InfrastructureManagement.jsx
│   │   │   ├── Settings.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   └── NotFound.jsx
│   │   │
│   │   ├── routes/
│   │   │   └── AppRoutes.jsx                   # react-router-dom route definitions
│   │   │
│   │   ├── styles/
│   │   │   ├── index.css                       # tailwind base import
│   │   │   └── variables.css                   # dark theme color tokens
│   │   │
│   │   ├── utils/
│   │   │   ├── formatDate.js
│   │   │   ├── constants.js                    # risk levels, colors, API base
│   │   │   └── chartHelpers.js
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── config.js                           # env var wrapper
│   │
│   ├── .env                                    # VITE_API_BASE_URL=...
│   ├── .gitignore
│   ├── package.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── vite.config.js
│
│
├── backend/                                    # Flask App
│   ├── app.py                                  # app factory, blueprint registration
│   ├── wsgi.py                                 # entry point for gunicorn/production
│   ├── config.py                               # DevConfig, ProdConfig, DB URI
│   ├── extensions.py                           # db, migrate, jwt, cors init here
│   ├── requirements.txt
│   ├── .env                                    # DATABASE_URL, SECRET_KEY, JWT_SECRET
│   ├── .flaskenv
│   │
│   ├── models/
│   │   ├── __init__.py
│   │   ├── user_model.py                       # User table
│   │   ├── repository_model.py                 # connected repos
│   │   ├── pipeline_model.py                   # pipeline runs, stages
│   │   ├── deployment_model.py                 # deployment records, pods
│   │   ├── issue_model.py                      # code issues (risk/type/file/line)
│   │   ├── metric_model.py                     # quality score, MTTR, cycle time
│   │   ├── self_heal_action_model.py           # AI fix/rollback log
│   │   └── security_scan_model.py              # bandit scan results
│   │
│   ├── routes/                                 # Flask Blueprints (1 file = 1 sidebar item)
│   │   ├── __init__.py
│   │   ├── auth_routes.py                      # /api/auth/login, /signup, /refresh
│   │   ├── overview_routes.py                  # /api/overview
│   │   ├── code_review_routes.py               # /api/code-review
│   │   ├── pipeline_routes.py                  # /api/pipelines
│   │   ├── issues_routes.py                    # /api/issues
│   │   ├── deployments_routes.py               # /api/deployments
│   │   ├── analytics_routes.py                 # /api/analytics
│   │   ├── security_routes.py                  # /api/security
│   │   ├── repositories_routes.py              # /api/repositories
│   │   ├── agentic_routes.py                   # /api/agentic
│   │   └── settings_routes.py                  # /api/settings
│   │
│   ├── services/                               # business logic (kept out of routes)
│   │   ├── __init__.py
│   │   ├── auth_service.py                     # password hash, JWT generation
│   │   ├── code_analysis_service.py            # Bandit + regex vulnerability scan
│   │   ├── self_heal_service.py                # auto-fix / auto-rollback logic
│   │   ├── pipeline_service.py                 # stage transitions, blocking logic
│   │   ├── metrics_service.py                  # score/MTTR/frequency calculations
│   │   ├── llm_service.py                      # LLM API calls (AI comments/roadmap)
│   │   └── notification_service.py             # (optional) alerts/webhooks
│   │
│   ├── schemas/                                # Marshmallow serializers (DB -> JSON)
│   │   ├── __init__.py
│   │   ├── user_schema.py
│   │   ├── issue_schema.py
│   │   ├── pipeline_schema.py
│   │   ├── deployment_schema.py
│   │   └── metric_schema.py
│   │
│   ├── utils/
│   │   ├── __init__.py
│   │   ├── jwt_utils.py
│   │   ├── decorators.py                       # @token_required, @admin_required
│   │   ├── validators.py
│   │   └── response_helpers.py                 # standard success/error JSON format
│   │
│   ├── migrations/                             # auto-generated by Flask-Migrate
│   │
│   ├── seed/
│   │   └── seed_data.py                        # dummy pipelines/issues for demo
│   │
│   └── tests/
│       ├── __init__.py
│       ├── test_auth.py
│       ├── test_pipeline.py
│       ├── test_issues.py
│       └── test_metrics.py
│
│
├── docs/
│   ├── README.md
│   ├── API_DOCUMENTATION.md
│   └── ARCHITECTURE.md
│
├── docker-compose.yml                          # postgres + backend + frontend (optional)
├── .gitignore
└── README.md
```

---

## Quick notes on key files

**backend/app.py** — Flask app factory pattern:
```python
from flask import Flask
from extensions import db, migrate, jwt, cors
from routes.auth_routes import auth_bp
from routes.pipeline_routes import pipeline_bp
# ... other blueprint imports

def create_app():
    app = Flask(__name__)
    app.config.from_object('config.DevConfig')

    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    cors.init_app(app)

    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(pipeline_bp, url_prefix='/api/pipelines')
    # ... register rest

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
```

**Build order (suggested, sequential):**
1. `backend/config.py` + `extensions.py` + PostgreSQL connection → confirm DB connects
2. `models/` → run `flask db init/migrate/upgrade`
3. `seed/seed_data.py` → dummy data so frontend has something to show early
4. `routes/` one blueprint at a time, starting with `auth_routes.py`
5. `frontend/` — layout + sidebar first, then Overview page wired to `/api/overview`
6. Remaining pages one by one, each wired to its matching route
7. `self_heal_service.py` + `code_analysis_service.py` (Bandit) last — most complex logic

**Naming convention followed:** every frontend page maps 1:1 to a backend route file, and every route file maps 1:1 to a service file. Isse interview madhe explain karायला pan easy — "har module independent, testable, ani scalable ahe."













codeops-ai/
│
├── frontend/                                      # React + Vite frontend
│   │
│   ├── public/                                    # Static public files
│   │   ├── favicon.ico
│   │   ├── manifest.json
│   │   ├── robots.txt
│   │   └── logo.png
│   │
│   ├── src/                                       # Main React source code
│   │   │
│   │   ├── api/                                   # Backend API connection
│   │   │   ├── axiosConfig.ts                     # Axios base URL, JWT, interceptors
│   │   │   ├── authApi.ts                         # login, signup, logout
│   │   │   ├── overviewApi.ts                     # dashboard data
│   │   │   ├── repositoryApi.ts                   # repo add/list/delete
│   │   │   ├── codeReviewApi.ts                   # AI code review APIs
│   │   │   ├── issuesApi.ts                       # issues APIs
│   │   │   ├── pipelineApi.ts                     # CI/CD pipeline APIs
│   │   │   ├── deploymentApi.ts                   # deployment APIs
│   │   │   ├── securityApi.ts                     # security scan APIs
│   │   │   ├── analyticsApi.ts                    # charts/metrics APIs
│   │   │   ├── aiAgentApi.ts                      # AI agent APIs
│   │   │   ├── selfHealApi.ts                     # self-healing APIs
│   │   │   ├── notificationApi.ts                 # notification APIs
│   │   │   └── settingsApi.ts                     # user settings APIs
│   │   │
│   │   ├── assets/                                # Images, icons, logos
│   │   │   ├── images/
│   │   │   │   ├── login-bg.png
│   │   │   │   ├── dashboard-preview.png
│   │   │   │   └── empty-state.png
│   │   │   │
│   │   │   └── icons/
│   │   │       ├── github.svg
│   │   │       ├── security.svg
│   │   │       ├── pipeline.svg
│   │   │       ├── ai-agent.svg
│   │   │       └── deployment.svg
│   │   │
│   │   ├── components/                            # Reusable UI components
│   │   │   │
│   │   │   ├── layout/                            # Main layout
│   │   │   │   ├── Sidebar.tsx
│   │   │   │   ├── Topbar.tsx
│   │   │   │   ├── Layout.tsx
│   │   │   │   ├── MobileNavbar.tsx
│   │   │   │   └── PageHeader.tsx
│   │   │   │
│   │   │   ├── common/                            # Common UI
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Card.tsx
│   │   │   │   ├── Modal.tsx
│   │   │   │   ├── Loader.tsx
│   │   │   │   ├── Badge.tsx
│   │   │   │   ├── Input.tsx
│   │   │   │   ├── Select.tsx
│   │   │   │   ├── Table.tsx
│   │   │   │   ├── EmptyState.tsx
│   │   │   │   ├── Toast.tsx
│   │   │   │   ├── Tooltip.tsx
│   │   │   │   ├── ProgressBar.tsx
│   │   │   │   ├── ConfirmDialog.tsx
│   │   │   │   └── Pagination.tsx
│   │   │   │
│   │   │   ├── auth/                              # Auth UI
│   │   │   │   ├── LoginForm.tsx
│   │   │   │   ├── SignupForm.tsx
│   │   │   │   ├── ForgotPasswordForm.tsx
│   │   │   │   └── ProtectedRoute.tsx
│   │   │   │
│   │   │   ├── dashboard/                         # Dashboard widgets
│   │   │   │   ├── StatsCard.tsx
│   │   │   │   ├── CodeQualityScoreGauge.tsx
│   │   │   │   ├── SecurityScoreGauge.tsx
│   │   │   │   ├── DeploymentFrequencyCard.tsx
│   │   │   │   ├── ResolutionTimeCard.tsx
│   │   │   │   ├── RollbackEventsCard.tsx
│   │   │   │   ├── RecentIssuesTable.tsx
│   │   │   │   ├── RecentDeploymentsTable.tsx
│   │   │   │   └── ChangeFailureRateChart.tsx
│   │   │   │
│   │   │   ├── repositories/                      # GitHub repositories
│   │   │   │   ├── RepositoryCard.tsx
│   │   │   │   ├── RepositoryList.tsx
│   │   │   │   ├── AddRepositoryModal.tsx
│   │   │   │   ├── RepositoryFilter.tsx
│   │   │   │   └── RepositoryDetailsPanel.tsx
│   │   │   │
│   │   │   ├── codeReview/                        # AI code review UI
│   │   │   │   ├── CodeUploadBox.tsx
│   │   │   │   ├── CodePasteEditor.tsx
│   │   │   │   ├── CodeDiffViewer.tsx
│   │   │   │   ├── CodeViewer.tsx
│   │   │   │   ├── AIReviewCommentCard.tsx
│   │   │   │   ├── IssueTabs.tsx
│   │   │   │   ├── VulnerabilityCard.tsx
│   │   │   │   ├── ReviewSummaryCard.tsx
│   │   │   │   ├── FixSuggestionBox.tsx
│   │   │   │   └── ScanHistoryTable.tsx
│   │   │   │
│   │   │   ├── issues/                            # Issues page UI
│   │   │   │   ├── IssueList.tsx
│   │   │   │   ├── IssueCard.tsx
│   │   │   │   ├── IssueFilterTabs.tsx
│   │   │   │   ├── IssueSeverityBadge.tsx
│   │   │   │   ├── IssueStatusDropdown.tsx
│   │   │   │   └── IssueDetailsModal.tsx
│   │   │   │
│   │   │   ├── pipeline/                          # CI/CD pipeline UI
│   │   │   │   ├── PipelineStageTracker.tsx
│   │   │   │   ├── PipelineRunCard.tsx
│   │   │   │   ├── PipelineLogsViewer.tsx
│   │   │   │   ├── DeploymentStatusBadge.tsx
│   │   │   │   ├── PipelineBlockReason.tsx
│   │   │   │   └── SelfHealActionLog.tsx
│   │   │   │
│   │   │   ├── deployments/                       # Deployment UI
│   │   │   │   ├── DeploymentTable.tsx
│   │   │   │   ├── DeploymentDetailsModal.tsx
│   │   │   │   ├── ServicePodStatus.tsx
│   │   │   │   ├── EnvironmentBadge.tsx
│   │   │   │   ├── RollbackButton.tsx
│   │   │   │   └── DeploymentTimeline.tsx
│   │   │   │
│   │   │   ├── analytics/                         # Charts
│   │   │   │   ├── CycleTimeChart.tsx
│   │   │   │   ├── MTTRChart.tsx
│   │   │   │   ├── AIReviewScoreTrendChart.tsx
│   │   │   │   ├── IssueSeverityChart.tsx
│   │   │   │   ├── DeploymentTrendChart.tsx
│   │   │   │   └── DeveloperProductivityChart.tsx
│   │   │   │
│   │   │   ├── security/                          # Security UI
│   │   │   │   ├── VulnerabilityScanner.tsx
│   │   │   │   ├── SecurityScoreGauge.tsx
│   │   │   │   ├── SecretDetectionCard.tsx
│   │   │   │   ├── DependencyRiskTable.tsx
│   │   │   │   ├── SecurityChecklist.tsx
│   │   │   │   └── SecurityReportDownload.tsx
│   │   │   │
│   │   │   ├── aiAgent/                           # AI agent UI
│   │   │   │   ├── AgentOrchestrationPanel.tsx
│   │   │   │   ├── AgentStatusCard.tsx
│   │   │   │   ├── AgentDecisionTimeline.tsx
│   │   │   │   ├── InfrastructureMap.tsx
│   │   │   │   ├── AutoFixPreview.tsx
│   │   │   │   └── HumanApprovalPanel.tsx
│   │   │   │
│   │   │   └── settings/                          # Settings UI
│   │   │       ├── ProfileSettings.tsx
│   │   │       ├── AccountSettings.tsx
│   │   │       ├── ThemeSettings.tsx
│   │   │       ├── NotificationSettings.tsx
│   │   │       ├── GithubSettings.tsx
│   │   │       └── ApiKeySettings.tsx
│   │   │
│   │   ├── context/                               # Global state
│   │   │   ├── AuthContext.tsx
│   │   │   ├── ThemeContext.tsx
│   │   │   ├── NotificationContext.tsx
│   │   │   └── AppContext.tsx
│   │   │
│   │   ├── hooks/                                 # Custom hooks
│   │   │   ├── useAuth.ts
│   │   │   ├── useFetch.ts
│   │   │   ├── usePolling.ts
│   │   │   ├── useDebounce.ts
│   │   │   ├── useLocalStorage.ts
│   │   │   ├── useTheme.ts
│   │   │   └── useToast.ts
│   │   │
│   │   ├── pages/                                 # Main pages
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Overview.tsx
│   │   │   ├── Repositories.tsx
│   │   │   ├── PRDetails.tsx
│   │   │   ├── CodeReview.tsx
│   │   │   ├── Issues.tsx
│   │   │   ├── CICDPipelines.tsx
│   │   │   ├── Deployments.tsx
│   │   │   ├── Analytics.tsx
│   │   │   ├── Security.tsx
│   │   │   ├── AIAgent.tsx
│   │   │   ├── Infrastructure.tsx
│   │   │   ├── Settings.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── Signup.tsx
│   │   │   ├── ForgotPassword.tsx
│   │   │   └── NotFound.tsx
│   │   │
│   │   ├── routes/                                # App routing
│   │   │   ├── AppRoutes.tsx
│   │   │   ├── PrivateRoutes.tsx
│   │   │   └── routeConstants.ts
│   │   │
│   │   ├── styles/                                # CSS files
│   │   │   ├── index.css
│   │   │   ├── variables.css
│   │   │   ├── layout.css
│   │   │   ├── dashboard.css
│   │   │   ├── components.css
│   │   │   └── responsive.css
│   │   │
│   │   ├── types/                                 # TypeScript types
│   │   │   ├── user.types.ts
│   │   │   ├── repo.types.ts
│   │   │   ├── pr.types.ts
│   │   │   ├── review.types.ts
│   │   │   ├── issue.types.ts
│   │   │   ├── deployment.types.ts
│   │   │   ├── pipeline.types.ts
│   │   │   └── api.types.ts
│   │   │
│   │   ├── utils/                                 # Helper functions
│   │   │   ├── constants.ts
│   │   │   ├── formatDate.ts
│   │   │   ├── formatNumber.ts
│   │   │   ├── chartHelpers.ts
│   │   │   ├── tokenHelpers.ts
│   │   │   ├── validationHelpers.ts
│   │   │   └── riskHelpers.ts
│   │   │
│   │   ├── data/                                  # Temporary dummy data
│   │   │   ├── mockIssues.ts
│   │   │   ├── mockPipelines.ts
│   │   │   ├── mockDeployments.ts
│   │   │   ├── mockMetrics.ts
│   │   │   └── mockRepositories.ts
│   │   │
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── config.ts
│   │
│   ├── index.html
│   ├── .env
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── Dockerfile
│
│
├── backend/                                       # Flask backend API
│   │
│   ├── app/
│   │   ├── __init__.py                            # Flask app factory
│   │   ├── main.py                                # App entry point
│   │   ├── config.py                              # App config
│   │   ├── database.py                            # DB connection
│   │   ├── extensions.py                          # db, migrate, jwt, cors
│   │   │
│   │   ├── api/                                   # API route registration
│   │   │   ├── __init__.py
│   │   │   ├── auth.py                            # /api/auth
│   │   │   ├── overview.py                        # /api/overview
│   │   │   ├── repositories.py                    # /api/repositories
│   │   │   ├── pull_requests.py                   # /api/pr
│   │   │   ├── review.py                          # /api/review
│   │   │   ├── issues.py                          # /api/issues
│   │   │   ├── pipeline.py                        # /api/pipeline
│   │   │   ├── deploy.py                          # /api/deploy
│   │   │   ├── github.py                          # /api/github
│   │   │   ├── logs.py                            # /api/logs
│   │   │   ├── analytics.py                       # /api/analytics
│   │   │   ├── security.py                        # /api/security
│   │   │   ├── ai_agent.py                        # /api/ai-agent
│   │   │   ├── self_heal.py                       # /api/self-heal
│   │   │   ├── notifications.py                   # /api/notifications
│   │   │   └── settings.py                        # /api/settings
│   │   │
│   │   ├── models/                                # Database models
│   │   │   ├── __init__.py
│   │   │   ├── user.py
│   │   │   ├── repository.py
│   │   │   ├── pull_request.py
│   │   │   ├── code_scan.py
│   │   │   ├── issue.py
│   │   │   ├── pipeline.py
│   │   │   ├── pipeline_stage.py
│   │   │   ├── deployment.py
│   │   │   ├── metric.py
│   │   │   ├── security_scan.py
│   │   │   ├── self_heal_action.py
│   │   │   ├── agent_action.py
│   │   │   ├── notification.py
│   │   │   └── audit_log.py
│   │   │
│   │   ├── schemas/                               # Request/response schemas
│   │   │   ├── __init__.py
│   │   │   ├── auth_schema.py
│   │   │   ├── user_schema.py
│   │   │   ├── repository_schema.py
│   │   │   ├── pull_request_schema.py
│   │   │   ├── code_scan_schema.py
│   │   │   ├── issue_schema.py
│   │   │   ├── pipeline_schema.py
│   │   │   ├── deployment_schema.py
│   │   │   ├── metric_schema.py
│   │   │   ├── security_scan_schema.py
│   │   │   ├── agent_action_schema.py
│   │   │   └── notification_schema.py
│   │   │
│   │   ├── services/                              # Business logic
│   │   │   ├── __init__.py
│   │   │   ├── auth_service.py
│   │   │   ├── repository_service.py
│   │   │   ├── github_service.py
│   │   │   ├── pull_request_service.py
│   │   │   ├── review_service.py
│   │   │   ├── code_analysis_service.py
│   │   │   ├── issue_service.py
│   │   │   ├── pipeline_service.py
│   │   │   ├── deploy_service.py
│   │   │   ├── log_service.py
│   │   │   ├── analytics_service.py
│   │   │   ├── security_service.py
│   │   │   ├── ai_agent_service.py
│   │   │   ├── self_heal_service.py
│   │   │   ├── notification_service.py
│   │   │   └── report_service.py
│   │   │
│   │   ├── scanners/                              # Static code/security scanners
│   │   │   ├── __init__.py
│   │   │   ├── python_scanner.py
│   │   │   ├── javascript_scanner.py
│   │   │   ├── typescript_scanner.py
│   │   │   ├── secret_scanner.py
│   │   │   ├── dependency_scanner.py
│   │   │   ├── dockerfile_scanner.py
│   │   │   ├── yaml_scanner.py
│   │   │   └── rules/
│   │   │       ├── python_rules.json
│   │   │       ├── javascript_rules.json
│   │   │       ├── typescript_rules.json
│   │   │       ├── secret_patterns.json
│   │   │       ├── docker_rules.json
│   │   │       └── yaml_rules.json
│   │   │
│   │   ├── utils/                                 # Helper functions
│   │   │   ├── __init__.py
│   │   │   ├── jwt_utils.py
│   │   │   ├── decorators.py
│   │   │   ├── validators.py
│   │   │   ├── response_helpers.py
│   │   │   ├── file_helpers.py
│   │   │   ├── date_helpers.py
│   │   │   ├── score_helpers.py
│   │   │   ├── logger.py
│   │   │   └── error_handlers.py
│   │   │
│   │   ├── dependencies/                          # Shared dependencies
│   │   │   ├── __init__.py
│   │   │   ├── auth_dependency.py
│   │   │   ├── db_dependency.py
│   │   │   └── role_dependency.py
│   │   │
│   │   ├── jobs/                                  # Background jobs
│   │   │   ├── __init__.py
│   │   │   ├── scan_job.py
│   │   │   ├── review_job.py
│   │   │   ├── pipeline_job.py
│   │   │   ├── deploy_job.py
│   │   │   ├── self_heal_job.py
│   │   │   └── notification_job.py
│   │   │
│   │   └── seed/                                  # Demo data
│   │       ├── __init__.py
│   │       ├── seed_data.py
│   │       ├── seed_users.py
│   │       ├── seed_repositories.py
│   │       ├── seed_issues.py
│   │       ├── seed_pipelines.py
│   │       ├── seed_deployments.py
│   │       └── seed_metrics.py
│   │
│   ├── migrations/                                # Flask-Migrate files
│   │   └── versions/
│   │
│   ├── uploads/                                   # Temporary uploaded code files
│   │   ├── .gitkeep
│   │   └── temp/
│   │       └── .gitkeep
│   │
│   ├── reports/                                   # Generated reports
│   │   ├── .gitkeep
│   │   ├── pdf/
│   │   │   └── .gitkeep
│   │   └── json/
│   │       └── .gitkeep
│   │
│   ├── tests/                                     # Backend tests
│   │   ├── __init__.py
│   │   ├── conftest.py
│   │   ├── test_auth.py
│   │   ├── test_repositories.py
│   │   ├── test_github.py
│   │   ├── test_code_review.py
│   │   ├── test_issues.py
│   │   ├── test_pipeline.py
│   │   ├── test_deployments.py
│   │   ├── test_security.py
│   │   └── test_ai_agent.py
│   │
│   ├── instance/                                  # Local SQLite DB, not pushed
│   │   └── codeops_ai.db
│   │
│   ├── wsgi.py                                    # Production entry
│   ├── requirements.txt
│   ├── .env
│   ├── .env.example
│   ├── .flaskenv
│   ├── Dockerfile
│   └── README.md
│
│
├── ai-engine/                                     # Advanced AI brain
│   │
│   ├── llm/                                       # LLM connection
│   │   ├── __init__.py
│   │   ├── openai_client.py
│   │   ├── gemini_client.py
│   │   ├── llm_router.py                          # choose OpenAI/Gemini/local model
│   │   └── prompt_templates.py
│   │
│   ├── analyzers/                                 # AI analyzers
│   │   ├── __init__.py
│   │   ├── bug_detector.py
│   │   ├── security_scan.py
│   │   ├── code_quality.py
│   │   ├── performance_analyzer.py
│   │   ├── architecture_analyzer.py
│   │   └── test_case_generator.py
│   │
│   ├── rag/                                       # RAG system
│   │   ├── __init__.py
│   │   ├── embeddings.py
│   │   ├── retriever.py
│   │   ├── vector_store.py
│   │   ├── document_loader.py
│   │   └── chunking.py
│   │
│   ├── agents/                                    # AI agents
│   │   ├── __init__.py
│   │   ├── review_agent.py
│   │   ├── security_agent.py
│   │   ├── devops_agent.py
│   │   ├── rollback_agent.py
│   │   ├── report_agent.py
│   │   └── planner_agent.py
│   │
│   ├── prompts/                                   # Prompt files
│   │   ├── code_review_prompt.txt
│   │   ├── security_prompt.txt
│   │   ├── bug_fix_prompt.txt
│   │   ├── devops_prompt.txt
│   │   └── report_prompt.txt
│   │
│   ├── evaluation/                                # AI output testing
│   │   ├── eval_reviews.py
│   │   ├── eval_security.py
│   │   └── sample_cases.json
│   │
│   ├── orchestrator.py                            # Main AI controller
│   ├── config.py
│   └── README.md
│
│
├── devops-engine/                                 # CI/CD and deployment logic
│   │
│   ├── ci/                                        # Continuous integration
│   │   ├── __init__.py
│   │   ├── test_runner.py
│   │   ├── lint_runner.py
│   │   ├── build.py
│   │   └── quality_gate.py
│   │
│   ├── cd/                                        # Continuous deployment
│   │   ├── __init__.py
│   │   ├── deploy_docker.py
│   │   ├── deploy_k8s.py
│   │   ├── rollback.py
│   │   ├── health_check.py
│   │   └── environment_manager.py
│   │
│   ├── monitor/                                   # Logs/alerts
│   │   ├── __init__.py
│   │   ├── log_collector.py
│   │   ├── log_analyzer.py
│   │   ├── metric_collector.py
│   │   ├── alert.py
│   │   └── incident_detector.py
│   │
│   ├── self_healing/                              # Auto fix/rollback
│   │   ├── __init__.py
│   │   ├── failure_detector.py
│   │   ├── rollback_manager.py
│   │   ├── restart_service.py
│   │   └── recovery_plan.py
│   │
│   ├── orchestrator.py
│   ├── config.py
│   └── README.md
│
│
├── worker/                                        # Background task worker
│   │
│   ├── worker.py                                  # Worker entry
│   ├── queue.py                                   # Redis/Celery queue config
│   ├── scheduler.py                               # Scheduled jobs
│   │
│   ├── tasks/
│   │   ├── __init__.py
│   │   ├── review_task.py
│   │   ├── deploy_task.py
│   │   ├── test_task.py
│   │   ├── log_task.py
│   │   ├── security_task.py
│   │   ├── report_task.py
│   │   └── self_heal_task.py
│   │
│   ├── requirements.txt
│   ├── Dockerfile
│   └── README.md
│
│
├── database/                                      # DB scripts
│   ├── init.sql
│   ├── seed.sql
│   ├── schema.sql
│   ├── indexes.sql
│   ├── migrations/
│   │   └── README.md
│   └── backup/
│       └── .gitkeep
│
│
├── cache/                                         # Redis config
│   ├── redis.conf
│   └── README.md
│
│
├── vector-db/                                     # Vector DB config
│   ├── config.yaml
│   ├── qdrant_config.yaml
│   ├── pinecone_config.yaml
│   └── README.md
│
│
├── github-integration/                            # GitHub integration
│   │
│   ├── actions/
│   │   ├── review.yml                             # AI review action
│   │   ├── security-scan.yml                      # security scan action
│   │   └── deploy.yml                             # deployment action
│   │
│   ├── webhooks/
│   │   ├── github_webhook_handler.py
│   │   ├── pull_request_handler.py
│   │   ├── push_handler.py
│   │   └── deployment_handler.py
│   │
│   ├── templates/
│   │   ├── pr_comment_template.md
│   │   ├── issue_template.md
│   │   └── security_report_template.md
│   │
│   └── README.md
│
│
├── infra/                                         # Infrastructure setup
│   │
│   ├── docker-compose.yml                         # full local setup
│   │
│   ├── Dockerfiles/
│   │   ├── backend.Dockerfile
│   │   ├── frontend.Dockerfile
│   │   ├── worker.Dockerfile
│   │   ├── ai-engine.Dockerfile
│   │   └── nginx.Dockerfile
│   │
│   ├── nginx/
│   │   ├── nginx.conf
│   │   └── default.conf
│   │
│   ├── k8s/                                       # Kubernetes files
│   │   ├── namespace.yaml
│   │   ├── backend-deployment.yaml
│   │   ├── backend-service.yaml
│   │   ├── frontend-deployment.yaml
│   │   ├── frontend-service.yaml
│   │   ├── worker-deployment.yaml
│   │   ├── redis.yaml
│   │   ├── postgres.yaml
│   │   ├── qdrant.yaml
│   │   ├── ingress.yaml
│   │   └── secrets.yaml
│   │
│   └── terraform/                                 # Future cloud infra
│       ├── main.tf
│       ├── variables.tf
│       ├── outputs.tf
│       └── provider.tf
│
│
├── monitoring/                                    # Monitoring setup
│   │
│   ├── prometheus.yml
│   ├── alerts.yml
│   │
│   ├── grafana/
│   │   ├── dashboards/
│   │   │   ├── app-dashboard.json
│   │   │   ├── devops-dashboard.json
│   │   │   └── security-dashboard.json
│   │   │
│   │   └── provisioning/
│   │       ├── dashboards.yml
│   │       └── datasources.yml
│   │
│   ├── logs/
│   │   └── .gitkeep
│   │
│   └── README.md
│
│
├── docs/                                          # Documentation
│   │
│   ├── README.md
│   ├── PROJECT_OVERVIEW.md
│   ├── ARCHITECTURE.md
│   ├── SYSTEM_DESIGN.md
│   ├── DATABASE_SCHEMA.md
│   ├── API_DOCUMENTATION.md
│   ├── FRONTEND_STRUCTURE.md
│   ├── BACKEND_STRUCTURE.md
│   ├── AI_ENGINE.md
│   ├── DEVOPS_ENGINE.md
│   ├── SECURITY_DESIGN.md
│   ├── GITHUB_INTEGRATION.md
│   ├── SETUP_GUIDE.md
│   ├── DEPLOYMENT_GUIDE.md
│   ├── TESTING_GUIDE.md
│   ├── CONTRIBUTING.md
│   └── PROJECT_REPORT.md
│
│
├── scripts/                                       # Useful scripts
│   │
│   ├── setup_backend.sh
│   ├── setup_frontend.sh
│   ├── setup_ai_engine.sh
│   ├── run_backend.sh
│   ├── run_frontend.sh
│   ├── run_worker.sh
│   ├── seed_database.py
│   ├── reset_database.py
│   ├── run_tests.sh
│   ├── docker_build.sh
│   ├── docker_up.sh
│   ├── docker_down.sh
│   └── deploy.sh
│
│
├── tests/                                         # Full project tests
│   │
│   ├── integration/
│   │   ├── test_auth_flow.py
│   │   ├── test_review_flow.py
│   │   ├── test_deployment_flow.py
│   │   └── test_github_webhook_flow.py
│   │
│   ├── e2e/
│   │   ├── login.spec.ts
│   │   ├── dashboard.spec.ts
│   │   ├── code-review.spec.ts
│   │   └── deployment.spec.ts
│   │
│   └── README.md
│
│
├── .github/                                       # GitHub Actions
│   └── workflows/
│       ├── backend-tests.yml
│       ├── frontend-build.yml
│       ├── ai-engine-tests.yml
│       ├── security-scan.yml
│       ├── docker-build.yml
│       └── deploy.yml
│
│
├── docker/                                        # Simple Docker files
│   ├── backend.Dockerfile
│   ├── frontend.Dockerfile
│   ├── worker.Dockerfile
│   ├── ai-engine.Dockerfile
│   └── nginx.conf
│
│
├── logs/                                          # Local logs
│   ├── backend.log
│   ├── worker.log
│   ├── ai-engine.log
│   └── .gitkeep
│
│
├── .env                                           # Main env, do not push
├── .env.example                                   # Example env
├── .gitignore
├── docker-compose.yml                             # Simple local compose
├── Makefile                                       # One-command setup/run/test
├── README.md                                      # Main GitHub README
├── LICENSE
└── CONTRIBUTING.md