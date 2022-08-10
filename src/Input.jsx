import React from "react";

const Input = ({ name, type, value, error, placeholder, label, onChange }) => {
  return (
    <div>
            <label
              className="after:content-['*'] after:ml-0.5 after:text-red-500 
            text-sm block font-medium text-slate-700"
            >
              {label}
            </label>
            <input
              type={type}
              placeholder={placeholder}
              name={name}
              id={name}
              value={value}
              onChange={onChange}
              className="mt-1 px-3 py-2 bg-white border shadow-sm
              border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500
               focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            />
            {error &&   <p className="  text-pink-600 text-sm">
      {error}
    </p>}
          </div>
   
  );
};

export default Input;
