import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 py-8">
      <div className="container mx-auto  flex justify-center font-bold items-center">
        <div className="text-white font-bold text-lg"></div>
        <ul className="flex space-x-8">
          <li>
            <a href="#" className="text-white">
              Transfer in
            </a>
          </li>
          <li>
            <a href="#" className="text-white">
              Triage
            </a>
          </li>
          <li>
            <a href="#" className="text-white">
              Treatment
            </a>
          </li>
          <li>
            <a href="#" className="text-white">
              Airway Management
            </a>
          </li>
          <li>
            <a href="#" className="text-white">
              Breathing and Ventilation
            </a>
          </li>
          <li>
            <a href="#" className="text-white">
              Circualtion
            </a>
          </li>
          <li>
            <a href="#" className="text-white">
              Tests
            </a>
          </li>
          <li>
            <a href="#" className="text-white">
              Transactions
            </a>
          </li>
          <li>
            <a href="#" className="text-white">
              Transfer Out
            </a>
          </li>
          <li>
            <a href="#" className="text-white">
              Teams
            </a>
          </li>
          <li>
            <a href="#" className="text-white">
              Task Checklist
            </a>
          </li>
          <li>
            <a href="#" className="text-white">
              Treatments
            </a>
          </li>
          <li>
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
