import { useState } from 'react'
import reactLogo from '../../assets/react.svg'
import viteLogo from '../../assets/vite.svg'
import '../../App.css'
import { Link } from 'react-router-dom'

function About() {

  return (
    <div className='text-center flex flex-col gap-5  text-white absolute inset-0 -z-10 h-[100vh] w-[100vw] items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]'>
      <div className='flex justify-center gap-5  text-center mt-[20vh]'>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo w-[25vw] h-[25vh]" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react w-[25vw] h-[25vh]" alt="React logo" />
        </a>
      </div>
      <h1 className='text-4xl font-sans font-bold'>Vite + React</h1>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>



      <div className="btn flex justify-center gap-5">
        <Link to='/profile'><button
          className="bg-[#8d72ff] flex justify-center gap-3 items-center px-4 py-2 rounded-xl font-sans font-bold text-yellow-300 transition-transform text-sm duration-300 hover:scale-105"
        >
          Profile
        </button> </Link>
        <Link to='/'><button
          className="bg-[#00d6fc] flex justify-center gap-3 items-center px-4 py-2 rounded-xl font-sans font-bold text-white transition-transform text-sm duration-300 hover:scale-105"
        >
          Home
        </button> </Link>
      </div>
    </div>
  )
}

export default About
