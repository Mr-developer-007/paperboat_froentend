"use client"

import { MapPin } from 'lucide-react'
import Link from 'next/link'
import { useSelector } from 'react-redux'

const StateCompo = () => {

    const {info,isLoading} = useSelector(state=>state.state)
   

 

    return (
        <section className="w-full py-12 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Section Header */}
                <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-xl shadow-sm border border-blue-100">
                        <MapPin size={28} />
                    </div>
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Browse by State</h2>
                        <p className="text-gray-500 mt-1 text-sm md:text-base">
                            Select a state board to find specific question papers
                        </p>
                    </div>
                </div>

                {/* Content Grid */}
                {isLoading ? (
                    /* Loading Skeletons */
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                            <div key={n} className="bg-gray-50 rounded-2xl p-4 flex flex-col items-center border border-gray-100 animate-pulse">
                                <div className="w-20 h-20 bg-gray-200 rounded-full mb-4"></div>
                                <div className="h-4 w-24 bg-gray-200 rounded-md"></div>
                            </div>
                        ))}
                    </div>
                ) : info.length > 0 ? (
                    /* State Cards Grid */
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                        {info.map((item) => (
                            <Link 
                                href={`/paper?state=${item._id}`} // Example: /states/andhra-pradesh
                                key={item._id}
                                className="group bg-white rounded-2xl p-5 flex flex-col items-center border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-300 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                            >
                                {/* State Image */}
                                <div className="">
                                    <img 
                                        src={`${item.image}`} // Adjust to match your static folder route
                                        alt={item.state}
                                        className="h-20 "
                                        onError={(e) => {
                                            e.target.src = 'https://via.placeholder.com/150?text=State'
                                        }}
                                    />
                                </div>
                                
                                {/* Formatted State Name */}
                                <h3 className="font-semibold text-gray-800 text-center text-sm md:text-base group-hover:text-blue-600 transition-colors capitalize">
                                    {item.state}
                                </h3>
                            </Link>
                        ))}
                    </div>
                ) : (
                    /* Empty State */
                    <div className="py-12 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                        <MapPin className="mx-auto text-gray-400 mb-3" size={32} />
                        <p className="text-gray-500 font-medium">No states available right now.</p>
                    </div>
                )}
            </div>
        </section>
    )
}

export default StateCompo