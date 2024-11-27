import React from 'react'

export const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <footer className='bg-slate-600'>
      <div className='container  mx-auto p-4'>
      <p className='text-center text-white'>build by: Elias  &copy;  
        <span className='font-bold'>
       {year}
          </span></p>
      </div>
    </footer>
  )
}

export default Footer