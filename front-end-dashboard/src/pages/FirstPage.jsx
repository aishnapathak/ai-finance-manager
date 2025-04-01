// ================== All Imports
import React               from 'react'
import SignInFormFunction        from '../Form/SignInFormFunction'
import SignUpFormFunction        from '../Form/SignUpFormFunction'
import { useState } from 'react'

const FirstPage = () => {

    const [isSignUp, setIsSignUp] = useState(false);

    return (
        <>
        <div className='bg-gray-900 text-gray-100'>
            <section className=' w-full h-full min-height-screen flex justify-end items-center px-20'>

                {/* ================== Navbar Start ================== */}
                <nav className=' absolute top-0 left-0 w-full py-6 px-12 flex justify-between items-center'>


                    {/* ------ Sign_in Part ------ */}
                    <div className='flex gap-10'>

                        {/* ------ Sign_in Button ------ */}
                        <button className='font - Roboto text-white font-medium text-xl relative group ${!isSignUp ? "underline" : ""}' onClick={() => setIsSignUp(false)}>Sign In
                            <span className='w-full h-[2px] absolute bg-white left-0 bottom-0 scale-0 group-hover:scale-125 transition duration-200'></span>
                        </button>

                        {/* ------ Register Button ------ */}
                        <button className='font - Roboto text-black font-Roboto font-medium text-base px-8 py-[10px] bg-white rounded-3xl hover:text-purple-500 transition duration-200 active:scale-95' onClick={() => setIsSignUp(true)}>Register</button>
                    </div>
                </nav>

                    {/* ============= Form Part ============= */}
                    <ul className='w-[380px] mt-[50px]'>
                    {/* Conditionally Render Form */}
                    {isSignUp ? (
                    <>
                        <h1 className="text-4xl font-semibold text-white">
                            Join Us! <br />
                            <span className="text-purple-400">Create an Account</span>
                        </h1>
                        <SignUpFormFunction isSignUp={true}/>
                    </>
                ) : (
                    <>
                        <h1 className="text-4xl font-semibold text-white">
                            Hello! <br />
                            <span className="text-purple-400">Welcome Back</span>
                        </h1>
                        <SignInFormFunction isSignUp={false}/>
                    </>
                )}

                        <ul className='mt-12 flex flex-col items-center '>
                            <li className='w-[200px] text-white text-center text-lg font-Roboto font-normal bg-[#1E1E1E] z-[10]'>Or Continue With</li>
                            <li className='w-full h-[1px] bg-white mt-[-15px]'></li>
                        </ul>

                        {/* --------- Social Links --------- */}
                        <ul className='mt-10 flex justify-between '>
                            <button className='px-8 py-3 border-2 bg-white rounded-xl hover:scale-110 transition duration-200'><img src="Social/google.png"   alt="google_image" /></button>
                            <button className='px-8 py-3 border-2 bg-white rounded-xl hover:scale-110 transition duration-200'><img src="Social/facebook.png" alt="facebook_image" /></button>
                            <button className='px-8 py-3 border-2 bg-white rounded-xl hover:scale-110 transition duration-200'><img src="Social/apple.png"    alt="apple_image" /></button>
                        </ul>

                        {/* ============== If Doesn't Have Account ============== */}
                        <ul className='mt-[52px] mb-[50px]'>
                        <p className="mt-8 text-white text-lg">
                        {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
                        <button 
                        onClick={() => setIsSignUp(!isSignUp)} 
                        className="font-bold text-purple-400 hover:underline"
                        >
                        {isSignUp ? "Sign In" : "Create Account!"}
                        </button>
                        </p>
                        </ul>
                    </ul>
            </section>
        </div>
        </>
    )
}

export default FirstPage;