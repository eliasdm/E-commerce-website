import React, { useState } from 'react'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import summaryApi from '../common';
import { toast } from 'react-toastify';

export const SignUpPage = () => {
    const [showPassword, setShowpassword] = useState(false)
    const [showConfirmPassword, setShowConfirmpassword] = useState(false)

    const [data,setData] =useState({
        name:"",
        email:"",
        password:''
    })
    
    const Navigate = useNavigate()
    const handleOnChange = (e)=>{

        const {name,value} = e.target
        setData((preve)=>{
            return{
                ...preve,
                [name]:value
            }
        })
    }
//handle summiting
const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password !== data.confirmPassword) {
        toast.error("Passwords do not match!");
        return;
    }

    try {
        const { confirmPassword, ...payload } = data;
        const response = await fetch(summaryApi.signup.url, {
            method: summaryApi.signup.method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        const result = await response.json();

        if (response.ok) {
            console.log(result.message || "success!");
            toast.success(result.message || "success!");
            Navigate('/login')
        } else {
            toast.error(result.message || "Something went wrong");
        }
    } catch (error) {
        console.error("Error:", error);
        toast.error("Failed to connect to the server");
    }
};


  return (
    <section id='login' >
        <div className='mx-auto my-auto container p-1'>

                 <form action=""  onSubmit={handleSubmit} className='bg-white p-1 py-1 w-full max-w-md mx-auto flex-col gap-1'>
                    <div className='p-2'>
                        <label>name:</label>
                        <div className='bg-slate-100 p-2'>
                            <input type="text"
                             placeholder='Enter your name here'
                             name='name'
                             value={data.name}
                             onChange={handleOnChange}
                             required
                             className='w-full h-full outline-none bg-transparent ' />
                        </div>
                    </div>
                    <div className=' p-2'>
                        <label>email:</label>
                        <div className='bg-slate-100 p-2'>
                        <input type="email"
                            placeholder='Enter your email here' 
                            name='email'
                            value={data.email}
                            onChange={handleOnChange}
                            required
                            className='w-full h-full outline-none bg-transparent '/>
                        </div>
                    </div>

                    <div className='p-2'>
                        <label>password:</label>
                        <div className='bg-slate-100 p-2 flex'>
                            <input type={showPassword ? "text" : "password"} 
                                placeholder='Enter your password here'
                                name='password'
                                value={data.password }
                                onChange={handleOnChange}
                                required
                                className='w-full h-full outline-none bg-transparent '/>
                            <div className='cursor-pointer' onClick={()=> setShowpassword((prev)=>!prev)}> 
                                <span>
                                    {
                                        showPassword ?
                                        (
                                            <FaEye/>
                                        ):
                                        (
                                            <FaEyeSlash/>
                                        )
                                    }
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className='p-2'>
                        <label>confirm password:</label>
                        <div className='bg-slate-100 p-2 flex'>
                            <input type={showConfirmPassword ? "text" : "password"} 
                                placeholder='Enter your password here'
                                name='confirmPassword'
                                value={ data.confirmPassword }
                                onChange={handleOnChange}
                                required
                                className='w-full h-full outline-none bg-transparent '/>
                            <div className='cursor-pointer' onClick={()=> setShowConfirmpassword((prev)=>!prev)}> 
                                <span>
                                    {
                                        showConfirmPassword ?
                                        (
                                            <FaEye/>
                                        ):
                                        (
                                            <FaEyeSlash/>
                                        )
                                    }
                                </span>
                            </div>
                        </div>
                    </div>




                    <button type='submit' className='bg-blue-400 text-white p-1 mt-2 w-full max-w-[150px] rounded-full mx-auto block hover:bg-blue-500'>sign Up</button>
                 
                    <p className='mt-4'>already have an account? <Link to={'/Login'} className=' hover:underline text-blue-700 font-bold tracking-tighter'>Login</Link></p>
                 </form>           
        </div>
    </section>
  )
}

export default SignUpPage
