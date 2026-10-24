"use client"
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {  AdminUrl } from '../compo/admin-utils'
import { toast } from 'react-toastify'
import { ImageUp, Trash } from 'lucide-react'

const Page = () => {
  const [inputYear, setInputYear] = useState("")
  const [inputState, setInputState] = useState({ stateimage: null, state: "" })
  const [allYear, setAllyear] = useState([])
  const [allStates, setAllStates] = useState([])

  const handleYearInput = async (e) => {
    if (e.key === "Enter") {
      if (inputYear < 1998) return;

      try {
        const response = await axios.post(`${AdminUrl}/year/create`, { year: inputYear })
        if (response.data.success) {
          toast.success(response.data.message)
          setInputYear("")
          setAllyear(prev => ([...prev, response.data.year]))
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "An error occurred")
        setInputYear("")
      }
    }
  }

  const handelSubmitState = async (e) => {
    e.preventDefault()
    try {
      const formdata = new FormData()
      formdata.append("stateimage", inputState.stateimage)
      formdata.append("state", inputState.state)

      const response = await axios.post(`${AdminUrl}/state/create`, formdata)
      toast.success(response.data.message)
      setAllStates(prev => ([...prev, response.data.newState]))
      setInputState({
        stateimage: null,
        state: ""
      })
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred")
    }
  }

  const fetchYear = async () => {
    try {
      const response = await axios.get(`${AdminUrl}/year/get`)
      if (response.data.success) {
        setAllyear(response.data.years)
      }
    } catch (error) {
      setAllyear([])
    }
  }

  const fetchState = async () => {
    try {
      const response = await axios.get(`${AdminUrl}/state/get`)
      setAllStates(response.data.states)
    } catch (error) {
      setAllStates([])
    }
  }

  useEffect(() => {
    fetchYear()
    fetchState()
  }, [])

  const handelDeletyear = async (id) => {
    try {
      if (!id) return
      const response = await axios.delete(`${AdminUrl}/year/delete/${id}`)
      if (response.data.success) {
        toast.success(response.data.message);
        setAllyear(prev => (prev.filter((item) => item._id !== id)))
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred")
    }
  }

  const handelDeletState = async (id) => {
    try {
      if (!id) return
      const response = await axios.delete(`${AdminUrl}/state/delete/${id}`)
      if (response.data.success) {
        toast.success(response.data.message);
        setAllStates(prev => (prev.filter((item) => item._id !== id)))
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred")
    }
  }

  return (
    <div className='max-w-6xl mx-auto p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 items-start'>

      {/* --- YEAR SECTION --- */}
      <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-100'>
        <h2 className='text-xl font-bold text-gray-800 mb-5'>Manage Years</h2>
        
        <div className='mb-6'>
          <input 
            type="number" 
            value={inputYear} 
            onChange={(e) => setInputYear(Number(e.target.value) || "")} 
            onKeyDown={handleYearInput} 
            placeholder='Type year & press Enter (e.g. 2024)' 
            className='w-full text-black px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all'
          />
        </div>

        <div className='flex flex-col gap-3 max-h-[500px] overflow-y-auto pr-2'>
          {allYear.length === 0 && <p className='text-gray-400 text-sm text-center py-4'>No years added yet.</p>}
          
          {allYear.map((item) => (
            <div className='flex items-center justify-between p-3.5 bg-gray-50 border border-gray-100 rounded-lg group hover:bg-white hover:border-gray-200 hover:shadow-sm transition-all' key={item._id}>
              <span className='font-semibold text-gray-700'>{item.year}</span>
              <button 
                onClick={() => handelDeletyear(item._id)}
                className='p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors'
                title="Delete Year"
              >
                <Trash size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* --- STATE SECTION --- */}
      <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-100'>
        <h2 className='text-xl font-bold text-gray-800 mb-5'>Manage States</h2>
        
        <form onSubmit={handelSubmitState} className='mb-8 space-y-4'>
          {/* File Upload Area */}
          <div>
            <label 
              htmlFor="image" 
              className={`flex flex-col justify-center items-center h-32 border-2 border-dashed rounded-xl cursor-pointer transition-all ${
                inputState.stateimage ? 'border-indigo-500 bg-indigo-50/50' : 'border-gray-300 hover:border-indigo-400 hover:bg-gray-50'
              }`}
            >
              <ImageUp className={`mb-2 ${inputState.stateimage ? 'text-indigo-600' : 'text-gray-400'}`} size={28} />
              <span className={`text-sm font-medium ${inputState.stateimage ? 'text-indigo-600' : 'text-gray-500'}`}>
                {inputState.stateimage ? inputState.stateimage.name : 'Click to upload state logo'}
              </span>
            </label>
            <input 
              type="file" 
              required 
              id="image" 
              accept='image/*' 
              className='hidden' 
              onChange={(e) => setInputState(prev => ({ ...prev, stateimage: e.target.files[0] }))} 
            />
          </div>

          {/* State Name & Submit */}
          <div className='flex gap-3'>
            <input 
              type="text" 
              required 
              placeholder='Enter State Name' 
              value={inputState.state} 
              onChange={(e) => setInputState(prev => ({ ...prev, state: e.target.value }))} 
              className='flex-1 text-black px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all'
            />
            <button 
              type='submit'
              className='px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-sm transition-colors'
            >
              Add State
            </button>
          </div>
        </form>

        {/* State Grid */}
        <div className='grid grid-cols-2 sm:grid-cols-3 gap-4 max-h-[400px] overflow-y-auto pr-2'>
          {allStates.length === 0 && <p className='text-gray-400 text-sm text-center col-span-full py-4'>No states added yet.</p>}
          
          {allStates.map((item) => (
            <div key={item._id} className='relative flex flex-col items-center p-4 bg-gray-50 border border-gray-100 rounded-xl group hover:shadow-md transition-all'>
              {/*  */}
              <button 
                onClick={() => handelDeletState(item._id)}
                className='absolute top-2 right-2 p-1.5 bg-white text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md shadow-sm opacity-0 group-hover:opacity-100 transition-all'
                title="Delete State"
              >
                <Trash size={14} />
              </button>

              <div className='w-16 h-16 mb-3 rounded-full overflow-hidden border-2 border-white shadow-sm bg-white flex items-center justify-center'>
                <img 
                  src={`${item.image}`} 
                  alt={item.state} 
                  className='w-full h-full object-cover'
                  onError={(e) => e.target.src = 'https://via.placeholder.com/150'} // Fallback if image fails
                />
              </div>
              <p className='font-semibold text-gray-700 text-sm text-center w-full truncate'>{item.state}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default Page