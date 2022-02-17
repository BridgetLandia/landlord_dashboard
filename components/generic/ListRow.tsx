import { useMemo, useState } from 'react';
import { deleteDoc, doc } from "firebase/firestore";
import { dbPortfolioRef } from '../../firebase/firebase';
import { useTranslation } from 'next-i18next';
import Image from 'next/image'
import Modal from './Modal'
import { MenuAlt2Icon } from '@heroicons/react/outline';

let streetViewBaseURL = "https://maps.googleapis.com/maps/api/streetview?size=400x400&location="

type TableRow = {
  headers: object,
  property: Property
}

interface Property {
        id?: string,
        address?: string,
        streetview?: { lat: number, lng: number} 
      }



const unit: { [key: string]: any } = {
  rooms: "room",
  size: "m2",
  rent: "EUR"
}

export default function ListRow({property, headers}: TableRow) {

  const { t } = useTranslation();
  const [openModal, setOpenModal] = useState(false)
  

    // Because I am using NoSQL Database I sort the document fields based on the Headers
    let deleteItemData = { id: property.id, address: property.address }
    let apikey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY
    let streetviewData = property.streetview
    console.log(streetviewData)
    let url = `${streetViewBaseURL}${streetviewData?.lat},${streetviewData?.lng}&fov=80&heading=70&pitch=0&key=${apikey}`
    const sortingArray = Object.keys(headers)    
      let portfolioDataArray = Object.entries(property)
    const sortedProperties = useMemo(() =>
            portfolioDataArray.sort((a, b) => 
                sortingArray.indexOf(a[0]) - sortingArray.indexOf(b[0])),
        [ portfolioDataArray, sortingArray ]
      );
  
   console.log(sortedProperties)
      // Delete document ID and streetview
    sortedProperties.splice(0, 2)


   function handleModal() {
     
    setOpenModal(true)
        const docRef = doc(dbPortfolioRef, deleteItemData.id)
        deleteDoc(docRef)
    }
    return(
        <>
        <tr>
    {sortedProperties.map((propertyData) => (
          <td className="px-6 py-4 whitespace-nowrap" key={propertyData[0]}>
            <div className="flex items-center">
            <div className="text-sm font-medium text-gray-900">{propertyData[1] + ' ' + `${propertyData[1] && unit[propertyData[0]] || ''}`}</div>
            </div>
          </td> ))}

          <td className="px-6 py-1 whitespace-nowrap">
            <Image src={url} width="100" height="100" alt="street-view"/>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <a href={`https://www.google.com/maps/place/${property.address}`}
            target="_blank" rel="noopener noreferrer" className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full
             bg-green-100 text-green-800">
              View map
            </a>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button               onClick={handleModal}
                  type="button"
                  className="inline-flex justify-center py-2 px-4 border border-transparent 
                  shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 
                  hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                  {t('delete')}
                </button>
          </td>
        </tr>
{/* <Modal openModal={openModal}/> */}
 
    </>
    )
}