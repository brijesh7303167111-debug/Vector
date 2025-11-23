import Navbar from "./Universal/Navbar"
import Sidebar from "./Universal/Sidebar"
import Footer from "./Universal/Footer"
function App() {
  
  return (
    <h1 class="text-3xl text-amber-500 font-bold underline">
    Hello world!
    <Navbar/>
    
    <Sidebar/>
    <Footer/>
  </h1>
  )
}

export default App
