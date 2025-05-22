import { Button } from "@/components/ui/button"
import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"

function App() {
  return (
    <>
    <Navbar />
    <Sidebar/>
    <div className="flex flex-col items-center justify-center min-h-svh">
      <Button>Click me</Button>
    </div> 
    </>
  )
}

export default App
