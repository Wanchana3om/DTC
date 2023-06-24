import "../App.css";
import * as React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { useToast } from '@chakra-ui/react'

function RegisterPage() {
 const [username, setUsername] = useState('')
 const [name, setName] = useState('')
 const [password, setPassword] = useState('')
 const [confirmPassword, setConfirmPassword] = useState('')
 const navigate = useNavigate();
 const toast = useToast()
const {register} = useAuth()

const handleSubmit = () => {
    if (username.length === 0) {
        alert('Please enter a username');
    } else if (name.length === 0) {
        alert('Please enter name');
    } else if (password.length === 0) {
        alert("Please enter Passwords");
    } else if (confirmPassword.length === 0) {
        alert("Please enter Confirm Passwords");
    } else if (password !== confirmPassword) {
        alert("Passwords do not match");
    } else {
        register({
            username,
            name,
            password,
        });

        toast({
            title: 'Submitted',
            description: "You have been submitted.",
            position: "top",
            status: 'success',
            duration: 9000,
            isClosable: true,
        });
            navigate("/");
    }
};

  return (
    <>
       <div className="w-screen h-screen">
      <div className="flex flex-row justify-center items-center">
        <form
          onSubmit={(e) => handleSubmit(e)}
          className=" flex flex-col w-[453px] mt-[157px] rounded-md "
        >
          <h1 className="text-[#22269E] text-[36px] font-[500]">
            Register Acount!
          </h1>
          <label htmlFor="first" className="mt-[37px]">
            Username
          </label>
          <input
            type="text"
            className=" p-[12px] w-full h-[48px] border-[#D6D9E4] border-[1px] rounded-[8px] "
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter Username"
          />
          <label htmlFor="first" className="mt-[37px]">
            Name
          </label>
          <input
            type="text"
            className=" p-[12px] w-full h-[48px] border-[#D6D9E4] border-[1px] rounded-[8px] "
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Name and Lastname"
          />
          
          <label htmlFor="password" className="mt-[40px]">
            Password
          </label>
          <input
            type="password"
            name="last"
            className=" p-[12px] w-full h-[48px] border-[#D6D9E4] border-[1px] rounded-[8px]"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
          />
          <label htmlFor="password" className="mt-[40px]">
           Confirm Password
          </label>
          <input
            type="password"
            name="last"
            className=" p-[12px] w-full h-[48px] border-[#D6D9E4] border-[1px] rounded-[8px]"
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Enter Password"
          />
          <button
            type="submit"
            className="mt-[40px] h-[60px] bg-[#2F5FAC] rounded-[12px] text-white font-[700] hover:bg-[#6991d5] transition-all duration-200"
          >
            Submit
          </button>
          <div className="flex mt-[37px]">
            <p className="font-[400] text-black">Already have an account?</p>
            <Link to="/" className="text-[#2F5FAC] ml-[12px] font-[700]">
              Log in
            </Link>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}

export default RegisterPage;
