import { Fragment } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'


export interface Props {
    searchAddress: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>, 
    addressQuery: string, 
    addressList: Array<addressItem>, 
    isValidAddress: string | boolean,
    selected: string | object,
    handleSelect: (item: React.SetStateAction<{ forslagstekst: string; }>) => void,
}


type addressItem = 
| { [key: string]: any }


  const GeneralCombobox: React.FC<Props> = ({searchAddress, addressQuery, addressList, isValidAddress, selected, handleSelect, ...props}: Props) => {
      

  return (
      <>
    <div className=" w-full sm:w-1/2">
    <Combobox value={selected} onChange={handleSelect}> 
      <div className="relative mt-1 z-10">
        <div className="relative w-full text-left bg-white shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-indigo-500 
         focus-visible:ring-offset-indigo-500  focus-visible:ring-offset-2 sm:text-sm overflow-hidden">
          <Combobox.Input
            className={
                `mt-1 w-full focus:ring-indigo-500 focus:border-indigo-500 
                block shadow-sm sm:text-sm 
                ${isValidAddress ? 'border-gray-300' : 'border border-red-700'} rounded-md`}
            displayValue={(addressItem: addressItem) => addressItem.forslagstekst}
            onChange={searchAddress} 
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
            <SelectorIcon
              className="w-5 h-5 text-gray-400"
              aria-hidden="true"
            />
          </Combobox.Button>
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Combobox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {addressQuery.length === 0 && addressQuery !== '' ? (
              <div className="cursor-default select-none relative py-2 px-4 text-gray-700">
                Nothing found.
              </div>
            ) : (
              addressList.map((addressItem: addressItem) => (
                <Combobox.Option
                  key={addressItem.forslagstekst}
                  className={({ active }) =>
                    `cursor-default select-none relative py-2 pl-10 pr-4 ${
                      active ? 'text-white bg-indigo-500' : 'text-gray-900'
                    }`
                  }
                  value={addressItem}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {addressItem.forslagstekst}
                      </span>
                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? 'text-white' : 'text-indigo-500'
                          }`}
                        >
                          <CheckIcon className="w-5 h-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  </div>
  </>
  );
}

export default GeneralCombobox