import React, { Profiler } from 'react'
import { Button } from './ui/button'
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '@/helper/firebase';
import { googleLogin } from '@/api/baseUrl';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '@/redux/user.slice';


const GoogleLogin = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleLogin = async () => {
        try {
            const googleRes = await signInWithPopup(auth, provider)
            const user = googleRes.user

            const signdata = await googleLogin({
                fullname: user.displayName,
                email: user.email,
                profile: user.photoURL,
            })

            const token = signdata?.data?.token;
            if (token) {
                localStorage.setItem("token", token);
            }

            toast.success(signdata.data.message)
            dispatch(setUser(signdata?.data?.user))
            console.log(signdata)
            navigate("/")
            console.log("Google Login Success:", signdata)

        } catch (error) {
            toast.error(error.response?.data?.message)
        }
    }

    return (
        <Button variant="outline" className="w-full" onClick={handleLogin}>
            <FcGoogle className="mr-2" />
            Continue with Google
        </Button>
    );
};

export default GoogleLogin;
