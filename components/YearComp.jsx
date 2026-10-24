"use client"
import React, {  useState } from 'react'
import { Calendar } from 'lucide-react'

// Swiper Imports
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import { useSelector } from 'react-redux'
import Link from 'next/link'

const YearSection = () => {
 
   
    const [activeYear, setActiveYear] = useState('All')
    const {info,isLoading} = useSelector(state=>state.year)

  

    return (
        <section className="w-full py-12 bg-gradient-to-b from-white to-gray-50 border-b border-gray-100 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Section Header */}
                <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl shadow-sm">
                        <Calendar size={28} />
                    </div>
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Browse by Year</h2>
                        <p className="text-gray-500 mt-1 text-sm md:text-base">
                            Select an academic year to filter the previous question papers
                        </p>
                    </div>
                </div>

                {/* Content Area */}
                {isLoading ? (
                    /* Loading Skeleton */
                    <div className="flex gap-3 overflow-hidden">
                        {[1, 2, 3, 4, 5, 6].map((n) => (
                            <div key={n} className="h-12 w-28 shrink-0 bg-gray-200 animate-pulse rounded-xl"></div>
                        ))}
                    </div>
                ) : info.length > 0 ? (
                    /* Swiper Carousel */
                    <div className="relative w-full">
                        <Swiper
                            slidesPerView="auto"
                            spaceBetween={12}
                            freeMode={true}
                            navigation={true} // Adds left/right arrows on desktop
                            modules={[FreeMode, Navigation]}
                            className="w-full !px-1 !py-2" // Added padding so box-shadows aren't clipped
                        >
                            {/* Default "All" Button */}
                            <SwiperSlide className="!w-auto">
                                <button
                                    onClick={() => setActiveYear('All')}
                                    className={`px-6 py-2.5 rounded-xl font-medium transition-all duration-200 whitespace-nowrap ${
                                        activeYear === 'All'
                                            ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200 border-transparent'
                                            : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:border-indigo-300'
                                    }`}
                                >
                                    All Years
                                </button>
                            </SwiperSlide>

                           
                            {info.map((item) => (
                                <SwiperSlide key={item._id} className="!w-auto">
                                    <Link
                                        href={`/paper?year=${item._id}`}
                                        className={`px-6 py-2.5 rounded-xl font-medium transition-all duration-200 whitespace-nowrap ${
                                            activeYear === item.year
                                                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200 border-transparent'
                                                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:border-indigo-300'
                                        }`}
                                    >
                                        {item.year}
                                    </Link>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                ) : (
                   
                    <div className="p-10 text-center bg-white rounded-2xl border border-dashed border-gray-300">
                        <p className="text-gray-500 font-medium text-lg">No years found in the database.</p>
                    </div>
                )}
            </div>
        </section>
    )
}

export default YearSection