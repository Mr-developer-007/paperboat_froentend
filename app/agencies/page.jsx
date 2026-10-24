"use client"
import React from 'react'
import { useSelector } from 'react-redux'
import Link from 'next/link'
import { Award, MapPin } from 'lucide-react'

const page = () => {
        const { info, isLoading, isError } = useSelector(state => state.exam)

  return (
    <section className="w-full py-12 bg-gray-50 border-t border-gray-100 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Section Header */}
                <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-amber-100 text-amber-600 rounded-xl shadow-sm border border-amber-200">
                        <Award size={28} />
                    </div>
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Exam Agencies</h2>
                        <p className="text-gray-500 mt-1 text-sm md:text-base">
                            Browse question papers by specific boards and commissions
                        </p>
                    </div>
                </div>

                {/* Content Area */}
                {isLoading ? (
                    /* Loading Skeletons (Kept as a simple row for loading state) */
                    <div className="flex gap-4 md:gap-6 overflow-hidden">
                        {[1, 2, 3, 4, 5].map((n) => (
                            <div key={n} className="min-w-[160px] md:min-w-[200px] bg-white rounded-2xl p-5 flex flex-col items-center border border-gray-200 shadow-sm animate-pulse">
                                <div className="w-20 h-20 bg-gray-200 rounded-full mb-4"></div>
                                <div className="h-5 w-20 bg-gray-200 rounded-md mb-2"></div>
                                <div className="h-3 w-24 bg-gray-200 rounded-md"></div>
                            </div>
                        ))}
                    </div>
                ) : isError ? (
                    /* Error State */
                    <div className="py-12 text-center bg-white rounded-2xl border border-red-200 shadow-sm">
                        <p className="text-red-500 font-medium">Failed to load exam agencies. Please try again later.</p>
                    </div>
                ) : info && info.length > 0 ? (
                    /* Swiper Carousel */
                    <div className="relative w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5">
                       
                            {info.map((exam) => (
                                
                                    <Link 
                                    key={exam._id}
                                        href={`/paper?agency=${exam._id}`} 
                                        className="group h-full bg-white rounded-2xl p-5 flex flex-col items-center border border-gray-200 shadow-sm hover:shadow-lg hover:border-amber-300 hover:-translate-y-1 transition-all duration-300 cursor-pointer text-center"
                                    >
                                        {/* Exam Logo */}
                                        <div className="w-20 h-20 md:w-24 md:h-24 mb-4 rounded-full overflow-hidden bg-white border-4 border-gray-50 group-hover:border-amber-50 transition-colors duration-300 flex items-center justify-center shadow-inner shrink-0">
                                            <img 
                                                src={`${exam.logo}`} 
                                                alt={`${exam.name} logo`}
                                                className="w-full h-full object-contain p-2 group-hover:scale-110 transition-transform duration-500"
                                                onError={(e) => {
                                                    e.target.src = 'https://via.placeholder.com/150?text=Exam'
                                                }}
                                            />
                                        </div>
                                        
                                        {/* Exam Name */}
                                        <h3 className="font-bold text-gray-800 text-base md:text-lg group-hover:text-amber-600 transition-colors uppercase tracking-wide line-clamp-2">
                                            {exam.name}
                                        </h3>

                                        {/* Nested State Display */}
                                        {exam.state && exam.state.state && (
                                            <div className="flex items-center gap-1 mt-auto pt-2 text-gray-500 group-hover:text-gray-700 transition-colors">
                                                <MapPin size={12} className="shrink-0" />
                                                <span className="text-xs font-medium capitalize truncate max-w-[120px]">
                                                    {exam.state.state}
                                                </span>
                                            </div>
                                        )}
                                    </Link>
                             
                            ))}
                    
                    </div>
                ) : (
                    /* Empty State */
                    <div className="py-12 text-center bg-white rounded-2xl border border-dashed border-gray-300 shadow-sm">
                        <Award className="mx-auto text-gray-400 mb-3" size={32} />
                        <p className="text-gray-500 font-medium">No exam agencies available right now.</p>
                    </div>
                )}
            </div>
        </section>
  )
}

export default page
