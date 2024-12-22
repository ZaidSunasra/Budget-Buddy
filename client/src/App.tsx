import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing"
import { Toaster } from "sonner";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
function App() {
  return (
    <>
      <Toaster position="bottom-right" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element = {<Signup />} />
          <Route path="/dashboard" element = {<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
