import { useMemo} from "react";

export default function ListRow({property, headers}) {
    // Because I am using NoSQL Database 
    const sortingArray = Object.keys(headers)
        
    let portfolioDataArray = Object.entries(property)
    

    const sortedProperties = useMemo(
        () =>
            portfolioDataArray.sort((a, b) => 
                sortingArray.indexOf(a[0]) - sortingArray.indexOf(b[0])),
        [property]
      );
       
    return(
<tr>
    {sortedProperties.map((propertyData) => (
<td className="px-6 py-4 whitespace-nowrap" key={propertyData}>
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
  <a href="#" className="text-indigo-600 hover:text-indigo-900">
    Edit
  </a>
</td>
<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
  <a href="#" className="text-indigo-600 hover:text-indigo-900">
    Delete
  </a>
</td>
</tr>
    )
}