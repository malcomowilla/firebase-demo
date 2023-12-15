import {auth, googleAuth} from '../config/firebase'
import { createUserWithEmailAndPassword, signInWithPopup,signOut } from 'firebase/auth'
import { useState } from 'react'
const Auth = () => {
  const [email, setEmail] = useState('')
  const [password, setPassWord] = useState('')

  console.log(auth?.currentUser?.photoURL)
  const signIn = async ()=> {
      try {
        await createUserWithEmailAndPassword(auth, email, password)

        
      } catch (error) {
        console.log(error)
      }



  }


  const signInWithGoogle = async ()=>{
    await signInWithPopup(auth,googleAuth)
  }

const logout = async ()=>{
await signOut(auth)
}

  return (
    <div className="mt-[150px] flex justify-center space-x-[80px]">

        <input type="text" placeholder="Email..."  value={email} onChange={(e)=> setEmail(e.target.value)}/>
        <input type="password"placeholder="password...." value={password} onChange={(e)=> setPassWord(e.target.value)}/>
        <button onClick={signIn} className="border-blue-300 border-2 w-[120px] p-[15px] rounded-xl">Sign In</button>

        <button className='border-blue-300 border-2 w-[130px] text-sm p-[15px]  rounded-xl' onClick={signInWithGoogle}>Sign in With Google</button>
        <button onClick={logout}>Logout</button>
    </div>
  )
}

export default Auth






























