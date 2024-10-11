import React, { useState, useEffect } from "react";
const AlertError = (props) => {
  return (
    <>
      <div
        id="modelConfirm"
        className={`fixed z-50 ${props.hideAlert} inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4 `}
      >
        <div className="relative top-40 mx-auto shadow-xl rounded-md bg-white max-w-md">
          <div className="p-6 pt-4 text-center">
            <svg
              className="w-20 h-20 text-red-600 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <div>
              {props.errors.map((err) => {
                if(err.msg) {
                  const message = err.msg + "\n";
                  return (
                    <h6
                      className="text-sm font-normal text-gray-500 mt-1 mb-1"
                      key={message}
                    >
                      {message}
                    </h6>
                  );
                }
                else {
                  const message = err + "\n";
                  return (
                    <h6
                      className="text-sm font-normal text-gray-500 mt-2 mb-2"
                      key={message}
                    >
                      {message}
                    </h6>
                  );
                }
              })}
            </div>

            <button
              onClick={() => {
                props.setHideAlert("hidden");
              }}
              className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2"
            >
              Okay
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AlertError;
