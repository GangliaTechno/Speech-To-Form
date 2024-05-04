import asyncio
from flask import Flask, request, jsonify
import threading
from flask_cors import CORS
import speech_recognition as sr
import google.generativeai as genai
import json
import time
import re

# Configure Flask app
app = Flask(__name__)
CORS(app)

# Configure generative AI model
genai.configure(api_key="AIzaSyAFER-GEGVy5Cw9E-vkCIjyjvW-Bc4pBZ8")
generation_config = {"temperature": 0.9, "top_p": 1, "top_k": 1, "max_output_tokens": 2048}
model = genai.GenerativeModel("gemini-pro", generation_config=generation_config)

# Define global variables
extracted_info = {}
lock = threading.Lock()
stop_flag = None

# Function to record audio
def record_audio(stop_flag):
    recognizer = sr.Recognizer()
    with sr.Microphone() as source:
        print("Recording...")
        while not stop_flag.is_set():
            audio_data = recognizer.listen(source,5,300)
            try:
                text = recognizer.recognize_google(audio_data)
                print("Recognized Text:", text)
                return text
            except sr.UnknownValueError:
                print("Speech not recognized")
            except sr.RequestError as e:
                print(f"Could not request results from Google Speech Recognition service; {e}")
        print("Recording stopped")

# Function to parse text response to JSON
def parse_text_response(text_response):
    # Remove triple backticks and leading/trailing whitespaces
    text_response = text_response.strip("```").strip()

    # Remove any leading/trailing whitespaces around colon to separate key and value
    text_response = re.sub(r'\s*:\s*', ':', text_response)

    # Add double quotes around keys to make it valid JSON
    text_response = re.sub(r'([a-zA-Z_]+):', r'"\1":', text_response)

    # Convert to valid JSON format
    json_response = text_response

    # Parse as JSON
    try:
        return json.loads(json_response)
    except json.JSONDecodeError as e:
        print(f"Error decoding text response as JSON: {e}")
        return None

# Function to make API request to Gemini model
def gemini_model_api_request(prompt):
    response = model.generate_content([prompt])
    response_text = response.text
    print("Gemini API Response:", response_text)

    # Try parsing the response as JSON
    try:
        json_response = json.loads(response_text)
        print("sent json data", response_text)
        return json_response
    except json.JSONDecodeError:
        pass  # Proceed to handle the response as text

    # If response is not in JSON format, try parsing it as text
    print("sent text response:", response_text)
    return parse_text_response(response_text)

# Function to run asynchronous task
def run_async_task(stop_flag):
    global extracted_info
    audio_text = record_audio(stop_flag)
    if additional_variable==1:
        prompt="""Please provide the information ignoring all other information from the recorded text.
            1)Triage_Id 2) Is_the_patient_a_victim_of_mass_casualty[yes(0),no(1) give index],
            3)Number_of_patients_affected_in_the_same_incident,
            4)Gender[male(0),female(1),transgendr(2),other(3) give f11 dasindex],
            5)Name_given_at_the_Triage, 6)Age,
            7)Maritial_Status(Single[0],Married[1],In a relationship[2],divorced[3],widowed[4] give index only),
            8)Address
            Don't add any comment or any unnecessary information. Give response in JSON format. 
            This is an example for your reference:
            Gemini API Response: 
            ```
                {
                "Triage_Id": "1234",
                "Is_the_patient_a_victim_of_mass_casualty": "1",
                "Number_of_patients_affected_in_the_same_incident": "30",
                "Gender": "2",
                "Name_given_at_the_Triage": "Rahul Singh",
                "Age": "40",
                "Maritial_Status": "2",
                "Address": "Maharaja colony, Bangalore",
                }
                ```
            """+f"""
            Here is the recorded text: {audio_text}"""
        
    elif additional_variable==2:
         prompt="""Please provide the information ignoring all other information from the recorded text.
            1)Triage_date(in yyyy-MM-dd format only), 2) Triage_time,
            3)Cheif_presenting_complaint,
            4)Duration_of_symptoms_in_Days,
            5)Nurse_Send_to[blue area:priority1(0),red area:priority2(1),yellow area:priority3(2),green area:priority4(3),edcrit(4),ed office(5) give index number only], 
            6)Emergency_Security_Index_Trialge_Nurse[patient dying:priority1(0),cannot wait:priority2(1),needs multiple resources:priority3(2),needs single resource:priority4(3),needs no resource:priority5(3)(4),brought dead(5) give index number only],
            7)Remarks_on_Nurse_Triage,
            8)Visitor_id_tag_provided([yes(0),no(1) give index number only]),
            9)Register_desk_activated([yes(0),no(1) give index number only]),
            10)Triage_nurse_Details.
            Don't add any comment or any unnecessary information. Give response in JSON format. 
            This is an example for your reference:
            Gemini API Response: 
            ```
                {
                "Triage_date": "2024-02-20",
                "Triage_time": "16:14",
                "Cheif_presenting_complaint": "1.Compliant one \n2.Compliant two",
                "Duration_of_symptoms_in_Days": "7",
                "Nurse_Send_to": "3",
                "Emergency_Security_Index_Trialge_Nurse": "4",
                "Remarks_on_Nurse_Triage": "...",
                "Visitor_id_tag_provided": "1",
                "Register_desk_activated": "0",
                "Triage_nurse_Details": "Name - , Department - "
                }
                ```
            """+f"""
            Here is the recorded text: {audio_text}"""
            
            
    elif additional_variable==3:
        prompt="""Please provide the information ignoring all other information from the recorded text.
            1)Physical_Triage_date(in yyyy-MM-dd format only), 2) Physical_Triage_time,
            3)Emergency_Physician_Triage[patient dying:priority1(0),cannot wait:priority2(1),needs multiple resources:priority3(2),needs single resource:priority4(3),needs no resource:priority5(3)(4)] give index number only)",
            4)EM_Physician_Concurence_with_nurse_triage([yes(0),no(1) give index number only]),
            5)Physician_Admission(blue area:priority1(0),red area:priority2(1),yellow area:priority3(2),green area:priority4(3),edcrit(4),ed office(5),isolation(6),morque(7)] give index number only), 
            6)Emergency_severity_index_physician_Triage[patient dying:priority1(0),cannot wait:priority2(1),needs multiple resources:priority3(2),needs single resource:priority4(3),needs no resource:priority5(3)(4),brought dead(5)] give index number only),
            7)Remarks_for_Triage,
            8)Major_classification_of_case([trauma(0),non-rauma(1),trauma_plus_with_medical_condition(2),neonatal(3),pediatric(4),obstertic(5)] give index number only),
            9)medicalogical_case([yes(0),no(1) give index number only]).
            Don't add any comment or any unnecessary information. Give response in JSON format. 
            This is an example for your reference:
            Gemini API Response: 
            ```
                {
                "Physical_Triage_date": "2024-02-20",
                "Physical_Triage_time": "16:14",
                "Emergency_Physician_Triage": "2",
                "EM_Physician_Concurence_with_nurse_triage": "1",
                "Physician_Admission": "3",
                "Emergency_severity_index_physician_Triage": "3",
                "Remarks_for_Triage": "No remarks at all",
                "Major_classification_of_case": "3",
                "medicalogical_case": "0"
                }
                ```
            """+f"""
            Here is the recorded text: {audio_text}"""
            
    elif additional_variable==4:
        prompt = """Please provide the information ignoring all other information from the recorded text.
            1) Called_By, 2) Date_of_Call (in yyyy-MM-dd format only),
            3) Patient_was_transported_by (give its index (0-9) options are [Self(0), KH-MARS(1), Mobile ICU(2), Ambulance(3), Private Vehicle(4), Taxi(5), Fire Force(6), Police Vehicle(7), Auto-Rikshaw(8), Two Wheeler(9)]),
            4) Bed_Booked_and_Available (give its index [yes(0), no(1)]),
            5) Time_of_Call (in HH:MM, 24 hour format),
            6) Mobile_Number, 7) Called_from,
            8) Action_Taken ([Yes(0), NO(1)] give index), 9) EMD_ID, 10) EMD_Degree ([Degree1(0), Degree2(1), Degree3(2)] give index)
            11) Driver_id, 12) Vehicle_Number, 13) Vehicle_Type ([2wheeler(0), 4wheeler(1)] give index), 14) Payment Method ([Cash(0), Card(1)] give index)
            Don't add any comment or any unnecessary information. Give response in JSON format.
            This is an example for your reference:
            Gemini API Response:
            ```
            {
                "Called_By": "Nikhil",
                "Date_of_Call": "2024-02-08",
                "Patient_was_transported_by": "7",
                "Bed_Booked_and_Available": "1",
                "Time_of_Call": "12:00",
                "Mobile_Number": "9008134132",
                "Called_from": "manipal",
                "Action_Taken": "0",
                "EMD_ID": "1234",
                "EMD_Degree": "1",
                "Driver_id": "1234",
                "Vehicle_Number": "KA31 M2233",
                "Vehicle_Type": "0",
                "Payment_Method": "1"
            }"""+f"""
            Here is the recorded text: {audio_text}"""
            
            
    elif additional_variable==5:
        prompt="""Please provide the information ignoring all other information from the recorded text.
            1) Estimated_Time_of_onset(in HH:MM, 24 hour format) 2) Initial_call_for_help[No(0),Yes(1) give index],
            3) Unit_Notified_By_Dispatch[No(0),Yes(1) give index],
            4) Unit_Reching_Incident_Site[No(0),Yes(1) give index],
            5) Unit_Initiating_Patient_Care[No(0),Yes(1) give index],
            6) Unit_Left_Scene [No(0),Yes(1) give index], 7) Patient_Reaching_Destination [No(0),Yes(1) give index],
            8) Incident_Patient_Disposition [Patient Dying: Priority1(0),Cannot Wait: Priority2(1),Needs Multiple Resources: Priority3(2),Needs Single Resources: Priority4(3),Needs No Resources: Priority5(4), Brought Dead(5) give index],
            9) Incident_Location
            Don't add any comment or any unnecessary information. Give response in JSON format.
            This is an example for your reference:
            Gemini API Response:
            ```
            {
                "Estimated_Time_of_onset": "10:20",
                "Initial_call_for_help": "1",
                "Unit_Notified_By_Dispatch": "0",
                "Unit_Reching_Incident_Site": "1",
                "Unit_Initiating_Patient_Care": "0",
                "Unit_Left_Scene": "0",
                "Patient_Reaching_Destination": "1",
                "Incident_Patient_Disposition": "4",
                "Incident_Location": "Sirsi"
            }"""+f"""
            Here is the recorded text: {audio_text}"""
            
    elif additional_variable==6:
        prompt="""Please provide the information ignoring all other information from the recorded text.
            1) Type_Of_Call 2) Type_Of_Service_Request,
            3) Incident_Location_Type,
            4) Incident_Address
            Don't add any comment or any unnecessary information. Give response in JSON format.
            This is an example for your reference:
            Gemini API Response:
            ```
            {
                "Type_Of_Call": "normal",
                "Type_Of_Service_Request": "normal",
                "Incident_Location_Type": "forest",
                "Incident_Address": "Manipal"
            }"""+f"""
            Here is the recorded text: {audio_text}"""
            
    elif additional_variable==7:
        prompt="""Please provide the information ignoring all other information from the recorded text.
            1) Patient_ID 2) Surname[Mr.(0),MRs.(1) give index],
            3) First_Name,
            4) Middle_Name,
            5) Last_Name,
            6) Patient_Address, 7) Patient_Location,
            8) Contact_PhoneNumber,
            9) Age_Units [Years (0),Months (1),Days (2), give index only],
            10) Date_of_Birth (in yyyy-MM-dd format only), 11) Cheif_Complaints,
            12) Pre_Hospital_Cardiac_Arrest [Yes(0),No(1) give index only),
            13) Pregnency[Yes(0),No(1), Dont know(2) give index only]
            Don't add any comment or any unnecessary information. Give response in JSON format.
            This is an example for your reference:
            Gemini API Response:
            ```
            {
                "Patient_ID": "1234",
                "Surname": "1",
                "First_Name": "Mahesh",
                "Middle_Name": "Raju",
                "Last_Name": "Yadav",
                "Patient_Address": "Ishwar nagar 2nd cross",
                "Patient_Location": "Manipal",
                "Contact_PhoneNumber": "7654289765",
                "Age_Units": "0",
                "Date_of_Birth": "2024-02-25",
                "Cheif_Complaints": "No compliants",
                "Pre_Hospital_Cardiac_Arrest": "0",
                "Pregnency": "1"
            }"""+f"""
            Here is the recorded text: {audio_text}"""
            
    elif additional_variable==8:
        prompt="""Please provide the information ignoring all other information from the recorded text.
            1)date(in yyyy-MM-dd format only) 2) time(24 hour format),3)heart_rate,4)rr_breath_rate,5)oxygen_saturation_room_air,6)initial_pulse_rate,
            7)BP_Measurment_Method[Arterial Line(0),NIBP(1),Manual_BP(2),Palpatory(3) give index],
            8)initial_systolic_bp, 9)initial_diastolic_bp, 10)level_of_consciousness(Awake[0],Verbal[1],Pain[2],Unresponsive[3] give index only),
            11)Oxygen_Saturation_with_oxygen_therapy, 12)skin([warm(0),cool(1)],pink[2],pale[3],dry[4],moist[5],diaphoretic[6],cyanotic[7],skinbleeding[8] its checkbox so it can take multiple options, give indexes in an array), 
            13) right_pupil[Normally Reactive(0),Sluggishy Reactive(1),Non Reactive(2),Constricted(3),Dilated(4),Symmetric(5),asymmetric(6) its checkbox so it can take multiple options, give indexes in an array]
            14) left_pupil[Normally Reactive(0),Sluggishy Reactive(1),Non Reactive(2),Constricted(3),Dilated(4),Symmetric(5),asymmetric(6) its checkbox so it can take multiple options, give indexes in an array]
            15)Best_Verbal_Response[Makes no sounds(0),Incomprenhesible Sounds(1),Inappropriate Voice(2),Confused And Disoriented, but able to answer questions(3),Oriented To Time Person and place,converses Normally(4),Not Testable(5), give index only]
            16)Best_Oscular_Response[Does not Open Eyes(0),Opens eyes in Response to Pain(1),Opens eyes in response to voice(2),Opens eyes Spontaneously(3),Oriented to time person and place,converses normally(4),Non testable(5)]
            17)Best_Motor_Response[Makes No Movements(0),Abnormal Extension(1),Abnormal Flexion(2),Flexion / Withdrawal from painful stimuli(3),Moves To Localize Pain(4),Obeys Commands(5)]
            18)GCS,19)Total_GCS
            Don't add any comment or any unnecessary information. Give response in JSON format. 
            This is an example for your reference:
            Gemini API Response: 
            ```
                {
                "date": "2024-02-20",
                "time": "16:14",
                "heart_rate": "30",
                "rr_breath_rate": "60",
                "oxygen_saturation_room_air": "70",
                "initial_pulse_rate": "40",
                "BP_Measurment_Method": "1",
                "initial_systolic_bp": "70",
                "initial_diastolic_bp": "90",
                "level_of_consciousness": "0",
                "Oxygen_Saturation_with_oxygen_therapy": "70",
                "skin": ["0", "7"],
                "right_pupil": ["0", "2"],
                "left_pupil": ["6", "5"],
                "Best_Verbal_Response": "0",
                "Best_Ocular_Response": "0",
                "Best_Motor_Response": "5",
                "GCS": "30",
                "Total_GCS": "60"
                }
                ```
            """+f"""
            Here is the recorded text: {audio_text}"""
            
            
    elif additional_variable==9:
        prompt="""Please provide the information ignoring all other information from the recorded text.
            1)Airway_Assesment[Intubated(0), Non-Intubated(1),Tacheostimied(2),Patent(3),Obstructed(4),Threatened(5),Difficult(6) give index only],
            2)Difficult_Airway[Anatomical[0],Physological(1),Combined(2) give index only],
            3)Psychological_Difficult_Airway[Hypoxemia(0),Hypotension(1),Right Heart Failure(2),Tension Numethorax(3),Severe Metebolic Acidosis(4) give index  on],
            4)LEMON_Assesment_Lock[Facial Trauma(0),large Incisors(1),Beard,Mostache(2) give index only],
            5)LEMON_Assesment_Evluvate[Incisor Distance FingerBreaths(0),Hyoid/Mental distance FingerBreaths(1),Thyroid To Mouth Distance FingerBreaths(2) give index only],
            6)LEMON_Assesment_Mallampatti[Class 1(0),Class 2(1),Class 3(2),Class 4(3) give index only],
            7)LEMON_Assesment_Obstruction[All(0),None(1) give index],
            8)LEMON_Assesment_Restricted_Neck_Mobiltity[ Yes(0), No(1) Give index only],
            9)Current_Trauma_Related_Automatical_Difficulty[Teeth Loss(0),Oral Injury(1),Maxillary Injury(2),Mandible Fracture(3),Tongue Swelling/Hematoma(4),Tongue Injury(5) give index only],
            10)Anticipated_Difficulty[Difficult Intubation(0),Difficult VideoLaryngoscopy(1),Difficult Fiber Optic Bronchoscopy(2),Difficult front Of Neck Access(3),Psychological Difficult Airway(4) give index only],
            Don't add any comment or any unnecessary information. Give response in JSON format. 
            This is an example for your reference:
            Gemini API Response: 
            ```
                {
                "Airway_Assesment": "1",
                "Difficult_Airway": "2",
                "Psychological_Difficult_Airway": "0",
                "LEMON_Assesment_Lock": "2",
                "LEMON_Assesment_Evluvate": "1",
                "LEMON_Assesment_Mallampatti": "3",
                "LEMON_Assesment_Obstruction": "1",
                "LEMON_Assesment_Restricted_Neck_Mobiltity": "1",
                "Current_Trauma_Related_Automatical_Difficulty": "5",
                "Anticipated_Difficulty": "4"
                }
                ```
            """+f"""
            Here is the recorded text: {audio_text}"""
            
    elif additional_variable==10:
        prompt="""Please provide the information ignoring all other information from the recorded text.
            1)Servical_Motion_Restriction[Yes(0),No(1) give index only],
            2)Is_This_A_Crash_Airway_Management[Yes(0),No(1) give index only],
            3)Airway_Management[Oral Suction(0),Head Tilt chin Lift(1), Jaw Thrust(2),Recovery Position(3),OPA Insertion(4),NPA Insertion(5),Superglotic Airway Insertion(6),Laryngoscopy and intubation(7),Fiberobtic Intubation(8),Front Of neck Access(9),Manual Inline Stabilisation(10),Selik's Maneour(11) give index  on],
            4)Oral_Suction[Vornitus(0),Secretion(1),Blood(2),Foreigh Body(3) give index only],
            5)OPA_Size[00(0),0(1),1(2),2(3),3(4),4(5),5(6) give index only],
            6)NPA_Size[6.5mm/28FR(0),7mm/30FR(1),7.5mm/32FR(2),8mm/34FR(3),8.5mm/36FR(4) give index only],
            7)Supraglotic_Airway_Type[Classic LMA(0),LMA Unique(1),Proseal LMA(2),Flexomatalic LMA(3),LMA Fastrach/Intubating LMA(4),Cuffed Airofrigel Airway(5),Laryngeal Tube Airway(6),iGel(7) give index],
            8)Superglotic_Airway_Size[ 0(0), 1(1),1.5(2),2(3),2.5(4),3(5),4(6),5(7) Give index only],
            9)Number_Of_Superglotic_Aiway_Attempts,
            10)Superglotic_Airway_Difficulty[Difficult Intubation(0),Difficult VideoLaryngoscopy(1),Difficult Fiber Optic Bronchoscopy(2),Difficult front Of Neck Access(3),Psychological Difficult Airway(4) give index only],
            11)Mode_Of_Intubation,
            12)Number_Of_Attempts_Of_Laryngoscopy,
            13)ET_Tube_Size,
            14)Tube_Cuff,
            15)Type_Of_ETTube,
            16)Type_Of_Difficulty_Encountered,
            17)Enroll_The_Case_In_Airway_Management_Registry
            Don't add any comment or any unnecessary information. Give response in JSON format. 
            This is an example for your reference:
            Gemini API Response: 
            ```
                {
                "Airway_Assesment": "1",
                "Difficult_Airway": "2",
                "Psychological_Difficult_Airway": "0",
                "LEMON_Assesment_Lock": "2",
                "LEMON_Assesment_Evluvate": "1",
                "LEMON_Assesment_Mallampatti": "3",
                "LEMON_Assesment_Obstruction": "1",
                "LEMON_Assesment_Restricted_Neck_Mobiltity": "1",
                "Current_Trauma_Related_Automatical_Difficulty": "5",
                "Anticipated_Difficulty": "4"
                }
                ```
            """+f"""
            Here is the recorded text: {audio_text}"""
            
    # elif additional_variable==2:
    #     prompt="""Please provide the information ignoring all other information from the recorded text.
    #         1) Estimated_Time_of_onset(in HH:MM, 24 hour format) 2) Initial_call_for_help[No(0),Yes(1) give index],
    #         3) Unit_Notified_By_Dispatch[No(0),Yes(1) give index],
    #         4) Unit_Reching_Incident_Site[No(0),Yes(1) give index],
    #         5) Unit_Initiating_Patient_Care[No(0),Yes(1) give index],
    #         6) Unit_Left_Scene [No(0),Yes(1) give index], 7) Patient_Reaching_Destination [No(0),Yes(1) give index],
    #         8) Incident_Patient_Disposition [Patient Dying: Priority1(0),Cannot Wait: Priority2(1),Needs Multiple Resources: Priority3(2),Needs Single Resources: Priority4(3),Needs No Resources: Priority5(4), Brought Dead(5) give index],
    #         9) Incident_Location
    #         Don't add any comment or any unnecessary information. Give response in JSON format.
    #         This is an example for your reference:
    #         Gemini API Response:
    #         ```
    #         {
    #             "Estimated_Time_of_onset": "10:20",
    #             "Initial_call_for_help": "1",
    #             "Unit_Notified_By_Dispatch": "0",
    #             "Unit_Reching_Incident_Site": "1",
    #             "Unit_Initiating_Patient_Care": "0",
    #             "Unit_Left_Scene": "0",
    #             "Patient_Reaching_Destination": "1",
    #             "Incident_Patient_Disposition": "4",
    #             "Incident_Location": "Sirsi"
    #         }"""+f"""
    #         Here is the recorded text: {audio_text}"""
        
    # elif additional_variable==3:
    #     prompt="""Please provide the information ignoring all other information from the recorded text.
    #         1) Type_Of_Call 2) Type_Of_Service_Request,
    #         3) Incident_Location_Type,
    #         4) Incident_Address
    #         Don't add any comment or any unnecessary information. Give response in JSON format.
    #         This is an example for your reference:
    #         Gemini API Response:
    #         ```
    #         {
    #             "Type_Of_Call": "normal",
    #             "Type_Of_Service_Request": "normal",
    #             "Incident_Location_Type": "forest",
    #             "Incident_Address": "Manipal"
    #         }"""+f"""
    #         Here is the recorded text: {audio_text}"""
            
             
    # elif additional_variable==2:
    #     prompt="""Please provide the information ignoring all other information from the recorded text.
    #         1) pre_hospital_id 2) surname[Mr(0),Ms(1),Mrs(2),Baby(3),Baby Of(4),Master(5) give index],
    #         3)first_name,
    #         4) middle_name,
    #         5) last_name,
    #         6)patient_address, 7) patient_location,
    #         8)contact_phone_number, 9) age_units[years(0),months(1),days(2)give index], 10) Date_of_birth (in yyyy-MM-dd format only),
    #         11) chief_compliants 12)pre_hospital_cardic_arrest([yes(0), no(1)] give index), 13) pregnency([yes(0), no(1)] give index)
    #         Don't add any comment or any unnecessary information. Give response in JSON format.
    #         This is an example for your reference:
    #         Gemini API Response:
    #         ```
    #         {
    #             "pre_hospital_id": "1234",
    #             "surname": "2",
    #             "first_name": "Nikhil",
    #             "middle_name": "Venkatraman",
    #             "last_name": "Hegde",
    #             "patient_address": "11th cross Ishwar Nagar, manipal, 576104",
    #             "patient_location": "manipal",
    #             "contact_phone_number": "9008134132",
    #             "age_units": "0",
    #             "Date_of_birth": "2024-02-08",
    #             "chief_compliants": "pain in stomach\n pain in eyes",
    #             "pre_hospital_cardic_arrest": "1",
    #             "pregnency": "0"
    #         }"""+f"""
    #         Here is the recorded text: {audio_text}"""
            
            
    
    # elif additional_variable==4:
    #     prompt="""Please provide the information ignoring all other information from the recorded text.
    #         1) Patient_ID 2) Surname[Mr.(0),MRs.(1) give index],
    #         3) First_Name,
    #         4) Middle_Name,
    #         5) Last_Name,
    #         6) Patient_Address, 7) Patient_Location,
    #         8) Contact_PhoneNumber,
    #         9) Age_Units [Years (0),Months (1),Days (2), give index only],
    #         10) Date_of_Birth (in yyyy-MM-dd format only), 11) Cheif_Complaints,
    #         12) Pre_Hospital_Cardiac_Arrest [Yes(0),No(1) give index only),
    #         13) Pregnency[Yes(0),No(1), Dont know(2) give index only]
    #         Don't add any comment or any unnecessary information. Give response in JSON format.
    #         This is an example for your reference:
    #         Gemini API Response:
    #         ```
    #         {
    #             "Patient_ID": "1234",
    #             "Surname": "1",
    #             "First_Name": "Mahesh",
    #             "Middle_Name": "Raju",
    #             "Last_Name": "Yadav",
    #             "Patient_Address": "Ishwar nagar 2nd cross",
    #             "Patient_Location": "Manipal",
    #             "Contact_PhoneNumber": "7654289765",
    #             "Age_Units": "0",
    #             "Date_of_Birth": "2024-02-25",
    #             "Cheif_Complaints": "No compliants",
    #             "Pre_Hospital_Cardiac_Arrest": "0",
    #             "Pregnency": "1"
    #         }"""+f"""
    #         Here is the recorded text: {audio_text}"""
     
    
    # elif additional_variable==5:
    #     prompt="""Please provide the information ignoring all other information from the recorded text.
    #         1)date(in yyyy-MM-dd format only) 2) time(24 hour format),3)heart_rate,4rr_breath_rate,5)oxygen_saturation_room_air,6)initial_pulse_rate,
    #         7)BP_Measurment_Method[Arterial Line(0),NIBP(1),Manual_BP(2),Palpatory(3) give index],
    #         8)initial_systolic_bp, 9)initial_diastolic_bp, 10)level_of_consciousness(Awake[0],Verbal[1],Pain[2],Unresponsive[3] give index only),
    #         11)Oxygen_Saturation_with_oxygen_therapy, 12)skin([warm(0),cool(1)],pink[2],pale[3],dry[4],moist[5],diaphoretic[6],cyanotic[7],skinbleeding[8] its checkbox so it can take multiple options, give indexes in an array), 
    #         13) right_pupil[Normally Reactive(0),Sluggishy Reactive(1),Non Reactive(2),Constricted(3),Dilated(4),Symmetric(5),asymmetric(6) its checkbox so it can take multiple options, give indexes in an array]
    #         14) left_pupil[Normally Reactive(0),Sluggishy Reactive(1),Non Reactive(2),Constricted(3),Dilated(4),Symmetric(5),asymmetric(6) its checkbox so it can take multiple options, give indexes in an array]
    #         15)Best_Verbal_Response[Makes no sounds(0),Incomprenhesible Sounds(1),Inappropriate Voice(2),Confused And Disoriented, but able to answer questions(3),Oriented To Time Person and place,converses Normally(4),Not Testable(5), give index only]
    #         16)Best_Oscular_Response[Does not Open Eyes(0),Opens eyes in Response to Pain(1),Opens eyes in response to voice(2),Opens eyes Spontaneously(3),Oriented to time person and place,converses normally(4),Non testable(5)]
    #         17)Best_Motor_Response[Makes No Movements(0),Abnormal Extension(1),Abnormal Flexion(2),Flexion / Withdrawal from painful stimuli(3),Moves To Localize Pain(4),Obeys Commands(5)]
    #         18)GCS,19)Total_GCS
    #         Don't add any comment or any unnecessary information. Give response in JSON format. 
    #         This is an example for your reference:
    #         Gemini API Response: 
    #         ```
    #             {
    #             "date": "2024-02-20",
    #             "time": "16:14",
    #             "heart_rate": "30",
    #             "rr_breath_rate": "60",
    #             "oxygen_saturation_room_air": "70",
    #             "initial_pulse_rate": "40",
    #             "BP_Measurment_Method": "1",
    #             "initial_systolic_bp": "70",
    #             "initial_diastolic_bp": "90",
    #             "level_of_consciousness": "0",
    #             "Oxygen_Saturation_with_oxygen_therapy": "70",
    #             "skin": ["0", "7"],
    #             "right_pupil": ["0", "2"],
    #             "left_pupil": ["6", "5"],
    #             "Best_Verbal_Response": "0",
    #             "Best_Ocular_Response": "0",
    #             "Best_Motor_Response": "5",
    #             "GCS": "30",
    #             "Total_GCS": "60"
    #             }
    #             ```
    #         """+f"""
    #         Here is the recorded text: {audio_text}"""
    
    
    # elif additional_variable==5:
    #     prompt="""Please provide the information ignoring all other information from the recorded text.
    #         1)Triage_Id 2) Is_the_patient_a_victim_of_mass_casualty[yes(0),no(1) give index],
    #         3)Number_of_patients_affected_in_the_same_incident,
    #         4)Gender[male(0),female(1),transgendr(2),other(3) give f11 dasindex],
    #         5)Name_given_at_the_Triage, 6)Age,
    #         7)Maritial_Status(Single[0],Married[1],In a relationship[2],divorced[3],widowed[4] give index only),
    #         8)Address
    #         Don't add any comment or any unnecessary information. Give response in JSON format. 
    #         This is an example for your reference:
    #         Gemini API Response: 
    #         ```
    #             {
    #             "Triage_Id": "1234",
    #             "Is_the_patient_a_victim_of_mass_casualty": "1",
    #             "Number_of_patients_affected_in_the_same_incident": "30",
    #             "Gender": "2",
    #             "Name_given_at_the_Triage": "Rahul Singh",
    #             "Age": "40",
    #             "Maritial_Status": "2",
    #             "Address": "Maharaja colony, Bangalore",
    #             }
    #             ```
    #         """+f"""
    #         Here is the recorded text: {audio_text}"""
            
    # elif additional_variable==6:
    #      prompt="""Please provide the information ignoring all other information from the recorded text.
    #         1)Triage_date(in yyyy-MM-dd format only), 2) Triage_time,
    #         3)Cheif_presenting_complaint,
    #         4)Duration_of_symptoms_in_Days,
    #         5)Nurse_Send_to[blue area:priority1(0),red area:priority2(1),yellow area:priority3(2),green area:priority4(3),edcrit(4),ed office(5) give index number only], 
    #         6)Emergency_Security_Index_Trialge_Nurse[patient dying:priority1(0),cannot wait:priority2(1),needs multiple resources:priority3(2),needs single resource:priority4(3),needs no resource:priority5(3)(4),brought dead(5) give index number only],
    #         7)Remarks_on_Nurse_Triage,
    #         8)Visitor_id_tag_provided([yes(0),no(1) give index number only]),
    #         9)Register_desk_activated([yes(0),no(1) give index number only]),
    #         10)Triage_nurse_Details.
    #         Don't add any comment or any unnecessary information. Give response in JSON format. 
    #         This is an example for your reference:
    #         Gemini API Response: 
    #         ```
    #             {
    #             "Triage_date": "2024-02-20",
    #             "Triage_time": "16:14",
    #             "Cheif_presenting_complaint": "1.Compliant one \n2.Compliant two",
    #             "Duration_of_symptoms_in_Days": "7",
    #             "Nurse_Send_to": "3",
    #             "Emergency_Security_Index_Trialge_Nurse": "4",
    #             "Remarks_on_Nurse_Triage": "...",
    #             "Visitor_id_tag_provided": "1",
    #             "Register_desk_activated": "0",
    #             "Triage_nurse_Details": "Name - , Department - "
    #             }
    #             ```
    #         """+f"""
    #         Here is the recorded text: {audio_text}"""
            
    # elif additional_variable==7:
    #     prompt="""Please provide the information ignoring all other information from the recorded text.
    #         1)Physical_Triage_date(in yyyy-MM-dd format only), 2) Physical_Triage_time,
    #         3)Emergency_Physician_Triage[patient dying:priority1(0),cannot wait:priority2(1),needs multiple resources:priority3(2),needs single resource:priority4(3),needs no resource:priority5(3)(4)] give index number only)",
    #         4)EM_Physician_Concurence_with_nurse_triage([yes(0),no(1) give index number only]),
    #         5)Physician_Admission(blue area:priority1(0),red area:priority2(1),yellow area:priority3(2),green area:priority4(3),edcrit(4),ed office(5),isolation(6),morque(7)] give index number only), 
    #         6)Emergency_severity_index_physician_Triage[patient dying:priority1(0),cannot wait:priority2(1),needs multiple resources:priority3(2),needs single resource:priority4(3),needs no resource:priority5(3)(4),brought dead(5)] give index number only),
    #         7)Remarks_for_Triage,
    #         8)Major_classification_of_case([trauma(0),non-rauma(1),trauma_plus_with_medical_condition(2),neonatal(3),pediatric(4),obstertic(5)] give index number only),
    #         9)medicalogical_case([yes(0),no(1) give index number only]).
    #         Don't add any comment or any unnecessary information. Give response in JSON format. 
    #         This is an example for your reference:
    #         Gemini API Response: 
    #         ```
    #             {
    #             "Physical_Triage_date": "2024-02-20",
    #             "Physical_Triage_time": "16:14",
    #             "Emergency_Physician_Triage": "2",
    #             "EM_Physician_Concurence_with_nurse_triage": "1",
    #             "Physician_Admission": "3",
    #             "Emergency_severity_index_physician_Triage": "3",
    #             "Remarks_for_Triage": "No remarks at all",
    #             "Major_classification_of_case": "3",
    #             "medicalogical_case": "0"
    #             }
    #             ```
    #         """+f"""
    #         Here is the recorded text: {audio_text}"""
        

    gemini_model_response = gemini_model_api_request(prompt)

    if gemini_model_response is not None and 'text_response' in gemini_model_response:
        print("Error decoding Gemini API response as JSON. Using text response instead.")

    # Include the Gemini API response in the returned data
    extracted_info = {
        'audio_text': audio_text,
        'gemini_response': gemini_model_response
    }

# Inside the /start_recording endpoint
@app.route('/start_recording', methods=['POST'])
async def start_recording():
    global extracted_info
    global lock
    global stop_flag
    global additional_variable
    additional_variable = request.json.get('additional_variable')
    print(f"additional_variable:{additional_variable}")
    print("Additinal variable received")

    # Use a lock to avoid interference between threads
    with lock:
        extracted_info = {}  # Set to an empty dictionary
        stop_flag = threading.Event()  # Event to signal stop recording
        # Run the asynchronous task in a separate thread
        await asyncio.to_thread(run_async_task, stop_flag)

    return jsonify({'status': 'Recording and processing started'})

# Define the /stop_recording endpoint
@app.route('/stop_recording', methods=['GET'])
async def stop_recording():
    global extracted_info
    global stop_flag
    print("Recording stopped")
   

    # Set the stop flag to stop recording
    stop_flag.set()

    # Poll until the Gemini API response is ready
    while 'gemini_response' not in extracted_info:
        await asyncio.sleep(1)

    # Check if the response is in text format
    if isinstance(extracted_info['gemini_response'], str):
        # Parse text response to JSON
        json_response = parse_text_response(extracted_info['gemini_response'])
        extracted_info['gemini_response'] = json_response

    return jsonify({'gemini_response': extracted_info.get('gemini_response')})

# Define the /process_form_data endpoint to handle form data
@app.route('/process_form_data', methods=['POST'])
def process_form_data():
    # Extracting form data from the request
    form_data = request.json
    print("Form data received:", form_data)

    return jsonify({'status': 'Form data processed successfully'})

if __name__ == '__main__':
    app.run(debug=True)
