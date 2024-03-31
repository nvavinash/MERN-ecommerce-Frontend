import React from 'react'
import './loader.css'; // Import CSS file for styling
import { ITEM_PER_PAGE } from '../../app/constants';

const Loader = () => {
  const repetitions = Array.from({ length: ITEM_PER_PAGE });
  return (
    <>
    <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
        <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {repetitions.map((item)=>(
 <div className="loader-item aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md lg:aspect-none group-hover:opacity-75 lg:h-60">
 {""}
 </div>
          ))}
       
              </div>
              </div>
    </>
  )
}

export default Loader
