import React from "react";

const AirwayAssesment = () => {
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
    <div className="border-2 border-cyan-700 pt-3 pb-4 rounded-3xl shadow-lg shadow-sky-900 " style={{ background: 'linear-gradient(to right, rgb(127, 161, 255,0.7), rgb(176, 195, 250,0.7))' }}>
        <h1 class="text-1xl pt-6 font-bold underline font-serif">
          {" "}
          AIRWAY ASSESMENT{" "}
        </h1>
        <div className="  flex justify-center   space-x-12 pt-8 ">
        
        
          <div className="mb-4">
            <label
              htmlFor="airwayassesment"
              className="flex text-gray-700 text-sm font-bold mb-2 w-72"
            >
        Airway Assesment
            </label>
            <select
              id="airwayassesment"
              className="block appearance-none w-72 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
              <option value="selectoption">Select Option</option>
              <option value="Intubated">Intubated</option>
              <option value="Non-Intubated">Non-Intubated</option>
              <option value="Tacheostimied"> Tacheostimied </option>
              <option value="Patent">Patent</option>
              <option value="Obstructed">Obstructed</option>
              <option value="Threatened">Threatened</option>
              <option value="Difficult">Difficult</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="difficultairway"
              className="flex text-gray-700 text-sm font-bold mb-2 w-72"
            >
         Difficult Airway
            </label>
            <select
              id="difficultairway"
              className="block appearance-none w-72 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
              <option value="selectoption">Select Option</option>
              <option value="Anatomical">Anatomical</option>
              <option value="Physological">Physological</option>
              <option value="Combined"> Combined </option>
             
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="difficultairway"
              className="flex text-gray-700 text-sm font-bold mb-2 w-72"
            >
         Psychological Airway Difficulty     
            </label>
            <select
              id="difficultairway"
              className="block appearance-none w-72 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
              <option value="selectoption">Select Option</option>
              <option value="Anatomical">Hypoxemia</option>
              <option value="Physological">Hypotension</option>
              <option value="Combined"> Right Heart Failure </option>
              <option value="Combined"> Tension Numethorax </option>
              <option value="Combined">Severe Metebolic Acidosis </option>
            </select>
          </div>  
          <div className="mb-4">
            <label
              htmlFor="clinicalcondition"
              className="flex text-gray-700 text-sm font-bold mb-2 w-80"
            >
              LEMON Assesment:Lock
            </label>
            <select
              id="clinicalcondition"
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
              <option value="selectoption">Select Option</option>
              <option value="Facial Trauma">Facial Trauma</option>
              <option value="large Incisor">large Incisors</option>
              <option value="Beard">Beard</option>
              <option value="Mostache">Mostache</option>
            </select>
          </div>
        
        </div>
        <div className="  flex justify-center   space-x-12 pt-8 ">
       
          <div className="mb-4">
            <label
              htmlFor="lemonassesment:evaluvte"
              className="flex text-gray-700 text-sm font-bold mb-2 w-96"
            >
              LEMON Assesment:Evluvate
            </label>
            <select
              id="lemonassesment:evaluvte"
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
              <option value="selectoption">Select Option</option>
              <option value="Incisor Distance FingerBreaths">Incisor Distance FingerBreaths </option>
              <option value="Hyoid/Mental distance FingerBreaths ">Hyoid/Mental distance FingerBreaths </option>
              <option value="Thyroid To Mouth Distance FingerBreaths">Thyroid To Mouth Distance FingerBreaths</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="clinicalcondition"
              className="flex text-gray-700 text-sm font-bold mb-2 w-80"
            >
              LEMON Assesment:Mallampatti
            </label>
            <select
              id="clinicalcondition"
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
              <option value="selectoption">Select Option</option>
              <option value="Class 1">Class 1</option>
              <option value="Class 2">Class 2</option>
              <option value="Class 3">Class 3</option>
               <option value="Class 4">Class 4</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="lemonassesmentobstruction"
              className="flex text-gray-700 text-sm font-bold mb-2 w-80"
            >
              LEMON Assesment:Obstruction
            </label>
            <select
              id="lemonassesmentobstruction"
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
              <option value="selectoption">Select Option</option>
              <option value="All">All</option>
              <option value="None">None</option>
            
            </select>
          </div>
          
        </div>   
        <div className="  flex justify-center   space-x-12 pt-8 ">
        <div className="mb-4">
            <label
              htmlFor="restricteneckmobiltiy"
              className="flex text-gray-700 text-sm font-bold mb-2 w-96"
            >
              LEMON Assesment:Restricted Neck Mobiltity
            </label>
            <select
              id="restricteneckmobiltiy"
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
              <option value="selectoption">Select Option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="traumarelatedautomaticaldifficulty"
              className="flex text-gray-700 text-sm font-bold mb-2 w-max pt-0"
            >
              Current Trauma Related Automatical Difficulty
            </label>
            <select
              id="traumarelatedautomaticaldifficulty"
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
              <option value="selectoption">Select Option</option>
              <option value="Teeth Loss">Teeth Loss</option>
              <option value="Oral Injury">
                Oral Injury
              </option>
              <option value=" Maxillary Injury">
                Maxillary Injury
              </option>
              <option value="Mandible Fracturee">Mandible Fracture</option>
               <option value="Tongue Swelling/Hematoma">Tongue Swelling/Hematoma</option>
                <option value="Tongue Injury">Tongue Injury</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="Maxillary Injury"
              className="flex text-gray-700 text-sm font-bold mb-2 w-60 pt-0"
            >
             Anticipated Difficulty
            </label>
            <select
              id="anticipateddifficulty"
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
              <option value="selectoption">Select Option</option>
                <option value="Difficult Mask Ventilation">Difficult Mask Ventilation</option>
              <option value="Difficult Intubation">Difficult Intubation</option>
              <option value="Difficult Intubation">Difficult Intubation</option>
              <option value="Difficult VideoLaryngoscopy">Difficult VideoLaryngoscopy</option>
              <option value="Difficult Fiber Optic Bronchoscopy">Difficult Fiber Optic Bronchoscopy</option>
              <option value="Difficult front Of Neck Access">Difficult front Of Neck Access</option>
               <option value="Psychological Difficult Airway">Psychological Difficult Airway</option>
            </select>
          </div>
          <div className="button flex justify-center  pt-5  text-sm font-bold  ">
          <button
            id="startRecordingButton5"
            onClick={() => handleStartRecording(5)}
            className="w-60 h-14 bg-indigo-500 rounded-2xl mr-4 "
          >
            Call For Help
          </button>
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
      <div className="block items-center justify-center h-auto pb-4 pt-9 ">
      <div className="border-2 border-cyan-700 pt-3 pb-4 rounded-3xl shadow-lg shadow-sky-900 " style={{ background: 'linear-gradient(to right, rgb(127, 161, 255,0.7), rgb(176, 195, 250,0.7))' }}>
        <h1 class="text-1xl pt-6 font-bold underline font-serif">
          {" "}
          AIRWAY MANAGEMENT{" "}
        </h1>
        <div className="  flex justify-center   space-x-12 pt-8 ">
        <div className="mb-4">
            <label
              htmlFor="servicalmotionrestriction"
              className="flex text-gray-700 text-sm font-bold mb-2 w-72"
            >
        Cervical Motion Restriction
            </label>
            <select
              id="servicalmotionrestriction"
              className="block appearance-none w-72 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
              <option value="selectoption">Select Option</option>
              {/* <option value="Intubated">Intubated</option>
              <option value="Non-Intubated">Non-Intubated</option>
              <option value="Tacheostimied"> Tacheostimied </option>
              <option value="Patent">Patent</option>
              <option value="Obstructed">Obstructed</option>
              <option value="Threatened">Threatened</option>
              <option value="Difficult">Difficult</option> */}
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="isthisacrashairwaymanagement"
              className="flex text-gray-700 text-sm font-bold mb-2 w-72"
            >
        Is This a Crash Airway Management
            </label>
            <select
              id="isthisacrashairwaymanagement"
              className="block appearance-none w-72 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
              <option value="selectoption">Select Option</option>
              <option value="yes">Yes</option>
              <option value="No">No</option>
             
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="airwaymanagement"
              className="flex text-gray-700 text-sm font-bold mb-2 w-72"
            >
        Aiway Management
            </label>
            <select
              id="airwaymanagement"
              className="block appearance-none w-72 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
              <option value="selectoption">Select Option</option>
              <option value="Oral Suction">Oral Suction</option>
              <option value="Head Tilt chin Lift">Head Tilt chin Lift</option>
              <option value="Jaw Thrust"> Jaw Thrust </option>
              <option value="Recovery Position">Recovery Position</option>
              <option value="OPA Insertion">OPA Insertion</option>
              <option value="NPA Insertion">NPA Insertion</option>
              <option value="Superglotic Airway Insertion">Superglotic Airway Insertion</option>
              <option value="Laryngoscopy and intubation">Laryngoscopy and intubation</option>
              <option value="Fiberobtic Intubation">Fiberobtic Intubation</option>
              <option value="Front Of neck Access">Front Of neck Access</option>
              <option value="Manual Inline Stabilisation">Manual Inline Stabilisation</option>
              <option value="Selik's Maneour">Selik's Maneour</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="oralsuction"
              className="flex text-gray-700 text-sm font-bold mb-2 w-72"
            >
        Oral Suction
            </label>
            <select
              id="oralsuction"
              className="block appearance-none w-72 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
              <option value="selectoption">Select Option</option>
              <option value="Vornitus">Vornitus</option>
              <option value="Secretion">Secretion</option>
              <option value="Blood"> Blood </option>
              <option value="Foreigh Body">Foreigh Body</option>
              
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="opasize"
              className="flex text-gray-700 text-sm font-bold mb-2 w-44"
            >
        OPA size if used
            </label>
            <select
              id="opasize"
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
              <option value="selectoption">Select Option</option>
              <option value="00">00</option>
              <option value="0">0</option>
              <option value="1"> 1 </option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4"> 4 </option>
              <option value="5">5</option>
              
            </select>
          </div>
          {/* <div className="mb-4">
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
          </div> */}
          
        
        
        
        
        </div>
        <div className="  flex justify-center   space-x-12 pt-8 ">
        <div className="mb-4">
            <label
              htmlFor="npasize"
              className="flex text-gray-700 text-sm font-bold mb-2 w-80"
            >
              NPA size if used
            </label>
            <select
              id="npasize"
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
             <option value="selectoption">Select Option</option>
              <option value="00">6.5mm/28FR</option>
              <option value="00">7mm/30FR</option>
              <option value="00">7.5mm/32FR</option>
              <option value="00">8mm/34FR</option>
              <option value="00">8.5mm/36FR</option>
             
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="supragloticairwaytype"
              className="flex text-gray-700 text-sm font-bold mb-2 w-60"
            >
              Superglotic Airway Type
            </label>
            <select
              id="supragloticairwaytype"
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
              <option value="selectoption">Select Option</option>
              <option value="Classic LMA">Classic LMA</option>
              <option value="LMA Unique">LMA Unique</option>
              <option value="Proseal LMA">Proseal LMA</option>
              <option value="Flexomatalic LMA">Flexomatalic LMA</option>
              <option value="LMA Fastrach/Intubating LMA"> LMA Fastrach/Intubating LMA</option>
              <option value="Cuffed Airofrigel Airway">Cuffed Airofrigel Airway</option>
              <option value="Laryngeal Tube Airway">Laryngeal Tube Airway</option>
              <option value="iGel">iGel</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="supergloticairwaysize"
              className="flex text-gray-700 text-sm font-bold mb-2 w-44"
            >
        Superglotuc airway size
            </label>
            <select
              id="supergloticairwaysize"
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
              <option value="selectoption">Select Option</option>
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="1.5"> 1.5 </option>
              <option value="2">2</option>
              <option value="2.5">2.5</option>
              <option value="3">3</option>
              <option value="4"> 4 </option>
              <option value="5">5</option>
              
            </select>
          </div>
           <div className="mb-4">
            <label
              htmlFor="actiontoken"
              className="flex text-gray-700 text-sm font-bold mb-2 w-72"
            >
              Number of Superglotic Aiway Attempts
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="actiontoken"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="supergloticairwaydifficulty"
              className="flex text-gray-700 text-sm font-bold mb-2 w-80"
            >
              Superglotic Airway Difficulty
            </label>
            <select
              id="supergloticairwaydifficulty"
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
              <option value="selectoption">Select Option</option>
              <option value="Malposition">Malposition</option>
              <option value="Rotation">Rotation</option>
              <option value="Folding epigoltis">Folding epigoltis</option>
              <option value="Leak">Leak</option>
              <option value="Disaturation">Disaturation</option>
              <option value="inadeguate Room">inadeguate Room</option>
              <option value="Vommiting/Aspiration">Vommiting/Aspiration</option>
              <option value="Laryngospasm">Laryngospasm</option>
            </select>
          </div>  
        </div>   
        <div className="  flex justify-center   space-x-12 pt-8 ">
        <div className="mb-4">
            <label
              htmlFor="modeofintubation"
              className="flex text-gray-700 text-sm font-bold mb-2 w-80"
            >
              Mode Of intubation
            </label>
            <select
              id="modeofintubation"
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
             <option value="selectoption">Select Option</option>
              <option value="Direct laryngoscopy">Direct laryngoscopy</option>
              <option value="Video Laryngoscopy">Video Laryngoscopy</option>
              <option value="Flexible Fiberoptic">Flexible Fiberoptic</option>
              <option value="Intubation LMA">Intubation LMA</option>
              <option value="Retrograde">Retrograde</option>
              <option value="Blind Nastrogel">Blind Nastrogel</option>
              <option value="Finger guided">Finger guided</option>
              <option value="Retromolar">Retromolar</option>
             
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="actiontoken"
              className="flex text-gray-700 text-sm font-bold mb-2 w-72"
            >
              Number of Attempts Of Laryngoscopy
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="actiontoken"
            />
          </div>
         
          <div className="mb-4">
            <label
              htmlFor="ettubesize"
              className="flex text-gray-700 text-sm font-bold mb-2 w-60"
            >
        ET Tube size
            </label>
            <select
              id="ettubesize"
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
              <option value="selectoption">Select Option</option>
              <option value="3">3</option>
              <option value="3.5">3.5</option>
              <option value="4"> 4 </option>
              <option value="4.5">4.5</option>
              <option value="5">5</option>
              <option value="5.5">5.5</option>
              <option value="6"> 6 </option>
              <option value="6.5">6.5</option>
              <option value="7"> 7 </option>
              <option value="7.5">7.5</option>
              <option value="8"> 8 </option>
              <option value="8.5">8.5</option>
              
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="tubecuff"
              className="flex text-gray-700 text-sm font-bold mb-2 w-60"
            >
        Tube Cuff
            </label>
            <select
              id="tubecuff"
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
              <option value="selectoption">Select Option</option>
              <option value="cuffed">cuffed</option>
              <option value="uncuffed">uncuffed</option>     
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="tubecuff"
              className="flex text-gray-700 text-sm font-bold mb-2 w-60"
            >
        Typr Of ET Tube
            </label>
            <select
              id="tubecuff"
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
              <option value="selectoption">Select Option</option>
              <option value="PVC">PVC</option>
              <option value="Flexomattalic">Flexomattalic</option> 
              <option value="MLS Tube">MLS Tube</option>
              <option value="Double Lumen Tube">Double Lumen Tube</option>     
            </select>
          </div>
          
         
        </div>  
        <div className="  flex justify-center   space-x-12 pt-8 ">
        <div className="mb-4">
            <label
              htmlFor="typeofdifficultyencountered"
              className="flex text-gray-700 text-sm font-bold mb-2 w-96"
            >
              Type Of Difficulty Encountered
            </label>
            <select
              id="typeofdifficultyencountered"
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
              <option value="selectoption">Select Option</option>
              <option value="Difficult Mask Ventilation">Difficult Mask Ventilation</option>
              <option value="Difficult Intubation">Difficult Intubation</option>
              <option value="Difficult Intubation">Difficult Intubation</option>
              <option value="Difficult VideoLaryngoscopy">Difficult VideoLaryngoscopy</option>
              <option value="Difficult Fiber Optic Bronchoscopy">Difficult Fiber Optic Bronchoscopy</option>
              <option value="Difficult front Of Neck Access">Difficult front Of Neck Access</option>
            </select>
          </div>
         
         <div className="mb-4">
            <label
              htmlFor="actiontoken"
              className="flex text-gray-700 text-sm font-bold mb-2 w-80"
            >
              Enroll The Case In Airway Management Registry
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="actiontoken"
            />
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

export default AirwayAssesment;