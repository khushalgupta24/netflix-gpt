import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValidData } from '../utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../utils/firebase';

const Login = () => {

    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);

    const email = useRef(null);
    const pwd = useRef(null);

    const toggleForm = () => {
        setIsSignInForm(!isSignInForm);
    }

    const handleButtonClick = () => {
        //Validate the form data
        const message = checkValidData(email.current.value, pwd.current.value)
        setErrorMessage(message);
        if(message) return;

        //SignIn/SignUp logic
        if(!isSignInForm){
            //SignUp logic
            createUserWithEmailAndPassword(auth, email.current.value, pwd.current.value)
              .then((userCredential) => {
                // Signed up
                const user = userCredential.user;
                console.log(user);
                })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMessage(errorCode + "-" + errorMessage);
                });
        }else{
            //SignIn logic
            signInWithEmailAndPassword(auth, email.current.value, pwd.current.value)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user, 'Logged IN');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMessage(errorCode + "-" + errorMessage);
            });
        }
    }

  return (
    <div className=''>
        <Header/>
        <div className='absolute'>
            <img src='https://assets.nflxext.com/ffe/siteui/vlv3/4d2c5849-b306-4884-9036-6211f7ee0178/web/IN-en-20240930-TRIFECTA-perspective_1e1ca6cd-9e2d-4e9d-9e4b-ba0c2d3a0e31_large.jpg'
            alt='background'/>
        </div>
        <form onSubmit={(e) => e.preventDefault()} className='absolute w-3/12 p-12 bg-black my-36 mx-auto right-0 left-0 text-white bg-opacity-80'>
            <h1 className='font-bold text-3xl py-4'>{isSignInForm ?  "Sign In" : "Sign Up"}</h1>
            {!isSignInForm && <input type='text' placeholder='Full Name' className='p-4 my-4 w-full bg-gray-700 '/>}
            <input ref={email} type='text' placeholder='Email Address' className='p-4 my-4 w-full bg-gray-700 '/>
            <input ref={pwd} type='password' placeholder='Password' className='p-4 my-4 w-full bg-gray-700'/>
            <p className='text-red-700 font-extrabold'>{errorMessage}</p>
            <button className='p-4 my-6 bg-red-700 w-full rounded-lg' onClick={handleButtonClick}>{isSignInForm ? "Sign In" : "Sign Up"}</button>
            <p className='p-4 cursor-pointer' onClick={toggleForm}> {!isSignInForm ?  "Already registered? Sign In Now." : "New to Netflix? Sign Up Now."} </p>
        </form>
    </div>
  )
}

export default Login