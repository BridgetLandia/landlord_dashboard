import { dbPortfolioRef } from '../../firebase/firebase';
 import { addDoc } from  'firebase/firestore';
import { useState, useReducer } from 'react'
import InputField from '../generic/Input';
import Button from '../generic/Button'

const baseUrl = 'https://api.dataforsyningen.dk/'

  type State = {
    initalState: object;
  }


  type Actions = 
    | {
      type: 'setState',
      payload: {
      field: string
      value: string}

    }
    | {
      type: 'reset'
      payload: initialState
      
    }
  

  interface Props {
    closeForm: () => void,
  }

type initialState = {
  rooms: string,
  size: string,
  rent: string,
  contract: string
}

type addressItem = 
  | {
  forslagstekst: string} 


const initialState = {
  rooms: "",
  size: "",
  rent: "",
  contract: ""
}

function init(initialState: any) {
  return initialState;
}

function reducer(state: State, action: Actions) {
  switch (action.type) {
    case 'setState':
      return {
        ...state,
        [action.payload.field]: action.payload.value
    }
    case 'reset':
      return init(action.payload);
    default:
      throw new Error();
  }
}

const CreatePortfolioItem: React.FC<Props> = (props) => {
    const [ addressList, setAddressList] = useState<Array<addressItem> | []>([])
    const [ addressSearch, setAddressSearch] = useState<string>('')
    const [ street, setStreet] = useState<string>('')
    const [ city, setCity] = useState<string>('')
    const [ zip, setZip] = useState<string>('')
    const [state, dispatch] = useReducer(reducer, initialState, init)

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({type: 'setState', payload: {field: e.currentTarget.name, value: e.currentTarget.value}})
    }

    const {rooms, size, rent, contract} = state
    console.log(state)

    const addressDataformGroup = [
      {label: "*Street", name: "street", type:"text", value: street},
      {label: "*City", name: "city", type:"text", value: city },
      {label: "*Zip", name: "zip", type:"text", value: zip }
    ]

    const generalDataformGroup = [
      {label: "Rooms", name: "rooms", type:"text", value: rooms },
      {label: "Size", name: "size", type:"text", value: size },
      {label: "Rent", name: "rent", type:"text", value: rent }
    ]

  async function searchAddress(
    e: React.ChangeEvent<HTMLInputElement>) {
    setAddressSearch(e.currentTarget.value)
    let splitAddress = e.currentTarget.value.split(',')
    let lastItem = splitAddress [splitAddress.length - 1].split(' ')
   
    if(splitAddress .length > 1){
      setStreet(splitAddress[0])
      setZip(lastItem[1])
      setCity(lastItem[2])
   
    }
      try {
          const searchRequest = await fetch(`${baseUrl}autocomplete?type=adresse&q=${addressSearch}&caretpos=4`)
          const registerList = await searchRequest.json();
          setAddressList(registerList)
          
      } catch (error) {
          console.error(error);
      }
  }
  

async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let isValidAddress = false
    try {
      const validateRequest = await fetch(`${baseUrl}autocomplete?type=adresse&q=${addressSearch}&caretpos=4`)
      const result = await validateRequest.json();
      console.log(result[0].forslagstekst)
    if(result[0].forslagstekst === addressSearch){
        isValidAddress = true
    }
      
  } catch (error) {
      console.error(error);
  }
  console.log(isValidAddress)
      if(isValidAddress) {

      let formData = {
    ...state,
    address: addressSearch

          }
    addDoc(dbPortfolioRef, formData)
    dispatch({type: 'reset', payload: initialState})
    setAddressSearch('')

      }

   console.log('You clicked submit.');
  }
    return (
      <>
     <div className="hidden sm:block" aria-hidden="true">
          <div className="py-5">
            <div className="border-t border-gray-200" />
          </div>
        </div>
        <div className="mt-10 sm:mt-0">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Add Property Information</h3>
                <p className="mt-1 text-sm text-gray-600">All fields marked with an asterisk (*) are required</p>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <form action="#" method="POST" onSubmit={handleSubmit}>
                <div className="shadow overflow-hidden sm:rounded-md">
                  <div className="px-4 py-5 bg-white sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                 
  
                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                        *Country
                        </label>
                        <select
                          id="country"
                          name="country"
                          autoComplete="country-name"
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          <option>Danemark</option>
                          <option>Germany</option>
                          <option>Netherlands</option>
                        </select>
                      </div>
  
                      <div className="col-span-6">
                        <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
                        *Start typing street to prefill below fields 
                        </label>
                        <input
                          list="address"
                          value={addressSearch || ''}
                          onChange={searchAddress}
                          type="text"
                          name="street-address"
                          id="street-address"
                          autoComplete="street-address"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                        <datalist id="address">
                          {addressList.length > 0 ? addressList.map((addressItem: addressItem) => 
                          (
                          <option key={addressItem.forslagstekst}>{addressItem.forslagstekst}</option>
                          )
                          ) : 
                          <option>No similar address found</option>}
                        </datalist>
                      </div>

                 

                      {addressDataformGroup.map((fieldName) => (<div key={fieldName.label} className="col-span-6 sm:col-span-2">
                        <InputField
                          type={fieldName.type}
                          name={fieldName.name}
                          id={fieldName.name}
                          label={fieldName.label}
                          value={fieldName.value}
                          readOnly={true}
                        />
                      </div>
                     
                      ))}

                      {generalDataformGroup.map((fieldName) => (<div key={fieldName.label} className="col-span-6 sm:col-span-2">
                        <InputField
                          type={fieldName.type}
                          name={fieldName.name}
                          id={fieldName.name}
                          value={fieldName.value}
                          onChange={onChange}
                          label={fieldName.label}
                          readOnly={false}
                        />
                      </div>
                     
                      ))}
  
                      <div className="col-span-6 sm:col-span-4">
                        <label htmlFor="contract" className="block text-sm font-medium text-gray-700">
                          Contract Type
                        </label>
                        <input
                          type="text"
                          name="contract"
                          id="contract"
                          value={contract}
                          onChange={onChange}
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <Button  name={'Cancel'} type={'button'} onClick={props.closeForm} className="mx-10"/> 
                  <Button  name={'Save'} type={'submit'}/>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        </>
  )
}

export default CreatePortfolioItem