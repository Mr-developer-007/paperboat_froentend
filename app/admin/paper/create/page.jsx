"use client"
import axios from 'axios'
import React, { useEffect, useState } from 'react'

import { CloudUpload, FileText, Image as ImageIcon, Layers, MapPin, CalendarDays, Award } from 'lucide-react'
import { toast } from 'react-toastify'
import { AdminUrl } from '../../compo/admin-utils'

const CreatePaperPage = () => {
  // Dropdown Data States
  const [allYear, setAllyear] = useState([])
  const [allStates, setAllStates] = useState([])
  const [allExam, setAllExam] = useState([])
  
  // UI States
  const [fetching, setFetching] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  // Form Data State
  const [inputData, setInputData] = useState({
    name: "",
    description: "",
    state: "",
    year: "",
    agency: "",
    thumbnail: null,
    images: [] // Array to hold multiple files
  })

  // Fetch Dropdown Data
  const fetchData = async () => {
    try {
      const [yearRes, stateRes, examRes] = await Promise.all([
        axios.get(`${AdminUrl}/year/get`).catch(() => ({ data: { years: [] } })),
        axios.get(`${AdminUrl}/state/get`).catch(() => ({ data: { states: [] } })),
        axios.get(`${AdminUrl}/exam/get`).catch(() => ({ data: { exam: [] } }))
      ])

      setAllyear(yearRes.data.years || [])
      setAllStates(stateRes.data.states || [])
      setAllExam(examRes.data.exam || [])
    } catch (error) {
      toast.error("Failed to load form data")
    } finally {
      setFetching(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!inputData.thumbnail) return toast.error("Please upload a thumbnail")
    if (!inputData.images || inputData.images.length === 0) return toast.error("Please upload at least one paper image")

    setSubmitting(true)
    
    try {
      const formData = new FormData()
      formData.append("name", inputData.name)
      formData.append("description", inputData.description)
      formData.append("state", inputData.state)
      formData.append("year", inputData.year)
      formData.append("agency", inputData.agency)
      
      // Append single thumbnail
      formData.append("thumbnail", inputData.thumbnail)
      
      // Append multiple images (Multer expects multiple files appended to the same field name)
      Array.from(inputData.images).forEach((file) => {
        formData.append("images", file)
      })

      const response = await axios.post(`${AdminUrl}/paper/create`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      if (response.data.success) {
        toast.success(response.data.message)
        // Reset Form
        setInputData({
          name: "", description: "", state: "", year: "", agency: "", thumbnail: null, images: []
        })
        document.getElementById("thumbnail").value = "";
        document.getElementById("images").value = "";
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create paper")
    } finally {
      setSubmitting(false)
    }
  }

  if (fetching) {
    return <div className="p-8 text-center text-gray-500 animate-pulse">Loading form...</div>
  }

  return (
    <div className='max-w-6xl mx-auto p-4 md:p-6 lg:p-8'>
      
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-3">
          <FileText className="text-indigo-600" />
          Upload Question Paper
        </h1>
        <p className="text-gray-500 mt-2">Add a new previous year question paper to the database.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- LEFT COLUMN: DETAILS --- */}
        <div className="lg:col-span-2 space-y-6 bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Paper Details</h2>

          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Paper Title</label>
            <input 
              type="text" 
              required 
              placeholder="e.g. UPSC Civil Services Prelims 2023 - GS Paper 1" 
              value={inputData.name}   
              onChange={(e) => setInputData(prev => ({ ...prev, name: e.target.value }))}
              className='w-full text-black px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all'
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
            <textarea 
              required 
              rows="4"
              placeholder="Enter instructions, total marks, time duration, etc." 
              value={inputData.description}   
              onChange={(e) => setInputData(prev => ({ ...prev, description: e.target.value }))}
              className='w-full  text-black px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none'
            />
          </div>

          {/* Dropdowns Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Agency */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Award size={16} className="text-amber-500"/> Agency
              </label>
              <select 
                required 
                value={inputData.agency} 
                onChange={(e) => setInputData(prev => ({ ...prev, agency: e.target.value }))}
                className='w-full px-4 text-black py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all uppercase'
              >
                <option value="" disabled>Select Agency</option>
                {allExam.map((item) => <option value={item._id} key={item._id}>{item.name}</option>)}
              </select>
            </div>

            {/* State */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <MapPin size={16} className="text-blue-500"/> State
              </label>
              <select 
                required 
                value={inputData.state} 
                onChange={(e) => setInputData(prev => ({ ...prev, state: e.target.value }))}
                className='w-full text-black px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all capitalize'
              >
                <option value="" disabled>Select State</option>
                {allStates.map((item) => <option value={item._id} key={item._id}>{item.state}</option>)}
              </select>
            </div>

            {/* Year */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <CalendarDays size={16} className="text-emerald-500"/> Year
              </label>
              <select 
                required 
                value={inputData.year} 
                onChange={(e) => setInputData(prev => ({ ...prev, year: e.target.value }))}
                className='w-full text-black px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all'
              >
                <option value="" disabled>Select Year</option>
                {allYear.map((item) => <option value={item._id} key={item._id}>{item.year}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* --- RIGHT COLUMN: MEDIA UPLOADS --- */}
        <div className="space-y-6">
          
          {/* Thumbnail Upload */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <ImageIcon size={20} className="text-indigo-600"/> Cover Thumbnail
            </h3>
            <label 
              htmlFor="thumbnail" 
              className={`flex flex-col items-center justify-center h-40 border-2 border-dashed rounded-xl cursor-pointer transition-all ${
                inputData.thumbnail ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-400 hover:bg-gray-50'
              }`}
            >
              <CloudUpload className={`mb-3 ${inputData.thumbnail ? 'text-indigo-600' : 'text-gray-400'}`} size={36} />
              <span className={`text-sm font-medium px-4 text-center ${inputData.thumbnail ? 'text-indigo-600' : 'text-gray-500'}`}>
                {inputData.thumbnail ? inputData.thumbnail.name : 'Click to Upload Thumbnail'}
              </span>
            </label>
            <input 
              type="file" 
              required 
              id="thumbnail" 
              accept="image/*"
              hidden 
              onChange={(e) => setInputData(prev => ({ ...prev, thumbnail: e.target.files[0] }))} 
            />
          </div>

          {/* Multiple Pages Upload */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Layers size={20} className="text-indigo-600"/> Paper Pages (Images)
            </h3>
            <label 
              htmlFor="images" 
              className={`flex flex-col items-center justify-center h-40 border-2 border-dashed rounded-xl cursor-pointer transition-all ${
                inputData.images?.length > 0 ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-400 hover:bg-gray-50'
              }`}
            >
              <CloudUpload className={`mb-3 ${inputData.images?.length > 0 ? 'text-indigo-600' : 'text-gray-400'}`} size={36} />
              <span className={`text-sm font-medium px-4 text-center ${inputData.images?.length > 0 ? 'text-indigo-600' : 'text-gray-500'}`}>
                {inputData.images?.length > 0 
                  ? `${inputData.images.length} file(s) selected` 
                  : 'Click to Upload Multiple Pages'}
              </span>
            </label>
            <input 
              type="file" 
              multiple 
              required 
              id="images" 
              accept="image/*"
              hidden 
              onChange={(e) => setInputData(prev => ({ ...prev, images: e.target.files }))} 
            />
          </div>

          {/* Submit Button */}
          <button 
            type='submit'
            disabled={submitting}
            className={`w-full py-4 rounded-xl font-bold text-lg shadow-md transition-all ${
              submitting 
                ? 'bg-indigo-400 cursor-not-allowed text-white' 
                : 'bg-indigo-600 hover:bg-indigo-700 hover:-translate-y-1 text-white active:scale-95'
            }`}
          >
            {submitting ? 'Uploading Paper...' : 'Publish Question Paper'}
          </button>
        </div>

      </form>
    </div>
  )
}

export default CreatePaperPage