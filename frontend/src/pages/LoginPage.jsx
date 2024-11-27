import React, { useContext, useState } from 'react'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import summaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';

export const LoginPage = () => {
    const [showPassword, setShowpassword] = useState(false)
    const [data,setData] =useState({
        email:"",
        showPassword:''
    })
    const navigate = useNavigate()
    const {fetchUserDetails} = useContext(Context)

    const handleOnChange = (e)=>{

        const {name,value} = e.target
        setData((preve)=>{
            return{
                ...preve,
                [name]:value
            }
        })
    }


    const handleSubmit=async(e)=>{
        e.preventDefault()

        try {
            const response =  await fetch(summaryApi.signin.url,{
            method:summaryApi.signin.method,
            credentials:"include",
            headers:{ "content-type":"application/json" },
            body:JSON.stringify(data)
        });
        const result = await response.json();
        console.log(result)

        if(response.ok){
            toast.success("successfully login...")
            navigate('/')
            fetchUserDetails()
        } else{
            toast.error(result.message)
        }
        } catch(error){
            console.log("error something went wrong",error)
        }
    
    }
  
     return (
    <section id='login' >
        <div className='mx-auto container p-4'>

                 <form action=""  onSubmit={handleSubmit} className='bg-white p-2 py-5 w-full max-w-md mx-auto'>
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
                    <Link  to={"/forgot-password"} className='block w-fit ml-auto hover:underline hover:text-blue-700'>Forgot Password?</Link>

                    <button className='bg-blue-400 text-white p-1 mt-2 w-full max-w-[150px] rounded-full mx-auto block hover:bg-blue-500'>Login</button>
                 
                    <p className='mt-4'>don't have an account? <Link to={'/sign-up'} className=' hover:underline hover:text-blue-700 font-bold tracking-tighter'>Sign uP</Link></p>
                 </form>           
        </div>
    </section>
  )
}

export default LoginPage 