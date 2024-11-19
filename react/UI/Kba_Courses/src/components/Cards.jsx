import React, { useState } from 'react' 
import rp from '../assets/images/rp.png'
import { Link } from 'react-router-dom'


export const Cards = ({ course}) => {

  const [likes,setlikes] = useState(0)
  const [showFullDescription,setshowFullDescription] = useState(false)
  const getDescription =() => {
    const maxLength = 100
    if(showFullDescription || course.description <= maxLength){
      return course.description
    }else{
      return course.description.substring(0,maxLength)+'...'
    }
  }

  return (
        <div className=' bg-purple-100  rounded-md shadow-2xl flex flex-col items-center justify-center mx-5 my-5 py-10'>
            <h2 className=' font-bold text-lg text-purple-900 '>{course.title}</h2>
            <img alt="course thumbnail" className='w-80 h-40 ' src={rp}/>

            <p className='text-black group-hover:text-white my-2 mx-5'>{getDescription()} </p>
            {course.description.length > 100 &&(
              <button
              className='text-blue-500 hover:undrline mt-2'
              onClick={() => setshowFullDescription(!showFullDescription)
              }>{showFullDescription ? 'show less': 'show more'}
              </button>
            )}
            <div className='flex space-x-2 mt-4'>
              <button className='px-4 py-2 bg-purple-600 text-white hover:bg-purple-800' onClick={()=>setlikes(likes+1)}>Like:{likes}</button>
            </div>

            <Link to={`/CoursePage/${course.courseId}`} className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 self-start mx-5">Learn More</Link>
        </div>
  )
}