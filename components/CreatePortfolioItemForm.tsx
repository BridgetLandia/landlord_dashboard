import { useState } from 'react'

export default function CreatePortfolioItem() {
    const [ addressList, setAddressList] = useState([])
    const [ addressSearch, setAddressSearch] = useState([])
    const [ street, setStreet] = useState([])
    const [ province, setProvince] = useState([])
    const [ city, setCity] = useState([])
    const [ zip, setZip] = useState([])
  
  async function searchAddress(e) {
    setAddressSearch(e.target.value)
    console.log(e.target.value)
      try {
          const response = await fetch(`https://api.dataforsyningen.dk/autocomplete?type=adresse&q=${addressSearch}&caretpos=4`)
          const registerList = await response.json();
          setAddressList(registerList)
          console.log(registerList)
      } catch (error) {
          console.error(error);
      }
  }
  
  function prefillAddressFields(e){
    console.log(e.target.value)
   
  }
 // setStreet()
    // setProvince()
    // setCity()
    // setZip()
    
function handleSubmit(e) {
    e.preventDefault();
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
                <h3 className="text-lg font-medium leading-6 text-gray-900">Property Information</h3>
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
                        *Type address to prefill below fields 
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
                          {addressList.length > 0 ? addressList.map((item) => 
                          (
                          <option onClick={prefillAddressFields} key={item.tekst}>{item.tekst}</option>
                          )
                          ) : 
                          <option>No similar address found</option>}
                        </datalist>
                      </div>
                    
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                        *Street and house number
                        </label>
                        <input
                          type="text"
                          name="street"
                          value={street}
                          id="street"
                          autoComplete="address-level2"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                        *City
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={city}
                          id="city"
                          autoComplete="address-level2"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
  
                      <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                        <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                        *State / Province
                        </label>
                        <input
                          type="text"
                          name="region"
                          value={province}
                          id="region"
                          autoComplete="address-level1"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
  
                      <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                        <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
                          *ZIP / Postal code
                        </label>
                        <input
                          type="text"
                          name="postal-code"
                          id="postal-code"
                          value={zip}
                          autoComplete="postal-code"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-2">
                        <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                          Rooms
                        </label>
                        <input
                          type="text"
                          name="first-name"
                          id="first-name"
                          autoComplete="given-name"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
  
                      <div className="col-span-6 sm:col-span-2">
                        <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                          Size
                        </label>
                        <input
                          type="text"
                          name="last-name"
                          id="last-name"
                          autoComplete="family-name"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-2">
                        <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                          Rent
                        </label>
                        <input
                          type="text"
                          name="last-name"
                          id="last-name"
                          autoComplete="family-name"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
  
                      <div className="col-span-6 sm:col-span-4">
                        <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                          Tenant
                        </label>
                        <input
                          type="text"
                          name="email-address"
                          id="email-address"
                          autoComplete="email"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-4">
                        <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                          Contract Type
                        </label>
                        <input
                          type="text"
                          name="email-address"
                          id="email-address"
                          autoComplete="email"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        </>
  )
}