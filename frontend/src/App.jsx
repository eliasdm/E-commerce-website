import { useEffect, useState } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Context from './context'
import summaryApi from './common'
import { useDispatch } from 'react-redux'
import { setUserDatails } from './store/userSlice'


function App(){
  const dispatch = useDispatch()
  
  const fetchUserDetails = async () => {
    try {
      const response = await fetch(summaryApi.current_user.url, {
        method: summaryApi.current_user.method,
        credentials: 'include',
      });
      
      if (response.status === 401) {
        console.error('Unauthorized: Please check authentication credentials.');
      }
      if (!response.ok) {
        console.log(
          `Error ${response.status}: ${response.statusText} - ${summaryApi.current_user.url}`
        );
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const result = await response.json();
  
      if (result.success) {
        dispatch(setUserDatails(result.data));
      } else {
        console.error('Failed to fetch user details:', result.message);
      }
    } catch (error) {
      console.log('An error occurred while fetching user details:', error);
    }
  };
  

useEffect(()=>{
  fetchUserDetails()
},[])

return (
    <>
    <Context.Provider value={{
        fetchUserDetails
    }}>
      <ToastContainer />
      <Header/>
      <main  className='min-h-[calc(100vh-104px)]'>
        <Outlet/>
      </main>
      <Footer/>
    </Context.Provider>
    </>
  )
}

export default App
