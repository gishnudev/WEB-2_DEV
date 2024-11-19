import { useState } from "react";

const Card = ({customClasses}) => {
    const[like,setLikes] = useState(0);
    const [titlecolor,setTitleColor] = useState('test-black')

    const toggleTitleColour = ()=>{
        setTitleColor((prevColor)=>
            prevColor === 'text-black' ? 'text-blue-500' : 'text-black'
        )}
        return(
            <div className={`max-w-sm rounded overflow-hidden shadow-lg p6 bg-white ${customClasses}`}>
                <h2 className={`font-bold text-xl mb-2 ${titlecolor}`}>
                    Card Title
                </h2>
                <p className="text-gray-700 text-base">
                    this is same example text in the card
                </p>
                <button className="mt-4 px-4 py-2 bg-purple-600 text white rounded hover:bg-purple-700" onClick={()=>setLikes(like+1)}>
                    Likes:{like}
                </button>
                <button className="mt-4 px-4 py-2 bg-green-600 text white rounded hover:bg-green-700" onClick={toggleTitleColour}>
                    Toggle title Color
                </button>
            </div>
        )
    }

export default Card