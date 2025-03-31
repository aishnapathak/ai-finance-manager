
// ================== All Imports
import React, { useState }      from 'react'
import { Eye, EyeOff }  from 'lucide-react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignInFormFunction = () => {

    // ================== All Use-States
    const [username,      setUsername]        = useState("")
    const [password,       setPassword]         = useState("")
    const [UError, setUError]   = useState("")
    const [passError,  setPassError]    = useState("")
    const [show,       block]           = useState(true) // for toggle
    const navigate = useNavigate();  // Hook for navigation

    // ================== All Functions

    //  for handeling email
    const handleU = (e) => {
        setUsername        (e.target.value)
        setUError   ("")
    }

    //  for handeling password
    const handlePass = (e) => {
        setPassword        (e.target.value)
        setPassError   ("")       
    }

    //  for handeling submit button
    const handleSubmit = async(e) => {
        e.preventDefault()

        if (!username) {
            setUError("Please! Enter Your Email")
        }
        if (!password) {
            setPassError ("Please! Enter Password")
        }

    try {
        // ✅ Replace this with your actual backend URL
        const response = await axios.get(`http://localhost:8080/users/get/${username}`);
  
        // ✅ Backend should return user details, validate password
        if (response.data.password === password) {
          alert("Login Successful!");
          console.log("User Data:", response.data);
          // Redirect or save user info in localStorage

          // Store user data in localStorage or state (optional)
          localStorage.setItem('userData', JSON.stringify(response.data)); 

          // Redirect to the dashboard with user data
          navigate("/overview", {
              state: { userData: response.data },  // Passing user data to the dashboard
          });
        } else {
          setPassError("Invalid Password");
        }
      } catch (error) {
        console.error("Error:", error.response ? error.response.data : error);
        setUError("User not found");
      }
    };

    //  for toggle
    const showPass = () => {
        block(!show)
    }

    return (
        <>
            {/* ===================== Login Form ===================== */}
            <form className='mt-[58px]' onSubmit={handleSubmit}>

                {/* ===================== Email Part ===================== */}
                <label className='relative'>
                    <input onChange={handleU} type="text" placeholder='Enter Username' className='w-full h-[62px] border-[2px] border-[#FFFFFF] pl-4 text-[22px] font-Roboto font-light rounded-lg outline-none' />
                    <p className='absolute text-[#FF0000] mix-blend-difference top-[-40px] left-2 text-sm animate-pulse'>{UError}</p>
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

                {/* ===================== for password forgot ===================== 
                <p className='mix-blend-difference text-white text-end mt-[10px] text-[18px] font-Roboto font-light'>Forgot Passwowrd?</p>*/}

                {/* ===================== for log-in button ===================== */}
                <button className='w-full h-[64px] bg-gray-900 hover:mix-blend-difference outline-none rounded-lg mt-12 font-black font-Roboto text-lg border-[2px] border-[#FFFFFF]'>Log In</button>
            </form>
        </>
    )
}

export default SignInFormFunction
