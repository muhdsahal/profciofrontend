import React from 'react'
import { Link } from 'react-router-dom';
import Navbar from '../Navbar&Footer/Navbar'
import FooterPage from '../Navbar&Footer/FooterPage'
import ServiceListPage from './ServiceListPage';
import { Button } from "@material-tailwind/react";
import { toast, ToastContainer } from "react-toastify";
import { Typography } from '@mui/material';
import { TypeAnimation } from 'react-type-animation';




function Home() {
  return (
    <div style={{ textAlign: 'center' }}>
      <Navbar />
      <div className="p-6" style={{ backgroundColor: 'black' }}>
        <div className='text-center'>
          
          <h1 className=" leading-[160px] text-[160px] md:text-[130px] font-roboto-mono contact-highlight">
            Elevate through
            <br /> service, inspire<br />
            change
            <br />


          </h1>
          <div className="flex justify-center">
            
            <p
              className="w-[800px] leading-[90px] text-[90px] md:text-[50px] p-10  text-center text-[#27b5a9fb] hover:  font-roboto-mono ">
              Professional services
              for your
              Homes and commercial properties
              Book Now Best  Employees <br />

              <Link to={"/employeelist"}>
                <Button variant='outlined' className="btn-gradiant border border-red-500 rounded-full bg-gradient-to-r w-50 from-light-green-400 via-emerald-400 to-blue-600 mt-10 text-white ">Click here</Button>
              </Link>
            </p>
          </div>
        </div>

      </div>
      <ToastContainer />
      <ServiceListPage style={{ backgroundColor: 'black' }} />
      <FooterPage />

    </div>

  )
}

export default Home


