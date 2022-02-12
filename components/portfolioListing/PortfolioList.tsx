import { dbPortfolioRef } from '../../firebase/firebase';
import { useCollection } from "react-firebase-hooks/firestore";
import List from '../generic/List'

const tableHeaders = 
    {
    address: true,
    rooms: true,
    size: true,
    tenant: true,
    rent: true,
    contract: true,
    streetView: true ,
    edit: false ,
    delete: false
}
    


export default function PortfolioList() {
    const [portfolioItems, portfolioItemsLoading, portfolioItemsError] = useCollection(
      dbPortfolioRef,
      {}
    );
  let portfolio = (!portfolioItemsLoading && portfolioItems) ? portfolioItems.docs.map((doc) => doc.data()) : [];
    
       
  return (
    <div>
    <List portfolio={portfolio} headers={tableHeaders}/>
        <p>{portfolioItemsError}</p>
    </div>
  )
}