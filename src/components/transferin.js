import React from "react";

const TransferinForm = () => {
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
    <div className="block tems-center justify-center h-screen p-8">
     <div className="border-2 border-cyan-700 pt-3 pb-4 rounded-3xl shadow-lg shadow-sky-900 " style={{ background: 'linear-gradient(to right, rgb(127, 161, 255,0.7), rgb(176, 195, 250,0.7))' }}>
        <div className="flex justify-center space-x-12 pt-8">
          <div className="button flex  pt-4 text-sm font-bold self-center pl-9">
            <button className="w-64 h-16 bg-blue-500 rounded-3xl">
              Unique QR code for the response
            </button>
          </div>
          <div className="mb-4">
            <label
              htmlFor="transportby"
              className="flex text-gray-700 text-sm font-bold mb-2 w-72"
            >
              Patient was Transported By
            </label>
            <select
              id="massCasualtySelect"
              className="block appearance-none w-72 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
              <option value="selectoption">Select Option</option>
              <option value="self">self</option>
              <option value="KH-Mars">KH-Mars</option>
              <option value="Mobile-JCU other instructuions">
                Mobile-JCU other instructuions
              </option>
              <option value="Ambulence">Ambulence:Private</option>
              <option value="Private Vehicle">Private Vehicle</option>
              <option value="Taxi">Taxi</option>
              <option value="FireForce">FireForce</option>
              <option value="Police vehicle">Police vehicle</option>
              <option value="Auto-Rikhshaw">Auto-Rikhshaw</option>
              <option value="Two-Wheeler">Two-Wheeler</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="massCasualtySelect"
              className="flex text-gray-700 text-sm font-bold mb-2 w-72"
            >
              Bed Booked And Available
            </label>
            <select
              id="massCasualtySelect"
              className="block appearance-none w-72 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
              <option value="selectoption">Select Option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>
        <div>
          <h1 class=" text-gray-700 text-1xl pt-6 font-bold underline  font-serif">
            {" "}
            kH MARS Response and Vehicle Details
          </h1>
        </div>

        <div className="flex justify-center space-x-10 pt-8">
          <div className="mb-4 ">
            <label className=" text-gray-700 text-sm font-bold mb-2 w-36  sm:w-56  sm:flex">
              Date of Call
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              //   id="name"
              type="date"
              //   name="name"
            />
          </div>
          <div className="mb-4 ">
            <label className=" text-gray-700 text-sm font-bold mb-2 w-36  sm:w-56  sm:flex">
              Time of Call
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
              htmlFor="calledfrom"
              className="flex text-gray-700 text-sm font-bold mb-2 w-96"
            >
              Called From
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="namegivenatTriage"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="calledby"
              className="flex text-gray-700 text-sm font-bold mb-2 w-96"
            >
              Called By
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="namegivenatTriage"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="PhoneNumber"
              className="flex text-gray-700 text-sm font-bold mb-2 w-40"
            >
              Mobile Number
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="PhoneNumber"
            />
          </div>
        </div>
        <div className="flex justify-center space-x-12 pl-16 pt-8">
          <div className="mb-4">
            <label
              htmlFor="actiontoken"
              className="flex text-gray-700 text-sm font-bold mb-2 w-72"
            >
              Action Token
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="actiontoken"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="emtid"
              className="flex text-gray-700 text-sm font-bold mb-2 w-52"
            >
              EMT ID
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="emtid"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="driverid"
              className="flex text-gray-700 text-sm font-bold mb-2 w-52"
            >
              Driver ID
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="driverid"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="vehiclenumber"
              className="flex text-gray-700 text-sm font-bold mb-2 w-40"
            >
              Vehicle Number
            </label>
            <input
              className="shadow appearance-none border rounded w-52 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="vehiclenumber"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="paymentmethod"
              className="flex text-gray-700 text-sm font-bold mb-2 w-72"
            >
              Payment Method
            </label>
            <select
              id="paymentmethod"
              className="block appearance-none w-72 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
              <option value="selectoption">Select Option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="vehicletype"
              className="flex text-gray-700 text-sm font-bold mb-2 w-72"
            >
              Vehicle Type
            </label>
            <select
              id="vehicletype"
              className="block appearance-none w-44 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
              <option value="selectoption">Select Option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
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
            className="w-40 h-14 bg-cyan-500 rounded-2xl"
          >
            Stop Recording
          </button>
        </div>
      </div>
      <div className="block tems-center justify-center h-auto pt-9">
     <div className="border-2 border-cyan-700 pt-3 pb-4 rounded-3xl shadow-lg shadow-sky-900 " style={{ background: 'linear-gradient(to right, rgb(127, 161, 255,0.7), rgb(176, 195, 250,0.7))' }}>
        <div className="flex justify-center space-x-4 pt-8">
          <div className="mb-4 ">
            <label className=" text-gray-700 text-sm font-bold mb-2 w-36  sm:w-56  sm:flex">
              Estimated Time of onset
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              //   id="name"
              type="time"
              //   name="name"
            />
          </div>
          <div className="mb-4">
            <label className="flex text-gray-700 text-sm font-bold mb-2 w-52">
              Initial Call For Help
            </label>
            <input className="shadow appearance-none border rounded w-52 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline space-x-20" />
          </div>
          <div className="mb-4">
            <label className="flex text-gray-700 text-sm font-bold mb-2 w-44">
              Unit Notified By Dispatch
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
            />
          </div>
          <div className="mb-4">
            <label className="flex text-gray-700 text-sm font-bold mb-2 w-48">
              Unit Reching incident site
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
            />
          </div>
          <div className="mb-4">
            <label className="flex text-gray-700 text-sm font-bold mb-2 w-48">
              Unit Initiating Patient Care
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
            />
          </div>
          <div className="mb-4">
            <label className="flex text-gray-700 text-sm font-bold mb-2 w-32">
              Unit Left Scene
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
            />
          </div>
          <div className="mb-4">
            <label className="flex text-gray-700 text-sm font-bold mb-2 w-48">
              Patient Reaching Destination
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
            />
          </div>
        </div>
        <div className="flex justify-center space-x-12 pt-8">
          <div className="mb-4">
            <label
              htmlFor="emergencySecurityIndex"
              className="flex text-gray-700 text-sm font-bold mb-2 w-56"
            >
              Incident Patient Disposition
            </label>
            <select
              id="emergencySecurityIndex"
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
              <option value="selectOption" className="text-white bg-blue-600">
                Select Option
              </option>
              <option value="priority1" className="text-white bg-blue-600">
                Patient Dying: Priority 1
              </option>
              <option value="priority2" className="text-white bg-red-600">
                Cannot Wait: Priority 2
              </option>
              <option value="priority3" className="text-white bg-yellow-300">
                Needs Multiple Resources: Priority 3
              </option>
              <option value="priority4" className="text-white bg-green-400">
                Needs Single Resources: Priority 4
              </option>
              <option value="priority5" className="text-black bg-white">
                Needs No Resources: Priority 5
              </option>
              <option value="dead" className="text-white bg-black">
                Brought Dead
              </option>
            </select>
          </div>

          <div className="mb-4">
            <label className="flex text-gray-700 text-sm font-bold mb-2 w-96 ">
              Incident Location
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows="2"
            />
          </div>
        </div>

        <div className="button flex justify-center  pt-2 text-sm font-bold  pl-9 ">
          <button
            id="startRecordingButton5"
            onClick={() => handleStartRecording(6)}
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
    </div>

    <div className="block items-center justify-center h-auto p-8 ">
    <div className="border-2 border-cyan-700 pt-3 pb-4 rounded-3xl shadow-lg shadow-sky-900 " style={{ background: 'linear-gradient(to right, rgb(127, 161, 255,0.7), rgb(176, 195, 250,0.7))' }}>
        <h1 class=" text-gray-700 text-1xl pt-6 font-bold underline  font-serif">
          {" "}
          Incident Details
        </h1>
        <div className="flex justify-center space-x-12 pt-8">
          <div className="mb-4">
            <label
              htmlFor="paymentmethod"
              className="flex text-gray-700 text-sm font-bold mb-2 w-72"
            >
              Type Of Call
            </label>
            <select
              id="paymentmethod"
              className="block appearance-none w-72 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
              <option value="selectoption">Select Option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="paymentmethod"
              className="flex text-gray-700 text-sm font-bold mb-2 w-72"
            >
              Type Of Service Request
            </label>
            <select
              id="paymentmethod"
              className="block appearance-none w-72 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
              <option value="selectoption">Select Option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="paymentmethod"
              className="flex text-gray-700 text-sm font-bold mb-2 w-72"
            >
              Incident Location Type
            </label>
            <select
              id="paymentmethod"
              className="block appearance-none w-72 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
              <option value="selectoption">Select Option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="flex text-gray-700 text-sm font-bold mb-2 w-96 ">
              Incident Address
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows="2"
            />
          </div>
        </div>

        <div className="button flex justify-center  pt-2 text-sm font-bold  pl-9 ">
          <button className="w-40 h-14 bg-blue-500 rounded-2xl mr-4">
            Start Recording
          </button>
          <button className="w-40 h-14 bg-cyan-500 rounded-2xl">
            Stop Recording
          </button>
        </div>
      </div>
      </div>

      <div className="block items-center justify-center h-auto p-8 ">
    <div className="border-2 border-cyan-700 pt-3 pb-4 rounded-3xl shadow-lg shadow-sky-900 " style={{ background: 'linear-gradient(to right, rgb(127, 161, 255,0.7), rgb(176, 195, 250,0.7))' }}>
        <h1 class=" text-gray-700 text-1xl pt-6 font-bold underline  font-serif">
          {" "}
          Patient Details
        </h1>
        <div className="block sm:flex md:flex xl:flex justify-start max-w-md pl-6 space-x-12 pt-8 ml-9">
          <div className="button flex  pt-4 text-sm font-bold self-center ">
            <button className="w-64 h-16 bg-blue-500 rounded-3xl">
              Unique Patient ID QR code
            </button>
          </div>
          <div className="mb-4">
            <label className="flex text-gray-700 text-sm font-bold mb-2 w-36">
              Patient ID
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline space-x-20" />
          </div>
          <div className="mb-4">
            <label
              htmlFor="surname"
              className="flex text-gray-700 text-sm font-bold mb-2 w-36"
            >
              Surname
            </label>
            <select
              id="surname"
              className="block appearance-none w-36 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
              <option value="selectoption">Select Option</option>
              <option value="Mr.">Mr.</option>
              <option value="MRs.">MRs.</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="flex text-gray-700 text-sm font-bold mb-2 w-44">
              First Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
            />
          </div>
          <div className="mb-4">
            <label className="flex text-gray-700 text-sm font-bold mb-2 w-44">
              Middle Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
            />
          </div>
          <div className="mb-4">
            <label className="flex text-gray-700 text-sm font-bold mb-2 w-44">
              Last Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
            />
          </div>
          <div className="mb-4">
            <label className="flex text-gray-700 text-sm font-bold mb-2 w-60 ">
              Patient Address
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows="2"
            />
          </div>
        </div>
        <div className=" inline-block sm:flex md:flex xl:flex justify-start max-w-md pl-14 space-x-12 pt-8 ">
          <div className="mb-4">
            <label className="flex text-gray-700 text-sm font-bold mb-2 w-60 ">
              Patient Location
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows="2"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="patientPhoneNumber"
              className="flex text-gray-700 text-sm font-bold mb-2 w-40"
            >
              Contact PhoneNumber
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="patientPhoneNumber"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="ageunits"
              className="flex text-gray-700 text-sm font-bold mb-2 w-36"
            >
              Age Units
            </label>
            <select
              id="ageunits"
              className="block appearance-none w-36 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
              <option value="selectoption">Select Option</option>
              <option value="Years">Years</option>
              <option value="Months">Months</option>
              <option value="Days">Days</option>
            </select>
          </div>
          <div className="mb-4 ">
            <label className=" text-gray-700 text-sm font-bold mb-2 w-36  sm:w-56  sm:flex">
              Date of Birth
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              //   id="name"
              type="date"
              //   name="name"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="complaints"
              className="flex text-gray-700 text-sm font-bold mb-2 w-44"
            >
              Cheif Complaints
            </label>
            <select
              id="complaints"
              className="block appearance-none w-44 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
              <option value="selectoption">Select Option</option>
              {/* <option value="Years">Years</option>
              <option value="Months">Months</option>
              <option value="Days">Days</option> */}
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="cardiacarrest"
              className="flex text-gray-700 text-sm font-bold mb-2 w-52"
            >
              Pre Hospital Cardiac Arrest
            </label>
            <select
              id="cardiacarrest"
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
              <option value="selectoption">Select Option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor=" pregnency"
              className="flex text-gray-700 text-sm font-bold mb-2 w-56"
            >
              Pregnency
            </label>
            <select
              id=" pregnency"
              className="block appearance-none w-44 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
              <option value="selectoption">Select Option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
              <option value="Don't Know">Don't Know</option>
            </select>
          </div>
        </div>

        <div className="button flex justify-center  pt-2 text-sm font-bold  pl-9 ">
          <button
            id="startRecordingButton5"
            onClick={() => handleStartRecording(6)}
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
      </div>

      <div className="block items-center justify-center h-auto p-8 ">
    <div className="border-2 border-cyan-700 pt-3 pb-4 rounded-3xl shadow-lg shadow-sky-900 " style={{ background: 'linear-gradient(to right, rgb(127, 161, 255,0.7), rgb(176, 195, 250,0.7))' }}>
        <h1 class=" text-gray-700 text-1xl pt-6 font-bold underline  font-serif">
          {" "}
          EMT Examination Findings
        </h1>
        <div className="flex justify-center space-x-12 pt-8">
          <div className="mb-4 ">
            <label className=" text-gray-700 text-sm font-bold mb-2 w-36  sm:w-56  sm:flex">
              Date
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              //   id="name"
              type="date"
              //   name="name"
            />
          </div>

          <div className="mb-4 ">
            <label className=" text-gray-700 text-sm font-bold mb-2 w-36  sm:w-56  sm:flex">
              Time
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              //   id="name"
              type="time"
              //   name="name"
            />
          </div>

          <div className="mb-4">
            <label className="flex text-gray-700 text-sm font-bold mb-2 w-48">
              Initial HR Beats Per Minute
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline space-x-20" />
          </div>

          <div className="mb-4">
            <label className="flex text-gray-700 text-sm font-bold mb-2 w-48">
              Initial HR Breaths Per Minute
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline space-x-20" />
          </div>

          <div className="mb-4">
            <label className="flex text-gray-700 text-sm font-bold mb-2 w-60">
              Oxygen saturation ROom Air(%)
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline space-x-20" />
          </div>

          <div className="mb-4">
            <label className="flex text-gray-700 text-sm font-bold mb-2 w-48">
              Initial Pulse Rate
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline space-x-20" />
          </div>
        </div>
        <div className="  flex justify-center   space-x-12 pt-8 ">
          <div className="mb-4">
            <label
              htmlFor="bpmeasurment"
              className="flex text-gray-700 text-sm font-bold mb-2 w-44"
            >
              BP Measurement Method
            </label>
            <select
              id="bpmeasurment"
              className="block appearance-none w-44 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
              <option value="selectoption">Select Option</option>
              <option value="Aterial Line">Aterial Line</option>
              <option value="NIBP">NIBP</option>
              <option value="Manual BP">Manual BP</option>
              <option value="Palpatory">Palpatory</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="flex text-gray-700 text-sm font-bold mb-2 w-48">
              Initial Systolic BP MMHG
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline space-x-20" />
          </div>
          <div className="mb-4">
            <label className="flex text-gray-700 text-sm font-bold mb-2 w-48">
              Initial Diastolic BP MMHG
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline space-x-20" />
          </div>
          <div className="mb-4">
            <label
              htmlFor="consiousness"
              className="flex text-gray-700 text-sm font-bold mb-2 w-44"
            >
              Level Of Conciousness
            </label>
            <select
              id="consiousness"
              className="block appearance-none w-44 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
              <option value="selectoption">Select Option</option>
              <option value="Awake">Awake</option>
              <option value="Verbal">Verbal</option>
              <option value="Pain">Pain</option>
              <option value="Unresponsive">Unresponsive</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="flex text-gray-700 text-sm font-bold mb-2 w-80">
              Oxygen Saturation with the oxygen Therapy(%)
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline space-x-20" />
          </div>
          <div className="mb-4">
            <label
              htmlFor="skin"
              className="flex text-gray-700 text-sm font-bold mb-2 w-44"
            >
              Skin
            </label>
            <select
              id="skin"
              className="block appearance-none w-44 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
              <option value="selectoption">Select Option</option>
              <option value="Warm">Warm </option>
              <option value="Cool">Cool</option>
              <option value="Pink">Pink</option>
              <option value="Pale">Pale</option>
              <option value="Dry">Dry </option>
              <option value="Moist">Moist</option>
              <option value="Diaphotic">Diaphotic</option>
              <option value="Cyonatic">Cyonatic</option>
              <option value="SkinBleeding">SkinBleeding</option>
            </select>
          </div>
        </div>
        <div className="  flex justify-center   space-x-12 pt-8 ">
          <div className="mb-4">
            <label
              htmlFor="righpupil"
              className="flex text-gray-700 text-sm font-bold mb-2 w-44"
            >
              Right Pupil
            </label>
            <select
              id="righpupil"
              className="block appearance-none w-56 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
              <option value="selectoption">Select Option</option>
              <option value="Normally Reactive">Normally Reactive</option>
              <option value="Sluggishly Reactive">Sluggishly Reactive</option>
              <option value="Non Reactive">Non Reactive</option>
              <option value="Delated">Delated</option>
              <option value="Constictted">Constictted</option>
              <option value="Symetric">Symetric</option>
              <option value="Assymetric">Assymetric</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="leftpupil"
              className="flex text-gray-700 text-sm font-bold mb-2 w-44"
            >
              Left Pupil
            </label>
            <select
              id="leftpupil"
              className="block appearance-none w-56 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
              <option value="selectoption">Select Option</option>
              <option value="Normally Reactive">Normally Reactive</option>
              <option value="Sluggishly Reactive">Sluggishly Reactive</option>
              <option value="Non Reactive">Non Reactive</option>
              <option value="Delated">Delated</option>
              <option value="Constictted">Constictted</option>
              <option value="Symetric">Symetric</option>
              <option value="Assymetric">Assymetric</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="verbalresponse"
              className="flex text-gray-700 text-sm font-bold mb-2 w-44"
            >
              Best Verbal Response
            </label>
            <select
              id="verbalresponse"
              className="block appearance-none w-auto bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
              <option value="selectoption">Select Option</option>
              <option value="Makes no Sound">Makes no Sound</option>
              <option value="Incomphrensible sounds">
                Incomphrensible sounds
              </option>
              <option value="Inappropriate voice">Inappropriate voice</option>
              <option value="Confused and disoriented">
                Confused and disoriented but able to answer
              </option>
              <option value="Orientedto time ">
                Orientedto time person and place,converses normally
              </option>
              <option value="Non testable">Non testable</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="oscularresponse"
              className="flex text-gray-700 text-sm font-bold mb-2 w-44"
            >
              Best Oscular Response
            </label>
            <select
              id="oscularresponse"
              className="block appearance-none w-auto bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
              <option value="selectoptiMaon">Select Option</option>
              <option value="Does no open eyes">Does no open eyes</option>
              <option value="Opens eyes in response to pain">
                Opens eyes in response to pain
              </option>
              <option value="Opens eyes in response to voice">
                Opens eyes in response to voice
              </option>
              <option value="Opens eyes spontaneoulsy">
                Opens eyes spontaneoulsy
              </option>
              <option value="Orientedto time person and place,converses normally ">
                Orientedto time person and place,converses normally
              </option>
              <option value="Non testable">Non testable</option>
            </select>
          </div>
        </div>
        <div className="  flex justify-center   space-x-12 pt-8 ">
          <div className="mb-4">
            <label
              htmlFor="motorresponse"
              className="flex text-gray-700 text-sm font-bold mb-2 w-44"
            >
              Best Motor Response
            </label>
            <select
              id="motorresponse"
              className="block appearance-none w-auto bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
              <option value="selectoptiMaon">Select Option</option>
              <option value="Makes no Movement">Makes no Movement</option>
              <option value="Abnormal Extension">Abnormal Extension</option>
              <option value="Abnormal flexion">Abnormal flexion</option>
              <option value="Flexion/withdrawal from painfull stimuli">
                Flexion/withdrawal from painfull stimuli
              </option>
              <option value="Moves to localize pain ">
                Moves to localize pain
              </option>
              <option value="Obeys commands">Obeys commands</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="flex text-gray-700 text-sm font-bold mb-2 w-2">
              GCS
            </label>
            <input className="shadow appearance-none border rounded w-96 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline space-x-20" />
          </div>
          <div className="mb-4">
            <label
              htmlFor="GCS"
              className="flex text-gray-700 text-sm font-bold mb-2 w-44"
            >
              total GCS
            </label>
            <select
              id="GCS"
              className="block appearance-none w-auto bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
              <option value="selectoptiMaon">Select Option</option>
              <option value="Makes no Movement">Yes</option>
              <option value="Abnormal Extension">No</option>
            </select>
          </div>
        </div>

        <div className="button flex justify-center  pt-2 text-sm font-bold  pl-9 ">
          <button
            id="startRecordingButton5"
            onClick={() => handleStartRecording(6)}
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
    </div>
    </div>
  );
};

export default TransferinForm;