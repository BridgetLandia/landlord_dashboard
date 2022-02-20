import { dbPortfolioRef } from '../../firebase/firebase';
import { addDoc} from  'firebase/firestore';
import { useState } from 'react'
import InputField from '../generic/Input';
import InputFieldWithUnit from '../generic/InputWithUnit'
import Button from '../generic/Button'
import { usePortfolioFormReducer, initialState } from './ReducerCreatePortfolio';
import GeneralCombobox from '../generic/Combobox'


const baseUrl = 'https://api.dataforsyningen.dk/'

 interface Props {
    closeForm: () => void,
  }


  type addressItem = 
  | { forslagstekst: string
      data: object }
  | { [key: string]: any }

const CreatePortfolioItem: React.FC<Props> = (props) => {
    const [ addressList, setAddressList] = useState<Array<addressItem> | []>([])
    const [ addressQuery, setaddressQuery] = useState<string>('')
    const [selected, setSelected] = useState(addressList[0])
    const [submitted, setSubmitted] = useState(false)
    const [ street, setStreet] = useState<string>('')
    const [ houseNumber, setHouseNumber] = useState<string>('')
    const [ city, setCity] = useState<string>('')
    const [ zip, setZip] = useState<string>('')
    const [ currency, setCurrency] = useState<string>('EUR')
    const [ isValidAddress, setisValidAddress] = useState<string | boolean>("Not validated")
    const [state, dispatch] = usePortfolioFormReducer()
    
   function handleSelect(item: addressItem){
    console.log(item)
        setSelected(item)
    let splitAddress = item.data
  
      setStreet(splitAddress.vejnavn)
      setHouseNumber(splitAddress.husnr)
      setZip(splitAddress.postnr)
      setCity(splitAddress.postnrnavn)
    
  
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      
      dispatch({type: 'setState', payload: {field: e.currentTarget.name, 
        value: e.currentTarget.name === 'contract' ? e.currentTarget.value : Number(e.currentTarget.value.replace(/[^\d]/g, '')) }})
    }

    const selectUnitType = (e: React.ChangeEvent<HTMLSelectElement>) => {
      console.log(e.target.value)
            setCurrency(e.target.value)
            
    }
    const {rooms, size, rent, contract} = state
    
    console.log(state)

    const addressDataformGroup = [
      {label: "*Street", name: "street", type:"text", value: street},
      {label: "*Nr.", name: "houseNumber", type:"text", value: houseNumber},
      {label: "*City", name: "city", type:"text", value: city },
      {label: "*Zip", name: "zip", type:"text", value: zip }
    ]

    const generalDataformGroup = [
      {label: "Rooms", name: "rooms", type:"text", value: rooms, unit:"rooms" },
      {label: "Size", name: "size", type:"text", value: size, unit: "m2"  },
      {label: "Rent", name: "rent", type:"text", value: rent, unit: "Currency", unitTypes: ["EUR", "USD", "DKK"]}
    ]

  async function searchAddress(
    e: React.ChangeEvent<HTMLInputElement>) {
    setaddressQuery(e.currentTarget.value)
    console.log(e.currentTarget.value)
    
      try {
          const searchRequest = await fetch(`${baseUrl}autocomplete?type=adresse&q=${addressQuery}&caretpos=4`)
          const registerList = await searchRequest.json();
          setAddressList(registerList)
          setisValidAddress("Not validated")
      } catch (error) {
          console.error(error);
      }
  }
  

const handleSubmit = async function(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitted) {
      return;
  }
  setSubmitted(true)
    let validation = false
    if(selected && selected.forslagstekst){
       validation = true   
  } else {
      setSubmitted(false)
      setisValidAddress(false)
  }
  
  
      if(validation) {
        let addressJSON = JSON.stringify(selected.forslagstekst)
        let apikey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY
        
        try {
        const geocode = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${addressJSON}&key=${apikey}`)
        const result = await geocode.json() 
       
        let placeID = result.results[0].geometry.location
        setisValidAddress("Not validated")
        let formData = {
      ...state,
      currency: currency,
      address: selected.forslagstekst,
      streetview: placeID}
   
      addDoc(dbPortfolioRef, formData)
      dispatch({type: 'reset', payload: initialState})
      setaddressQuery('')
      setStreet('')
      setCity('')
      setZip('')
      setHouseNumber('')
          } catch (error){
          console.error(error);
          setSubmitted(false)
        }
        props.closeForm()
      } else {
        setSubmitted(false)
        console.log(isValidAddress)
        console.log('You clicked submit.')
       
        setisValidAddress(false)
        
      }
      
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
                          <option disabled>Germany</option>
                          <option disabled>Netherlands</option>
                        </select>
                      </div>
  
                      <div className="col-span-6">
                        <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
                        *Start typing address to prefill below fields (Danish only)
                        </label>
                        <GeneralCombobox 
                        searchAddress={searchAddress} 
                        addressList={addressList} 
                        addressQuery={addressQuery} 
                        isValidAddress={isValidAddress}
                        selected={selected}
                        handleSelect={handleSelect}
                        />
                      
                        {!isValidAddress  && <span className="text-xs text-red-700" id="passwordHelp">Invalid address, choose from the dropdown</span>}
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
                        <InputFieldWithUnit
                          type={fieldName.type}
                          name={fieldName.name}
                          id={fieldName.name}
                          value={fieldName.value}
                          onChange={onChange}
                          selectUnitType={selectUnitType}
                          label={fieldName.label}
                          readOnly={false}
                          unit={fieldName.unit}
                          unitTypes={fieldName.unitTypes}
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