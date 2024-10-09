import React, { useEffect } from 'react'
import Login from './Login'
import Browse from './Browse'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../utils/firebase'
import { useDispatch } from 'react-redux'
import { addUser, removeUser } from '../utils/userSlice'

const Body = () => {

  const dispatch = useDispatch();
    const appRouter = createBrowserRouter([
        {
            path: '/',
            element: <Login/>
        },
        {
            path: '/browse',
            element: <Browse/>
        }
    ])

    useEffect(()=>{
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const {uid, email, displayName} = user;
          console.log(user, 'when auth state changed');
          dispatch(addUser({uid: uid, email: email, displayName: displayName}));
        } else {
          dispatch(removeUser())
          // navigate("/");
          //This will throw error as navigate cannot be used outside routerProvider
          //Solution1: Use window.location.href

        }
      });  
    },[])

  return (
    <RouterProvider router={appRouter}/>
  )
}

export default Body