import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Chart from 'react-apexcharts'
import { AdminDashboardUrl } from "../../constants/constants";
import axios from "axios";
import Loader from "../Loading/Loading";
function AdminHomePage() {
    const [countOfUser, setCountOfUser] = useState(null)
    const [bookingDetails, setBookingDetails] = useState(null)
    const [manageState, setManageState] = useState(false)


    useEffect(() => {

        setManageState(false)
        axios.get(`${AdminDashboardUrl}admin/usercount/`).then((response) => {
            const responseData = response.data
            setCountOfUser(responseData);
        }).catch((error) => {
            console.error("An error occured during fetch data", error);
        })


        setManageState(false)
        axios.get(`${AdminDashboardUrl}admin/booking_detials/`).then((response) => {
            const responseData = response.data
            setBookingDetails(responseData)
        }).catch((error) => {
            console.error("An error occured during fetch data", error);
        })

    }, [manageState])
    
    return (
        <div>
            <h1 className="text-center text-black  text-5xl  font-roboto-mono mb-4">Admin Dashboard</h1>


            {countOfUser ? (

                <div className="flex flex-wrap justify-between mb-5 mt-5 ml-5 gap-1">
                    <div className="border-[#d9d9d9] p-1 w-full sm:w-[48%] md:w-[30%] lg:w-[23%] text-white h-[9rem] shadow-md shadow-blue-gray-200 rounded-lg bg-blueGray-800">
                        <div className="flex flex-col items-center">
                            <Typography className='font-prompt mt-2' variant="h5">Total Users</Typography>
                            <Typography variant="h2">{countOfUser.users[0]}</Typography>
                        </div>
                    </div>
                    <div className="border-[#d9d9d9] p-1 w-full sm:w-[48%] md:w-[30%] lg:w-[23%] text-white h-[9rem] shadow-md shadow-blue-gray-200 rounded-lg bg-blueGray-800">
                        <div className="flex flex-col items-center">
                            <Typography className='font-prompt mt-2' variant="h5">Employees</Typography>
                            <Typography variant="h2">{countOfUser.users[1]}</Typography>
                        </div>
                    </div>
                    <div className="border-[#d9d9d9] p-1 w-full sm:w-[48%] md:w-[30%] lg:w-[23%] text-white h-[9rem] shadow-md shadow-blue-gray-200 rounded-lg bg-blueGray-800">
                        <div className="flex flex-col items-center">
                            <Typography className='font-prompt mt-2' variant="h5">Users</Typography>
                            <Typography variant="h2">{countOfUser.users[2]}</Typography>
                        </div>
                    </div>

                </div>
            ) : (
                <Loader />
            )}




            {bookingDetails ? (

                <div className="flex flex-wrap justify-between mb-5 mt-5 ml-5 gap-1">
                    <div className="border-[#d9d9d9] p-1 w-full sm:w-[48%] md:w-[30%] lg:w-[23%] text-white h-[9rem] shadow-md shadow-blue-gray-200 rounded-lg bg-blueGray-800">
                        <div className="flex flex-col items-center">
                            <Typography className='font-prompt mt-2' variant="h5">Total Bookings</Typography>
                            <Typography variant="h2">{bookingDetails.data[0]}</Typography>
                        </div>
                    </div>
                    <div className="border-[#d9d9d9] p-1 w-full sm:w-[48%] md:w-[30%] lg:w-[23%] text-white h-[9rem] shadow-md shadow-blue-gray-200 rounded-lg bg-blueGray-800">
                        <div className="flex flex-col items-center">
                            <Typography className='font-prompt mt-2' variant="h5">Pending</Typography>
                            <Typography variant="h2">{bookingDetails.data[1]}</Typography>
                        </div>
                    </div>
                    <div className="border-[#d9d9d9] p-1 w-full sm:w-[48%] md:w-[30%] lg:w-[23%] text-white h-[9rem] shadow-md shadow-blue-gray-200 rounded-lg bg-blueGray-800">
                        <div className="flex flex-col items-center">
                            <Typography className='font-prompt mt-2' variant="h5">Ongoing</Typography>
                            <Typography variant="h2">{bookingDetails.data[2]}</Typography>
                        </div>
                    </div>
                    <div className="border-[#d9d9d9] p-1 w-full sm:w-[48%] md:w-[30%] lg:w-[23%] text-white h-[9rem] shadow-md shadow-blue-gray-200 rounded-lg bg-blueGray-800">
                        <div className="flex flex-col items-center">
                            <Typography className='font-prompt mt-2' variant="h5">Completed</Typography>
                            <Typography variant="h2">{bookingDetails.data[3]}</Typography>
                        </div>
                    </div>
                    <div className="border-[#d9d9d9] p-1 w-full sm:w-[48%] md:w-[30%] lg:w-[23%] text-white h-[9rem] shadow-md shadow-blue-gray-200 rounded-lg bg-blueGray-800">
                        <div className="flex flex-col items-center">
                            <Typography className='font-prompt mt-2' variant="h5">Total Revenue</Typography>
                            {bookingDetails.data[4] && (  
                                <Typography variant="h2">₹{bookingDetails.data[4].total_price}</Typography>
                            )}
                        </div>
                    </div>
             
                </div>
            ) : (
                <Loader />
            )}



         
        </div>

    )
}
export default AdminHomePage;