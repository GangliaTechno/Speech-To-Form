import React from "react";

const Circulation = () => {
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
          Circualtion And Hemorrhage Control:Assesment{" "}
        </h1>
        <div className=" block  xl:flex justify-center   space-x-12 pt-8 ">
          <div className="mb-4">
            <label
              htmlFor="actiontoken"
              className=" block xl:flex text-gray-700 text-sm font-bold mb-2 w-72"
            >
              Heart Rate
            </label>
            <input
              className="shadow appearance-none border rounded w-72 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="actiontoken"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="actiontoken"
              className=" block xl:flex text-gray-700 text-sm font-bold mb-2 w-72"
            >
              Pulse Rate
            </label>
            <input
              className="shadow appearance-none border rounded w-72 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="actiontoken"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="arrythima"
              className="flex text-gray-700 text-sm font-bold mb-2 w-72"
            >
              Arrythima
            </label>
            <select
              id="arrythima"
              className="block appearance-none w-72 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
              <option value="selectoption">Select Option</option>
              <option value="Sinus Bradicardia">Sinus Bradicardia</option>
              <option value="Sinus Tachycardia">Sinus Tachycardia</option>
              <option value="Sinus Arrhythima">Sinus Arrhythima </option>
              <option value="APC's">APC's</option>
              <option value="VPC's"> VPC's </option>
              <option value="PSVT">PSVT</option>
              <option value="Junctional Tachycardia">
                {" "}
                Junctional Tachycardia{" "}
              </option>
              <option value="Multifocal Artical Tachycardia">
                Multifocal Artical Tachycardia
              </option>
              <option value="AVNRT">AVNRT</option>
              <option value="Atrial Flutter"> Atrial Flutter </option>
              <option value="Artrial Fibrillation">Artrial Fibrillation</option>
              <option value="Venticular Tachycardia">
                {" "}
                Venticular Tachycardia{" "}
              </option>
              <option value="Venticular Fibrillation">
                Venticular Fibrillation
              </option>
              <option value="Torsades De Pointes"> Torsades De Pointes </option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="pulsevolume "
              className="flex text-gray-700 text-sm font-bold mb-2 w-72"
            >
              Pulse Volume
            </label>
            <select
              id="pulsevolume"
              className="block appearance-none w-72 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
              <option value="selectoption">Select Option</option>
              <option value="Normal">Normal</option>
              <option value="Low Volume">Low Volume</option>
              <option value="High Volume "> High Volume</option>
            </select>
          </div>
        </div>
        <div className=" block xl:flex  justify-center   space-x-12 pt-8 ">
          <div className="mb-4">
            <label
              htmlFor="actiontoken"
              className=" block xl:flex text-gray-700 text-sm font-bold mb-2 w-72"
            >
              NIBP:Systolic
            </label>
            <input
              className="shadow appearance-none border rounded w-72 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="actiontoken"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="actiontoken"
              className=" block xl:flex text-gray-700 text-sm font-bold mb-2 w-72"
            >
              NIBP:Diastolic
            </label>
            <input
              className="shadow appearance-none border rounded w-72 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="actiontoken"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="radiofemoraldelay"
              className="flex text-gray-700 text-sm font-bold mb-2 w-44"
            >
              Radiofemoral Delay
            </label>
            <select
              id="radiofemoraldelay"
              className="block appearance-none w-44 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
              <option value="selectoption">Select Option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="palpablepulsesrightside"
              className="flex text-gray-700 text-sm font-bold mb-2 w-44"
            >
              Palpable Pulses Right Side
            </label>
            <select
              id="palpablepulsesrightside"
              className="block appearance-none w-44 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
              <option value="selectoption">Select Option</option>
              <option value="Radial">Radial</option>
              <option value="Brachial">Brachial</option>
              <option value="Femoral">Femoral</option>
              <option value="Popliteal">Popliteal</option>
              <option value="Dorsalis Pedise">Dorsalis Pedise</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor=" palpablepulsesleftside"
              className="flex text-gray-700 text-sm font-bold mb-2 w-44"
            >
              Palpable Pulses Left Side
            </label>
            <select
              id="palpablepulsesleftside"
              className="block appearance-none w-44 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
              <option value="selectoption">Select Option</option>
              <option value="Radial">Radial</option>
              <option value="Brachial">Brachial</option>
              <option value="Femoral">Femoral</option>
              <option value="Popliteal">Popliteal</option>
              <option value="Dorsalis Pedise">Dorsalis Pedise</option>
            </select>
          </div>
        </div>
        <div className="  block xl:flex justify-center   space-x-12 pt-8 ">
          <div className="mb-4">
            <label
              htmlFor="actiontoken"
              className="flex text-gray-700 text-sm font-bold mb-2 w-72"
            >
              Apex Beat
            </label>
            <input
              className="shadow appearance-none border rounded w-72 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="actiontoken"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="parasternalheave"
              className="flex text-gray-700 text-sm font-bold mb-2 w-44"
            >
              Parasternal Heave
            </label>
            <select
              id="parasternalheave"
              className="block appearance-none w-44 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
              <option value="selectoption">Select Option</option>
              <option value="Radial">No</option>
              <option value="Brachial">Yes</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="s1"
              className="flex text-gray-700 text-sm font-bold mb-2 w-44"
            >
              S1
            </label>
            <select
              id="s1"
              className="block appearance-none w-44 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
              <option value="selectoption">Select Option</option>
              <option value="Normal">Normal</option>
              <option value="Muffled">Muffled</option>
              <option value="Loud">Loud</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="s2"
              className="flex text-gray-700 text-sm font-bold mb-2 w-44"
            >
              S2
            </label>
            <select
              id="s2"
              className="block appearance-none w-44 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
              <option value="selectoption">Select Option</option>
              <option value="Normal">Normal</option>
              <option value="Muffled">Muffled</option>
              <option value="Split">Split</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="s3"
              className="flex text-gray-700 text-sm font-bold mb-2 w-44"
            >
              S3
            </label>
            <select
              id="s3"
              className="block appearance-none w-44 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
              <option value="selectoption">Select Option</option>
              <option value="Absent">Absent</option>
              <option value="Present">Present</option>
            </select>
          </div>
        </div>
        <div className="  block xl:flex justify-center   space-x-12 pt-8 ">
          <div className="mb-4">
            <label
              htmlFor="s4"
              className="flex text-gray-700 text-sm font-bold mb-2 w-44"
            >
              S4
            </label>
            <select
              id="s4"
              className="block appearance-none w-44 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
              <option value="selectoption">Select Option</option>
              <option value="Absent">Absent</option>
              <option value="Present">Present</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="murmur"
              className="flex text-gray-700 text-sm font-bold mb-2 w-44"
            >
              Murmur
            </label>
            <select
              id=" murmur"
              className="block appearance-none w-44 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
              <option value="selectoption">Select Option</option>
              <option value="ESM">ESM</option>
              <option value="PSM">PSM</option>
              <option value="Mid Diastolic">Mid Diastolic</option>
              <option value="Diastolic">Diastolic</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="openingsnap"
              className="flex text-gray-700 text-sm font-bold mb-2 w-44"
            >
              Opening Snap
            </label>
            <select
              id="openingsnap"
              className="block appearance-none w-44 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
              <option value="selectoption">Select Option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
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
      <div className="block items-center justify-center h-auto pt-9 ">
        <div
          className="border-2 border-cyan-700 pt-3 pb-4 rounded-3xl shadow-lg shadow-sky-900 "
          style={{
            background:
              "linear-gradient(to right, rgb(127, 161, 255,0.7), rgb(176, 195, 250,0.7))",
          }}
        >
          <h1 class="text-1xl pt-6 font-bold underline font-serif">
            {" "}
            Circulation And Bleeding:Management{" "}
          </h1>
          <h3 class="text-1xl pt-6 font-bold underline font-serif">
            {" "}
            Point Of Care Ultrasound{" "}
          </h3>
          <div className=" block xl:flex justify-center   space-x-12 pt-8 ">
            <div className="mb-4">
              <label
                htmlFor="sonologyintrauma"
                className="flex text-gray-700 text-sm font-bold mb-2 w-86"
              >
                Focused Assesment Using Sonology In Trauma
              </label>
              <select
                id="sonologyintrauma"
                className="block appearance-none w-72 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
              >
                <option value="selectoption">Select Option</option>
                <option value="Negative">Negative</option>
                <option value="Possitive">Possitive</option>
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="fluidpresentin"
                className="flex text-gray-700 text-sm font-bold mb-2 w-72"
              >
                FAST:Fluid Present In
              </label>
              <select
                id="fluidpresentin"
                className="block appearance-none w-72 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
              >
                <option value="selectoption">Select Option</option>
                <option value="Pericardial">Pericardial</option>
                <option value="Right Upper Quadrant">
                  Right Upper Quadrant
                </option>
                <option value=" Left Upper Quadrant">
                  {" "}
                  Left Upper Quadrant{" "}
                </option>
                <option value=" Pelvic"> Pelvic </option>
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="e-fast"
                className="flex text-gray-700 text-sm font-bold mb-2 w-72"
              >
                E-FAST
              </label>
              <select
                id="e-fast"
                className="block appearance-none w-72 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
              >
                <option value="selectoption">Select Option</option>
                <option value="Right Pleural">Right Pleural</option>
                <option value="Left Pleural">Left Pleural</option>
                <option value=" Pneumothorax Right">
                  {" "}
                  Pneumothorax Right{" "}
                </option>
                <option value=" Pneumothorax Left ">Pneumothorax Left </option>
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="fallsprotocol"
                className="flex text-gray-700 text-sm font-bold mb-2 w-72"
              >
                FALLS Protocol
              </label>
              <select
                id="fallsprotocol"
                className="block appearance-none w-72 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
              >
                <option value="selectoption">Select Option</option>
                <option value="Fluid Recommended">Fluid Recommended</option>
                <option value="Fluid Not Recommended">
                  Fluid Not Recommended
                </option>
              </select>
            </div>
          </div>

          <div className="  flex justify-center   space-x-12 pt-8 ">
            <h1 class="text-1xl text-blue-800 pt-6 font-bold underline font-serif">
              {" "}
              RUSH Protocol{" "}
            </h1>
          </div>
          <div className=" block xl:flex justify-center   space-x-12 pt-8 ">
            <div className="mb-4">
              <label
                htmlFor=" POCEabnormality"
                className="flex text-gray-700 text-sm font-bold mb-2 w-80"
              >
                Heart(POCE)Abnormality
              </label>
              <select
                id="POCEabnormality "
                className="block appearance-none w-80 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
              >
                <option value="selectoption">Select Option</option>
                <option value="Ejection">Ejection</option>
                <option value="Effusion">Effusion</option>
                <option value="Equality">Equality</option>
                <option value="Entry">Entry</option>
                <option value="Exit">Exit</option>
                <option value="Embryology">Embryology</option>
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="temponadephysiology"
                className="flex text-gray-700 text-sm font-bold mb-2 w-80"
              >
                Temponade Physiology
              </label>
              <select
                id="temponadephysiology"
                className="block appearance-none w-80 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
              >
                <option value="selectoption">Select Option</option>
                <option value="Diastolic Atrial Collapse">
                  Diastolic Atrial Collapse
                </option>
                <option value="Diastolic Venticular Collapse">
                  Diastolic Venticular Collapse
                </option>
                <option value="Non Temponade">Non Temponade</option>
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
      <div className="block items-center justify-center h-auto pt-9 ">
        <div
          className="border-2 border-cyan-700 pt-3 pb-4 rounded-3xl shadow-lg shadow-sky-900 "
          style={{
            background:
              "linear-gradient(to right, rgb(127, 161, 255,0.7), rgb(176, 195, 250,0.7))",
          }}
        >
          <h1 class="text-2xl pt-6 font-bold underline font-serif">
            {" "}
            HISTORY{" "}
          </h1>

          <div className=" block xl:flex justify-center   space-x-12 pt-8 ">
            <div className="mb-4">
              <label
                htmlFor="historyprovidedby"
                className="flex text-gray-700 text-sm font-bold mb-2 w-86"
              >
                Simple History Provided By
              </label>
              <select
                id="historyprovidedby"
                className="block appearance-none w-72 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
              >
                <option value="selectoption">Select Option</option>
                <option value="Self">Self</option>
                <option value="Bystander">Bystander</option>
                <option value="Paramedic">Paramedic</option>
                <option value="Attending Physician">Attending Physician</option>
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="actiontoken"
                className=" block xl:flex text-gray-700 text-sm font-bold mb-2 w-86"
              >
                Name Of The Person Providing Sample History
              </label>
              <input
                className="shadow appearance-none border rounded w-80 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="actiontoken"
              />
            </div>
          </div>

          <div className="  flex justify-center   space-x-12 pt-8 ">
            <h1 class="text-1xl text-blue-800 pt-6 font-bold underline font-serif">
              {" "}
              SAMPLE HISTORY{" "}
            </h1>
          </div>
          <div className=" block xl:flex justify-start space-x-12 pt-8 ml-4 ">
            <div className="mb-4 w-full mr-3">
              <label
                htmlFor="actiontoken"
                className=" block xl:flex text-gray-700 text-sm font-bold mb-2 w-96"
              >
                Signs And Symptoms
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="actiontoken"
              />
            </div>
          </div>
          <div className=" block xl:flex justify-start space-x-12 pt-8 ml-4 ">
            <div className="mb-4 w-full mr-3">
              <label
                htmlFor="actiontoken"
                className=" block xl:flex text-gray-700 text-sm font-bold mb-2 w-96"
              >
                Allergies
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="actiontoken"
              />
            </div>
          </div>
          <div className=" block xl:flex justify-start space-x-12 pt-8 ml-4 ">
            <div className="mb-4 w-full mr-3">
              <label
                htmlFor="actiontoken"
                className=" block xl:flex text-gray-700 text-sm font-bold mb-2 w-96"
              >
                Medications
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="actiontoken"
              />
            </div>
          </div>
          <div className=" block xl:flex justify-start space-x-12 pt-8 ml-4 ">
            <div className="mb-4 w-full mr-3">
              <label
                htmlFor="actiontoken"
                className=" block xl:flex text-gray-700 text-sm font-bold mb-2 w-96"
              >
                Past Illness
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="actiontoken"
              />
            </div>
          </div>
          <div className=" block xl:flex justify-start space-x-12 pt-8 ml-4 ">
            <div className="mb-4 w-full mr-3">
              <label
                htmlFor="actiontoken"
                className=" block xl:flex text-gray-700 text-sm font-bold mb-2 w-96"
              >
                Last Meal
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="actiontoken"
              />
            </div>
          </div>
          <div className=" block xl:flex justify-start space-x-12 pt-8 ml-4 ">
            <div className="mb-4 w-full mr-3">
              <label
                htmlFor="actiontoken"
                className="block xl:flex text-gray-700 text-sm font-bold mb-2 w-96"
              >
                Events
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="actiontoken"
                rows="3"
              ></textarea>
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
      <div className="block items-center justify-center h-auto pt-9 ">
        <div
          className="border-2 border-cyan-700 pt-3 pb-4 rounded-3xl shadow-lg shadow-sky-900 "
          style={{
            background:
              "linear-gradient(to right, rgb(127, 161, 255,0.7), rgb(176, 195, 250,0.7))",
          }}
        >
          <div className="  flex justify-center   space-x-12 pt-8 ">
            <h1 class="text-1xl text-blue-800 pt-6 font-bold underline font-serif">
              {" "}
              DETAILED HISTORY{" "}
            </h1>
          </div>
          <div className=" block xl:flex justify-start space-x-12 pt-8 ml-4 ">
            <div className="mb-4 w-full mr-3">
              <label
                htmlFor="actiontoken"
                className="block xl:flex text-gray-700 text-sm font-bold mb-2 w-96"
              >
                History Of Presenting Illness
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="actiontoken"
                rows="5"
              ></textarea>
            </div>
          </div>
          <div className=" block xl:flex justify-start space-x-12 pt-8 ml-4 ">
            <div className="mb-4 w-full mr-3">
              <label
                htmlFor="actiontoken"
                className="block xl:flex text-gray-700 text-sm font-bold mb-2 w-96"
              >
                History Of Past Medical And Surgical Illness
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="actiontoken"
                rows="5"
              ></textarea>
            </div>
          </div>
          <div className=" block xl:flex justify-start space-x-12 pt-8 ml-4 ">
            <div className="mb-4 w-full mr-3">
              <label
                htmlFor="actiontoken"
                className="block xl:flex text-gray-700 text-sm font-bold mb-2 w-96"
              >
                Personel History
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="actiontoken"
                rows="5"
              ></textarea>
            </div>
          </div>
          <div className=" block xl:flex justify-start space-x-12 pt-8 ml-4 ">
            <div className="mb-4 w-full mr-3">
              <label
                htmlFor="actiontoken"
                className="block xl:flex text-gray-700 text-sm font-bold mb-2 w-96"
              >
                Sexual And Exposure History
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="actiontoken"
                rows="5"
              ></textarea>
            </div>
          </div>
          <div className=" block xl:flex justify-start space-x-12 pt-8 ml-4 ">
            <div className="mb-4 w-full mr-3">
              <label
                htmlFor="actiontoken"
                className="block xl:flex text-gray-700 text-sm font-bold mb-2 w-96"
              >
                Medication History
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="actiontoken"
                rows="5"
              ></textarea>
            </div>
          </div>
          <div className=" block xl:flex justify-start space-x-12 pt-8 ml-4 ">
            <div className="mb-4 w-full mr-3">
              <label
                htmlFor="actiontoken"
                className="block xl:flex text-gray-700 text-sm font-bold mb-2 w-96"
              >
                Family History
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="actiontoken"
                rows="5"
              ></textarea>
            </div>
          </div>
          <div className=" block xl:flex justify-start space-x-12 pt-8 ml-4 ">
            <div className="mb-4 w-full mr-3">
              <label
                htmlFor="actiontoken"
                className="block xl:flex text-gray-700 text-sm font-bold mb-2 w-96"
              >
                Events
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="actiontoken"
                rows="3"
              ></textarea>
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
      <div className="block items-center justify-center h-auto pt-9 ">
        <div
          className="border-2 border-cyan-700 pt-3 pb-4 rounded-3xl shadow-lg shadow-sky-900 "
          style={{
            background:
              "linear-gradient(to right, rgb(127, 161, 255,0.7), rgb(176, 195, 250,0.7))",
          }}
        >
          <div className="  flex justify-center   space-x-12 pt-8 ">
            <h1 class="text-1xl text-blue-800 pt-6 font-bold underline font-serif">
              {" "}
              REVIEW OF SYSTEMS{" "}
            </h1>
          </div>
          <div className="  block xl:flex justify-center   space-x-12 pt-8 ">
            <div className="mb-4">
              <label
                htmlFor="constitutional"
                className="flex text-gray-700 text-sm font-bold mb-2 w-72"
              >
                Constitutional
              </label>
              <select
                id="constitutional"
                className="block appearance-none w-72 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
              >
                <option value="selectoption">Select Option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="cardiovascular"
                className="flex text-gray-700 text-sm font-bold mb-2 w-72"
              >
                Cardiovascular
              </label>
              <select
                id="cardiovascular"
                className="block appearance-none w-72 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
              >
                <option value="selectoption">Select Option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="respiratory"
                className="flex text-gray-700 text-sm font-bold mb-2 w-72"
              >
                Respiratory
              </label>
              <select
                id="respiratory"
                className="block appearance-none w-72 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
              >
                <option value="selectoption">Select Option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>
          <div className="  block xl:flex justify-center   space-x-12 pt-8 ">
            <div className="mb-4">
              <label
                htmlFor="gastrointestinal"
                className="flex text-gray-700 text-sm font-bold mb-2 w-72"
              >
                Gastrointestinal
              </label>
              <select
                id="gastrointestinal"
                className="block appearance-none w-72 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
              >
                <option value="selectoption">Select Option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="nuerological"
                className="flex text-gray-700 text-sm font-bold mb-2 w-72"
              >
                Nuerological
              </label>
              <select
                id="nuerological"
                className="block appearance-none w-72 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
              >
                <option value="selectoption">Select Option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
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
export default Circulation;