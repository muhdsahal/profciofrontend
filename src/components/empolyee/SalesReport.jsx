import React, { useEffect, useState } from 'react'
import { Card, Typography, ListItemPrefix, Button } from "@material-tailwind/react";
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { AdminDashboardUrl } from '../../constants/constants';
import Calendar from 'react-calendar';
import { Dialog, DialogHeader, DialogBody, DialogFooter, } from "@material-tailwind/react";
import { jwtDecode } from 'jwt-decode';

function SalesReport() {
    const token = localStorage.getItem('token')
    const decode = jwtDecode(token)
    const userId = decode.user_id
    const [salesData, setSalesData] = useState([])
    const [totalAmountValue, setTotalAmountValue] = useState(0)
    const [dateStart, setDateStart] = useState('')
    const [dateEnd, setDateEnd] = useState('')
    const [status, setStatus] = useState('all')
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    const [managePage, setManagePage] = useState(false)
    const isValidFutureDate = (dateString) => {
        const inputDate = new Date(dateString);
        const currentDate = new Date();
        return !isNaN(inputDate) && inputDate > currentDate;
    }
    const generateReport = () => {
        setManagePage(false)
        let start_date = ''
        let end_date = ''
        if (dateStart && dateEnd) {

            if (dateStart == dateEnd) {
                setManagePage(true)

                toast.error('start date and end date should be diffrent')
            }
            if (isValidFutureDate(dateStart)) {
                setManagePage(true)
                toast.error("Enter Valid From date!");
            }
            if (isValidFutureDate(dateEnd)) {
                setManagePage(true)
                toast.error("Enter Valid To date!");
            }
            if (!dateRegex.test(dateStart)) {
                start_date = dateStart
            }
            if (!dateRegex.test(dateEnd)) {
                end_date = dateEnd
            }
        }
        axios.get(`${AdminDashboardUrl}sales_report/${userId}/?start_date=${start_date}&end_date=${end_date}&booking_status=${status}`).then((response) => {
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


   const downloadPdf=(responseData)=> {
        const blob = new Blob([responseData], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'sales_report.pdf');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);  
        window.URL.revokeObjectURL(url);
      }

     const generatePdf =()=>{
    
        let start_date = ''
        let end_date = ''
        if (dateStart && dateEnd) {

            if (dateStart == dateEnd) {
                setManagePage(true)

                toast.error('start date and end date should be diffrent')
            }
            if (isValidFutureDate(dateStart)) {
                setManagePage(true)
                toast.error("Enter Valid From date!");
            }
            if (isValidFutureDate(dateEnd)) {
                setManagePage(true)
                toast.error("Enter Valid To date!");
            }
            if (!dateRegex.test(dateStart)) {
                start_date = dateStart
            }
            if (!dateRegex.test(dateEnd)) {
                end_date = dateEnd
            }
        }
        axios.get(`${AdminDashboardUrl}sales-report-pdf/${userId}/?start_date=${start_date}&end_date=${end_date}&booking_status=${status}`,{ responseType: 'arraybuffer'})
        .then((response) => {
            downloadPdf(response.data);
            console.log(response,'>>>>>>>>>>>>>>>>>.......');
           
        }).catch((error) => {
            console.error("an error occured fetching", error);
        })
    }

    useEffect(() => {
        if (salesData.length==0) {
            generateReport()
        }
    }, [salesData, managePage])

    
    

    return (
        <div>
        
            <h1 className='text-5xl  text-center mb-4 text-black font-roboto-mono'>Sales Report</h1>
            <div className=' flex gap-5 justify-center'>
                <label onClick={handleOpen} >From</label>
                <input type="text" value={dateStart} onChange={(e) => setDateStart(e.target.value)} placeholder='YYYY-MM-DD' className='border-[1px] w-40 h-12 text-start p-2 text-black border-[#c3c3c4] rounded-md font-prompt-normal' />
                <label >To</label>
                <input type="text" value={dateEnd} onChange={(e) => setDateEnd(e.target.value)} placeholder='YYYY-MM-DD' className='border-[1px] w-40 h-12 text-start p-2 text-black border-[#c3c3c4] rounded-md font-prompt-normal' />
                <Button className='mb-3 bg-[#1f2861]' onClick={generateReport}>Filter Report</Button>
                <select onChange={(e) => setStatus(e.target.value)} className='w-36 h-12 font-prompt-normal pl-2 capitalize border-[1px] rounded-md border-[#b6b3b3]'>
                    <option value="all">all</option>
                    <option value="pending">pending</option>
                    <option value="ongoing">ongoing</option>
                    <option value="completed">completed</option>
                </select>
                <Button className='mb-3 bg-[#37c48e]' onClick={generatePdf}>Generate PDF</Button>

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
                                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-prompt-normal leading-none opacity-70"
                                    >

                                        Status
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
                                            <td>

                                                <ListItemPrefix >
                                                    {(sales.booking_status === 'completed' ? <span className='bg-[#249614]  text-white rounded-md pl-2 pr-2 font-prompt-normal capitalize'>{sales.booking_status}</span> : sales.booking_status === 'ongoing' ? <span className='bg-[#e7d026]  text-white rounded-md pl-2 pr-2 font-prompt-normal capitalize'>{sales.booking_status}</span> : <span className='bg-[#28c0f2]  text-white rounded-md pl-2 pr-2 font-prompt-normal capitalize'>{sales.booking_status}</span>)}

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

export default SalesReport


