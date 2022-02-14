import type { NextPage } from 'next'
import PortfolioList from '../components/portfolioListing/PortfolioList'
import CreatePortfolioItem from '../components/CreatePortfolioItemForm'




const Home: NextPage = () => {
  
  return (
    <div>
      
      <h1>Portfolio</h1>
      <CreatePortfolioItem />
      <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                      type="button"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Add Property
                    </button>
                  </div>
      <PortfolioList />
     
    
    </div>
  )
}

export default Home
