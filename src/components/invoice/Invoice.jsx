import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './invoice.css'
import { baseUrl } from '../../../baseUrl.js'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { useParams } from 'react-router-dom'

const Invoice = () => {
  const token = localStorage.getItem('userToken')
  //taking id from url
  const { id } = useParams()

  //fetching order details
  const [orderItems, setOrderedItems] = useState([])
  const [address, setAddress] = useState({})
  const [Order, setOrder] = useState({})
  useEffect(() => {
    axios
      .get(`${baseUrl}/api/v1/orderDetails`, {
        params: { id },
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log('order', res?.data?.order)
        setOrderedItems(res?.data?.order?.orderedItems)
        setAddress(res?.data?.order?.shippingAddress)
        setOrder(res?.data?.order)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [id, token])

  //fetching product varient informations of the product
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProductVarientDetails = async () => {
      try {
        const productPromises = orderItems.map((item) =>
          axios.get(`${baseUrl}/api/v1/productVarientDetails`, {
            params: { id: item?.product },
            headers: { Authorization: token },
          })
        )

        const responses = await Promise.all(productPromises)
        const productData = responses.map((res) => res?.data?.product)
        setProducts(productData)
      } catch (err) {
        console.log(err)
      }
    }
    if (orderItems.length > 0) {
      fetchProductVarientDetails()
    }
  }, [orderItems])

  const handleDownload = () => {
    const input = document.getElementById('order_invoice')
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF()
      const pdfWidth = pdf.internal.pageSize.getWidth()
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, 0)
      pdf.save(`invoice_${address.fullName || 'unknown'}.pdf`)
    })
  }

  //subtotal
  let subtotal = 0
  orderItems.map((item) => {
    subtotal = subtotal + item.price
  })

  console.log(products)

  return (
    <div className='flex justify-center items-center'>
      <div className='order-invoice my-5'>
        <div className='row d-flex justify-content-center mb-5'>
          <button
            onClick={handleDownload}
            className='btn btn-success col-md-5 bg-green-500 text-[#ffff] w-[100px] rounded-lg font-semibold h-[30px]'
          >
            Download
          </button>
        </div>
        <div id='order_invoice' className='p-3 border border-secondary'>
          <header className='clearfix'>
            <div id='logo'>
              <div className='font-Playfair text-[25px]'>Neom</div>
            </div>
            <div id='project'>
              <div>
                <span>Name: </span>
                {address.fullName}
              </div>
              <div>
                <span>Email: </span>
                {address.address}
              </div>
              <div>
                <span>Phone: </span> {address.phone1}
              </div>
              <div>
                <span>Pincode: </span>
                {address.pincode}
              </div>
              <div>
                <span>Street: </span>
                {address.street}
              </div>
            </div>
          </header>
          <main>
            <table className='mt-5'>
              <thead>
                <tr>
                  <th className='service'>ID</th>
                  <th className='desc'>NAME</th>
                  <th>PRICE</th>
                  <th>QTY</th>
                  <th>Offer ₹</th>
                  <th>Coupon</th>
                  <th>TOTAL</th>
                </tr>
              </thead>
              <tbody>
                {orderItems?.map((item, index) =>
                  products
                    .filter((product) => item.product === product._id)
                    .map((product) => (
                      <tr key={product._id}>
                        <td className='service'>{index + 1}</td>
                        <td className='desc'>{product.varientName}</td>
                        <td className='unit'>₹ {product.salePrice}</td>
                        <td className='qty'>{item.quantity}</td>
                        <td className='desc'>
                          {products?.map((item, itemIndex) => (
                            <div key={itemIndex}>
                              {item?.offers.length > 0 &&
                                `${item.offers[0].offerAmount}`}
                            </div>
                          ))}
                        </td>
                        <td>{Order?.coupons}</td>
                        <td className='total'>₹ {item.price}</td>
                      </tr>
                    ))
                )}

                <tr>
                  <td></td>
                  <td></td>
                  <td colSpan='4'>
                    <b>SUBTOTAL</b>
                  </td>
                  <td className='total'>₹ {subtotal}</td>
                </tr>

                <tr>
                  <td></td>
                  <td></td>
                  <td colSpan='4' className='grand total'>
                    <b>GRAND TOTAL</b>
                  </td>
                  <td className='grand total'>₹ {subtotal}</td>
                </tr>
              </tbody>
            </table>
            <div className='font-Playfair text-[12px]' id='notices'>
              <div>NOTICE:</div>
              <div className='notice'>
                A finance charge of 1.5% will be made on unpaid balances after
                30 days.
              </div>
            </div>
          </main>
          <footer className='font-Playfair text-[12px]'>
            Invoice was created on a computer and is valid without the
            signature.
          </footer>
        </div>
      </div>
    </div>
  )
}

export default Invoice
