import React, { useEffect, useState } from 'react';
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import axios from 'axios';
import {toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { base_url } from '../constants/constants';
import logo from "../assets/profcio__All.png"
function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [message, setMessage] = useState("");
  const [uid, setUid] = useState('');
  const navigate = useNavigate();
  const apiUrl = `${base_url}/auth/password_change/`;

  const handlePasswordResetConfirmation = async () => {
    if (newPassword !== confPassword) {
      toast.error("New password and confirmation password do not match");
      return;
    }

    try {
      const response = await axios.post(apiUrl, {
        new_password: newPassword,
        uid: uid,
      });
      setMessage(response.data.detail);
      navigate("/usertype");
    } catch (error) {
      console.error(error, 'reset error');
      setMessage(error.response.data.detail);
    }
  };

const validatePassword = (password) => {
  // At least 8 characters
  const lengthRegex = /.{8,}/;
  // At least one uppercase letter
  const uppercaseRegex = /[A-Z]/;
  // At least one lowercase letter
  const lowercaseRegex = /[a-z]/;
  // At least one digit
  const digitRegex = /\d/;
  // At least one special character
  const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

  return (
    lengthRegex.test(password) &&
    uppercaseRegex.test(password) &&
    lowercaseRegex.test(password) &&
    digitRegex.test(password) &&
    specialCharRegex.test(password)
  );
};

  useEffect(() => {
    // Get the current URL
    const currentUrl = window.location.href;

    // Splitting the URL by '/'
    const urlParts = currentUrl.split('/');

    // Extracting data from the last two positions
    setUid(urlParts[urlParts.length - 2]);
    const data1 = urlParts[urlParts.length - 2];
    const data2 = urlParts[urlParts.length - 1];

  }, []); // Run this effect only once when the component mounts

  return (
    <>
      <div className="flex items-center justify-center h-screen bg-[#020313]">
        <Card className="w-96">
          <CardBody className="flex flex-col gap-4">
            <>
            <div className="flex justify-center items-center screen" >
              <img src={logo} alt="logo" width="130" height="150" className="w-35 h-20" />
            </div>
            <h3 className="flex justify-center font-roboto-mono">Forgot Password</h3>


              <Input
                label="Enter new password"
                type="password"
                size="lg"
                name="newPassword"
                onChange={(e) => setNewPassword(e.target.value)}
              />

              <Input
                label="Confirm new password"
                type="password"
                size="lg"
                name="confPassword"
                onChange={(e) => setConfPassword(e.target.value)}
              />
            </>
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              variant="White"
              fullWidth
              onClick={handlePasswordResetConfirmation}
              style={{backgroundColor:"lightseagreen"}}
            >
              Submit
            </Button>
          </CardFooter>
        </Card>
        <ToastContainer />
      </div>
    </>
  );
}

export default ResetPassword;
