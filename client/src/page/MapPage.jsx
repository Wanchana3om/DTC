
// import { useEffect } from 'react'
import { useAuth } from '../context/authContext';
import '../App.css'

function MapPage() {
    const { logout} = useAuth();
    
  return (
    <>
      <section className='w-screen h-screen bg-[#020b1f] flex justify-center items-center relative'>
      <div 
      onClick={() => {
        logout();
      }}
      className="absolute top-[30px] right-[20px] bg-red-600 py-2 px-3 rounded-md active:bg-[#850f09] duration-100 hover:bg-[#ff6868] transition-all cursor-pointer">
    <p className='font-[600] text-white'>LOGOUT</p>
  </div>
        <div className='w-[90%] h-[80%] bg-white  flex justify-between items-center'>
        <div className='w-full h-full bg-red-100'>
sdsdf
        </div>
        <div className='w-full h-full  bg-blue-100'>
esd
        </div>
        </div>
      </section>
    </>
  )
}

export default MapPage;
