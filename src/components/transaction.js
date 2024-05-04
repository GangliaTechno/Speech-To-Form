import React from "react";

const Transaction = () => {
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
    <div className="border-2 border-cyan-700 pt-3 pb-4 rounded-3xl shadow-lg shadow-sky-900 " style={{ background: 'linear-gradient(to right, rgb(127, 161, 255), rgb(176, 195, 250))' }}>
        <h1 class="text-1xl pt-6 font-bold underline font-serif">
          {" "}
          Patient Counselling{" "}
        </h1>
        <div className=" block xl:flex justify-center   space-x-12 pt-8 ">
        
        
          <div className="mb-4">
            <label
              htmlFor="samplehistory"
              className="flex text-gray-700 text-sm font-bold mb-2 w-72"
            >
        SAMPLE History
            </label>
            <select
              id="samplehistory"
              className="block appearance-none w-72 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
              <option value="selectoption">Select Option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
              
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="detailedhistory"
              className="flex text-gray-700 text-sm font-bold mb-2 w-72"
            >
        Detailed History
            </label>
            <select
              id="detailedhistory"
              className="block appearance-none w-72 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
              <option value="selectoption">Select Option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
              
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="actiontoken"
              className="flex text-gray-700 text-sm font-bold mb-2 w-72"
            >
              Breaking The Bad News Done At
            </label>
            <input
              className="shadow appearance-none border rounded w-72 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="actiontoken"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="breakingbadnews"
              className="flex text-gray-700 text-sm font-bold mb-2 w-72"
            >
        Breaking Bad News
            </label>
            <select
              id="breakingbadnews"
              className="block appearance-none w-72 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
              <option value="selectoption">Select Option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
              
            </select>
          </div>
        
        </div>
        <div className=" block xl:flex justify-center   space-x-12 pt-8 ">
       
        <div className="mb-4">
            <label
              htmlFor="lifecarediscussion"
              className="flex text-gray-700 text-sm font-bold mb-2 w-72"
            >
        End Of Life Care Discussion
            </label>
            <select
              id="lifecarediscussion"
              className="block appearance-none w-72 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
              <option value="selectoption">Select Option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
              
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="costingcounselling"
              className="flex text-gray-700 text-sm font-bold mb-2 w-72"
            >
        Care Plan And Costing Counselling
            </label>
            <select
              id="costingcounselling"
              className="block appearance-none w-72 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
              <option value="selectoption">Select Option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
              
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="relation"
              className="flex text-gray-700 text-sm font-bold mb-2 w-80"
            >
        Relation
            </label>
            <select
              id="relation"
              className="block appearance-none w-80 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
              <option value="selectoption">Select Option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
              
            </select>
          </div>
         
          
        </div>   
        <div className="block  xl:flex justify-start ml-3 space-x-12 pt-8 ">
        <div className="mb-4 w-full mr-3">
              <label
                htmlFor="actiontoken"
                className=" block xl:flex text-gray-700 text-sm font-bold mb-2 w-96"
              >
                Name Of Next Of Kin
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="actiontoken"
              />
            </div>
        </div>
        <div className="block  xl:flex justify-start ml-3 space-x-12 pt-8 ">
        <div className="mb-4 w-full mr-3">
              <label
                htmlFor="actiontoken"
                className=" block xl:flex text-gray-700 text-sm font-bold mb-2 w-96"
              >
                Relation Other
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="actiontoken"
              />
            </div>
        </div>
        <div className=" block xl:flex justify-start space-x-12 pt-8 ml-3 ">
            <div className="mb-4 w-full mr-3">
              <label
                htmlFor="actiontoken"
                className="block xl:flex text-gray-700 text-sm font-bold mb-2 w-auto"
              >
                Name Of Other Kins Present During Counselling And Relation
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
      <div className="block items-center justify-center pb-3 pt-9 ">
      <div className="border-2 border-cyan-700 pt-3 pb-4 rounded-3xl shadow-lg shadow-sky-900 " style={{ background: 'linear-gradient(to right, rgb(127, 161, 255), rgb(176, 195, 250))' }}>
        <h1 class="text-1xl pt-6 font-bold underline font-serif">
          {" "}
          Death Intimation{" "}
        </h1>
        <div className=" block xl:flex justify-center   space-x-12 pt-8 ">
        <div className="mb-4 ">
            <label className="   text-gray-700 text-sm font-bold mb-2 w-36  sm:w-56  sm:flex">
              Time of Declaration Of Death
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
              htmlFor="declarationofdeath"
              className="flex text-gray-700 text-sm font-bold mb-2 w-72"
            >
        Declaration Of Death
            </label>
            <select
              id="declarationofdeath"
              className="block appearance-none w-72 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
              <option value="selectoption">Select Option</option>
              <option value="yes">Yes</option>
              <option value="No">No</option>
             
            </select>
          </div>
        </div>
        <div className=" block xl:flex justify-center   space-x-12 pt-8 ">
        <h1 class="text-1xl pt-6 font-bold underline font-serif">
          {" "}
          Consent Taking Discussion{" "}
        </h1></div>
        <div className=" block xl:flex justify-center   space-x-12 pt-8 ">
        <div className="mb-4">
            <label
              htmlFor="consentdiscussion"
              className="flex text-gray-700 text-sm font-bold mb-2 w-72"
            >
        Consent Discussion
            </label>
            <select
              id="consentdiscussion"
              className="block appearance-none w-72 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
              <option value="selectoption">Select Option</option>
              <option value="yes">Yes</option>
              <option value="No">No</option>
             
            </select>
          </div>

          <div className="mb-4 ">
            <label className="   text-gray-700 text-sm font-bold mb-2 w-36  sm:w-56  sm:flex">
            Consent Discussion Time
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
              htmlFor="insurrencecounselling"
              className="flex text-gray-700 text-sm font-bold mb-2 w-72"
            >
        Insurrence Counselling
            </label>
            <select
              id="insurrencecounselling"
              className="block appearance-none w-72 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
              <option value="selectoption">Select Option</option>
              <option value="yes">Yes</option>
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

export default Transaction;
