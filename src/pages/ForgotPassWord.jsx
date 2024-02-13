import React, { useState } from "react";
import axios from "axios";
import { Card, CardBody, CardFooter, Typography, Input, Button, } from "@material-tailwind/react";
import { ToastContainer } from 'react-toastify';
import { ResetPasswordUrl, base_url } from "../constants/constants"; // Make sure to import your ResetPasswordUrl
import { useNavigate } from "react-router-dom";
import logo from "../assets/profcio__All.png"

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [step, setStep] = useState(1); // 1 for forgot password, 2 for password reset
  const navigate = useNavigate()
  const handleForgotPassword = async () => {
    console.log(email, 'email print');
    try {
      const response = await axios.post(`${base_url}/auth/password_reset/`, {
        email: email,

      });
      console.log(response, 'email reaponse');
      setMessage(response.data.detail)
      navigate("/confirm")
    } catch (error) {
      console.error(error, 'forgot error');
      setMessage(error.response.data.detail);
    }
  };


  return (
    <div className="flex items-center justify-center h-screen bg-[#020313]">
      <Card className="w-96">
        <CardBody className="flex flex-col gap-4">

          <>
            <div className="flex justify-center items-center screen" >
              <img src={logo} alt="logo" width="130" height="150" className="w-35 h-20" />
            </div>
            <h3 className="flex justify-center font-roboto-mono">Forgot Password</h3>


            <Input
              placeholder="Enter your email"
              type="email"
              size="lg"
              label="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </>



        </CardBody>
        <CardFooter className="pt-0">
          <Button
            variant="White"
            fullWidth
            onClick={handleForgotPassword}
            style={{ backgroundColor: "lightseagreen" }}
          >
            Send Reset Link
          </Button>

          {message && <p>{message}</p>}
        </CardFooter>
      </Card>
      <ToastContainer />
    </div>
  );
}

export default ForgotPassword;
