import "./App.css";
import TriageForm from "./components/triage";
import Navbar from "./components/navbar";
import TransferinForm from "./components/transferin";
import AirwayAssesment from "./components/airwayasses";
import Treatrment from "./components/treatment";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div>
        {/* <h1 class="text-3xl pt-6 font-bold underline font-serif">
          {" "}
          Nurse Triage{" "}
        </h1> */}
      </div>
      {/* <TriageForm/> */}
      {/* <TransferinForm/> */}
      {/* <AirwayAssesment/> */}
      <Treatrment/>
    </div>
  );
}

export default App;
