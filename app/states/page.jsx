"use client"
import Link from 'next/link'
import React from 'react'
import { useSelector } from 'react-redux'

const StatesPage = () => {
  // Pulling 'info' from your Redux store (now expecting an array)
  const { info } = useSelector((state) => state.state)

  // Fallback UI if data is loading or the array is empty
  if (!info || info.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500 text-lg animate-pulse">Loading states...</p>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-8">
        Explore States
      </h1>

      {/* Grid Layout for mapping over the array */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {info.map((stateItem) => (
          <Link
          href={`/paper?state=${stateItem._id}`} 
            key={stateItem._id} 
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col"
          >
            {/* Image Section */}
            <div className="w-full h-48 relative bg-gray-100">
              <img
                src={stateItem.image}
                alt={`${stateItem.state} landscape`}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Details Section */}
            <div className="p-5 flex flex-col flex-grow">
              <h2 className="text-xl font-bold text-gray-900">
                {stateItem.state}
              </h2>
              
              {/* Optional: Displaying the DB ID for reference */}
              {/* <div className="mt-auto pt-4 text-xs text-gray-400 font-mono">
                ID: {stateItem._id}
              </div> */}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default StatesPage