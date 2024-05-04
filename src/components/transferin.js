import React,{useState} from "react";

const TransferinForm = () => {
  const [stopRecording, setStopRecording] = useState(false);

  const handleStartRecording = async (section) => {
    // Set the section property
    console.log('Section:', section);

    // Call the function to send data to backend
    await sendDataToBackend(section);
  };

  const handleStopRecording = async (section_stop) => {
    setStopRecording(true);
    try{
      const response = await fetch('http://localhost:5000/stop_recording');
      const data = await response.json();
      console.log("Received response from backend:", data);
      console.log("Received response from stop recording");
  
      const geminiResponse = data.gemini_response;
      if (geminiResponse) {
        if(section_stop===4){
          let transportby_html = document.getElementById('transportby');
          let bedBookedAvailable_html = document.getElementById('bedBookedAvailable');
          let dateOfCall_html = document.getElementById('dateOfCall');
          let timeOfCall_html = document.getElementById('timeOfCall');
          let calledfrom_html = document.getElementById('calledfrom');
          let calledby_html = document.getElementById('calledby');
          let PhoneNumber_html = document.getElementById('PhoneNumber');
          let actiontoken_html = document.getElementById('actiontoken');
          let emdid_html = document.getElementById('emdid');
          let driverid_html = document.getElementById('driverid');
          let vehiclenumber_html = document.getElementById('vehiclenumber');
          let paymentmethod_html = document.getElementById('paymentmethod');
          let vehicletype_html = document.getElementById('vehicletype');

          transportby_html.selectedIndex = parseInt(geminiResponse["Patient_was_transported_by"])+1;
          bedBookedAvailable_html.selectedIndex = parseInt(geminiResponse["Bed_Booked_and_Available"])+1;
          dateOfCall_html.value = geminiResponse["Date_of_Call"];
          timeOfCall_html.value = geminiResponse["Time_of_Call"];
          calledfrom_html.value = geminiResponse["Called_from"];
          calledby_html.value = geminiResponse["Called_By"];
          PhoneNumber_html.value = parseInt(geminiResponse["Mobile_Number"]);
          actiontoken_html.selectedIndex = parseInt(geminiResponse["Action_Taken"])+1;
          emdid_html.value = geminiResponse["EMD_ID"]
          driverid_html.value = geminiResponse["Driver_id"];
          vehiclenumber_html.value = geminiResponse["Vehicle_Number"];
          paymentmethod_html.selectedIndex = parseInt(geminiResponse["Payment_Method"])+1;
          vehicletype_html.selectedIndex = parseInt(geminiResponse["Vehicle_Type"])+1;

        }else if(section_stop===5){

          let estimatedTimeOfOnset_html = document.getElementById('estimatedTimeOfOnset');
          let initialCallForHelp_html = document.getElementById('initialCallForHelp');
          let unitNotified_html = document.getElementById('unitNotified');
          let unitReaching_html = document.getElementById('unitReaching');
          let unitInitiatingCare_html = document.getElementById('unitInitiatingCare');
          let unitLeft_html = document.getElementById('unitLeft');
          let patientReachingDestination_html = document.getElementById('patientReachingDestination');
          let patientDisposition_html = document.getElementById('patientDisposition');
          let incidentlocation_html = document.getElementById('incidentlocation');

          estimatedTimeOfOnset_html.value = geminiResponse["Estimated_Time_of_onset"];
          initialCallForHelp_html.selectedIndex = parseInt(geminiResponse["Initial_call_for_help"])+1;
          unitNotified_html.selectedIndex =parseInt(geminiResponse["Unit_Notified_By_Dispatch"])+1;
          unitReaching_html.selectedIndex =parseInt(geminiResponse["Unit_Reching_Incident_Site"])+1;
          unitInitiatingCare_html.selectedIndex =parseInt(geminiResponse["Unit_Initiating_Patient_Care"])+1;
          unitLeft_html.selectedIndex =parseInt(geminiResponse["Unit_Left_Scene"])+1;
          patientReachingDestination_html.selectedIndex =parseInt(geminiResponse["Patient_Reaching_Destination"])+1;
          patientDisposition_html.selectedIndex = parseInt(geminiResponse["Incident_Patient_Disposition"])+1;
          incidentlocation_html.value = geminiResponse["Incident_Location"];

        } else if(section_stop===6){
          const typeofcall_html = document.getElementById('typeofcall');
          const typeOfServiceRequest_html = document.getElementById('typeOfServiceRequest');
          const incidentLocationType_html = document.getElementById('incidentLocationType');
          const incidentAddress_html = document.getElementById('incidentAddress');

          typeofcall_html.value = geminiResponse["Type_Of_Call"];
          typeOfServiceRequest_html.value = geminiResponse["Type_Of_Service_Request"];
          incidentLocationType_html.value = geminiResponse["Incident_Location_Type"];
          incidentAddress_html.value = geminiResponse["Incident_Address"];

        } else if(section_stop==7){
          let patientID_html = document.getElementById('patientID');
          let surname_html = document.getElementById('surname');
          let firstName_html = document.getElementById('firstName')
          let middleName_html = document.getElementById('middleName');
          let lastName_html = document.getElementById('lastName');
          let patientAddress_html = document.getElementById('patientAddress')
          let patientLocation_html = document.getElementById('patientLocation')
          let patientPhoneNumber_html = document.getElementById('patientPhoneNumber');
          let ageunits_html = document.getElementById('ageunits');
          let dateOfBirth_html = document.getElementById('dateOfBirth')
          let complaints_html = document.getElementById('complaints')
          let cardiacarrest_html = document.getElementById('cardiacarrest')
          let pregnency_html = document.getElementById('pregnency')


          patientID_html.value = geminiResponse["Patient_ID"];
          surname_html.selectedIndex = parseInt(geminiResponse["Surname"])+1;
          firstName_html.value = geminiResponse["First_Name"];
          middleName_html.value = geminiResponse["Middle_Name"];
          lastName_html.value = geminiResponse["Last_Name"];
          patientAddress_html.value = geminiResponse["Patient_Address"];
          patientLocation_html.value = geminiResponse["Patient_Location"];
          
          let phoneNumberWithoutSpaces = geminiResponse["Contact_PhoneNumber"].replace(/\s/g, "");
          patientPhoneNumber_html.value = phoneNumberWithoutSpaces;
          ageunits_html.selectedIndex = parseInt(geminiResponse["Age_Units"])+1;
          dateOfBirth_html.value = geminiResponse["Date_of_Birth"];
          complaints_html.value = geminiResponse["Cheif_Complaints"];
          cardiacarrest_html.selectedIndex = parseInt(geminiResponse["Pre_Hospital_Cardiac_Arrest"])+1;
          pregnency_html.selectedIndex = parseInt(geminiResponse["Pregnency"])+1;

        }else if(section_stop==8){

          let date_html = document.getElementById('date')
          let time_html = document.getElementById('time')
          let initialHRBeats_html = document.getElementById('initialHRBeats')
          let initialHRBreaths_html = document.getElementById('initialHRBreaths')
          let oxygenSaturation_html = document.getElementById('oxygenSaturation');
          let initialPulse_html = document.getElementById('initialPulse')
          let bpmeasurment_html = document.getElementById('bpmeasurment')
          let initialSystolicBP_html = document.getElementById('initialSystolicBP')
          let diastolicBP_html = document.getElementById('diastolicBP');
          let consiousness_html = document.getElementById('consiousness')
          let oxygensaturationTherapy_html = document.getElementById('oxygensaturationTherapy')
          let skin_html = document.querySelectorAll('input[name="skin[]"]');
          let rightPupil_html = document.querySelectorAll('input[name="rightPupil[]"]');
          let leftPupil_html = document.querySelectorAll('input[name="leftPupil[]"]')
          let verbalresponse_html = document.getElementById('verbalresponse')
          let motorresponse_html = document.getElementById('motorresponse')
          let oscularresponse_html = document.getElementById('oscularresponse')
          let gcs_html = document.getElementById('gcs')
          let Total_GCS_html = document.getElementById('Total_GCS')

          date_html.value = geminiResponse["date"];
          time_html.value = geminiResponse["time"];
          initialHRBeats_html.value = parseInt(geminiResponse["heart_rate"]);
          initialHRBreaths_html.value = parseInt(geminiResponse["rr_breath_rate"]);
          oxygenSaturation_html.value = parseInt(geminiResponse["oxygen_saturation_room_air"]);
          initialPulse_html.value = parseInt(geminiResponse["initial_pulse_rate"]);
          bpmeasurment_html.selectedIndex =parseInt(geminiResponse["BP_Measurment_Method"])+1;
          initialSystolicBP_html.value = parseInt(geminiResponse["initial_systolic_bp"]);
          diastolicBP_html.value = parseInt(geminiResponse["initial_diastolic_bp"]);
          consiousness_html.selectedIndex = parseInt(geminiResponse["level_of_consciousness"])+1;
          oxygensaturationTherapy_html.value = parseInt(geminiResponse["Oxygen_Saturation_with_oxygen_therapy"]);
          verbalresponse_html.selectedIndex = parseInt(geminiResponse["Best_Verbal_Response"])+1;
          oscularresponse_html.selectedIndex = parseInt(geminiResponse["Best_Ocular_Response"])+1;
          motorresponse_html.selectedIndex = parseInt(geminiResponse["Best_Motor_Response"])+1;
          gcs_html.value = parseInt(geminiResponse["GCS"]);
          Total_GCS_html.value = parseInt(geminiResponse["Total_GCS"]);

          let Skin_indexes = geminiResponse["skin"];
          let Right_Pupil_indexes = geminiResponse["right_pupil"];
          let Left_pupil_indexes = geminiResponse["left_pupil"];

          Skin_indexes.forEach(element => {
            const checkboxIndex = parseInt(element);
            skin_html[checkboxIndex].checked = true;
          });

          Right_Pupil_indexes.forEach(element => {
            const checkboxIndex = parseInt(element);
            rightPupil_html[checkboxIndex].checked = true;
          });

          Left_pupil_indexes.forEach(element => {
            const checkboxIndex = parseInt(element);
            leftPupil_html[checkboxIndex].checked = true;
          });
        }

       } else {
          console.log("Not received the response");
        }
      }catch(error){
        console.log(error);
      }
      };

      const sendDataToBackend = async (section) => {
        try {
          const response = await fetch('http://localhost:5000/start_recording', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ additional_variable: section })
          });
          const data = await response.json();
          console.log(data);
          stopRecording = false;
        } catch (error) {
          console.error('Error starting recording:', error);
        }
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
              id="transportby"
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
              htmlFor="bedBookedAvailable"
              className="flex text-gray-700 text-sm font-bold mb-2 w-72"
            >
              Bed Booked And Available
            </label>
            <select
              id="bedBookedAvailable"
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
            KH MARS Response and Vehicle Details
          </h1>
        </div>

        <div className="flex justify-center space-x-10 pt-8">
          <div className="mb-4 ">
            <label htmlFor="dateOfCall" className=" text-gray-700 text-sm font-bold mb-2 w-36  sm:w-56  sm:flex">
              Date of Call
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="dateOfCall"
              type="date"
              //   name="name"
            />
          </div>
          <div className="mb-4 ">
            <label htmlFor="timeOfCall" className=" text-gray-700 text-sm font-bold mb-2 w-36  sm:w-56  sm:flex">
              Time of Call
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="timeOfCall"
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
              id="calledfrom"
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
              id="calledby"
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
              type="number"
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
            <select
              id="actiontoken"
              className="block appearance-none w-72 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
              <option value="selectoption">Select Option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="emdid"
              className="flex text-gray-700 text-sm font-bold mb-2 w-52"
            >
              EMT ID
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="emdid"
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
              <option value="Cash">Cash</option>
              <option value="Card">Card</option>
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
              <option value="2 Wheeler">2 Wheeler</option>
              <option value="4 Wheeler">4 Wheeler</option>
            </select>
          </div>
        </div>
        <div className="button flex justify-center  pt-2 text-sm font-bold  pl-9 ">
          <button
            button id="startRecordingButton1" onClick={() => handleStartRecording(4)} className="w-40 h-14 bg-blue-500 rounded-2xl mr-4"
          >
            Start Recording
          </button>
          <button
            id="stopRecordingButton1" onClick={() => handleStopRecording(4)} className="w-40 h-14  bg-cyan-500 rounded-2xl"
          >
            Stop Recording
          </button>
        </div>
      </div>
      <div className="block tems-center justify-center h-auto pt-9">
     <div className="border-2 border-cyan-700 pt-3 pb-4 rounded-3xl shadow-lg shadow-sky-900 " style={{ background: 'linear-gradient(to right, rgb(127, 161, 255,0.7), rgb(176, 195, 250,0.7))' }}>
        <div className="flex justify-center space-x-4 pt-8">
          <div className="mb-4 ">
            <label htmlFor="estimatedTimeOfOnset" className=" text-gray-700 text-sm font-bold mb-2 w-36  sm:w-56  sm:flex">
              Estimated Time of onset
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="estimatedTimeOfOnset"
                type="time"
              //   name="name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="initialCallForHelp" className="flex text-gray-700 text-sm font-bold mb-2 w-52">
              Initial Call For Help
            </label>
            <select
            id="initialCallForHelp"
              className="block appearance-none w-44 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
              <option value="select option">Select Option</option>
              <option value="No" >No</option>
              <option value="yes">Yes</option>
            </select>

          </div>

          <div className="mb-4">
            <label htmlFor="unitNotified" className="flex text-gray-700 text-sm font-bold mb-2 w-44">
              Unit Notified By Dispatch
            </label>
            <select
            id="unitNotified"
              className="block appearance-none w-44 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
              <option value="select option">Select Option</option>
              <option value="No" >No</option>
              <option value="yes">Yes</option>
            </select>

            
          </div>
          <div className="mb-4">
            <label htmlFor="unitReaching" className="flex text-gray-700 text-sm font-bold mb-2 w-48">
              Unit Reching incident site
            </label>
            <select
            id="unitReaching"
              className="block appearance-none w-44 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
              <option value="select option">Select Option</option>
              <option value="No" >No</option>
              <option value="yes">Yes</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="unitInitiatingCare" className="flex text-gray-700 text-sm font-bold mb-2 w-48">
              Unit Initiating Patient Care
            </label>
            <select
            id="unitInitiatingCare"
              className="block appearance-none w-44 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
              <option value="select option">Select Option</option>
              <option value="No" >No</option>
              <option value="yes">Yes</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="unitLeft" className="flex text-gray-700 text-sm font-bold mb-2 w-32">
              Unit Left Scene
            </label>
            <select
            id="unitLeft"
              className="block appearance-none w-44 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
              <option value="select option">Select Option</option>
              <option value="No" >No</option>
              <option value="yes">Yes</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="patientReachingDestination" className="flex text-gray-700 text-sm font-bold mb-2 w-48">
              Patient Reaching Destination
            </label>
            <select
            id="patientReachingDestination"
              className="block appearance-none w-44 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
              <option value="select option">Select Option</option>
              <option value="No" >No</option>
              <option value="yes">Yes</option>
            </select>
          </div>
        </div>
        <div className="flex justify-center space-x-12 pt-8">
          <div className="mb-4">
            <label
              htmlFor="patientDisposition"
              className="flex text-gray-700 text-sm font-bold mb-2 w-56"
            >
              Incident Patient Disposition
            </label>
            <select
              id="patientDisposition"
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
            <label htmlFor="incidentlocation" className="flex text-gray-700 text-sm font-bold mb-2 w-96 ">
              Incident Location
            </label>
            <textarea
            id="incidentlocation"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows="2"
            />
          </div>
        </div>

        <div className="button flex justify-center  pt-2 text-sm font-bold  pl-9 ">
          <button
            id="startRecordingButton2" onClick={() => handleStartRecording(5)} className="w-40 h-14 bg-blue-500 rounded-2xl mr-4"
          >
            Start Recording
          </button>
          <button
            id="stopRecordingButton2" onClick={() => handleStopRecording(5)} className="w-40 h-14  bg-cyan-500 rounded-2xl"
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
              htmlFor="typeofcall"
              className="flex text-gray-700 text-sm font-bold mb-2 w-72"
            >
              Type Of Call
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="typeofcall"
              type="textbox"
            /> 
          </div>
          <div className="mb-4">
            <label
              htmlFor="typeOfServiceRequest"
              className="flex text-gray-700 text-sm font-bold mb-2 w-72"
            >
              Type Of Service Request
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="typeOfServiceRequest"
              type="textbox"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="incidentLocationType"
              className="flex text-gray-700 text-sm font-bold mb-2 w-72"
            >
              Incident Location Type
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="incidentLocationType"
              type="textbox"
            />
          </div>

          <div className="mb-4">
            <label className="flex text-gray-700 text-sm font-bold mb-2 w-96 "
            htmlFor="incidentAddress"
            >
              Incident Address
            </label>
            <textarea
              id="incidentAddress"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows="2"
            />
          </div>
        </div>

        <div className="button flex justify-center  pt-2 text-sm font-bold  pl-9 ">
          <button id="startRecordingButton3" onClick={() => handleStartRecording(6)} className="w-40 h-14 bg-blue-500 rounded-2xl mr-4">
            Start Recording
          </button>
          <button id="stopRecordingButton3" onClick={() => handleStopRecording(6)} className="w-40 h-14  bg-cyan-500 rounded-2xl">
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
            <label className="flex text-gray-700 text-sm font-bold mb-2 w-36"
            htmlFor="patientID"
            >
            Patient ID
            </label>
            <input id="patientID"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline space-x-20" />
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
            <label className="flex text-gray-700 text-sm font-bold mb-2 w-44"
            htmlFor="firstName"
            >
              First Name
            </label>
            <input
            id="firstName"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            />
          </div>
          <div className="mb-4">
            <label className="flex text-gray-700 text-sm font-bold mb-2 w-44" htmlFor="middleName">
              Middle Name
            </label>
            <input
            id="middleName"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
            />
          </div>
          <div className="mb-4">
            <label className="flex text-gray-700 text-sm font-bold mb-2 w-44" htmlFor="lastName">
              Last Name
            </label>
            <input
            id="lastName"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            />
          </div>
          <div className="mb-4">
            <label className="flex text-gray-700 text-sm font-bold mb-2 w-60 " htmlFor="patientAddress">
              Patient Address
            </label>
            <textarea
            id="patientAddress"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows="2"
            />
          </div>
        </div>
        <div className=" inline-block sm:flex md:flex xl:flex justify-start max-w-md pl-14 space-x-12 pt-8 ">
          <div className="mb-4">
            <label className="flex text-gray-700 text-sm font-bold mb-2 w-60 " htmlFor="patientLocation">
              Patient Location
            </label>
            <textarea
              id="patientLocation"
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
              type="number"
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
            <label className=" text-gray-700 text-sm font-bold mb-2 w-36  sm:w-56  sm:flex" htmlFor="dateOfBirth">
              Date of Birth
            </label>
            <input
              id="dateOfBirth"
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
            <input
              id="complaints"
              className="block appearance-none w-44 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            />
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
              htmlFor="pregnency"
              className="flex text-gray-700 text-sm font-bold mb-2 w-56"
            >
              Pregnency
            </label>
            <select
              id="pregnency"
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
            id="startRecordingButton4" onClick={() => handleStartRecording(7)} className="w-40 h-14 bg-blue-500 rounded-2xl mr-4"
          >
            Start Recording
          </button>
          <button
            id="stopRecordingButton4" onClick={() => handleStopRecording(7)} className="w-40 h-14  bg-cyan-500 rounded-2xl"
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
            <label className=" text-gray-700 text-sm font-bold mb-2 w-36  sm:w-56  sm:flex"
            htmlFor="date"
            >
              Date
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="date"
              type="date"
              //   name="name"
            />
          </div>

          <div className="mb-4 ">
            <label className=" text-gray-700 text-sm font-bold mb-2 w-36  sm:w-56  sm:flex"
            htmlFor="time"
            >
              Time
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="time"
              type="time"
              //   name="name"
            />
          </div>

          <div className="mb-4">
            <label className="flex text-gray-700 text-sm font-bold mb-2 w-48"
            htmlFor="initialHRBeats"
            >
              Initial HR Beats Per Minute
            </label>
            <input id="initialHRBeats" type="number" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline space-x-20" />
          </div>

          <div className="mb-4">
            <label  htmlFor="initialHRBreaths" className="flex text-gray-700 text-sm font-bold mb-2 w-48">
              Initial HR Breaths Per Minute
            </label>
            <input id="initialHRBreaths" type="number" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline space-x-20" />
          </div>
 
          <div className="mb-4">
            <label htmlFor="oxygenSaturation" className="flex text-gray-700 text-sm font-bold mb-2 w-60">
              Oxygen saturation ROom Air(%)
            </label>
            <input id="oxygenSaturation" type="number" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline space-x-20" />
          </div>

          <div className="mb-4">
            <label htmlFor="initialPulse" className="flex text-gray-700 text-sm font-bold mb-2 w-48">
              Initial Pulse Rate
            </label>
            <input id="initialPulse" type="number" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline space-x-20" />
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
              id="bpmeasurment" className="block appearance-none w-44 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
              <option value="selectoption">Select Option</option>
              <option value="Aterial Line">Aterial Line</option>
              <option value="NIBP">NIBP</option>
              <option value="Manual BP">Manual BP</option>
              <option value="Palpatory">Palpatory</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="initialSystolicBP" className="flex text-gray-700 text-sm font-bold mb-2 w-48">
              Initial Systolic BP MMHG
            </label>
            <input id="initialSystolicBP" type="number" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline space-x-20" />
          </div>
          <div className="mb-4">
            <label htmlFor="diastolicBP" className="flex text-gray-700 text-sm font-bold mb-2 w-48">
              Initial Diastolic BP MMHG
            </label>
            <input id="diastolicBP" type="number" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline space-x-20" />
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
            <label htmlFor="oxygensaturationTherapy" className="flex text-gray-700 text-sm font-bold mb-2 w-80">
              Oxygen Saturation with the oxygen Therapy(%)
            </label>
            <input
            type="number"
            id="oxygensaturationTherapy"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline space-x-20" />
          </div>
          {/* <div className="mb-4">
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
          </div> */}
          <div class="mb-4">
            <label for="skin" class="flex text-gray-700 text-sm font-bold mb-2 w-44">
              Skin
            </label>
            <div class="flex flex-wrap" id="checkboxesContainer">
              <label class="inline-flex items-center mr-4">
                <input type="checkbox" name="skin[]" value="Warm" class="mr-2"/>
                Warm
              </label>
              <label class="inline-flex items-center mr-4">
                <input type="checkbox" name="skin[]" value="Cool" class="mr-2"/>
                Cool
              </label>
              <label class="inline-flex items-center mr-4">
                <input type="checkbox" name="skin[]" value="Pink" class="mr-2"/>
                Pink
              </label>
              <label class="inline-flex items-center mr-4">
                <input type="checkbox" name="skin[]" value="Pale" class="mr-2"/>
                Pale
              </label>
              <label class="inline-flex items-center mr-4">
                <input type="checkbox" name="skin[]" value="Dry" class="mr-2"/>
                Dry
              </label>
              <label class="inline-flex items-center mr-4">
                <input type="checkbox" name="skin[]" value="Moist" class="mr-2"/>
                Moist
              </label>
              <label class="inline-flex items-center mr-4">
                <input type="checkbox" name="skin[]" value="Diaphotic" class="mr-2"/>
                Diaphotic
              </label>
              <label class="inline-flex items-center mr-4">
                <input type="checkbox" name="skin[]" value="Cyonatic" class="mr-2"/>
                Cyonatic
              </label>
              <label class="inline-flex items-center mr-4">
                <input type="checkbox" name="skin[]" value="SkinBleeding" class="mr-2"/>
                SkinBleeding
              </label>
            </div>
          </div>
        

        </div>
        <div className="  flex justify-center   space-x-12 pt-8 ">
          <div className="mb-4">
            <label
              for="righpupil"
              className="flex text-gray-700 text-sm font-bold mb-2 w-44"
            >
              Right Pupil
            </label>
            
            <label class="inline-flex items-center mr-4">
                <input type="checkbox" name="rightPupil[]" value="Normally Reactive" class="mr-2"/>
                Normally Reactive
            </label>

            <label class="inline-flex items-center mr-4">
                <input type="checkbox" name="rightPupil[]" value="Sluggishly Reactive" class="mr-2"/>
                Sluggishly Reactive
            </label>

            <label class="inline-flex items-center mr-4">
                <input type="checkbox" name="rightPupil[]" value="Non Reactive" class="mr-2"/>
                Non Reactive
            </label>

            <label class="inline-flex items-center mr-4">
                <input type="checkbox" name="rightPupil[]" value="Delated" class="mr-2"/>
                Delated
            </label>

            <label class="inline-flex items-center mr-4">
                <input type="checkbox" name="rightPupil[]" value="Constictted" class="mr-2"/>
                Constictted
            </label>

            <label class="inline-flex items-center mr-4">
                <input type="checkbox" name="rightPupil[]" value="Symetric" class="mr-2"/>
                Symetric
            </label>

            <label class="inline-flex items-center mr-4">
                <input type="checkbox" name="rightPupil[]" value="Assymetric" class="mr-2"/>
                Assymetric
            </label>
          </div>

          <div className="mb-4">
            <label
              for="leftPupil"
              className="flex text-gray-700 text-sm font-bold mb-2 w-44"
            >
              Left Pupil
            </label>
            
            <label class="inline-flex items-center mr-4">
                <input type="checkbox" name="leftPupil[]" value="Normally Reactive" class="mr-2"/>
                Normally Reactive
            </label>

            <label class="inline-flex items-center mr-4">
                <input type="checkbox" name="leftPupil[]" value="Sluggishly Reactive" class="mr-2"/>
                Sluggishly Reactive
            </label>

            <label class="inline-flex items-center mr-4">
                <input type="checkbox" name="leftPupil[]" value="Non Reactive" class="mr-2"/>
                Non Reactive
            </label>

            <label class="inline-flex items-center mr-4">
                <input type="checkbox" name="leftPupil[]" value="Delated" class="mr-2"/>
                Delated
            </label>

            <label class="inline-flex items-center mr-4">
                <input type="checkbox" name="leftPupil[]" value="Constictted" class="mr-2"/>
                Constictted
            </label>

            <label class="inline-flex items-center mr-4">
                <input type="checkbox" name="leftPupil[]" value="Symetric" class="mr-2"/>
                Symetric
            </label>

            <label class="inline-flex items-center mr-4">
                <input type="checkbox" name="leftPupil[]" value="Assymetric" class="mr-2"/>
                Assymetric
            </label>
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
                Oriented to time person and place,converses normally
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
            <label className="flex text-gray-700 text-sm font-bold mb-2 w-2"
            htmlFor="gcs"
            >
              GCS
            </label>
            <input className="shadow appearance-none border rounded w-96 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline space-x-20" 
              type="number"
              id="gcs"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="Total_GCS"
              className="flex text-gray-700 text-sm font-bold mb-2 w-44"
            >
              total GCS
            </label>
            <input className="shadow appearance-none border rounded w-96 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline space-x-20" 
              type="number"
              id="Total_GCS"
            />
          </div>
        </div>

        <div className="button flex justify-center  pt-2 text-sm font-bold  pl-9 ">
          <button
            id="startRecordingButton5" onClick={() => handleStartRecording(8)} className="w-40 h-14 bg-blue-500 rounded-2xl mr-4"
          >
            Start Recording
          </button>
          <button
            id="stopRecordingButton5" onClick={() => handleStopRecording(8)} className="w-40 h-14  bg-cyan-500 rounded-2xl"
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