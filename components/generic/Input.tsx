import React from "react";

type InputFields = {
    value?: string, 
    label: string, 
    name: string, 
    id: string,
    placeholder?: string, 
    type: string,
    onChange?: React.ChangeEventHandler,
    readOnly: boolean,
    style?: string
}

const InputField = ({ value, label, name, id, placeholder, type, onChange, readOnly  }: InputFields) => (
  <div className="form-group">
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
    </label>
    <input
      readOnly={readOnly}
      type={type}
      value={value}
      id={id}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      className={`${readOnly ? 'mt-1 bg-gray-50 block w-full shadow-sm sm:text-sm focus:ring-gray-50 focus:border-none border-gray-300 rounded-md' : 
      'mt-1 focus:ring-indigo-500  focus:border-indigo-500 block w-full shadow-sm sm:text-sm  border-gray-300 rounded-md'}`}
    />
  </div>
);

export default InputField;