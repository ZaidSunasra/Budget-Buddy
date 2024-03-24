import { Landing } from "./pages/LandingPage"
import { SignUp } from "./component/SignUp"
import { Dashboard } from "./pages/Dashboard"
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element = { <SignUp/>} />
          <Route path="/dashboard" element ={ <Dashboard /> } />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
