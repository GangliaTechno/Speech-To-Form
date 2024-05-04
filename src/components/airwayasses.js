import React, {useState} from "react";

const AirwayAssesment = () => {
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

        if(section_stop===9){
          let Anticipated_Difficulty_html = document.getElementById('Anticipated_Difficulty');
          let Current_Trauma_Related_Automatical_Difficulty_html = document.getElementById('Current_Trauma_Related_Automatical_Difficulty')
          let LEMON_Assesment_Restricted_Neck_Mobiltity_html = document.getElementById('LEMON_Assesment_Restricted_Neck_Mobiltity');
          let LEMON_Assesment_Obstruction_html = document.getElementById('LEMON_Assesment_Obstruction');
          let LEMON_Assesment_Mallampatti_html = document.getElementById('LEMON_Assesment_Mallampatti');
          let LEMON_Assesment_Evluvate_html = document.getElementById('LEMON_Assesment_Evluvate');
          let LEMON_Assesment_Lock_html = document.getElementById('LEMON_Assesment_Lock');
          let PsychologicalDifficultAirway_html = document.getElementById('PsychologicalDifficultAirway');
          let difficultAirway_html = document.getElementById('difficultAirway');
          let airwayAssesment_html = document.getElementById('airwayAssesment');

          Anticipated_Difficulty_html.selectedIndex = parseInt(geminiResponse["Anticipated_Difficulty"])+1;
          Current_Trauma_Related_Automatical_Difficulty_html.selectedIndex = parseInt(geminiResponse["Current_Trauma_Related_Automatical_Difficulty"])+1;
          LEMON_Assesment_Restricted_Neck_Mobiltity_html.selectedIndex = parseInt(geminiResponse["LEMON_Assesment_Restricted_Neck_Mobiltity"])+1;
          LEMON_Assesment_Obstruction_html.selectedIndex = parseInt(geminiResponse["LEMON_Assesment_Obstruction"])+1;
          LEMON_Assesment_Mallampatti_html.selectedIndex = parseInt(geminiResponse["LEMON_Assesment_Mallampatti"])+1;
          LEMON_Assesment_Evluvate_html.selectedIndex = parseInt(geminiResponse["LEMON_Assesment_Evluvate"])+1;
          LEMON_Assesment_Lock_html.selectedIndex = parseInt(geminiResponse["LEMON_Assesment_Lock"])+1;
          PsychologicalDifficultAirway_html.selectedIndex = parseInt(geminiResponse["Psychological_Difficult_Airway"])+1;
          difficultAirway_html.selectedIndex = parseInt(geminiResponse["Difficult_Airway"])+1;
          airwayAssesment_html.selectedIndex = parseInt(geminiResponse["Airway_Assesment"])+1;
        } else if(section_stop===10){

          let ServicalMotionRestriction_html = document.getElementById('ServicalMotionRestriction');
          let IsThisACrashAirwayManagement_html = document.getElementById('IsThisACrashAirwayManagement');
          let AirwayManagement_html = document.getElementById('AirwayManagement');
          let OralSuction_html = document.getElementById('OralSuction');
          let OPASize_html = document.getElementById('OPASize');
          let NPASize_html = document.getElementById('NPASize');
          let SupragloticAirwayType_html = document.getElementById('SupragloticAirwayType');
          let SupergloticAirwaySize_html = document.getElementById('SupergloticAirwaySize');
          let NumberOfSupergloticAiwayAttempts_html = document.getElementById('NumberOfSupergloticAiwayAttempts');
          let SupergloticAirwayDifficulty_html = document.getElementById('SupergloticAirwayDifficulty');
          let ModeOfIntubation_html = document.getElementById('ModeOfIntubation');
          let NumberOfAttemptsOfLaryngoscopy_html = document.getElementById('NumberOfAttemptsOfLaryngoscopy');
          let ETTubeSize_html = document.getElementById('ETTubeSize');
          let TubeCuff_html = document.getElementById('TubeCuff');
          let TypeOfETTube_html = document.getElementById('TypeOfETTube');
          let TypeOfDifficultyEncountered_html = document.getElementById('TypeOfDifficultyEncountered');
          let EnrollTheCaseInAirwayManagementRegistry_html = document.getElementById('EnrollTheCaseInAirwayManagementRegistry');





        }
      
      }
      else {
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
    // <div>
    <div className="block items-center justify-center h-screen p-8 ">
    <div className="border-2 border-cyan-700 pt-3 pb-4 rounded-3xl shadow-lg shadow-sky-900 " style={{ background: 'linear-gradient(to right, rgb(127, 161, 255,0.7), rgb(176, 195, 250,0.7))' }}>
        <h1 class="text-1xl pt-6 font-bold underline font-serif">
          {" "}
          AIRWAY ASSESMENT{" "}
        </h1>
        <div className="  flex justify-center   space-x-12 pt-8 ">
        
        
          <div className="mb-4">
            <label htmlFor="airwayAssesment"
              className="flex text-gray-700 text-sm font-bold mb-2 w-72"
            >
        Airway Assesment
            </label>
            <select
              id="airwayAssesment"
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
              htmlFor="difficultAirway"
              className="flex text-gray-700 text-sm font-bold mb-2 w-72"
            >
         Difficult Airway
            </label>
            <select
              id="difficultAirway"
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
              htmlFor="PsychologicalDifficultAirway"
              className="flex text-gray-700 text-sm font-bold mb-2 w-72"
            >
         Psychological Airway Difficulty     
            </label>
            <select
              id="PsychologicalDifficultAirway"
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
              htmlFor="LEMON_Assesment_Lock"
              className="flex text-gray-700 text-sm font-bold mb-2 w-80"
            >
              LEMON Assesment:Lock
            </label>
            <select
              id="LEMON_Assesment_Lock"
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
              htmlFor="LEMON_Assesment_Evluvate"
              className="flex text-gray-700 text-sm font-bold mb-2 w-96"
            >
              LEMON Assesment:Evluvate
            </label>
            <select
              id="LEMON_Assesment_Evluvate"
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
              htmlFor="LEMON_Assesment_Mallampatti"
              className="flex text-gray-700 text-sm font-bold mb-2 w-80"
            >
              LEMON Assesment:Mallampatti
            </label>
            <select
              id="LEMON_Assesment_Mallampatti"
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
              htmlFor="LEMON_Assesment_Obstruction"
              className="flex text-gray-700 text-sm font-bold mb-2 w-80"
            >
              LEMON Assesment:Obstruction
            </label>
            <select
              id="LEMON_Assesment_Obstruction"
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
              htmlFor="LEMON_Assesment_Restricted_Neck_Mobiltity"
              className="flex text-gray-700 text-sm font-bold mb-2 w-96"
            >
              LEMON Assesment:Restricted Neck Mobiltity
            </label>
            <select
              id="LEMON_Assesment_Restricted_Neck_Mobiltity"
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
              <option value="selectoption">Select Option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="Current_Trauma_Related_Automatical_Difficulty"
              className="flex text-gray-700 text-sm font-bold mb-2 w-max pt-0"
            >
              Current Trauma Related Automatical Difficulty
            </label>
            <select
              id="Current_Trauma_Related_Automatical_Difficulty"
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
              <option value="selectoption">Select Option</option>
              <option value="Teeth Loss">Teeth Loss</option>
              <option value="Oral Injury"> Oral Injury</option>
              <option value=" Maxillary Injury">Maxillary Injury</option>
              <option value="Mandible Fracturee">Mandible Fracture</option>
               <option value="Tongue Swelling/Hematoma">Tongue Swelling/Hematoma</option>
                <option value="Tongue Injury">Tongue Injury</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="Anticipated_Difficulty"
              className="flex text-gray-700 text-sm font-bold mb-2 w-60 pt-0"
            >
             Anticipated Difficulty
            </label>
            <select
              id="Anticipated_Difficulty"
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
              <option value="selectoption">Select Option</option>
                <option value="Difficult Mask Ventilation">Difficult Mask Ventilation</option>
              <option value="Difficult Intubation">Difficult Intubation</option>
              <option value="Difficult VideoLaryngoscopy">Difficult VideoLaryngoscopy</option>
              <option value="Difficult Fiber Optic Bronchoscopy">Difficult Fiber Optic Bronchoscopy</option>
              <option value="Difficult front Of Neck Access">Difficult front Of Neck Access</option>
               <option value="Psychological Difficult Airway">Psychological Difficult Airway</option>
            </select>
          </div>
          <div className="button flex justify-center  pt-5  text-sm font-bold  ">
          <button
            id=""
            className="w-60 h-14 bg-indigo-500 rounded-2xl mr-4 "
          >
            Call For Help
          </button>
          </div>

        </div>
       
        <div className="button flex justify-center  pt-8 text-sm font-bold  pl-9 ">
          <button
            id="startRecordingButton9"
            onClick={() => handleStartRecording(9)}
            className="w-40 h-14 bg-blue-500 rounded-2xl mr-4"
          >
            Start Recording
          </button>
          <button
            id="stopRecordingButton9"
            onClick={() => handleStopRecording(9)}
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
              htmlFor="ServicalMotionRestriction"
              className="flex text-gray-700 text-sm font-bold mb-2 w-72"
            >
        Cervical Motion Restriction
            </label>
            <select
              id="ServicalMotionRestriction"
              className="block appearance-none w-72 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
              <option value="selectoption">Select Option</option>
              <option value="Intubated">Yes</option>
              <option value="Non-Intubated">No</option>
              {/* <option value="Tacheostimied"> Tacheostimied </option>
              <option value="Patent">Patent</option>
              <option value="Obstructed">Obstructed</option>
              <option value="Threatened">Threatened</option>
              <option value="Difficult">Difficult</option> */}
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="IsThisACrashAirwayManagement"
              className="flex text-gray-700 text-sm font-bold mb-2 w-72"
            >
        Is This a Crash Airway Management
            </label>
            <select
              id="IsThisACrashAirwayManagement"
              className="block appearance-none w-72 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
              <option value="selectoption">Select Option</option>
              <option value="yes">Yes</option>
              <option value="No">No</option>
             
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="AirwayManagement"
              className="flex text-gray-700 text-sm font-bold mb-2 w-72"
            >
        Aiway Management
            </label>
            <select
              id="AirwayManagement"
              className="block appearance-none w-72 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
              <option value="selectoption">Select Option</option>
              <option value="Oral Suction">ral SuctioOn</option>
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
              htmlFor="OralSuction"
              className="flex text-gray-700 text-sm font-bold mb-2 w-72"
            >
        Oral Suction
            </label>
            <select
              id="OralSuction"
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
              htmlFor="OPASize"
              className="flex text-gray-700 text-sm font-bold mb-2 w-44"
            >
        OPA size if used
            </label>
            <select
              id="OPASize"
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
              htmlFor="NPASize"
              className="flex text-gray-700 text-sm font-bold mb-2 w-80"
            >
              NPA size if used
            </label>
            <select
              id="NPASize"
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
              htmlFor="SupragloticAirwayType"
              className="flex text-gray-700 text-sm font-bold mb-2 w-60"
            >
              Superglotic Airway Type
            </label>
            <select
              id="SupragloticAirwayType"
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
              htmlFor="SupergloticAirwaySize"
              className="flex text-gray-700 text-sm font-bold mb-2 w-44"
            >
        Superglotuc airway size
            </label>
            <select
              id="SupergloticAirwaySize"
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
              htmlFor="NumberOfSupergloticAiwayAttempts"
              className="flex text-gray-700 text-sm font-bold mb-2 w-72"
            >
              Number of Superglotic Aiway Attempts
            </label>
            <input
            type="number"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="NumberOfSupergloticAiwayAttempts"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="SupergloticAirwayDifficulty"
              className="flex text-gray-700 text-sm font-bold mb-2 w-80"
            >
              Superglotic Airway Difficulty
            </label>
            <select
              id="SupergloticAirwayDifficulty"
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
              htmlFor="ModeOfIntubation"
              className="flex text-gray-700 text-sm font-bold mb-2 w-80"
            >
              Mode Of Intubation
            </label>
            <select
              id="ModeOfIntubation"
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
              htmlFor="NumberOfAttemptsOfLaryngoscopy"
              className="flex text-gray-700 text-sm font-bold mb-2 w-72"
            >
              Number of Attempts Of Laryngoscopy
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="NumberOfAttemptsOfLaryngoscopy"
              type="number"
            />
          </div>
         
          <div className="mb-4">
            <label
              htmlFor="ETTubeSize"
              className="flex text-gray-700 text-sm font-bold mb-2 w-60"
            >
        ET Tube size
            </label>
            <select
              id="ETTubeSize"
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
              htmlFor="TubeCuff"
              className="flex text-gray-700 text-sm font-bold mb-2 w-60"
            >
        Tube Cuff
            </label>
            <select
              id="TubeCuff"
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
              <option value="selectoption">Select Option</option>
              <option value="cuffed">cuffed</option>
              <option value="uncuffed">uncuffed</option>     
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="TypeOfETTube"
              className="flex text-gray-700 text-sm font-bold mb-2 w-60"
            >
        Type Of ET Tube
            </label>
            <select
              id="TypeOfETTube"
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
              htmlFor="TypeOfDifficultyEncountered"
              className="flex text-gray-700 text-sm font-bold mb-2 w-96"
            >
              Type Of Difficulty Encountered
            </label>
            <select
              id="TypeOfDifficultyEncountered"
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none"
            >
              <option value="selectoption">Select Option</option>
              <option value="Difficult Mask Ventilation">Difficult Mask Ventilation</option>
              <option value="Difficult Intubation">Difficult Intubation</option>
              <option value="Difficult VideoLaryngoscopy">Difficult VideoLaryngoscopy</option>
              <option value="Difficult Fiber Optic Bronchoscopy">Difficult Fiber Optic Bronchoscopy</option>
              <option value="Difficult front Of Neck Access">Difficult front Of Neck Access</option>
            </select>
          </div>
         
         <div className="mb-4">
            <label
              htmlFor="EnrollTheCaseInAirwayManagementRegistry"
              className="flex text-gray-700 text-sm font-bold mb-2 w-80"
            >
              Enroll The Case In Airway Management Registry
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="EnrollTheCaseInAirwayManagementRegistry"
            />
          </div>
        </div>
       
        <div className="button flex justify-center  pt-8 text-sm font-bold  pl-9 ">
          <button
            id="startRecordingButton10"
            onClick={() => handleStartRecording(10)}
            className="w-40 h-14   bg-blue-500 rounded-2xl mr-4"
          >
            Start Recording
          </button>
          <button
            id="stopRecordingButton10"
            onClick={() => handleStopRecording(10)}
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