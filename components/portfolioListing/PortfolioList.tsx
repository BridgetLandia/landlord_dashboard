import { dbPortfolioRef} from '../../firebase/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import { query, orderBy } from 'firebase/firestore'
import List from '../generic/List'


const tableHeaders = 
    {
    address: true,
    rooms: true,
    size: true,
    rent: true,
    contract: true,
    streetView: true,
    edit: false ,
    delete: false
}
    

type Props = {
  sortValue: string
}


export default function PortfolioList(props: Props) {
  
    const q = query(dbPortfolioRef , orderBy(props.sortValue, "asc"))
    const [portfolioItems, portfolioItemsLoading, portfolioItemsError] = useCollection(
      q,
      {}
    );
  let portfolio = (!portfolioItemsLoading && portfolioItems) ? portfolioItems.docs.map((doc) => { return {id: doc.id, ...doc.data()}}) : []    
  return (
    <>
    <List tableData={portfolio} headers={tableHeaders}/>
        <p>{portfolioItemsError}</p>  
    </>
  )
}