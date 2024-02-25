import React from "react";

const InputForm = () => {
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
            <label className=" text-gray-700 text-sm font-bold mb-2 w-36  sm:w-56  sm:flex">
              Triage id
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              //   id="name"
              //   type="text"
              //   name="name"
            />
          </div>
          <div className="mb-4">
            <label className="flex text-gray-700 text-sm font-bold mb-2 w-64">
              Is the patient a victim of mass casualty
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-4">
            <label className="flex text-gray-700 text-sm font-bold mb-2 w-96">
              Number of patients affected in the same incident
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-4">
            <label className="flex text-gray-700 text-sm font-bold mb-2 w-60">
              Gender
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
        </div>
        <div className=" inline-block sm:flex md:flex xl:flex justify-start max-w-md pl-14 space-x-12 pt-8 ">
          <div className="mb-4">
            <label className="flex text-gray-700 text-sm font-bold mb-2 w-96">
              Name given at the Triage
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-4">
            <label className="flex text-gray-700 text-sm font-bold mb-2 w-64">
              Age in years
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-4">
            <label className="flex text-gray-700 text-sm font-bold mb-2 w-96">
              Maritial Status
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-4">
            <label className="flex text-gray-700 text-sm font-bold mb-2 w-96">
              Address
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
        </div>
        <div className="button flex justify-center  pt-2 text-sm font-bold  pl-9 ">
          <button className="w-40 h-14 bg-blue-500 rounded-2xl mr-4">
            Start Recording
          </button>
          <button className="w-40 h-14 bg-orange-400 rounded-2xl">
            Stop Recording
          </button>
        </div>
      </div>
      <div className="border-b-4 h-auto pb-4">
        <div className="block sm:flex md:flex xl:flex justify-start max-w-md pl-6 space-x-12 pt-8 ml-9">
          <div className="mb-4 ">
            <label className=" text-gray-700 text-sm font-bold mb-2 w-36  sm:w-56  sm:flex">
              Triage Date and Time
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              //   id="name"
              //   type="text"
              //   name="name"
            />
          </div>
          <div className="mb-4">
            <label className="flex text-gray-700 text-sm font-bold mb-2 w-96">
              Cheif presenting complaint
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline space-x-20" />
          </div>
          <div className="mb-4">
            <label className="flex text-gray-700 text-sm font-bold mb-2 w-96">
              Duration of symptoms in Days
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-4">
            <label className="flex text-gray-700 text-sm font-bold mb-2 w-96">
              Nurse Sent to:
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
        </div>
        <div className=" inline-block sm:flex md:flex xl:flex justify-start max-w-md pl-14 space-x-12 pt-8 ">
          <div className="mb-4">
            <label className="flex text-gray-700 text-sm font-bold mb-2 w-96">
              Emergency security index Trialge:Nurse
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-4">
            <label className="flex text-gray-700 text-sm font-bold mb-2 w-96 ">
              Remarks on Nurse Triage
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows="4"
            />
          </div>
          <div className="mb-4 ">
            <label className="flex text-gray-700 text-sm font-bold mb-2 w-96">
              Visitor id tag provided
            </label>
            <input className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-4">
            <label className="flex text-gray-700 text-sm font-bold mb-2 w-56">
              Register desk activated
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
        </div>
        <div className=" inline-block sm:flex md:flex xl:flex justify-start  pl-14 space-x-12 pt-8 ">
          <div className="mb-4">
            <label className="flex text-gray-700 text-sm font-bold mb-2">
              Triage nurse Details
            </label>
            <input className=" shadow appearance-none border rounded   w-96 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
        </div>
        <div className="button flex justify-center  pt-2 text-sm font-bold  pl-9 ">
          <button className="w-40 h-14 bg-blue-500 rounded-2xl mr-4">
            Start Recording
          </button>
          <button className="w-40 h-14 bg-orange-400 rounded-2xl">
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
            <label className=" text-gray-700 text-sm font-bold mb-2 w-36  sm:w-56  sm:flex">
              Physical Triage Date and Time
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              //   id="name"
              //   type="text"
              //   name="name"
            />
          </div>
          <div className="mb-4">
            <label className="flex text-gray-700 text-sm font-bold mb-2 w-96">
              Emergency Physician Triage
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline space-x-20" />
          </div>
          <div className="mb-4">
            <label className="flex text-gray-700 text-sm font-bold mb-2 w-96">
              EM Physician Concurence with nurse triage
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-4">
            <label className="flex text-gray-700 text-sm font-bold mb-2 w-96">
              Physician:Admission
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
        </div>
        <div className=" inline-block sm:flex md:flex xl:flex justify-start max-w-md pl-14 space-x-12 pt-8  ">
          <div className="mb-4">
            <label className="flex text-gray-700 text-sm font-bold mb-2 w-96">
              Emergency severity index physician Triage code:Emergency Physician
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-4">
            <label className="flex text-gray-700 text-sm font-bold mb-2 w-96 ">
              Remarks for Triage
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows="4"
            />
          </div>
          <div className="mb-4 ">
            <label className="flex text-gray-700 text-sm font-bold mb-2 w-96">
              Major classification of case
            </label>
            <input className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-4">
            <label className="flex text-gray-700 text-sm font-bold mb-2 w-56">
              medicalogical case
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
        </div>

        <div className="button flex justify-center  pt-2 text-sm font-bold  pl-9 ">
          <button className="w-40 h-14 bg-blue-500 rounded-2xl mr-4">
            Start Recording
          </button>
          <button className="w-40 h-14 bg-orange-400 rounded-2xl">
            Stop Recording
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputForm;
