import React, { useEffect, useState } from 'react'
import { Card, Typography, ListItemPrefix, Button } from "@material-tailwind/react";
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { AdminDashboardUrl } from '../../constants/constants';
import Calendar from 'react-calendar';
import { Dialog, DialogHeader, DialogBody, DialogFooter, } from "@material-tailwind/react";

function SalesReportAdmin() {

    const [salesData, setSalesData] = useState([])
    const [totalAmountValue, setTotalAmountValue] = useState(0)
    const [dateStart, setDateStart] = useState('')
    const [dateEnd, setDateEnd] = useState('')
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);



    // useEffect(() => {
    //     axios.get(`${AdminDashboardUrl}sales_report/?start_date=2024-02-02&end_date=2024-02-06`).then((response) => {
    //         console.log(response.data, '=================>>>>>>>>>>>>check data');
    //         if (response.data) {
    //             let value = 0
    //             const data = response.data
    //             for (let sales = 0; sales < data.length; sales++) {
    //                 let datasale = data[sales]
    //                 value += datasale.price
    //             }
    //             setTotalAmountValue(value)
    //         }
    //         setSalesData(response.data)
    //     }).catch((error) => {
    //         console.error("an error occured fetching", error);
    //     })


    // }, [salesData])
    useEffect(() => {
    
    }, [salesData])
    


    const generateReport = () => {
        axios.get(`${AdminDashboardUrl}sales_report/?start_date=${dateStart}&end_date=${dateEnd}`).then((response) => {
            console.log(response.data, '=================>>>>>>>>>>>>check data');
            if (response.data) {
                let value = 0
                const data = response.data
                for (let sales = 0; sales < data.length; sales++) {
                    let datasale = data[sales]
                    value += datasale.price
                }
                setTotalAmountValue(value)
            }
            setSalesData(response.data)
        }).catch((error) => {
            console.error("an error occured fetching", error);
        })

    }

    return (
        <div>
                {/* <div className='z-50'>
                    <dialog open={open} handler={handleOpen} className=''>
                        <Calendar onChange={generateReport} value={dateStart} />
                    </dialog>
                </div> */}
            <h1 className='text-5xl  text-center mb-4 text-black font-roboto-mono'>Sales Report</h1>
            <div className=' flex gap-5 justify-center'>
                <label onClick={handleOpen} >From</label>
                <input type="text" value={dateStart} onChange={(e) => setDateStart(e.target.value)} placeholder='YYYY-MM-DD' className='border-[1px] w-40 h-12 text-start p-2 text-black border-[#c3c3c4] rounded-md font-prompt-normal' />
                <label >To</label>
                <input type="text" value={dateEnd} onChange={(e) => setDateEnd(e.target.value)} placeholder='YYYY-MM-DD' className='border-[1px] w-40 h-12 text-start p-2 text-black border-[#c3c3c4] rounded-md font-prompt-normal' />
                <Button className='mb-3' onClick={generateReport}>Generate Report</Button>
            </div>
            <div className="flex flex-col min-h-max items-center ">

                <Card className="h-full w-full">
                    <table className='w-full min-w-max table-auto text-left'>
                        <thead>
                            <tr>
                                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-prompt-normal leading-none opacity-70"
                                    >
                                        Id
                                    </Typography>
                                </th>

                                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-prompt-normal leading-none opacity-70"
                                    >
                                        User
                                    </Typography>
                                </th>


                                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-prompt-normal leading-none opacity-70"
                                    >
                                        email
                                    </Typography>
                                </th>

                                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-prompt-normal leading-none opacity-70"
                                    >
                                        Phone Number
                                    </Typography>
                                </th>
                                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-prompt-normal leading-none opacity-70"
                                    >

                                        Booked date
                                    </Typography>
                                </th>
                                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-prompt-normal leading-none opacity-70"
                                    >

                                        Amount
                                    </Typography>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {(salesData ? (
                                salesData.map((sales) => {

                                    const classes = "p-4 border-b border-blue-gray-50";

                                    return (
                                        <tr key={sales.id}>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-prompt-normal"
                                                >
                                                    {sales.id}
                                                </Typography>
                                            </td>

                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-prompt-normal"
                                                >
                                                    {sales.userDetails.username}
                                                </Typography>
                                            </td>

                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-prompt-normal"
                                                >
                                                    {sales.userDetails.email}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-prompt-normal"
                                                >
                                                    {sales.userDetails.phone_number}
                                                </Typography>
                                            </td>
                                            <td>

                                                <ListItemPrefix >
                                                    {sales.booking_date}

                                                </ListItemPrefix>
                                            </td>
                                            <td>

                                                <ListItemPrefix  >

                                                    ₹{sales.price}

                                                </ListItemPrefix>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : '')}
                        </tbody>
                    </table>
                    <div className='flex justify-between text-2xl font-prompt-normal mt-3 mb-3'>
                        <div className='ml-5'>
                            Total Amount
                        </div>
                        <div className='mr-10'>
                            ₹{totalAmountValue}
                        </div>
                    </div>
                </Card>

                <ToastContainer />
            </div>
        </div>
    )
}

export default SalesReportAdmin


