import React, { useState } from 'react'
// import Map from './Map'
import '../index.css'

function IPInput() {
   const key = `at_epaj7HFPJd17tjbc6xFLSOMRW30lH`;
   const [userInput, setUserInput] = useState(null);
   const [address, setAddress] = useState(null);
   const handleIPChange = (e) => {
      setUserInput(e.target.value)
   }
   const getIPAddress = async (e) => {
      e.preventDefault();
      const response = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${key}&ipAddress=${userInput}`)
      const data = await response.json();
      console.log(data)
      const ipAddress = data;
      setAddress(ipAddress);
   }
   return (
      <div className="flex sm:flex-col justify-center items-center mt-10">
         <form onSubmit={getIPAddress}>
            <div className="sm:flex">
               <div className="min-w-0 flex">
                  <label htmlFor="IP Address" className='sr-only'>IP Address</label>
                  <input type="text" onChange={handleIPChange} placeholder='Search for any IP Address' name='ip' className='block sm:w-[20rem] md:w-[30rem] px-4 py-3 rounded-xl cursor-pointer' />
                  <div className="container rounded-xl flex items-center bg-veryDarkGray w-max p-5 cursor-pointer">
                     <button><img src="/icon-arrow.svg" alt="" /></button>
                  </div>
               </div>
            </div>
         </form>
         {/* <Map location={address.location} /> */}
         {address && (
            <div className="conatiner flex flex-col md:flex-row w-fit md:w-7/8 px-8 py-1 bg-white rounded-xl shadow-md shadow-black my-10 z-10">
               <div className="container flex flex-col px-5 py-0.5 border-darkGray md:border-r-[0.02rem] my-8">
                  <div className="container mt-2">
                     <h4 className="text-darkGray text-md font-bold">
                        IP ADDRESS
                     </h4>
                  </div>
                  <p className="text-veryDarkGray font-bold text-3xl mt-5">{address.ip}</p>
               </div>
               <div className="container flex flex-col px-5 py-0.5 border-darkGray md:border-r-[0.02rem] my-8">
                  <div className="container mt-2 pl-3">
                     <h4 className="text-darkGray text-md font-bold">
                        LOCATION
                     </h4>
                  </div>
                  <p className="text-veryDarkGray pl-3 font-bold text-3xl mt-5">{address.location.region}, {address.location.country}, {address.location.postalCode}</p>
               </div>
               <div className="container flex flex-col px-5 py-0.5 border-darkGray md:border-r-[0.02rem] my-8">
                  <div className="container mt-2 pl-3">
                     <h4 className="text-darkGray text-md font-bold">
                        TIMEZONE
                     </h4>
                  </div>
                  <p className="text-veryDarkGray pl-3 font-bold text-3xl mt-5">UTC {address.location.timezone}</p>
               </div>
               <div className="container flex flex-col px-5 py-0.5 my-8">
                  <div className="container mt-2 pl-3">
                     <h4 className="text-darkGray text-md font-bold">
                        ISP
                     </h4>
                  </div>
                  <p className="text-veryDarkGray pl-3 font-bold text-3xl mt-5">{address.isp}</p>
               </div>
            </div>
         )}
      </div>
   )
}

export default IPInput