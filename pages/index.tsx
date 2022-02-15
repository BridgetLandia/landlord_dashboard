import type { NextPage } from 'next'
import PortfolioList from '../components/portfolioListing/PortfolioList'
import CreatePortfolioItem from '../components/createPortfolioItem/CreatePortfolioItemForm'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState } from 'react'
import { useTranslation } from 'next-i18next';
import { GetStaticProps, GetStaticPropsContext } from 'next'


export const getStaticProps: GetStaticProps = async ({locale}) => {
  
  return {
    props: {
      ...(await serverSideTranslations(locale ? locale : 'en', ['common', 'footer'])),
      // Will be passed to the page component as props
    },
  };
}

const Home: NextPage = () => {
  const [ sortValue, setSortValue] = useState<string>('address')
  const { t } = useTranslation();

  const [openForm, setOpenForm] = useState(false)
  function openCreatePortfolioItem() {
        setOpenForm(true)
  }
  function closeForm() {
   setOpenForm(false);
  }
  function handleSort(sortvalue: string){
        setSortValue(sortvalue)
  }
  return (
    <div className="w-full">
      {openForm && <CreatePortfolioItem  closeForm={closeForm}/>}
      <div className="mt-2 px-4 py-3 bg-gray-50 text-right sm:px-6">
        <h1 className="pb-4 text-left text-2xl text-indigo-600 font-bold">{t('portfolio')}</h1>

        <div className="flex justify-between ">
        <div className="flex felx-row text-left items-center ">
                        <label htmlFor="country" className="block px-3 text-left text-sm font-medium text-gray-700">
                         {t('SortBy')}
                        </label>
                        <select
                          id="sort"
                          name="sort"
                          autoComplete="sort"
                          
                          onChange={(e) =>
                            handleSort(e.target.value)
                          }
                          className="mt-1 block py-2 px-3  w-40 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          <option value={'address'}>{t('address')}</option>
                          <option value={'rent'}>{t('rent')}</option>
                          <option value={'size'}>{t('size')}</option>
                          <option value={'rooms'}>{t('rooms')}</option>
                        </select>
                        </div>
                        <div className="text-left">
                        <button
                      type="button"
                      onClick={openCreatePortfolioItem}
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      {t('addProperty')}
                    </button>
                    </div>
                      </div>
                   
      </div>
      <PortfolioList sortValue={sortValue}/>
     
    
    </div>
  )
}

export default Home
