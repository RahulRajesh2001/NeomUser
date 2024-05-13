import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { baseUrl } from '../../../../baseUrl.js'
import { useDispatch } from 'react-redux'
import { setFullProducts } from '../../../../redux/reducers/productSlice.js'
import Slider from '@mui/material/Slider'

const SortSideBar = () => {
  const [token, setToken] = useState('')
  const dispatch = useDispatch()
  const [categories, setCategories] = useState([])
  const [check, setCheck] = useState('All Categories')
  const [value, setValue] = useState([20, 37])
  const [brands, setBrands] = useState([])
  const [tag, setTag] = useState('')
  const [alpha, setAlpha] = useState()

  useEffect(() => {
    const userToken = localStorage.getItem('userToken')
    if (userToken) {
      setToken(userToken)
    }
  }, [])

  useEffect(() => {
    if (!token) return

    axios
      .get(`${baseUrl}/api/v1/getCategories`, {
        headers: { Authorization: token },
      })
      .then((res) => {
        setCategories([{ title: 'All Categories' }, ...res?.data?.categories])
      })
      .catch((err) => {
        console.error('Error fetching categories:', err)
      })

    axios
      .get(`${baseUrl}/api/v1/getProducts`, {
        headers: { Authorization: token },
      })
      .then((res) => {
        setBrands(res?.data?.products)
      })
      .catch((err) => {
        console.error('Error fetching products:', err)
      })
  }, [token])

  useEffect(() => {
    if (!token) return

    // Fetch products based on category
    if (check === 'All Categories') {
      axios
        .get(`${baseUrl}/api/v1/getProducts`, {
          headers: { Authorization: token },
        })
        .then((res) => {
          dispatch(setFullProducts(res?.data?.products))
        })
        .catch((err) => {
          console.error('Error fetching products:', err)
        })
    } else {
      axios
        .get(`${baseUrl}/api/v1/category-sort`, {
          params: { check },
          headers: { Authorization: token },
        })
        .then((res) => {
          dispatch(setFullProducts(res?.data?.products))
        })
        .catch((err) => {
          console.error('Error fetching products:', err)
        })
    }
  }, [check, dispatch])

  useEffect(() => {
    if (!token) return

    // Fetch products based on price range
    axios
      .get(`${baseUrl}/api/v1/price-range`, {
        params: { min: value[0], max: value[1] },
        headers: { Authorization: token },
      })
      .then((res) => {
        dispatch(setFullProducts(res?.data?.products))
      })
      .catch((err) => {
        console.error('Error fetching products:', err)
      })
  }, [value, dispatch])

  useEffect(() => {
    if (!token) return

    // Fetch products based on selected brand
    axios
      .get(`${baseUrl}/api/v1/sort-tag`, {
        params: { tag },
        headers: { Authorization: token },
      })
      .then((res) => {
        dispatch(setFullProducts(res?.data?.products))
      })
      .catch((err) => {
        console.error('Error fetching products:', err)
      })
  }, [tag, dispatch])

  useEffect(() => {
    if (!token) return

    // Fetch products based on alphabetical sorting
    axios
      .get(`${baseUrl}/api/v1/alpha-sort`, {
        params: { alpha },
        headers: { Authorization: token },
      })
      .then((res) => {
        dispatch(setFullProducts(res?.data?.products))
      })
      .catch((err) => {
        console.error('Error fetching products:', err)
      })
  }, [alpha, dispatch])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <section className='flex flex-col gap-2 '>
      {/*leftside */}
      {token && (
        <section className='w-[200px] flex flex-col gap-3 '>
          {/* Category Radio buttons */}
          <div className='text-[18px] font-semibold font-Playfair'>
            CATEGORY
          </div>
          {categories?.map((category) => (
            <div className='flex items-center gap-2' key={category?.title}>
              <input
                id={category?.title}
                type='radio'
                name='category'
                value={category?.title}
                checked={check === category?.title}
                onChange={(e) => setCheck(e.target.value)}
                className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 '
              />
              <label
                htmlFor={category?.title}
                className='text-[17px] font-Josefin font-semibold'
              >
                {category?.title}
              </label>
            </div>
          ))}
        </section>
      )}

      {/*Price range*/}
      <section className='w-[200px] flex flex-col gap-5 mt-4'>
        <div className='text-[18px] font-semibold font-Playfair'>
          PRICE RANGE
        </div>

        <Slider
          getAriaLabel={() => 'Temperature range'}
          value={value}
          onChange={handleChange}
          valueLabelDisplay='auto'
        />
      </section>

      {/*Brands*/}
      <section className='w-[200px] flex flex-col gap-5 mt-4'>
        <div className='text-[18px] font-semibold font-Playfair'>BRANDS</div>
        {/* Brand checkboxes */}
        {[...new Set(brands.map((brand) => brand.brand))].map((uniqueBrand) => (
          <div className='flex items-center gap-2' key={uniqueBrand}>
            <input
              id={uniqueBrand}
              type='checkbox'
              checked={tag === uniqueBrand}
              onChange={(e) => setTag(e.target.checked ? uniqueBrand : '')}
              className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 '
            />
            <label
              htmlFor={uniqueBrand}
              className='text-[17px] font-Josefin font-semibold'
            >
              {uniqueBrand}
            </label>
          </div>
        ))}
      </section>

      {/*Alphabetical sorting*/}
      <section className='w-[200px] flex flex-col gap-5 mt-4'>
        <div className='text-[18px] font-semibold font-Playfair'>
          ALPHABETICALLY
        </div>
        {/* Alphabetical sorting radio buttons */}
        <div className='flex gap-3'>
          <input
            id=''
            type='radio'
            name='alphabetical'
            onChange={() => setAlpha('1')}
            className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300'
          />
          <label
            htmlFor='a-z'
            className='text-[17px] font-Josefin font-semibold'
          >
            A - Z
          </label>
        </div>
        <div className='flex gap-3'>
          <input
            id=''
            type='radio'
            name='alphabetical'
            onChange={() => setAlpha('-1')}
            className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300'
          />
          <label
            htmlFor='z-a'
            className='text-[17px] font-Josefin font-semibold'
          >
            Z - A
          </label>
        </div>
      </section>
    </section>
  )
}

export default SortSideBar
