import ListRow from '../portfolioListing/PortfoloioListRow'


type Table = {
  headers: object,
  tableData: Array<row>
}

type row = {
    id?: string
}
 
export default function List({ headers, tableData}: Table) {
  
    return (
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 sm:visible invisible">
                  <tr>
                  {Object.entries(headers).map((tableHeader) => (
                  <th key={tableHeader[0]}
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                    { tableHeader[1] ? tableHeader : ''}
                    </th>
              ))}
                  </tr>
                </thead>
                <tbody className=" bg-white divide-y divide-gray-200">
                  {tableData.map((property) => (
                      <ListRow key={property.id} property={property} headers={headers}/>
                  ))}
                  
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }