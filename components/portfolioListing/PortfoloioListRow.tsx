import { useMemo, useState } from 'react';
import { deleteDoc, doc } from "firebase/firestore";
import { dbPortfolioRef } from '../../firebase/firebase';
import { useTranslation } from 'next-i18next';
import Image from 'next/image'
import Modal from '../generic/Modal'
import useModal from '../../hooks/useModal';

let streetViewBaseURL = "https://maps.googleapis.com/maps/api/streetview?size=400x400&location="

type TableRow = {
  headers: object,
  property: Property
}

interface Property {
        id?: string,
        address?: string,
        streetview?: { lat: number, lng: number},
        currency?: string
      }



export default function ListRow({property, headers}: TableRow) {
  const {isShowing, toggle} = useModal();
  const { t } = useTranslation();
  let currency = property.currency

  const unit: { [key: string]: any } = {
    rooms: "room",
    size: "m2",
    rent: currency
  }
  
  
    //Data for deleting database document
    let deleteItemData = { id: property.id, address: property.address }

    //Get streetview
    let apikey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY
    let streetviewData = property.streetview
    let url = `${streetViewBaseURL}${streetviewData?.lat},${streetviewData?.lng}&fov=80&heading=70&pitch=0&key=${apikey}`

    // Because I am using NoSQL Database I sort the document fields based on the Headers
    const sortingArray = Object.keys(headers)    
      let portfolioDataArray = Object.entries(property)
    const sortedProperties = useMemo(() =>
            portfolioDataArray.sort((a, b) => 
                sortingArray.indexOf(a[0]) - sortingArray.indexOf(b[0])),
        [ portfolioDataArray, sortingArray ]
      );
  
   
      // Delete document ID,streetview and currency
    sortedProperties.splice(0, 3)
     function confirmDelete(){
      const docRef = doc(dbPortfolioRef, deleteItemData.id)
      deleteDoc(docRef)
      toggle()
     }   
     
    return(
        <>
        <tr>
    {sortedProperties.map((propertyData) => (
          <td className=" border-gray-400  px-6 py-4 whitespace-nowrap" key={propertyData[0]}>
          <div>
            <span className="flex text-xs text-gray-700 uppercase sm:hidden top-0 inset-x-0 p-1 bg-gray-100 pl-2">
                { propertyData[0] }
              </span>
            <div className="text-sm font-medium text-gray-900 whitespace-normal">{propertyData[1] + ' ' + `${propertyData[1] && unit[propertyData[0]] || ''}`}</div>
            </div>
          </td> ))}

          <td className="text-center px-6 py-1 whitespace-nowrap">
            <div className="flex  justify-center mb-3 sm:justify-start mt-7">
            <Image src={url} width="100" height="100" alt="street-view"/>
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <a href={`https://www.google.com/maps/place/${property.address}`}
            target="_blank" rel="noopener noreferrer" className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full
             bg-green-100 text-green-800">
              View map
            </a>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <a href="#" onClick={toggle} className="text-indigo-600 hover:text-indigo-900">
                    {t('delete')}
                    </a>
          </td>
        </tr>
          <Modal  isShowing={isShowing} hide={toggle} confirmDelete={confirmDelete}/>
 
    </>
    )
}