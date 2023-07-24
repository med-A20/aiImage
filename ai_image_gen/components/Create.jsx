"use client"
import React, { useState } from 'react'
import axios from 'axios';
import Image from 'next/image';

const Create = () => {
    const [prompt, setPrompt] = useState('');
    const [generating, setGenerating] = useState(false);
    const [url, setUrl] = useState('')

    const imageLoader = () => {
        return url || 'https://placehold.co/600x600'
      }

    const generate = async ()=>{
        setGenerating(prev => !prev)
        // call API to create image with the given prompt and display it in a div element here
        await axios.post("https://dalleimage-pme0.onrender.com/api/v1/dalle", {prompt : prompt}).then(res => {
            setUrl(res.data?.photo);
        }).catch(err => {
            console.error(err)
        })
        setGenerating(prev => !prev)
        setPrompt("")
    }
  return (
    <section className="max-w-7xl mx-auto min-h-fit flex flex-col md:flex-row justify-around items-center">
        {/* generated Image */}
        <div className='order-2 w-[512px] h-[512px]  rounded-lg overflow-hidden'>
            <Image 
            loader={imageLoader}
            src="me.png"
            alt="Picture of the author"
            width={512}
            height={512}
            />
        </div>

        {/* prompt */}
        <div className='w-4/5 md:w-1/2 flex flex-col items-center md:items-start justify-stretch m-2'>
                <label
                    htmlFor={"prompt"}
                    className="block text-xl font-medium text-gray-900"
                >
                    Prompt
                </label>
                <input 
                id="prompt"
                type='text' 
                placeholder='Write you promt' 
                value={prompt}
                required
                className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#6469ff] focus:border-[#6469ff] outline-none block p-3 my-2"
                onChange={(e)=>
                    setPrompt(e.target.value)
                }
                />
                <button 
                type='submit'
                className={`text-white  bg-green-700 font-medium rounded-md text-sm w-2/5 sm:w-3/5 px-5 py-2.5 text-center`}
                onClick={()=>{
                    generate()
                }}
                >
                    {generating ? "Generating ..." : "Generate"}
                </button>
        </div>


  </section>
  )
}

export default Create