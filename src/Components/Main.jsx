import React from 'react'
import Header from './Header'
import IPInput from './IPInput'
import '../index.css'

function Background() {
   return (
      <div className="flex sm:flex-col mt-10 background-img">
         <Header />
         <IPInput />
      </div>
   )
}

export default Background