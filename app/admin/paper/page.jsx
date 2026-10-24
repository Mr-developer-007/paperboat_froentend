"use client"

import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { AdminUrl } from '../compo/admin-utils' 
import { FileText, Plus, MapPin, CalendarDays, Eye, Trash2, Edit, View } from 'lucide-react'
import { toast } from 'react-toastify'

const Page = () => {
  const [papers, setPapers] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleteId,setDeleteid]=useState()
  const [showDelete,setShowDelete]=useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalPapers, setTotalPapers] = useState(0)

  const fetchData = async (pageNumber = 1) => {
    setLoading(true)
    try {
      const response = await axios.get(`${AdminUrl}/paper/get?page=${pageNumber}`);
      const data = response.data;
      
      if (data.success) {
        setPapers(data.data)
        setCurrentPage(data.page)
        setTotalPages(data.totalPages)
        setTotalPapers(data.totalPaper)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch papers")
      setPapers([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData(currentPage)
  }, [currentPage])

  // Pagination Handlers
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1)
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1)
  }


const handelDelete = async()=>{
  try {
    if(!deleteId) return 

    const response = await axios.delete(`${AdminUrl}/paper/delete/${deleteId}`)
    const data = await response.data;
    if(data.success){
      toast.success(data.message)
      fetchData(currentPage)
      setDeleteid(null),setShowDelete(false)
    }
  } catch (error) {
    toast.error(error.response.data.message)
  }
}


  return (
    <div className='max-w-6xl mx-auto p-4 md:p-6 lg:p-8'>
     
{
  showDelete && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
  <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
    
    <div className="flex gap-4">
      {/* Warning Icon */}
      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:h-10 sm:w-10">
        <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      
      {/* Text Content */}
      <div className="mt-1">
        <h3 className="text-lg font-semibold text-gray-900">Delete paper</h3>
        <p className="mt-2 text-sm text-gray-500">
          Are you sure you want to delete this paper? This action cannot be undone.
        </p>
      </div>
    </div>

    {/* Buttons */}
    <div className="mt-6 flex justify-end gap-3">
      <button onClick={()=>{setDeleteid(null),setShowDelete(false)}} className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm transition-colors hover:bg-gray-50">
        Cancel
      </button>
      <button onClick={handelDelete} className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-red-700">
        Delete
      </button>
    </div>
    
  </div>
</div>
}

      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100'>
        <div>
          <h1 className='text-2xl font-bold text-gray-900 flex items-center gap-3'>
            <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
              <FileText size={24} />
            </div>
            Manage Question Papers
          </h1>
          <p className='text-gray-500 mt-1 text-sm'>
            Showing {papers.length} of {totalPapers} total papers
          </p>
        </div>
        
        <Link 
          href={"/admin/paper/create"}
          className='flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 w-full sm:w-auto justify-center'
        >
          <Plus size={20} />
          Create New Paper
        </Link>
      </div>

      {/* --- PAPER LIST --- */}
      <div className='bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden'>
        
        {loading ? (
          /* Loading Skeletons */
          <div className="divide-y divide-gray-100">
            {[1, 2, 3, 4, 5].map((n) => (
              <div key={n} className="p-5 flex items-center gap-4 animate-pulse">
                <div className="w-20 h-24 bg-gray-200 rounded-xl shrink-0"></div>
                <div className="flex-1 space-y-3">
                  <div className="h-5 w-1/3 bg-gray-200 rounded"></div>
                  <div className="h-4 w-1/4 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : papers.length > 0 ? (
          /* Data Rows */
          <div className="divide-y divide-gray-100">
            {papers.map((paper) => (
              <div key={paper._id} className='p-5 flex flex-col sm:flex-row items-start sm:items-center gap-5 hover:bg-gray-50 transition-colors group'>
                
                {/* Thumbnail */}
                <div className="w-24 h-32 shrink-0 bg-gray-100 rounded-xl overflow-hidden border border-gray-200 flex items-center justify-center relative shadow-sm">
                  <img 
                    src={`${paper.thumbnail}`} 
                    alt={paper.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/150?text=No+Image' }}
                  />
                  {/* Views Badge Over Thumbnail */}
                  <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1">
                    <Eye size={10} />
                    {paper.view}
                  </div>
                </div>

                {/* Info Details */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-gray-900 uppercase tracking-wide truncate mb-2">
                    {paper.name}
                  </h3>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-2">
                    {/* Year Tag */}
                    {paper.year && (
                      <span className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-md font-medium">
                        <CalendarDays size={14} />
                        {paper.year.year}
                      </span>
                    )}
                    
                    {/* State Tag */}
                    {paper.state && (
                      <span className="flex items-center gap-1.5 bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md font-medium capitalize">
                        <MapPin size={14} />
                        {paper.state.state}
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-500 text-sm line-clamp-2 pr-4">
                    {paper.description || "No description provided for this paper."}
                  </p>
                </div>

                {/* Actions (Edit / Delete) */}
                <div className="flex sm:flex-col gap-2 shrink-0 mt-4 sm:mt-0 w-full sm:w-auto">
                  <Link  href={`/admin/paper/${paper.slug}/edit`} className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-2 bg-white border border-gray-200 text-gray-600 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 rounded-lg transition-colors text-sm font-medium">
                    <Edit size={16} />
                    <span className="sm:hidden">Edit</span>
                  </Link>
                  <Link  href={`/admin/paper/${paper.slug}/view`} className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-2 bg-white border border-gray-200 text-gray-600 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 rounded-lg transition-colors text-sm font-medium">
                    <View size={16} />
                   
                    <span className="sm:hidden">View</span>
                  </Link>
                  <button onClick={()=>{setDeleteid(paper._id),setShowDelete(true)}} className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-2 bg-white border border-gray-200 text-gray-600 hover:text-red-600 hover:border-red-200 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium">
                    <Trash2 size={16} />
                    <span className="sm:hidden">Delete</span>
                  </button>
                </div>

              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="py-16 flex flex-col items-center justify-center text-center px-4">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <FileText size={32} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-1">No Papers Found</h3>
            <p className="text-gray-500 mb-6 max-w-sm">You haven't uploaded any question papers yet, or the database is currently empty.</p>
            <Link 
              href={"/admin/paper/create"}
              className='flex items-center gap-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 px-6 py-2.5 rounded-xl font-semibold transition-colors'
            >
              <Plus size={20} />
              Upload First Paper
            </Link>
          </div>
        )}

        {/* --- PAGINATION CONTROLS --- */}
        {!loading && totalPages > 1 && (
          <div className="bg-gray-50 p-4 border-t border-gray-100 flex items-center justify-between">
            <button 
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                currentPage === 1 
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100 shadow-sm'
              }`}
            >
              Previous
            </button>
            
            <span className="text-sm font-medium text-gray-600">
              Page <span className="text-gray-900 font-bold">{currentPage}</span> of {totalPages}
            </span>

            <button 
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                currentPage === totalPages 
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100 shadow-sm'
              }`}
            >
              Next
            </button>
          </div>
        )}

      </div>
    </div>
  )
}

export default Page