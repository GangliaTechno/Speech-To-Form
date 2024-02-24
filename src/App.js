import "./App.css";
import InputForm from "./components/input";
import Navbar from "./components/navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div>
        <h1 class="text-3xl pt-6 font-bold underline font-serif">
          {" "}
          Nurse Triage{" "}
        </h1>
      </div>
      <InputForm />
    </div>
  );
}

export default App;
