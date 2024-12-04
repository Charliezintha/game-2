import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './LoginSignup.css'
import email_icon from './assets/email.png'
import password_icon from './assets/password.png'
import {auth, db, setDoc, doc} from './firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useAuth } from './index1'

const Signup = () => {
  const navigate = useNavigate(); 

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    let userCredential;
    try{
      userCredential = await createUserWithEmailAndPassword(auth, email, password)
      console.log("Account created")

      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        email: user.email
      });

      navigate('/');
    } 
    catch(err){
      console.log(err)
    }
  }

  return (
    <form className='container' onSubmit={handleSubmit}>
      <div className="header">
        <div className="text"> Register </div>
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

      <div className="forgot-password">Already have an account? <Link to="/">Log In!!!</Link></div>
      <div className="submit-container">
      <button type="submit" >Sign Up</button>
      </div>
    </form>
  )
}

export default Signup