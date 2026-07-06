import { BrowserRouter } from 'react-router-dom'
import Layout from './components'
import Approute from './route/Approute'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Approute />
      </Layout>
    </BrowserRouter>
  )
}

export default App