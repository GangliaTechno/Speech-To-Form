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
            audio_data = recognizer.listen(source)
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
            
    elif additional_variable==2:
        prompt="""Please provide the information ignoring all other information from the recorded text.
            1) pre_hospital_id 2) surname[Mr(0),Ms(1),Mrs(2),Baby(3),Baby Of(4),Master(5) give index],
            3)first_name,
            4) middle_name,
            5) last_name,
            6)patient_address, 7) patient_location,
            8)contact_phone_number, 9) age_units[years(0),months(1),days(2)give index], 10) Date_of_birth (in yyyy-MM-dd format only),
            11) chief_compliants 12)pre_hospital_cardic_arrest([yes(0), no(1)] give index), 13) pregnency([yes(0), no(1)] give index)
            Don't add any comment or any unnecessary information. Give response in JSON format.
            This is an example for your reference:
            Gemini API Response:
            ```
            {
                "pre_hospital_id": "1234",
                "surname": "2",
                "first_name": "Nikhil",
                "middle_name": "Venkatraman",
                "last_name": "Hegde",
                "patient_address": "11th cross Ishwar Nagar, manipal, 576104",
                "patient_location": "manipal",
                "contact_phone_number": "9008134132",
                "age_units": "0",
                "Date_of_birth": "2024-02-08",
                "chief_compliants": "pain in stomach\n pain in eyes",
                "pre_hospital_cardic_arrest": "1",
                "pregnency": "0"
            }"""+f"""
            Here is the recorded text: {audio_text}"""
            
    elif additional_variable==3:
        prompt="""Please provide the information ignoring all other information from the recorded text.
            1)date(in yyyy-MM-dd format only) 2) time,3)heart_rate,4rr_breath_rate,5)oxygen_saturation_room_air,6)initial_pulse_rate,
            7)BP_Measurment_Method[Arterial Line(0),NIBP(1),Manual_BP(2),Palpatory(3) give index],
            8)initial_systolic_bp, 9)initial_diastolic_bp, 10)level_of_consciousness(Awake[0],Verbal[1],Pain[2],Unresponsive[3] give index only),
            11)Oxygen_Saturation_with_oxygen_therapy, 12)skin([warm(0),cool(1)],pink[2],pale[3],dry[4],moist[5],diaphoretic[6],cyanotic[7],skinbleeding[8] its checkbox so it can take multiple options, give indexes in an array), 
            13) right_pupil[Normally Reactive(0),Sluggishy Reactive(1),Non Reactive(2),Constricted(3),Dilated(4),Symmetric(5),asymmetric(6) its checkbox so it can take multiple options, give indexes in an array]
            14) left_pupil[Normally Reactive(0),Sluggishy Reactive(1),Non Reactive(2),Constricted(3),Dilated(4),Symmetric(5),asymmetric(6) its checkbox so it can take multiple options, give indexes in an array]
            15)Best_Verbal_Response[Makes no sounds(0),Incomprenhesible Sounds(1),Inappropriate Words(2),Confused And Disoriented, but able to answer questions(3),Oriented To Time Person and place,converses Normally(4),Not Testable(5), give index only]
            16)Best_Ocular_Response[Does not Open Eyes(0),Opens eyes in Response to Pain(1),Opens eyes in response to voice(2),Opens eyes Spontaneously(3)]
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
            
    elif additional_variable==5:
        prompt="""Please provide the information ignoring all other information from the recorded text.
            1)Triage_Id 2) Is_the_patient_a_victim_of_mass_casualty[yes(0),no(1) give index],
            3)Number_of_patients_affected_in_the_same_incident,
            4)Gender[male(0),female(1),transgendr(2),other(3) give index],
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
            
    elif additional_variable==6:
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
                "Remarks_on_Nurse_Triage": "I was good anyways...",
                "Visitor_id_tag_provided": "1",
                "Register_desk_activated": "0",
                "Triage_nurse_Details": "Name - Maharani, Department - medical"
                }
                ```
            """+f"""
            Here is the recorded text: {audio_text}"""
            
    elif additional_variable==7:
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
def start_recording():
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
        threading.Thread(target=run_async_task, args=(stop_flag,)).start()

    return jsonify({'status': 'Recording and processing started'})

# Define the /stop_recording endpoint
@app.route('/stop_recording', methods=['GET'])
def stop_recording():
    global extracted_info
    global stop_flag
    print("Recording stopped")
   

    # Set the stop flag to stop recording
    stop_flag.set()

    # Poll until the Gemini API response is ready
    while 'gemini_response' not in extracted_info:
        time.sleep(1)

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
