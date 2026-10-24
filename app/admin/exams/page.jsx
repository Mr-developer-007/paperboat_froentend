"use client"
import axios from 'axios'
import { CloudUpload, FileText, Trash } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { AdminUrl } from '../compo/admin-utils' 
import { toast } from 'react-toastify'

const Page = () => {
  const [allStates, setAllStates] = useState([])
  const [allExam, setAllExam] = useState([])
  const [inputData, setInputData] = useState({
    name: "",
    image: null,
    state: ""
  })
  const [loading, setLoading] = useState(true)

  const fetchState = async () => {
    try {
      const response = await axios.get(`${AdminUrl}/state/get`)
   
        setAllStates(response.data.states)
  
    } catch (error) {
      setAllStates([])
    }
  }

  const fetchExam = async () => {
    try {
      const response = await axios.get(`${AdminUrl}/exam/get`)
      if (response.data.success) {
        setAllExam(response.data.exam)
      }
    } catch (error) {
      setAllExam([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchState()
    fetchExam()
  }, [])

  const handelAddexam = async (e) => {
    e.preventDefault()
    try {
      const formdata = new FormData()
      formdata.append("image", inputData.image);
      formdata.append("name", inputData.name);
      formdata.append("state", inputData.state);

      const response = await axios.post(`${AdminUrl}/exam/create`, formdata)
      const data = response.data; // Fixed: no need to await response.data with axios
      
      if (data.success) {
        // Fixed: It was previously pushing to setAllStates instead of setAllExam
        setAllExam(prev => ([...prev, data.exam])) 
        toast.success(data.message)
        setInputData({
          name: "",
          image: null,
          state: ""
        })
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong")
    }
  }

  const handleDeleteExam = async (id) => {
    if (!window.confirm("Are you sure you want to delete this exam?")) return;
    try {
      const response = await axios.delete(`${AdminUrl}/exam/delete/${id}`)
      if (response.data.success) {
        toast.success(response.data.message)
        setAllExam(prev => prev.filter(exam => exam._id !== id))
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete")
    }
  }

  

  return (
    <div className='max-w-7xl mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-3 gap-6 items-start'>
      
      {/* --- ADD EXAM FORM --- */}
      <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-100 lg:col-span-1 sticky top-6'>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-lg">
            <FileText size={24} />
          </div>
          <h2 className='text-xl font-bold text-gray-800'>Add New Exam</h2>
        </div>

        <form onSubmit={handelAddexam} className='space-y-5'>
          
          {/* File Upload Dropzone */}
          <div>
            <label 
              htmlFor="image" 
              className={`flex flex-col items-center justify-center h-36 border-2 border-dashed rounded-xl cursor-pointer transition-all ${
                inputData.image ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-400 hover:bg-gray-50'
              }`}
            >
              <CloudUpload className={`mb-2 ${inputData.image ? 'text-indigo-600' : 'text-gray-400'}`} size={32} />
              <span className={`text-sm font-medium px-4 text-center ${inputData.image ? 'text-indigo-600' : 'text-gray-500'}`}>
                {inputData.image ? inputData.image.name : 'Click to Upload Exam Logo'}
              </span>
            </label>
            <input 
              type="file" 
              required 
              id="image" 
              hidden 
              accept="image/*"
              onChange={(e) => setInputData(prev => ({ ...prev, image: e.target.files[0] }))} 
            />
          </div>

          {/* State Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Select State</label>
            <select 
              required 
              value={inputData.state} 
              onChange={(e) => setInputData(prev => ({ ...prev, state: e.target.value }))}
              className='w-full text-black px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all'
            >
              <option value="" disabled>-- Select a state --</option>
              {allStates.map((item) => (
                <option value={item._id} key={item._id} className="capitalize">{item.state}</option>
              ))}
            </select>
          </div>

          {/* Exam Name Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Exam Name</label>
            <input 
              type="text" 
              required 
              placeholder="e.g. SSC, HAS, UPSC"
              value={inputData.name} 
              onChange={(e) => setInputData(prev => ({ ...prev, name: e.target.value }))}
              className='w-full text-black px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all uppercase'
            />
          </div>

          <button 
            type='submit'
            className='w-full py-3 mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-sm transition-all active:scale-[0.98]'
          >
            Create Exam
          </button>
        </form>
      </div>

      {/* --- EXAM LIST DISPLAY --- */}
      <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-100 lg:col-span-2'>
        <h2 className='text-xl font-bold text-gray-800 mb-6'>Manage Exams</h2>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map(n => (
              <div key={n} className="h-24 bg-gray-100 rounded-xl animate-pulse"></div>
            ))}
          </div>
        ) : allExam.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[600px] overflow-y-auto pr-2">
            {allExam.map((item) => (
              <div key={item._id} className='flex items-center p-4 bg-gray-50 border border-gray-100 rounded-xl group hover:shadow-md hover:border-indigo-100 transition-all'>
                
                {/* Exam Logo */}
                <div className="w-16 h-16 shrink-0 bg-white rounded-lg border border-gray-200 overflow-hidden flex items-center justify-center mr-4">
                  <img 
                    src={`${item.logo}`} 
                    alt={item.name}
                    className="w-full h-full object-cover"
                    onError={(e) => e.target.src = 'https://via.placeholder.com/150'}
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-800 uppercase text-lg truncate">{item.name}</h3>
                  <p className="text-xs text-gray-500 truncate mt-0.5">Views: {item.view || 0}</p>
                </div>

                {/* Actions */}
                <button 
                  onClick={() => handleDeleteExam(item._id)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete Exam"
                >
                  <Trash size={18} />
                </button>

              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center border-2 border-dashed border-gray-200 rounded-xl">
            <p className="text-gray-500 font-medium">No exams created yet.</p>
          </div>
        )}
      </div>

    </div>
  )
}

export default Page