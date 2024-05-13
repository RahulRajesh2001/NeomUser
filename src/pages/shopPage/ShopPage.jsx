import React, { useEffect, useState } from 'react'
import OfferBar from '../../components/offerbar/OfferBar'
import Navbar from '../../components/navbar/Navbar'
import BottomBar from '../../components/bottombar/BottomBar'
import Footer from '../../components/footer/Footer'
import { IoIosSearch } from 'react-icons/io'
import ShopCard from '../../components/shopcard/ShopCard'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { baseUrl } from '../../../baseUrl.js'
import BrudCrumbs from '../../components/brudCrumbs/BrudCrumbs'
import SortSideBar from '../../components/product/sortSidebar/SortSideBar.jsx'
import { setFullProducts } from '../../../redux/reducers/productSlice.js'

const ShopPage = () => {
  const dispatch = useDispatch()
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage] = useState(10)
  const token = localStorage.getItem('userToken')

  useEffect(() => {
    console.log('this is token', token)
    axios
      .get(`${baseUrl}/api/v1/getProducts`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        dispatch(setFullProducts(res?.data?.products))
      })
      .catch((err) => {
        console.log(err)
      })
  }, [token, dispatch])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        await axios
          .get(`${baseUrl}/api/v1/search`, { params: { searchQuery } })
          .then((res) => {
            dispatch(setFullProducts(res?.data))
          })
      } catch (err) {
        console.log(err)
      }
    }
    if (searchQuery.trim() !== '') {
      fetchProducts()
    }
  }, [searchQuery, dispatch])

  // Fetching full products
  const fullProducts = useSelector((state) => state?.productDetails?.products)

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = fullProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  )
  const totalPages = Math.ceil(fullProducts.length / productsPerPage)

  // Function to change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const breadcrumbs = [
    { label: 'Home', path: '/' },
    { label: 'Shop', path: '/shop' },
  ]

  return (
    <div>
      <OfferBar />
      <Navbar />
      <BottomBar />
      <BrudCrumbs breadcrumbs={breadcrumbs} />
      <div className='flex justify-center flex-wrap mt-5 mb-5 gap-5 '>
        <SortSideBar />
        <div className='w-[60%] h-screen'>
          <div className='flex justify-between'>
            <div className='relative '>
              <input
                type='text'
                placeholder='search for anything....'
                onChange={(e) => setSearchQuery(e.target.value)}
                className='outline-none border rounded-sm w-[350px] placeholder:text-[#77878F] placeholder:text-[12px]  px-5   h-[30px]'
              />
              <IoIosSearch className='absolute top-[7px] right-[10px] hover:cursor-pointer' />
            </div>
          </div>
          <div className='bg-[#F2F4F5] h-[40px] mt-4 flex justify-between'></div>
          <div className='flex flex-wrap mt-5'>
            <ShopCard fullProducts={currentProducts} />
          </div>
        </div>
      </div>

      <div className='w-1/2 ml-[500px] mb-10 flex justify-center'>
        <ul className='pagination flex space-x-4'>
          {/* Previous Button */}
          <li className='page-item'>
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className='page-link bg-orange-500 text-white font-Playfair rounded-full px-4 py-2 transition duration-300 ease-in-out hover:bg-orange-600 focus:outline-none focus:shadow-outline'
            >
              Previous
            </button>
          </li>
          {/* Current Page Number */}
          <li className='page-item'>
            <span className='page-link font-Playfair bg-orange-500 text-white rounded-full px-4 py-2'>
              {currentPage}
            </span>
          </li>
          {/* Next Button */}
          <li className='page-item'>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className='page-link font-Playfair bg-orange-500 text-white rounded-full px-4 py-2 transition duration-300 ease-in-out hover:bg-orange-600 focus:outline-none focus:shadow-outline'
            >
              Next
            </button>
          </li>
        </ul>
      </div>

      <Footer />
    </div>
  )
}

export default ShopPage
