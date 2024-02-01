import React from "react";
import AdminHome from "../pages/admin/AdminHome";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./ProtectedRoutes/PrivateRoute";
import AdminProtected from './ProtectedRoutes/AdminProtected'
import AdminLoginPage from "../pages/login/adminLoginPage";
import UserLists from "../pages/admin/UserList";
import ServiceList from "../pages/admin/ServiceList";
import ServiceCategoryPage from "../pages/admin/ServiceCategoryPage";
import BookingPage from "../pages/admin/BookingPage";
function AdminRoutes() {
    return (
        <Routes>
            <Route>
                <Route element={<PrivateRoute/>}/>
                    <Route path="/admin_login/" element={<AdminLoginPage />} />
            </Route>

            <Route element={<AdminProtected />}>
                <Route path="/adminhome/" element={<AdminHome />} />
                    <Route path="/users/" element={<UserLists />} />
                    <Route path="/category/" element={<ServiceCategoryPage />} />
                    <Route path="/services/" element={<ServiceList />} />
                    <Route path="/booking/" element={<BookingPage />} />

            </Route>
        </Routes >
    )
}
export default AdminRoutes;