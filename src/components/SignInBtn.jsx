import { signInWithPopup, signOut } from 'firebase/auth'
import React from 'react'
import { auth, provider } from '../config/firebaseAuth'
import { useDispatch, useSelector } from 'react-redux';
import { addUserData, removeUserData } from '../utility/authSlice';
import { useNavigate } from 'react-router-dom';
import { toggleLogin } from '../utility/toggleSlice';

function SignInBtn() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userData = useSelector((state) => state.authSlice.userData)
   
    async function handleAuth(){
        let data = await signInWithPopup(auth, provider);
        // console.log(data);

        const userData = {
                name: data.user.displayName,
                photo: data.user.photoURL
        }

        dispatch(addUserData(userData))  
        dispatch(toggleLogin())
        navigate("/")
    }

    async function handleLogOut() {
        await signOut(auth);
        dispatch(removeUserData())
        dispatch(toggleLogin())
        navigate("/")
    }

  return (
    <div>
        {
            userData ?
            <button onClick={handleLogOut} className='cursor-pointer mt-7 w-full text-sm bg-orange-600 text-white font-bold py-4'>Google LogOut</button>
            :
            <button onClick={handleAuth} className='cursor-pointer mt-7 w-full text-sm bg-orange-600 text-white font-bold py-3 flex items-center justify-center gap-2'><i className="text-[#00a63e] text-xl mt-1 block fi fi-brands-google"></i> Login with Google</button>

        }
    </div>
  )
}

export default SignInBtn

