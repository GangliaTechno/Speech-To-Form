import React from "react";

const Treatrment = () => {
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
    <div className="block items-center justify-center h-auto p-8 ">
    <div className="border-2 border-cyan-700 pt-3 pb-4 rounded-3xl shadow-lg shadow-sky-900 " style={{ background: 'linear-gradient(to right, rgb(127, 161, 255,0.7), rgb(176, 195, 250,0.7))' }}>
        <h1 class="text-3xl pt-6 font-bold underline font-serif">
          {" "}
          EMERGENCY MEDICINE DEPARTMENT PHYSICIAN DOCUMENTATION{" "}
        </h1>
        <div className="  flex justify-center   space-x-12 pt-8 ">
          <div className="mb-4">
            <label
              htmlFor="actiontoken"
              className="flex text-gray-700 text-sm font-bold mb-2 w-72"
            >
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="actiontoken"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="actiontoken"
              className="flex text-gray-700 text-sm font-bold mb-2 w-44"
            >
              Age Of the Patient
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="actiontoken"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="Patient Group"
              className="flex text-gray-700 text-sm font-bold mb-2 w-72"
            >
              Patient Group
            </label>
            <select
              id="Patient Group"
              className="block appearance-none w-72 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
              <option value="selectoption">Select Option</option>
              <option value="Adult Male">Adult Male</option>
              <option value="Adult Female">Adult Female</option>
              <option value="Adult Female Pregnent">
                Adult Female Pregnent{" "}
              </option>
              <option value="Pediatric">Pediatric</option>
              <option value="Neptanatal">Neptanatal</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="nearorcardiacarrest"
              className="flex text-gray-700 text-sm font-bold mb-2 w-72"
            >
              Patient in Near Arrest or Cardiac Arrest
            </label>
            <select
              id="nearorcardiacarrest"
              className="block appearance-none w-72 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
              <option value="selectoption">Select Option</option>
              <option value="yes">yes</option>
              <option value="no">no</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="clinicalcondition"
              className="flex text-gray-700 text-sm font-bold mb-2 w-72"
            >
              Primary Clinical Condition
            </label>
            <select
              id="clinicalcondition"
              className="block appearance-none w-72 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
              <option value="selectoption">Select Option</option>
              <option value="Trauma">Trauma</option>
              <option value="non Trauma">non Trauma</option>
              <option value="Trauma plus Medical">Trauma plus Medical</option>
            </select>
          </div>
        </div>
        <div>
          <h1 class=" text-gray-700 text-2xl pt-6 font-bold underline  font-serif">
            {" "}
            Resuscitation
          </h1>
        </div>

        <div className="  flex justify-center   space-x-12 pt-8 ">
          <div className="mb-4 ">
            <label className=" text-gray-700 text-sm font-bold mb-2 w-64  sm:w-64  sm:flex">
              Time of Detection Of cardiac Arrest
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              //   id="name"
              type="time"
              //   name="name"
            />
          </div>
          <div className="mb-4 ">
            <label className=" text-gray-700 text-sm font-bold mb-2 w-64  sm:w-64  sm:flex">
              Time of Starting Chest Compression
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              //   id="name"
              type="time"
              //   name="name"
            />
          </div>
          <div className="mb-4 ">
            <label className=" text-gray-700 text-sm font-bold mb-2 w-64  sm:w-64  sm:flex">
              Time of Assisted Ventilation
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              //   id="name"
              type="time"
              //   name="name"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="Compression/Debrillation"
              className="flex text-gray-700 text-sm font-bold mb-2 w-max pt-0"
            >
              Condition When Need For Chest Compression/Debrillation Was
              identified
            </label>
            <select
              id="Compression/Debrillation"
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
              <option value="selectoption">Select Option</option>
              <option value="Trauma">Trauma</option>
              <option value="non Trauma">non Trauma</option>
              <option value="Trauma plus Medical">Trauma plus Medical</option>
            </select>
          </div>
        </div>
        <div className="  flex justify-center   space-x-10 pt-8 ">
          <div className="mb-4">
            <label
              htmlFor="requiringcompressions"
              className="flex text-gray-700 text-sm font-bold mb-2 w-max pt-0"
            >
              First rhythem Requiring Compressions
            </label>
            <select
              id="requiringcompressions"
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
              <option value="selectoption">Select Option</option>
              <option value="Pulseless VT">Pulseless VT</option>
              <option value="Venticular Fibrillation">
                Venticular Fibrillation
              </option>
              <option value="Pulseless Electrical Activity">
                Pulseless Electrical Activity
              </option>
              <option value="Asystole">Asystole</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="typeofcompressions"
              className="flex text-gray-700 text-sm font-bold mb-2 w-max pt-0"
            >
              Type Of Chest Compressions
            </label>
            <select
              id="typeofcompressions"
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
              <option value="selectoption">Select Option</option>
              <option value="Standard Manual">Standard Manual</option>
              <option value="IAC-CPR">IAC-CPR</option>
              <option value="Active Compression Decompression Machine">
                Active Compression Decompression Machine
              </option>
              <option value="Autoamtic Compressions">
                Autoamtic Compressions
              </option>
              <option value="Open Chest">Open Chest</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="documentedrhythem"
              className="flex text-gray-700 text-sm font-bold mb-2 w-max pt-0"
            >
              First documented pulseless Rhythem
            </label>
            <select
              id="documentedrhythem"
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
              <option value="selectoption">Select Option</option>
              <option value="Pulseless VT">Pulseless VT</option>
              <option value="Venticular Fibrillation">
                Venticular Fibrillation
              </option>
              <option value="Pulseless Electrical Activity">
                Pulseless Electrical Activity
              </option>
              <option value="Asystole">Asystole</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="interventions"
              className="flex text-gray-700 text-sm font-bold mb-2 w-max pt-0"
            >
              Interventions Already In Place
            </label>
            <select
              id="interventions"
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
              <option value="selectoption">Select Option</option>
              <option value="Pulseless VT">
                Invasive Mechanical Ventilation
              </option>
              <option value="Venticular Fibrillation">
                Non Invasive Ventilation
              </option>
              <option value="Pulseless Electrical Activity">
                Intracterial Catherrer
              </option>
              <option value="Asystole">Vascular Access</option>
              <option value="Asystole">Vasocative Drug</option>
              <option value="Asystole">ETCO2/Capnography</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor=" E-CPR"
              className="flex text-gray-700 text-sm font-bold mb-2 w-44"
            >
              E-CPR Considered
            </label>
            <select
              id=" E-CPR"
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
              <option value="selectoption">Select Option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="actiontoken"
              className="flex text-gray-700 text-sm font-bold mb-2 w-72"
            >
              Immediate Articidiant Cause of Arrest
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="actiontoken"
            />
          </div>
        </div>
        <div className="  flex justify-center   space-x-12 pt-8 ">
          <div className="mb-4">
            <label
              htmlFor="monitoringonset"
              className="flex text-gray-700 text-sm font-bold mb-2 w-56"
            >
              Monitoring At Onset
            </label>
            <select
              id="monitoringonset"
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
              <option value="selectoption">Select Option</option>
              <option value="ECG">ECG</option>
              <option value="Pulse Oximeter">Pulse Oximeter</option>
              <option value="NIBP">NIBP</option>
              <option value="ETCO2">ETCO2</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="e-cprregistry"
              className="flex text-gray-700 text-sm font-bold mb-2 w-56"
            >
              E-CPR Registry
            </label>
            <select
              id="e-cprregistry"
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
              <option value="selectoption">Select Option</option>
              <option value="ECG">ECG</option>
              <option value="Pulse Oximeter">Pulse Oximeter</option>
              <option value="NIBP">NIBP</option>
              <option value="ETCO2">ETCO2</option>
            </select>
          </div>
        </div>
        <div className="button flex justify-center  pt-2 text-sm font-bold  pl-9 ">
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
            className="w-40 h-14 bg-cyan-500  rounded-2xl"
          >
            Stop Recording
          </button>
        </div>
      </div>
    </div>
  );
};

export default Treatrment;