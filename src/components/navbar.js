import React from "react";

const Navbar = () => {
  return (
    <nav className=" py-8"style ={{background:'linear-gradient(to bottom,#4b6cb7,#182848)'}}>
      <div className="container mx-auto  justify-center md:justify-center  font-bold ">
        <div className="text-white font-bold text-lg "></div>
        <ul className="block sm:flex  md:flex  xl:flex space-x-8  ">
          <li className="my-4 sm:my-0">
            <a href="#" className="text-white">
              Transfer in
            </a>
          </li>
          <li  className="my-4 sm:my-0">
            <a href="#" className="text-white">
              Triage
            </a>
          </li>
          <li  className="my-4 sm:my-0">
            <a href="#" className="text-white">
              Treatment
            </a>
          </li>
          <li  className="my-4 sm:my-0">
            <a href="#" className="text-white">
              Airway Management
            </a>
          </li>
          <li  className="my-4 sm:my-0">
            <a href="#" className="text-white">
              Breathing and Ventilation
            </a>
          </li>
          <li  className="my-4 sm:my-0">
            <a href="#" className="text-white">
              Circualtion
            </a>
          </li>
          <li  className="my-4 sm:my-0">
            <a href="#" className="text-white">
              Tests
            </a>
          </li>
          <li  className="my-4 sm:my-0">
            <a href="#" className="text-white">
              Transactions
            </a>
          </li>
          <li  className="my-4 sm:my-0">
            <a href="#" className="text-white">
              Transfer Out
            </a>
          </li>
          <li  className="my-4 sm:my-0">
            <a href="#" className="text-white">
              Teams
            </a>
          </li>
          <li  className="my-4 sm:my-0">
            <a href="#" className="text-white">
              Task Checklist
            </a>
          </li>
          <li  className="my-4 sm:my-0">
            <a href="#" className="text-white">
              Treatments
            </a>
          </li>
          <li  className="my-4 sm:my-0">
            <a href="#" className="text-white">
              Traking
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
