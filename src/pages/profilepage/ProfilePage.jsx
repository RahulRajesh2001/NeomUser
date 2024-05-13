import React from 'react'
import Navbar from '../../components/navbar/Navbar.jsx'
import Footer from '../../components/footer/Footer.jsx'
import AccountSetting from '../../components/accountsettingform/AccountSetting.jsx'
import ShippingAddressListing from '../../components/shippingAddressListing/ShippingAddressListing.jsx'
import BottomBar from '../../components/bottombar/BottomBar.jsx'
import BrudCrumbs from '../../components/brudCrumbs/BrudCrumbs.jsx'

const ProfilePage = () => {
  const breadcrumbs = [
    { label: 'Home', path: '/' },
    { label: 'Profile', path: '/profile' },
  ]
  return (
    <div>
      <Navbar />
      <BottomBar />
      <BrudCrumbs breadcrumbs={breadcrumbs} />
      <div className='h-screen  flex justify-center items-center gap-10'>
        <div className='w-[80%]  gap-5 border flex justify-center flex-col items-center rounded-lg'>
          <AccountSetting />
          <ShippingAddressListing />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default ProfilePage
