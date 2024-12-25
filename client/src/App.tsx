import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing"
import { Toaster } from "sonner";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import { SidebarProvider } from "./components/ui/sidebar";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Budget from "./pages/Budgeting";
import AddTransaction from "./pages/AddTransaction";
import EditTransaction from "./pages/EditTransaction";

function App() {
  return (
    <>
      <SidebarProvider>
        <Toaster position="bottom-right" />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/budgeting" element={<Budget />} />
            <Route path="/addTransaction" element={<AddTransaction />} />
            <Route path="/editTransaction/:id" element={<EditTransaction />} />
          </Routes>
        </BrowserRouter>
      </SidebarProvider>
    </>
  )
}

export default App
