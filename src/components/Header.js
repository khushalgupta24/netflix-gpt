import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addUser, removeUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { auth } from '../utils/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { LOGO } from '../utils/constants';
import { toggleGPTSearchView } from '../utils/gptSlice';
import { SUPPORTED_LANGUAGES } from '../utils/constants';
import { setSelectedLanguage } from '../utils/langSlice';

const Header = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const handleSignOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
      navigate("/error");
    });
  }
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const {uid, email, displayName} = user;
        dispatch(addUser({uid: uid, email: email, displayName: displayName}));
        navigate("/browse")
      } else {
        dispatch(removeUser())
        navigate("/");
        //This will throw error as navigate cannot be used outside routerProvider
        //Solution1: Use window.location.href

      }
    });

    // Unsubscribe when the component unmounts
    return () => unsubscribe();
  },[])

  const handleGPTSearchClick = () => {
    // Toggle GPT Search
    dispatch(toggleGPTSearchView());
  }

  const changeSelectedLanguage = (e) => {
    dispatch(setSelectedLanguage(e.target.value));
  }

  return (
    <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between align-middle'>
        <img className='w-44' src={LOGO}
        alt='logo'/>
        {user && 
         <div className='flex'>
          {
            showGptSearch &&
            (<select className='m-4' onChange={(e) => changeSelectedLanguage(e)}>
              {
                SUPPORTED_LANGUAGES.map((lang) => (<option key={lang.identifier} value={lang.identifier}>{lang.name}</option>))
              }
            </select>)
          }
          <button className='py-2 px-4 m-4 bg-purple-800 text-white rounded-xl' onClick={handleGPTSearchClick}>{showGptSearch ? "Home" : "GPT Search"}</button>
          <span className='font-bold text-2xl text-white my-auto'>Hi, {user?.displayName}</span>
          <button className=' m-4 px-4 py-2 bg-red-500 rounded-xl cursor-pointer' onClick={handleSignOut}>Sign Out</button>
        </div>
        }
    </div>
  )
}

export default Header