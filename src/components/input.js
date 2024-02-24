import React from "react";

const InputForm = () => {
  return (
    <div className="border-b-4 h-auto pb-4">
      <div className="flex justify-start max-w-md pl-6 space-x-12 pt-8 ">
        <div className="button flex  pt-4 text-sm font-bold self-center pl-9">
          <button className="w-56 h-16 bg-blue-500 rounded-3xl">
            Create Unique Triage ID
          </button>
        </div>
        <div className="mb-4">
          <label className="flex text-gray-700 text-sm font-bold mb-2 w-56">
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
      <div className="flex justify-start max-w-md pl-14 space-x-12 pt-8 ">
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
      <div className="button flex justify-center pt-2 text-sm font-bold self-center pl-9 ">
          <button className="w-40 h-14 bg-blue-500 rounded-2xl mr-4">
            Start Recording 
          </button>
          <button className="w-40 h-14 bg-orange-400 rounded-2xl">
            Stop Recording 
          </button>
         
        </div>
    </div>
  );
};

export default InputForm;
