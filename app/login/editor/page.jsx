"use client"

import React, { useState } from 'react'
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react'
import axios from 'axios'
import { editor_url } from '@/components/utils'
import { toast } from 'react-toastify'

export default function EditorLogin() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleInput = (e) => {
    const { name, value } = e.target
    setCredentials(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
     
    const response = await axios.post(`${editor_url}/auth/login`,credentials,{
        withCredentials:true
    });
    const data = await response.data;
    if(data.success){
        toast.success(data.message)
      location.href="/editor"
    }

    } catch (error) {
      toast.error( error.response.data.message)
    } finally {
      setIsLoading(false)
    }
  }

  // Classic neomorphism background color
  const bgColor = "bg-[#E0E5EC]"

  return (
    <div className={`min-h-screen flex items-center justify-center ${bgColor} px-4 font-sans`}>
      {/* Neomorphic Card (Extruded) */}
      <div className={`max-w-md w-full ${bgColor} rounded-[30px] p-10 shadow-[12px_12px_24px_#a3b1c6,-12px_-12px_24px_#ffffff]`}>
        
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-2xl font-bold text-gray-700 tracking-wide">
            PaperBoat
          </h1>
          <p className="text-gray-500 mt-2 text-sm font-medium">
            Editor Portal Login
          </p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Email Input (Sunken) */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-500 px-2">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                name="email"
                required
                value={credentials.email}
                onChange={handleInput}
                className={`block  text-black w-full pl-12 pr-4 py-3.5 ${bgColor} border-none rounded-2xl shadow-[inset_6px_6px_12px_#a3b1c6,inset_-6px_-6px_12px_#ffffff] focus:outline-none text-gray-700 placeholder-gray-400 transition-all`}
                placeholder="editor@paperboat.com"
              />
            </div>
          </div>

          {/* Password Input (Sunken) */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-500 px-2">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={credentials.password}
                onChange={handleInput}
                className={`block text-black w-full pl-12 pr-12 py-3.5 ${bgColor} border-none rounded-2xl shadow-[inset_6px_6px_12px_#a3b1c6,inset_-6px_-6px_12px_#ffffff] focus:outline-none text-gray-700 placeholder-gray-400 transition-all`}
                placeholder="••••••••"
              />
              {/* Toggle Password Visibility */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button (Extruded to Sunken on Click/Hover) */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full mt-4 flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl font-bold text-blue-500 ${bgColor} shadow-[8px_8px_16px_#a3b1c6,-8px_-8px_16px_#ffffff] hover:shadow-[inset_4px_4px_8px_#a3b1c6,inset_-4px_-4px_8px_#ffffff] active:shadow-[inset_6px_6px_12px_#a3b1c6,inset_-6px_-6px_12px_#ffffff] transition-all duration-300 focus:outline-none disabled:opacity-70 disabled:cursor-not-allowed`}
          >
            {isLoading ? (
              <div className="h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <LogIn className="h-5 w-5" />
                Sign In
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}