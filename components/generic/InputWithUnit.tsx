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
    style?: string,
    unit?: string,
    unitTypes?: Array<string>
}

const InputFieldWithUnit = ({ value, label, name, id, placeholder, type, onChange, readOnly, unit , unitTypes }: InputFields) => (
   
  <div className="form-group">
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
    </label>
    <div className="mt-1 relative rounded-md shadow-sm">
        
    <input
      readOnly={readOnly}
      type={type}
      value={value}
      id={id}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full 
      shadow-sm sm:text-sm border-gray-300 rounded-md"
    />
       <div className="absolute inset-y-0 right-0 flex items-center">
       { !unitTypes ? <div className="text-gray-500 pr-7 sm:text-sm">{unit}</div> :
         ( <>
            <label htmlFor="currency" className="sr-only">
            {unit}
          </label>
           <select
            id="currency"
            name="currency"
            className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 
            border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
          >
              {unitTypes.map((unitType: string) => (<option key={unitType} value={unitType}>{unitType}</option>))}  
          </select> </> ) 
          }
        </div>
        </div>
</div>

);

export default InputFieldWithUnit;