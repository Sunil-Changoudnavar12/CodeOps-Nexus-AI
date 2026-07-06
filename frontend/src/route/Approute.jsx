import { Routes, Route } from 'react-router-dom'

import Overview from '../pages/Overview'
import CICD_Pipeline from '../pages/CICD_Pipeline'
import Issues from '../pages/Issues'
import Analytics from '../pages/Analytics'
import CodeReview from '../pages/CodeReview'
import Repositories from '../pages/Repositories'
import Deployments from '../pages/Deployments'
import Settings from '../pages/Settings'
import Security from '../pages/Security'

function Approute() {
  return (
    <Routes>
      <Route path="/" element={<Overview />} />
      <Route path="/cicd-pipeline" element={<CICD_Pipeline />} />
      <Route path="/issues" element={<Issues />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/code-review" element={<CodeReview />} />
      <Route path="/repositories" element={<Repositories />} />
      <Route path="/deployments" element={<Deployments />} />
      <Route path="/security" element={<Security />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  )
}

export default Approute