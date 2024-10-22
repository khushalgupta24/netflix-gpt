import React from 'react'
import lang from '../utils/languageConstants'
import { useSelector } from 'react-redux'

const GptSearchBar = () => {

    const selectedLanguage = useSelector(store => store.lang.selectedLanguage);
  return (
    <div className='pt-[8%] flex justify-center'>
        <form className='w-1/2 bg-black grid grid-cols-12'>
            <input type='text' className='p-4 m-4 col-span-9' placeholder={lang[selectedLanguage].gptSearchPlaceholder}/>
            <button className='py-2 px-4 bg-green-400 text-white rounded-lg col-span-3 m-4'>{lang[selectedLanguage].search}</button>
        </form>
    </div>
  )
}

export default GptSearchBar