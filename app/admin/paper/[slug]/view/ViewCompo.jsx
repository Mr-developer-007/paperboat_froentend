"use client"
import {  AdminUrl } from '@/app/admin/compo/admin-utils'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Eye, CalendarDays, MapPin, Award, FileText, CheckCircle2, XCircle, Layers, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

const ViewCompo = ({ slug }) => {
  const [paper, setPaper] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const fetchView = async (slug) => {
    try {
      setLoading(true)
      const response = await axios.get(`${AdminUrl}/paper/view/${slug}`)
      // Adapt this depending on your exact API response structure (e.g., response.data.paper or response.data.data)
      const fetchedData = response.data.data || response.data.paper || response.data;
      setPaper(fetchedData)
    } catch (error) {
      console.error("Error fetching paper:", error)
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (slug) {
      fetchView(slug)
    }
  }, [slug])

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-4 md:p-6 lg:p-8 animate-pulse space-y-8">
        <div className="h-10 bg-gray-200 w-1/3 rounded-lg"></div>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/3 h-96 bg-gray-200 rounded-2xl"></div>
          <div className="w-full md:w-2/3 space-y-4">
            <div className="h-20 bg-gray-200 rounded-xl"></div>
            <div className="h-40 bg-gray-200 rounded-xl"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !paper) {
    return (
      <div className="max-w-6xl mx-auto p-8 text-center bg-white rounded-2xl border border-red-100 shadow-sm mt-8">
        <XCircle className="mx-auto text-red-400 mb-4" size={48} />
        <h2 className="text-xl font-bold text-gray-800 mb-2">Paper Not Found</h2>
        <p className="text-gray-500 mb-6">We couldn't load the details for this question paper.</p>
        <Link href="/admin/paper" className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center justify-center gap-2">
          <ArrowLeft size={16} /> Back to Papers
        </Link>
      </div>
    )
  }

  return (
    <div className='max-w-6xl mx-auto p-4 md:p-6 lg:p-8'>
      
      {/* --- TOP BAR --- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <Link href="/admin/paper" className="p-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-indigo-600 transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 uppercase tracking-wide">
            {paper.name}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          {/* Status Badge */}
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-bold ${
            paper.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {paper.isActive ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
            {paper.isActive ? 'Active' : 'Inactive'}
          </div>
          {/* Edit Button */}
          <Link 
            href={`/admin/paper/${slug}/edit`}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors"
          >
            Edit Paper
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- LEFT COLUMN: THUMBNAIL --- */}
        <div className="lg:col-span-1">
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 sticky top-6">
            <div className="relative w-full aspect-[3/4] bg-gray-100 rounded-xl overflow-hidden border border-gray-200 shadow-inner">
              <img 
                src={`${paper.thumbnail}`} 
                alt={`${paper.name} Thumbnail`}
                className="w-full h-full object-cover"
                onError={(e) => { e.target.src = 'https://via.placeholder.com/300x400?text=No+Thumbnail' }}
              />
              <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg flex items-center gap-2 text-sm font-bold shadow-lg">
                <Eye size={16} />
                {paper.view} Views
              </div>
            </div>
          </div>
        </div>

        {/* --- RIGHT COLUMN: DETAILS & IMAGES --- */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Details Card */}
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2 border-b pb-3">
              <FileText size={22} className="text-indigo-600" /> Paper Overview
            </h2>

            {/* Metadata Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {/* Agency */}
              {paper.agency && (
                <div className="bg-amber-50 border border-amber-100 p-4 rounded-xl">
                  <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider mb-1 flex items-center gap-1"><Award size={14}/> Agency</p>
                  <p className="font-bold text-gray-900 uppercase">{paper.agency.name}</p>
                </div>
              )}
              {/* Year */}
              {paper.year && (
                <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl">
                  <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-1 flex items-center gap-1"><CalendarDays size={14}/> Year</p>
                  <p className="font-bold text-gray-900">{paper.year.year}</p>
                </div>
              )}
              {/* State */}
              {paper.state && (
                <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl col-span-2 md:col-span-1">
                  <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1 flex items-center gap-1"><MapPin size={14}/> State</p>
                  <p className="font-bold text-gray-900 capitalize">{paper.state.state}</p>
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <p className="text-sm font-semibold text-gray-800 mb-2">Description / Notes</p>
              <div className="bg-gray-50 border border-gray-100 p-4 rounded-xl text-gray-600 whitespace-pre-wrap text-sm leading-relaxed">
                {paper.description || "No description provided for this paper."}
              </div>
            </div>
          </div>

          {/* Paper Pages (Images) Gallery */}
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between border-b pb-3 mb-6">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Layers size={22} className="text-indigo-600" /> Paper Pages
              </h2>
              <span className="text-sm font-bold bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full">
                {paper.images?.length || 0} Pages
              </span>
            </div>

            {paper.images && paper.images.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {paper.images.map((img, index) => (
                  <a 
                    key={index} 
                    href={`${img}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group relative aspect-[3/4] rounded-xl overflow-hidden border border-gray-200 bg-gray-50 shadow-sm cursor-zoom-in block"
                  >
                    <img 
                      src={`${img}`} 
                      alt={`Page ${index + 1}`} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                    <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded">
                      PG {index + 1}
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center border-2 border-dashed border-gray-200 rounded-xl">
                <Layers className="mx-auto text-gray-400 mb-3" size={32} />
                <p className="text-gray-500 font-medium">No inner pages uploaded for this paper.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}

export default ViewCompo