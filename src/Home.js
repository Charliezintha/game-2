import React from 'react'
import './LoginSignup.css'
import user_icon from './assets/person.png'
import email_icon from './assets/email.png'
import password_icon from './assets/password.png'

const Home = () => {


  return (
    <div className='container'>
        <div className="text"> Home </div>
      <div className="header">

      </div>
      <div className="inputs">
        <div className="input">
        <img src={user_icon} alt="" />
        <p>Shanker</p>
        </div>
        
        <div className="input">
            <img src={email_icon} alt="" />
            <p>shankerjulian@gmail.com</p>
        </div>
        <div className="input">
            <img src={password_icon} alt="" />
            <p>0701234586</p>
        </div>
        <div className="input">
            <img src={password_icon} alt="" />
            <p>22/03/2002</p>
        </div>
        <div className="input">
            <img src={password_icon} alt="" />
            <p>Male</p>
        </div>
        <div className="input">
            <img src={password_icon} alt="" />
            <p>42, vivekananda lane, Colombo 06</p>
        </div>
      </div>

    </div>
  )
}

export default Home
