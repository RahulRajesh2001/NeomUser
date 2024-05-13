import React, { useEffect, useState } from 'react';
import OfferBar from '../../components/offerbar/OfferBar';
import Navbar from '../../components/navbar/Navbar';
import BottomBar from '../../components/bottombar/BottomBar';
import Footer from '../../components/footer/Footer';
import axios from 'axios';
import { baseUrl } from '../../../baseUrl';
import { MdDelete } from "react-icons/md";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const WishListPage = () => {
  const navigate=useNavigate()
  // State to trigger re-fetching wishlist products
  const [click, setClick] = useState(false);

  const token = localStorage.getItem('userToken');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    try {
      axios.get(`${baseUrl}/api/v1/getWishlistFullProducts`, {
        headers: {
          Authorization: token
        }
      })
      .then((res) => {
        setProducts(res?.data?.products);
      })
      .catch((error) => {
        if (error?.response && error?.response?.status === 404) {
        } else {
          console.error('Error fetching wishlist products:', error.message);
        }
      });
    } catch (err) {
      console.error('Error fetching wishlist products:', err.message);
    }
  }, [click]);

  const removeFromWishlist = async (id) => {
    try {
      const res = await axios.delete(`${baseUrl}/api/v1/removeFromWishlist`, {
        params: { id },
        headers: { Authorization: token }
      });
      if (res.status === 200) {
        Swal.fire({
          text: res.data.message,
          icon: "success"
        });
        setClick(!click);  
      }
    } catch (err) {
      console.error('Error removing item from wishlist:', err.message);
    }
  };
  
  const handleSubmit = (id) => {
    const requestData = {
      productVarientId: id,
      quantity: 1,
    }
  
    axios
      .post(`${baseUrl}/api/v1/addToCart`, requestData)
      .then((res) => {
        if (res.status === 200) {
          Swal.fire({
            text: res.data.message,
            icon: 'success',
          })
          navigate('/cart')
        } else {
          Swal.fire({
            text: res.data.message,
            icon: 'error',
          })
        }
      })
      .catch((err) => {
        Swal.fire({
          text: err.response.data.message,
          icon: 'error',
        })
      })
  }

  return (
    <div>
      <OfferBar/>
      <Navbar/>
      <BottomBar/>
      <div className='h-screen w-[100%] flex justify-evenly items-center '>
        <div className='h-[90%] w-[80%] overflow-auto border rounded-lg'>
          <div className='font-Playfair font-bold text-[25px] bg-slate-300 border pl-10'>Wishlist</div>
          {/*wishlist products */}
          {products?.map((item) => (
            <div key={item?._id} className='w-[100%] h-[80px] flex justify-evenly items-center border-b'>
              {/*first section or image section */}
              <div className='flex justify-center items-center'>
                <img src={item?.images[0]} alt="Product image" className='w-[50px] h-[50px]'/>
              </div>
              {/*Variant name and details here */}
              <div className='flex flex-col justify-center items-center'>
                <div className='font-Playfair'>{item?.varientName}</div>
                <div className='font-Playfair'>₹ {item?.salePrice}</div>
                <div className='font-Playfair'>Stock : {item?.stock}</div>
              </div>
              {/*Actions here*/}
            
              <button
              onClick={()=>handleSubmit(item?._id)}
                className='bg-[#FA8232] w-[100px] h-[40px] rounded-lg text-[#ffff] font-Playfair text-[12px]'
              >
                ADD TO CART
              </button>

              <div className='flex justify-center items-center'>
                <MdDelete className='text-[25px] cursor-pointer' onClick={() => removeFromWishlist(item?._id)}/>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default WishListPage;
