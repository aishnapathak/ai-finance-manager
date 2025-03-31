
// ================== All Imports
import React, { useState }      from 'react'
import { Eye, EyeOff }  from 'lucide-react'
import axios from 'axios'

const SignUpFormFunction = () => {

    // ================== All Use-States
    const [email,      setEmail]        = useState("")
    const [password,       setPassword]         = useState("")
    const [emailError, setEmailError]   = useState("")
    const [passError,  setPassError]    = useState("")
    const [show,       block]           = useState(true) // for toggle
    const [fullName,      setFullName]        = useState("")
    const [username,       setUsername]         = useState("")
    const [fnameError, setFnameError]   = useState("")
    const [userError,  setUserError]    = useState("")
    const [phoneNumber,      setPhoneNumber]        = useState("")
    const [phoneError, setPhoneError] = useState("")
    
    // ================== All Functions

    //  for handeling email
    const handleEmail = (e) => {
        setEmail        (e.target.value)
        setEmailError   ("")
    }

    //  for handeling password
    const handlePass = (e) => {
        setPassword        (e.target.value)
        setPassError   ("")       
    }

    //  for handeling submit button
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const userData = {
            username,
            email,
            fullName,
            phoneNumber,
            password
        };
    
        try {
            const response = await fetch("http://localhost:8080/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...userData}),
              });
    
            const result = await response.json();
    
            if (response.ok) {
                alert("User registered successfully!");
            } else {
                alert(`Error: ${result}`);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong. Please try again.");
        }
    };
    

    //  for toggle
    const showPass = () => {
        block(!show)
    }

    //for handeling fullname
    const handlefname = (e) => {
        setFullName        (e.target.value)
        setFnameError   ("")
    }

    //for handeling username
    const handleuname = (e) => {
        setUsername        (e.target.value)
        setUserError   ("")
    }

    //for handeling phone number
    const handlephone = (e) => {
        setPhoneNumber        (e.target.value)
        setPhoneError   ("")
    }

    return (
        <>
            {/* ===================== Login Form ===================== */}
            <form className='mt-[58px]' onSubmit={handleSubmit}>

                {/* ===================== Email Part ===================== */}
                <label className='relative'>
                    <input onChange={handleEmail} type="email" placeholder='Enter Email' className='w-full h-[62px] border-[2px] border-[#FFFFFF] pl-4 text-[22px] font-Roboto font-light rounded-lg outline-none' />
                    <p className='absolute text-[#FF0000] mix-blend-difference top-[-40px] left-2 text-sm animate-pulse'>{emailError}</p>
                </label>

                {/* ===================== Password Part ===================== */}
                <label className='relative'>
                    <input onChange={handlePass} type={show? "password" : "text"} placeholder='Enter Password' className='w-full h-[62px] border-[2px] border-[#FFFFFF] pl-4 text-[22px] font-Roboto font-light rounded-lg mt-[22px] outline-none' />
                    <p className='absolute text-[#FF0000] mix-blend-difference top-[-40px] left-2 text-sm animate-pulse'>{passError}</p>


                    {/* ---------------- for password show/block toggle ---------------- */}
                    {
                        show ?
                        <EyeOff onClick={showPass} className='absolute top-[-5px] right-6 text-3xl cursor-pointer' type='password' />
                        :
                        <Eye onClick={showPass} className='absolute top-[-5px] right-6 text-3xl cursor-pointer' type='text' />
                    }

                </label>
                {/* ===================== Phone Part ===================== */}
                <label className='relative'>
                    <input onChange={handlephone} type="number" placeholder='Enter Phone Number' className='w-full h-[62px] border-[2px] border-[#FFFFFF] pl-4 text-[22px] font-Roboto font-light rounded-lg mt-[22px] outline-none' />
                    <p className='absolute text-[#FF0000] mix-blend-difference top-[-40px] left-2 text-sm animate-pulse'>{phoneError}</p>
                </label>

                {/* ===================== Full Name Part ===================== */}
                <label className='relative'>
                    <input onChange={handlefname} type="text" placeholder='Enter Full Name' className='w-full h-[62px] border-[2px] border-[#FFFFFF] pl-4 text-[22px] font-Roboto font-light rounded-lg mt-[22px] outline-none' />
                    <p className='absolute text-[#FF0000] mix-blend-difference top-[-40px] left-2 text-sm animate-pulse'>{fnameError}</p>
                </label>

                {/* ===================== username Part ===================== */}
                <label className='relative'>
                    <input onChange={handleuname} type="text" placeholder='Enter Username' className='w-full h-[62px] border-[2px] border-[#FFFFFF] pl-4 text-[22px] font-Roboto font-light rounded-lg mt-[22px] outline-none' />
                    <p className='absolute text-[#FF0000] mix-blend-difference top-[-40px] left-2 text-sm animate-pulse'>{userError}</p>
                </label>

                {/* ===================== for password forgot ===================== 
                <p className='mix-blend-difference text-white text-end mt-[10px] text-[18px] font-Roboto font-light'>Forgot Passwowrd?</p>*/}

                {/* ===================== for log-in button ===================== */}
                <button className='w-full h-[64px] bg-gray-900 hover:mix-blend-difference outline-none rounded-lg mt-12 font-black font-Roboto text-lg border-[2px] border-[#FFFFFF]'>Sign Up</button>
            </form>
        </>
    )
}

export default SignUpFormFunction
