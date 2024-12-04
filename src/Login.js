import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom';
import './LoginSignup.css'
import email_icon from './assets/email.png'
import password_icon from './assets/password.png'
import {auth, db, setDoc, doc} from './firebase'
import { signInWithEmailAndPassword } from 'firebase/auth';
import {useAuth} from './index1'

const Login = () => {
  const { userLoggedIn } = useAuth() || {};

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSigningIn, setIsSigningIn] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    let userCredential;
    if(!isSigningIn) {
      setIsSigningIn(true)
      userCredential = await signInWithEmailAndPassword(auth, email, password)
      console.log("logging in")
    };

    const user = userCredential.user;

    await setDoc(doc(db, 'users', user.uid), {
      email: user.email
    });

    if (userLoggedIn){
      return <Navigate to="/menu" replace={true}/>
    }
  }

  return (
    <form className='container' onSubmit={handleSubmit}>

      {userLoggedIn && (<Navigate to="/menu" replace={true} />)}

      <div className="header">
        <div className="text"> LOG IN </div>
        <div className="underline"></div>
      </div>

      <div className="inputs">
        <div className="input">
            <img src={email_icon} alt="" />
            <input type="email" placeholder='Email address' onChange={(e) => setEmail(e.target.value)} required/>
        </div>

        <div className="input">
            <img src={password_icon} alt="" />
            <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} required/>
        </div>
      </div>

      <div className="forgot-password"> Forgot Password? <span>Cick Here!!!</span></div>
      <div className="forgot-password"> Doesn't have an account? <Link to="/signup">Sign Up</Link></div>
      <div className="submit-container">
      <button type="submit">{isSigningIn ? 'Logging In...' : 'Log In'}</button>
      </div>
    </form>
  )
}

export default Login