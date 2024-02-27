import React from 'react';


const TriageForm = () => {
  // let stopRecording = false;

  let stopRecording =false;

  const handleStartRecording = (section) => {
    // Set the section property
    console.log('Section:', section);

    // Call the function to send data to backend
    sendDataToBackend(section);
  };


  const handleStopRecording = (section_stop) => {
    stopRecording=true;
    fetch('http://localhost:5000/stop_recording', {
      method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
      console.log("Received response from backend:", data);
      console.log("received response from stop recodirng");

      const geminiResponse = data.gemini_response;
      if (geminiResponse) {

        if(section_stop===5){

          const triageid_html = document.getElementById('triageid');
          const namegivenatTriage_html = document.getElementById('namegivenatTriage');
          const massCasualtySelect_html = document.getElementById('massCasualtySelect');
          const no_of_patients_html = document.getElementById('no_of_patients');
          const age_html = document.getElementById('age');
          const maritialStatus_html = document.getElementById('maritialStatus');
          const address_html = document.getElementById('address');
          const gender_html = document.getElementById('gender');


          triageid_html.value = geminiResponse["Triage_Id"];
          namegivenatTriage_html.value = geminiResponse["Name_given_at_the_Triage"];
          massCasualtySelect_html.selectedIndex = parseInt(geminiResponse["Is_the_patient_a_victim_of_mass_casualty"])+1;
          no_of_patients_html.value = parseInt(geminiResponse["Number_of_patients_affected_in_the_same_incident"]);
          age_html.value = parseInt(geminiResponse["Age"]);
          maritialStatus_html.selectedIndex = parseInt(geminiResponse["Maritial_Status"])+1;
          address_html.value = geminiResponse["Address"];
          gender_html.selectedIndex = parseInt(geminiResponse["Gender"])+1;
      }
      else if (section_stop===6){
        const triage_date_html = document.getElementById('triage_date');
        const triageTime_html = document.getElementById('triageTime');
        const chiefCompliant_html = document.getElementById('chiefCompliant');
        const duration_html = document.getElementById('duration');
        const nurseSendTo_html = document.getElementById('nurseSendTo');
        const emergencySecurityIndex_html = document.getElementById('emergencySecurityIndex');
        const nurseRemarks_html = document.getElementById('nurseRemarks');
        const visitortag_html = document.getElementById('visitortag');
        const registrationDesk_html = document.getElementById('registrationDesk');
        const triageNurseDetails_html = document.getElementById('triageNurseDetails');

        triage_date_html.value = geminiResponse["Triage_date"];
        triageTime_html.value = geminiResponse["Triage_time"];
        chiefCompliant_html.value = geminiResponse["Cheif_presenting_complaint"];
        duration_html.value = parseInt(geminiResponse["Duration_of_symptoms_in_Days"]);
        nurseSendTo_html.selectedIndex = parseInt(geminiResponse["Nurse_Send_to"]+1);
        emergencySecurityIndex_html.selectedIndex = parseInt(geminiResponse["Emergency_Security_Index_Trialge_Nurse"])+1;
        nurseRemarks_html.value = geminiResponse["Remarks_on_Nurse_Triage"];
        visitortag_html.selectedIndex = parseInt(geminiResponse["Visitor_id_tag_provided"])+1;
        registrationDesk_html.selectedIndex = parseInt(geminiResponse["Register_desk_activated"])+1;
        triageNurseDetails_html.value = geminiResponse["Triage_nurse_Details"];
      }
       else if(section_stop===7){
        const physicalDate_html = document.getElementById('physicalDate');
        const Physicaltime_html = document.getElementById('Physicaltime');
        const emergencyPhysicianTriage_html = document.getElementById('emergencyPhysicianTriage');
        const EMConcurence_html = document.getElementById('EMConcurence');
        const PhysicianAdmission_html = document.getElementById('PhysicianAdmission');
        const emergencySecurityIndexPhysician_html = document.getElementById('emergencySecurityIndexPhysician');
        const remarksforTriage_html = document.getElementById('remarksforTriage');
        const Majorclassification_html = document.getElementById('Majorclassification');
        const medicalogicalcase_html = document.getElementById('medicalogicalcase');

        physicalDate_html.value = geminiResponse["Physical_Triage_date"];
        Physicaltime_html.value = geminiResponse["Physical_Triage_time"];
        emergencyPhysicianTriage_html.selectedIndex = parseInt(geminiResponse["Emergency_Physician_Triage"])+1;
        EMConcurence_html.selectedIndex = parseInt(geminiResponse["EM_Physician_Concurence_with_nurse_triage"])+1;
        PhysicianAdmission_html.selectedIndex = parseInt(geminiResponse["Physician_Admission"])+1;
        emergencySecurityIndexPhysician_html.selectedIndex = parseInt(geminiResponse["Emergency_severity_index_physician_Triage"])+1;
        remarksforTriage_html.value = geminiResponse["Remarks_for_Triage"];
        Majorclassification_html.selectedIndex =parseInt(geminiResponse["Major_classification_of_case"])+1;
        medicalogicalcase_html.selectedIndex = parseInt(geminiResponse["medicalogical_case"])+1;
        
      }

     }
      
      else {
        console.log("Not received the response");
      }
    })
    .catch(error => console.error('Error stopping recording:', error));
  };

  const sendDataToBackend = (section) => {
    // Send data to backend
    fetch('http://localhost:5000/start_recording', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ additional_variable: section })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);

      stopRecording=false;
    })
    .catch(error => console.error('Error starting recording:', error));
  };

  return (
    <div>
      <div className="border-b-4 h-auto pb-4">
        <div className="block sm:flex md:flex xl:flex justify-start max-w-md pl-6 space-x-12 pt-8 ">
          <div className="button flex  pt-4 text-sm font-bold self-center pl-9">
            <button className="w-56 h-16 bg-blue-500 rounded-3xl">
              Create Unique Triage ID
            </button>
          </div>
          <div className="mb-4 ">
            <label htmlFor='triageid' className=" text-gray-700 text-sm font-bold mb-2 w-36  sm:w-56  sm:flex">
              Triage id
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="triageid"
                type="text"
              //   name="name"
            />
          </div>
          <div className="mb-4">
          <label htmlFor="massCasualtySelect" className="block text-gray-700 text-sm font-bold mb-2 w-64">
            Is the patient a victim of mass casualty
          </label>
          <select id="massCasualtySelect" className="block appearance-none w-56 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:border-blue-500">
           <option value="selectoption">Select Option</option> 

            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

          <div className="mb-4">
            <label htmlFor='no_of_patients' className="flex text-gray-700 text-sm font-bold mb-2 w-96">
              Number of patients affected in the same incident
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
             id="no_of_patients"
             type="number"/>
          </div>
          <div className="mb-4">
          <label htmlFor="gender" className="flex text-gray-700 text-sm font-bold mb-2 w-64">
            Gender
          </label>
          <select id="gender" className="block appearance-none w-56 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:border-blue-500">
            <option value="selectoption">Select Option</option>
            <option value="male">Male</option> 
            <option value="female">Female</option>
            <option value="transgender">Transgender</option>
            <option value="other">Other</option>
          </select>
        </div>

        </div>
        <div className=" inline-block sm:flex md:flex xl:flex justify-start max-w-md pl-14 space-x-12 pt-8 ">
          <div className="mb-4">
            <label htmlFor='namegivenatTriage' className="flex text-gray-700 text-sm font-bold mb-2 w-96">
              Name given at the Triage
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            id="namegivenatTriage"
            />
          </div>
          <div className="mb-4">
            <label htmlFor='age' className="flex text-gray-700 text-sm font-bold mb-2 w-64">
              Age in years
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            id='age'
            />
          </div>
          <div className="mb-4">
          <label htmlFor="maritialStatus" className="flex text-gray-700 text-sm font-bold mb-2 w-64">
           Maritial Status
          </label>
          <select id="maritialStatus" className="block appearance-none w-56 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:border-blue-500">
            <option value="selectoption">Select Option</option>
            <option value="single">Single</option> 
            <option value="married">Married</option>
            <option value="inarelationship">In a relationship</option>
            <option value="divorced">Divorced</option>
            <option value="widowed">Widowed</option>
          </select>
        </div>
          <div className="mb-4">
            <label htmlFor='address' className="flex text-gray-700 text-sm font-bold mb-2 w-96">
              Address
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows="3"
              id='address'
            />
          </div>
        </div>
        <div className="button flex justify-center  pt-2 text-sm font-bold  pl-9 ">
          <button id="startRecordingButton5" onClick={() => handleStartRecording(5)} className="w-40 h-14 bg-blue-500 rounded-2xl mr-4">
            Start Recording
          </button>
          <button id="stopRecordingButton5" onClick={handleStopRecording(5)} className="w-40 h-14 bg-orange-400 rounded-2xl">
            Stop Recording
          </button>
        </div>
      </div>
      <div className="border-b-4 h-auto pb-4">
        <div className="block sm:flex md:flex xl:flex justify-start max-w-md pl-6 space-x-12 pt-8 ml-9">
          <div className="mb-4 ">
            <label htmlFor='triage_date' className=" text-gray-700 text-sm font-bold mb-2 w-36  sm:w-56  sm:flex">
              Triage Date
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="triage_date"
                type="date"
              //   name="name"
            />
          </div>
          <div className="mb-4 ">
            <label htmlFor='triageTime' className=" text-gray-700 text-sm font-bold mb-2 w-36  sm:w-56  sm:flex">
              Triage Time
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="triageTime"
                type="time"
              //   name="name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor='chiefCompliant' className="flex text-gray-700 text-sm font-bold mb-2 w-96">
              Cheif presenting complaint
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline space-x-20"
            id='chiefCompliant'
            />
          </div>
          <div className="mb-4">
            <label htmlFor='duration' className="flex text-gray-700 text-sm font-bold mb-2 w-96">
              Duration of symptoms in Days
            </label>
            <input id='duration'
             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            />
          </div>
          <div className="mb-4">
          <label htmlFor="nurseSendTo" className="flex text-gray-700 text-sm font-bold mb-2 w-52">
          Nurse: Send To
          </label>
          <select id="nurseSendTo" className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:border-blue-500">
          <option value="selectOption" className="text-white bg-blue-600">Select Option</option>
            <option value="priority1" className="text-white bg-blue-600">Blue Area: Priority 1</option>
            <option value="priority2" className="text-white bg-red-600">Red Area: Priority 2</option>
            <option value="priority3" className="text-white bg-yellow-300">Yellow Area: Priority 3</option>
            <option value="priority4" className="text-white bg-green-400">Green Area: Priority 4</option>
            <option value="priority5" className="text-black bg-yellow-600">EDCRIT</option>
            <option value="dead" className="text-white bg-blue-200">ED Office</option>
          </select>
          </div>
        </div>
        <div className=" inline-block sm:flex md:flex xl:flex justify-start max-w-md pl-14 space-x-12 pt-8 ">
          
          <div className="mb-4">
          <label htmlFor="emergencySecurityIndex" className="flex text-gray-700 text-sm font-bold mb-2 w-96">
            Emergency Security Index Trialge:Nurse
          </label>
          <select id="emergencySecurityIndex" className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:border-blue-500">
            <option value="selectOption" className="text-white bg-blue-600">Select Option</option>
            <option value="priority1" className="text-white bg-blue-600">Patient Dying: Priority 1</option>
            <option value="priority2" className="text-white bg-red-600">Cannot Wait: Priority 2</option>
            <option value="priority3" className="text-white bg-yellow-300">Needs Multiple Resources:  Priority 3</option>
            <option value="priority4" className="text-white bg-green-400">Needs Single Resources:  Priority 4</option>
            <option value="priority5" className="text-black bg-white">Needs No Resources:  Priority 5</option>
            <option value="dead" className="text-white bg-black">Brought Dead</option>
          </select>
        </div>

          <div className="mb-4">
            <label htmlFor='nurseRemarks' className="flex text-gray-700 text-sm font-bold mb-2 w-96 ">
              Remarks on Nurse Triage
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows="4"
              id='nurseRemarks'
            />
          </div>
          <div className="mb-4 ">
            <label htmlFor="visitortag" className="flex text-gray-700 text-sm font-bold mb-2 w-56">
              Visitor id tag provided
            </label>
            <select id="visitortag" className="block appearance-none w-56 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:border-blue-500">
            <option value="selectoption">Select Option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>      
        </div>
        
          <div className="mb-4">
            <label htmlFor='registrationDesk' className="flex text-gray-700 text-sm font-bold mb-2 w-64">
              Register desk activated
            </label>
            <select id="registrationDesk" className="block appearance-none w-64 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:border-blue-500">
            <option value="selectoption">Select Option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>  
            </select>     
           </div>
        </div>

        <div className=" inline-block sm:flex md:flex xl:flex justify-start  pl-14 space-x-12 pt-8 ">
          <div className="mb-4">
            <label htmlFor='triageNurseDetails' className="flex text-gray-700 text-sm font-bold mb-2">
              Triage nurse Details
            </label>
            <input id='triageNurseDetails'
             className=" shadow appearance-none border rounded   w-96 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
        </div>
        <div className="button flex justify-center  pt-2 text-sm font-bold  pl-9 ">
          <button id="startRecordingButton6" onClick={() => handleStartRecording(6)} className="w-40 h-14 bg-blue-500 rounded-2xl mr-4">
            Start Recording
          </button>
          <button id="stopRecordingButton6" onClick={handleStopRecording(6)} className="w-40 h-14 bg-orange-400 rounded-2xl">
            Stop Recording
          </button>
        </div>
      </div>

      <div className="border-b-4 h-auto pb-4">
        <h1 class=" text-gray-700 text-1xl pt-6 font-bold underline  font-serif">
          {" "}
          Physical Triage
        </h1>
        <div className="block sm:flex md:flex xl:flex justify-start max-w-md pl-6 space-x-12 pt-8 ml-9">
        <div className="mb-4 ">
            <label htmlFor='physicalDate' className=" text-gray-700 text-sm font-bold mb-2 w-36  sm:w-56  sm:flex">
             Physical Triage Date
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="physicalDate"
                type="date"
              //   name="name"
            />
          </div>
          <div className="mb-4 ">
            <label htmlFor='Physicaltime' className=" text-gray-700 text-sm font-bold mb-2 w-36  sm:w-56  sm:flex">
             Physical Triage Time
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="Physicaltime"
                type="time"
              //   name="name"
            />
          </div>
          <div className="mb-4">
          <label htmlFor="emergencyPhysicianTriage" className="flex text-gray-700 text-sm font-bold mb-2 w-96">
          Emergency Physician Triage
          </label>
          <select id="emergencyPhysicianTriage" className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:border-blue-500">
            <option value="selectOption" className="text-white bg-blue-600">Select Option</option>
            <option value="priority1" className="text-white bg-blue-600">Patient Dying: Priority 1</option>
            <option value="priority2" className="text-white bg-red-600">Cannot Wait: Priority 2</option>
            <option value="priority3" className="text-white bg-yellow-300">Needs Multiple Resources:  Priority 3</option>
            <option value="priority4" className="text-white bg-red-600">Danger Zone vitals present:  Priority 2</option>
            <option value="priority5" className="text-white bg-green-600">Needs single Resources:  Priority 4</option>
            <option value="dead" className="text-black bg-white">Needs no resource: Priority 5</option>
          </select>
        </div>
        <div className="mb-4">
            <label htmlFor='EMConcurence' className="flex text-gray-700 text-sm font-bold mb-2 w-80">
            EM Physician Concurence with nurse triage
            </label>
            <select id="EMConcurence" className="block appearance-none w-64 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:border-blue-500">
            <option value="selectoption">Select Option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>  
            </select>     
           </div>
           <div className="mb-4">
          <label htmlFor="PhysicianAdmission" className="flex text-gray-700 text-sm font-bold mb-2 w-24">
          Physician:Admission
          </label>
          <select id="PhysicianAdmission" className="block appearance-none w-56 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:border-blue-500">
            <option value="selectOption" className="text-white bg-blue-600">Select Option</option>
            <option value="priority1" className="text-white bg-blue-600">Blue Area: Priority 1</option>
            <option value="priority2" className="text-white bg-red-600">Red Area: Priority 2</option>
            <option value="priority3" className="text-white bg-yellow-300">Yellow Area:  Priority 3</option>
            <option value="priority4" className="text-white bg-green-600">Green Area:  Priority 4</option>
            <option value="priority5" className="text-white bg-orange-600">ED crit</option>
            <option value="priority5" className="text-white bg-slate-400">ED Office</option>
            <option value="priority5" className="text-white bg-cyan-600">Isolation</option>
            <option value="priority5" className="text-white bg-black">Morque</option>
            
          </select>
        </div>
        </div>
        <div className=" inline-block sm:flex md:flex xl:flex justify-start max-w-md pl-14 space-x-12 pt-8  ">
        <div className="mb-4">
          <label htmlFor="emergencySecurityIndexPhysician" className="flex text-gray-700 text-sm font-bold mb-2 w-96">
          Emergency severity index physician Triage code:Emergency Physician
          </label>
          <select id="emergencySecurityIndexPhysician" className="block appearance-none w-96 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:border-blue-500">
            <option value="selectOption" className="text-white bg-blue-600">Select Option</option>
            <option value="priority1" className="text-white bg-blue-600">Patient Dying: Priority 1</option>
            <option value="priority2" className="text-white bg-red-600">Can not Wait: Priority 2</option>
            <option value="priority3" className="text-white bg-yellow-300">Needs Multiple resources:  Priority 3</option>
            <option value="priority4" className="text-white bg-green-600">Needs one resurce:  Priority 4</option>
            <option value="priority5" className="text-black bg-white">Needs no Resource: Priority 5</option>
            <option value="priority5" className="text-white bg-black">Brought dead</option>
            
          </select>
        </div>
          
          <div className="mb-4">
            <label htmlFor='remarksforTriage' className="flex text-gray-700 text-sm font-bold mb-2 w-96 ">
              Remarks for Triage
            </label>
            <textarea
              id='remarksforTriage'
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows="4"
            />
          </div>
          <div className="mb-4">
            <label htmlFor='Majorclassification' className="flex text-gray-700 text-sm font-bold mb-2 w-80">
            Major classification of case
            </label>
            <select id="Majorclassification" className="block appearance-none w-64 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:border-blue-500">
            <option value="selectoption">Select Option</option>
            <option value="yes">Trauma</option>
            <option value="no">Non-Trauma</option>  
            <option value="yes">Trauma plus with medical conditon</option>
            <option value="yes">Neonatal</option>
            <option value="yes">Pediatric</option>
            <option value="yes">Obstertic</option>
            </select>     
           </div>
           <div className="mb-4">
            <label htmlFor='medicalogicalcase' className="flex text-gray-700 text-sm font-bold mb-2 w-80">
            medicalogical case
            </label>
            <select id="medicalogicalcase" className="block appearance-none w-64 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:border-blue-500">
            <option value="selectoption">Select Option</option>
            <option value="yes">yes</option>
            <option value="no">No</option>  
            </select>     
           </div>
        </div>

        <div className="button flex justify-center  pt-2 text-sm font-bold  pl-9 ">
          <button id="startRecordingButton7" onClick={() => handleStartRecording(7)} className="w-40 h-14 bg-blue-500 rounded-2xl mr-4">
            Start Recording
          </button>
          <button id="stopRecordingButton7" onClick={handleStopRecording(7)} className="w-40 h-14 bg-orange-400 rounded-2xl">
            Stop Recording
          </button>
        </div>
      </div>
    </div>
  );
};

export default TriageForm;
