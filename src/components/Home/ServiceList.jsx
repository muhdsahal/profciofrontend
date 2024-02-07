import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Carousel } from "@material-tailwind/react";
import { ServiceCatergoryURL, ServiceListURL, base_url } from '../../constants/constants';

const ServiceList = () => {
  const [services, setServices] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);


  useEffect(() => {
    axios.get(ServiceCatergoryURL)
      .then(response => {
        setCategoryOptions(response.data);
      })
      .catch(error => {
        console.error('Error fetching category options:', error);
      });


    axios.get(ServiceListURL)
      .then(response => {
        setServices(response.data);
      })
      .catch(error => {
        console.error('Error fetching service data:', error);
      });

  }, []);




  return (
    <div style={{ backgroundColor: 'black' }}>
     <h1 
  className="flex  justify-center text-center font-roboto-mono text-white"
>
  Services
</h1>
    

      <div className='flex flex-wrap justify-center p-4 gap-3'>
        {services.map((service, index) => (
          <div key={index} className="w-full md:w-2/5 border-4 border-y-white py-4 rounded-md shadow-md">
            <div className="text-[40px]">🛠️</div>
            <div>
              <h1 className="text-lg sm:text-2xl from text-white font-bold mt-2">{service.name}</h1>
              <p className="text-sm mt-2 text-white">
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>



    </div>


  );
};

export default ServiceList;


