import "../styles/App.css";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Sidebar />
      <div>
        <Home />
      </div>
    </div>
  );
}

export default App;
