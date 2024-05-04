import React from "react";

const BreathingVentilationAssesment = () => {
  let stopRecording = false;
  const handleStartRecording = (section) => {
    // Set the section property
    console.log("Section:", section);

    // Call the function to send data to backend
    sendDataToBackend(section);
  };

  const handleStopRecording = () => {
    fetch("http://localhost:5000/stop_recording", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Received response from backend:", data);
        stopRecording = true;
        console.log("received response from stop recodirng");

        const geminiResponse = data.gemini_response;
        if (geminiResponse) {
          const triageid_html = document.getElementById("triageid");
          const namegivenatTriage_html =
            document.getElementById("namegivenatTriage");
          const massCasualtySelect_html =
            document.getElementById("massCasualtySelect");
          const no_of_patients_html = document.getElementById("no_of_patients");
          const age_html = document.getElementById("age");
          const maritialStatus_html = document.getElementById("maritialStatus");
          const address_html = document.getElementById("address");
          const gender_html = document.getElementById("gender");

          triageid_html.value = geminiResponse["Triage_Id"];
          namegivenatTriage_html.value =
            geminiResponse["Name_given_at_the_Triage"];
          massCasualtySelect_html.selectedIndex =
            parseInt(
              geminiResponse["Is_the_patient_a_victim_of_mass_casualty"]
            ) + 1;
          no_of_patients_html.value = parseInt(
            geminiResponse["Number_of_patients_affected_in_the_same_incident"]
          );
          age_html.value = parseInt(geminiResponse["Age"]);
          maritialStatus_html.selectedIndex =
            parseInt(geminiResponse["Maritial_Status"]) + 1;
          address_html.value = geminiResponse["Address"];
          gender_html.selectedIndex = parseInt(geminiResponse["Gender"]) + 1;
        } else {
          console.log("Not received the response");
        }
      })
      .catch((error) => console.error("Error stopping recording:", error));
  };

  const sendDataToBackend = (section) => {
    // Send data to backend
    fetch("http://localhost:5000/start_recording", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ additional_variable: section }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        stopRecording = false;
      })
      .catch((error) => console.error("Error starting recording:", error));
  };

  return (
    // <div>
    <div className="block items-center justify-center h-screen p-8 ">
      <div
        className="border-2 border-cyan-700 pt-3 pb-4 rounded-3xl shadow-lg shadow-sky-900 "
        style={{
          background:
            "linear-gradient(to right, rgb(127, 161, 255,0.7), rgb(176, 195, 250,0.7))",
        }}
      >
        <h1 class="text-1xl pt-6 font-bold underline font-serif">
          {" "}
          Breathing And Ventilation Assesment{" "}
        </h1>
        <div className=" block  xl:flex justify-center   space-x-12 pt-8 ">
          <div className="mb-4">
            <label
              htmlFor="actiontoken"
              className=" block xl:flex text-gray-700 text-sm font-bold mb-2 w-72"
            >
              Respiratory Rate RPM
            </label>
            <input
              className="shadow appearance-none border rounded w-72 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="actiontoken"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="breathingpattern"
              className="flex text-gray-700 text-sm font-bold mb-2 w-72"
            >
              Breathing Pattern
            </label>
            <select
              id="difficultairway"
              className="block appearance-none w-72 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
              <option value="selectoption">Select Option</option>
              <option value="Eupnea">Eupnea</option>
              <option value="Bradypnea">Bradypnea</option>
              <option value="Tachypnea"> Tachypnea </option>
              <option value="Hyperpnea">Hyperpnea</option>
              <option value="Cheyne-Stoke's"> Cheyne-Stoke's </option>
              <option value="Biot's">Biot's</option>
              <option value="Apneustic"> Apneustic </option>
              <option value="Agonal">Agonal</option>
              <option value="Kussmaul's"> Kussmaul's </option>
              <option value="Central Nuerogenic"> Central Nuerogenic </option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="trachealposition "
              className="flex text-gray-700 text-sm font-bold mb-2 w-72"
            >
              Tracheal Position
            </label>
            <select
              id="trachealposition"
              className="block appearance-none w-72 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
              <option value="selectoption">Select Option</option>
              <option value="Central">Central</option>
              <option value="Deviated To Right">Deviated To Right</option>
              <option value="Deviated To Left ">Deviated To Left </option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="percussion"
              className="flex text-gray-700 text-sm font-bold mb-2 w-80"
            >
              Percussion
            </label>
            <select
              id="percussion"
              className="block appearance-none w-80 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
              <option value="selectoption">Select Option</option>
              <option value="Normal Resonence Bilateral">
                Normal Resonence Bilateral
              </option>
              <option value="Hyperresonnence Right">
                Hyperresonnence Right
              </option>
              <option value="Hyperresonnence Left">Hyperresonnence Left</option>
              <option value="Impaired Resonence Right">
                Impaired Resonence Right
              </option>
              <option value="Impaired Resonence Left">
                Impaired Resonence Left
              </option>
              <option value="Stony Dulliness Right">
                Stony Dulliness Right
              </option>
              <option value="Stony Dulliness Lef">Stony Dulliness Left</option>
            </select>
          </div>
        </div>
        <div className=" block xl:flex  justify-center   space-x-12 pt-8 ">
          <div className="mb-4">
            <label
              htmlFor=" airentry"
              className="flex text-gray-700 text-sm font-bold mb-2 w-36"
            >
              Air Entry
            </label>
            <select
              id="airentry"
              className="block appearance-none w-44 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
              <option value="selectoption">Select Option</option>
              <option value="Normal Bilateral">Normal Bilateral </option>
              <option value="Decreaded in Right ">Decreaded in Right </option>
              <option value="Decreaded in Left">Decreaded in Left</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="breathsounds"
              className="flex text-gray-700 text-sm font-bold mb-2 w-44"
            >
              Breathsounds
            </label>
            <select
              id="breathsounds"
              className="block appearance-none w-44 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
              <option value="selectoption">Select Option</option>
              <option value="Normal Vescicular">Normal Vescicular</option>
              <option value="Bronchial Right">Bronchial Right</option>
              <option value="Bronchial Left">Bronchial Left</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="rhochi"
              className="flex text-gray-700 text-sm font-bold mb-2 w-44"
            >
              Rhochi
            </label>
            <select
              id="rhochi"
              className="block appearance-none w-44 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
              <option value="selectoption">Select Option</option>
              <option value="Bilateral">Bilateral</option>
              <option value="Unilateral Right">Unilateral Right</option>
              <option value="Unilateral Left">Unilateral Left</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="crepitaitons"
              className="flex text-gray-700 text-sm font-bold mb-2 w-44"
            >
              Crepitaitons
            </label>
            <select
              id="crepitaitons"
              className="block appearance-none w-44 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
              <option value="selectoption">Select Option</option>
              <option value="Bilateral">Bilateral</option>
              <option value="Unilateral Right">Unilateral Right</option>
              <option value="Unilateral Left">Unilateral Left</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="pieuralrub"
              className="flex text-gray-700 text-sm font-bold mb-2 w-44"
            >
              Pieural Rub
            </label>
            <select
              id="pieuralrub"
              className="block appearance-none w-44 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
              <option value="selectoption">Select Option</option>
              <option value="Bilateral">Bilateral</option>
              <option value="Unilateral Right">Unilateral Right</option>
              <option value="Unilateral Left">Unilateral Left</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="chestwallmovements"
              className="flex text-gray-700 text-sm font-bold mb-2 w-56"
            >
              Chest Wall Movements
            </label>
            <select
              id="chestwallmovements"
              className="block appearance-none w-56 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
              <option value="selectoption">Select Option</option>
              <option value="Normal Bilaterally">Normal Bilaterally</option>
              <option value="Decreased In Rightside">
                Decreased In Right Side
              </option>
              <option value="Decreased In Left Side">
                Decreased In Left Side
              </option>
              <option value="Decreased Bilaterally">
                Decreased Bilaterally
              </option>
            </select>
          </div>
        </div>
        <div className="  block xl:flex justify-center   space-x-12 pt-8 ">
          <div className="mb-4">
            <label
              htmlFor="actiontoken"
              className="flex text-gray-700 text-sm font-bold mb-2 w-72"
            >
              Single Breath Count
            </label>
            <input
              className="shadow appearance-none border rounded w-72 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="actiontoken"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="actiontoken"
              className="flex text-gray-700 text-sm font-bold mb-2 w-72"
            >
              Peak Expiratory Flow Rate
            </label>
            <input
              className="shadow appearance-none border rounded w-72 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="actiontoken"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="actiontoken"
              className="flex text-gray-700 text-sm font-bold mb-2 w-72"
            >
              SP02
            </label>
            <input
              className="shadow appearance-none border rounded w-72 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="actiontoken"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="actiontoken"
              className="flex text-gray-700 text-sm font-bold mb-2 w-72"
            >
              FTCO2
            </label>
            <input
              className="shadow appearance-none border rounded w-72 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="actiontoken"
            />
          </div>
        </div>

        <div className="button flex justify-center  pt-8 text-sm font-bold  pl-9 ">
          <button
            id="startRecordingButton5"
            onClick={() => handleStartRecording(5)}
            className="w-40 h-14 bg-blue-500 rounded-2xl mr-4"
          >
            Start Recording
          </button>
          <button
            id="stopRecordingButton"
            onClick={handleStopRecording}
            className="w-40 h-14 bg-cyan-500 rounded-2xl"
          >
            Stop Recording
          </button>
        </div>
      </div>
      <div className="block items-center justify-center h-screen pt-9 ">
        <div
          className="border-2 border-cyan-700 pt-3 pb-4 rounded-3xl shadow-lg shadow-sky-900 "
          style={{
            background:
              "linear-gradient(to right, rgb(127, 161, 255,0.7), rgb(176, 195, 250,0.7))",
          }}
        >
          <h1 class="text-1xl pt-6 font-bold underline font-serif">
            {" "}
            Breathing And Ventillation:Management{" "}
          </h1>
          <div className=" block xl:flex justify-center   space-x-12 pt-8 ">
            <div className="mb-4">
              <label
                htmlFor="oxygentherapy"
                className="flex text-gray-700 text-sm font-bold mb-2 w-72"
              >
                Oxygen Therapy
              </label>
              <select
                id="oxygentherapy"
                className="block appearance-none w-72 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
              >
                <option value="selectoption">Select Option</option>
                <option value="Simple Facemask">Simple Facemask</option>
                <option value="Venturi Mask">Venturi Mask</option>
                <option value="Non-Rebreather Mask">
                  {" "}
                  Non-Rebreather Mask{" "}
                </option>
                <option value="High Flow Nasal Canula">
                  High Flow Nasal Canula
                </option>
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="actiontoken"
                className="flex text-gray-700 text-sm font-bold mb-2 w-72"
              >
                Oxygen Flow Rate L/Min
              </label>
              <input
                className="shadow appearance-none border rounded w-72 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="actiontoken"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="nebulisation"
                className="flex text-gray-700 text-sm font-bold mb-2 w-72"
              >
                Nebulisation
              </label>
              <select
                id="nebulisation"
                className="block appearance-none w-72 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
              >
                <option value="selectoption">Select Option</option>
                <option value="Simple Nebuliser">Simple Nebuliser</option>
                <option value="Pneumatic Nebuliser">Pneumatic Nebuliser</option>
                <option value=" Ultrasonic Nebuliser">
                  {" "}
                  Ultrasonic Nebuliser
                </option>
              </select>
            </div>
          </div>

          <div className="block  xl:flex justify-center   space-x-12 pt-8 ">
            <div className="mb-4">
              <label
                htmlFor=" needletherecostomy"
                className="flex text-gray-700 text-sm font-bold mb-2 w-44"
              >
                Needle Therecostomy
              </label>
              <select
                id="needletherecostomy"
                className="block appearance-none w-44 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
              >
                <option value="selectoption">Select Option</option>
                <option value="Right">Right</option>
                <option value="Left">Left</option>
                <option value=" Bilateral"> Bilateral </option>
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="tubetherecostomy"
                className="flex text-gray-700 text-sm font-bold mb-2 w-44"
              >
                Tube Therecostomy
              </label>
              <select
                id="tubetherecostomy"
                className="block appearance-none w-44 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
              >
                <option value="selectoption">Select Option</option>
                <option value="Right">Right</option>
                <option value="Left">Left</option>
                <option value=" Bilateral"> Bilateral </option>
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="mechanicalventillation"
                className="flex text-gray-700 text-sm font-bold mb-2 w-44"
              >
                Mechanical Ventillation
              </label>
              <select
                id="mechanicalventillation"
                className="block appearance-none w-44 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
              >
                <option value="selectoption">Select Option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>
          <div className="  flex justify-center   space-x-12 pt-8 ">
            <h1 class="text-1xl text-blue-800 pt-6 font-bold underline font-serif">
              {" "}
              Breathing Point Of Care Ultrasound{" "}
            </h1>
          </div>
          <div className=" block xl:flex justify-center   space-x-12 pt-8 ">
            <div className="mb-4">
              <label
                htmlFor="prorocol'sperformed"
                className="flex text-gray-700 text-sm font-bold mb-2 w-80"
              >
                Prorocol's Performed
              </label>
              <select
                id="prorocol'sperformed "
                className="block appearance-none w-80 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
              >
                <option value="selectoption">Select Option</option>
                <option value="BLUE Protocol">BLUE Protocol</option>
                <option value="FALLS Protocol">FALLS Protocol</option>
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="choice"
                className="flex text-gray-700 text-sm font-bold mb-2 w-80"
              >
                Choice
              </label>
              <select
                id="choice"
                className="block appearance-none w-80 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
              >
                <option value="selectoption">Select Option</option>
                <option value="BLUE Protocol">BLUE Protocol</option>
                <option value="FALLS Protocol">FALLS Protocol</option>
              </select>
            </div>
          </div>

          <div className="button flex justify-center  pt-8 text-sm font-bold  pl-9 ">
            <button
              id="startRecordingButton5"
              onClick={() => handleStartRecording(5)}
              className="w-40 h-14   bg-blue-500 rounded-2xl mr-4"
            >
              Start Recording
            </button>
            <button
              id="stopRecordingButton"
              onClick={handleStopRecording}
              className="w-40 h-14 bg-cyan-500 rounded-2xl"
            >
              Stop Recording
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreathingVentilationAssesment;