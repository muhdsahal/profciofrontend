import { Card, Typography, List, ListItem, ListItemPrefix, } from "@material-tailwind/react";
import { PresentationChartBarIcon, PowerIcon, } from "@heroicons/react/24/solid";
import PeopleIcon from '@mui/icons-material/People';
import WorkIcon from '@mui/icons-material/Work';
import CategoryIcon from '@mui/icons-material/Category';
import BookIcon from '@mui/icons-material/Book';
import AssessmentIcon from '@mui/icons-material/Assessment';


import { useNavigate } from "react-router-dom";

export function Sidebar() {

  const navigate = useNavigate()

  const toAdminHome = () => {
    navigate("/admin/")
  }

  const handleUserList = () => {
    navigate("/admin/users/")
  }
  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/admin_login/')
  }
  const handleService = () => {
    navigate('/admin/services/')
  }
  const handleCategory = () => {
    navigate("/admin/category/")
  }
  const handleBooking = () => {
    navigate("/admin/booking/")
  }

  const toSalesReport = () => {
    navigate('/admin/sales_report/')
  }

  return (
    <Card className="h-[calc(100vh-2rem)] max-w-[64] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          Profcio Admin
        </Typography>
      </div>
      <List>
        <ListItem onClick={toAdminHome}>
          <ListItemPrefix >
            <PresentationChartBarIcon className="h-5 w-5" />
          </ListItemPrefix>
          Dashboard
        </ListItem>

        <ListItem onClick={handleCategory} >
          <ListItemPrefix >
            <CategoryIcon className="h-5 w-5" />
          </ListItemPrefix>
          Services Category
        </ListItem>
        <ListItem onClick={handleService}>
          <ListItemPrefix>
            <WorkIcon className="h-5 w-5" />
          </ListItemPrefix>
          Services Banner
        </ListItem>
        <ListItem onClick={handleUserList}>
          <ListItemPrefix>
            <PeopleIcon className="h-5 w-5" />
          </ListItemPrefix>
          Users
        </ListItem>

        <ListItem onClick={handleBooking}>
          <ListItemPrefix>
            <BookIcon className="h-5 w-5" />
          </ListItemPrefix>
          Booking
        </ListItem>

        <ListItem onClick={toSalesReport}>
          <ListItemPrefix>
            <AssessmentIcon className="h-5 w-5" />
          </ListItemPrefix>
          Sales Report
        </ListItem>

        <ListItem onClick={handleLogout}>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </Card>
  );
}