import { Landing } from "./pages/LandingPage"
import { SignUp } from "./component/SignUp"
import { Dashboard } from "./pages/Dashboard"
import { AddTransaction } from "./pages/AddTransaction"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { EditTransaction } from "./pages/EditTransaction"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/addTransaction" element={<AddTransaction />} />
          <Route path="/edit/:id" element={<EditTransaction />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
