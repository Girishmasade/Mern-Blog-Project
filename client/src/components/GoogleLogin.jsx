import React from 'react'
import { Button } from './ui/button'
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '@/utils/firebase';
import { getEnv } from '@/utils/getEnv';
import { showToast } from '@/utils/showToast';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setUser } from '@/redux/user/user.slice';

const GoogleLogin = () => {

const navigate = useNavigate()
const dispatch = useDispatch()
    const handleLogin = async() => {
      try {
             const googleResponse = await signInWithPopup(auth, provider)
           
             const user = googleResponse.user
             const bodyData = {
              name: user.displayName,
              email: user.email,
              avatar: user.photoURL
             }
           
             const response = await fetch(
               `${getEnv("VITE_API_BASE_URL")}/auth/google-login`,
               {
                 method: 'post',
                 headers: {'Content-type': 'application/json'},
                 credentials: "include",
                 body: JSON.stringify(bodyData)
               }
             );
             const data = await response.json()
             if (!response.ok) {
              return showToast('error', data.message)
             }
             dispatch(setUser(data.user))
             navigate('/')
             showToast('success', data.message)
           } catch (error) {
             showToast('error', data.message)
           }
    }

  return (
    <Button variant='outline' className='w-full' onClick = {handleLogin}>
        <FcGoogle />
      Continue with Google
    </Button>
  )
}

export default GoogleLogin
