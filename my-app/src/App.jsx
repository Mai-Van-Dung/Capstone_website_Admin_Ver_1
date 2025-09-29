
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './routers/AppRouter'
import '@fortawesome/fontawesome-free/css/all.min.css'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  )
}

export default App
