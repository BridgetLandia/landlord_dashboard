import { useMemo, useState } from 'react';
import { deleteDoc, doc } from "firebase/firestore";
import { dbPortfolioRef } from '../../firebase/firebase';
import { useTranslation } from 'next-i18next';
import Modal from './Modal'

type TableRow = {
  headers: object,
  property: property
}

type property = {
        id?: string,
        address?: string
      }


export default function ListRow({property, headers}: TableRow) {

  const { t } = useTranslation();
  const [openModal, setOpenModal] = useState(false)
  

    // Because I am using NoSQL Database I sort the document fields based on the Headers
    let deleteItemData = { id: property.id, address: property.address }
    const sortingArray = Object.keys(headers)    
    let portfolioDataArray = Object.entries(property)
    const sortedProperties = useMemo(
        () =>
            portfolioDataArray.sort((a, b) => 
                sortingArray.indexOf(a[0]) - sortingArray.indexOf(b[0])),
        [property]
      );
   // Delete document ID
    sortedProperties.shift()


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
            <div className="text-sm font-medium text-gray-900">{propertyData[1]}</div>
            </div>
          </td> ))}

          <td className="px-6 py-4 whitespace-nowrap">
            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
              Active
            </span>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button               onClick={handleModal}
                  type="button"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                  {t('delete')}
                </button>
          </td>
        </tr>
{/* <Modal openModal={openModal}/> */}
 
    </>
    )
}