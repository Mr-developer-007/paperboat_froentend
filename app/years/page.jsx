"use client"
import Link from 'next/link'
import React from 'react'
import { useSelector } from 'react-redux'

const YearsPage = () => {
  // Pulling 'info' from your Redux store (expecting an array of year objects)
  const { info } = useSelector((state) => state.year)

  // Fallback UI if data is loading or the array is empty
  if (!info || info.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500 text-lg animate-pulse">Loading years...</p>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-8">
        Select a Year
      </h1>

      {/* Grid Layout for the years */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
        {info.map((item) => (
          <Link 
            key={item._id} 
            href={`/paper?year=${item._id}`} 
            className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-200 border border-gray-100 p-6 flex flex-col items-center justify-center cursor-pointer group hover:-translate-y-1"
          >
            {/* The Year */}
            <span className="text-3xl font-black text-gray-700 group-hover:text-blue-600 transition-colors duration-200">
              {item.year}
            </span>
            
            {/* Optional: Truncated DB ID for a cleaner look */}
            <span className="mt-3 text-[10px] text-gray-400 font-mono uppercase tracking-wider">
              ID: {item._id.slice(-6)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default YearsPage