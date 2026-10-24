"use client"
import React, { useRef, useState } from 'react'
import { Mail, Lock, Eye, EyeOff, LogIn, Loader2 } from 'lucide-react'
import axios from 'axios'
import { AdminUrl } from '@/app/admin/compo/admin-utils'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [sendOtp, setSendOtp] = useState(false)
  const [otp, setOtp] = useState(new Array(6).fill(""))
  const inputRefs = useRef([])
  const route = useRouter()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const response = await axios.post(`${AdminUrl}/auth/login`, formData)
      const data = response.data
      
      if (data.success) {
        toast.success(data.message)
        setSendOtp(true)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred during login")
    } finally {
      setIsLoading(false)
    }
  }

  const handleOtpSubmit = async (e) => {
    e.preventDefault()
    const fullOtp = otp.join("")
    
    if (fullOtp.length !== 6) {
      toast.warning("Please enter all 6 digits of the OTP")
      return
    }

    setIsLoading(true)
    
    try {
      const response = await axios.post(`${AdminUrl}/auth/verify`, 
        { ...formData, otp: fullOtp },
        { withCredentials: true }
      )
      const data = response.data
      
      if (data.success) {
        toast.success(data.message)
        route.push("/admin")
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid OTP")
    } finally {
      setIsLoading(false)
    }
  }

  const handleOtpChange = (e, index) => {
    const value = e.target.value
    if (isNaN(value)) return // Only allow numbers

    const newOtp = [...otp]
    // Take only the last character in case they type quickly
    newOtp[index] = value.substring(value.length - 1)
    setOtp(newOtp)

    // Move focus to the next input if a number was entered
    if (value && index < 5) {
      inputRefs.current[index + 1].focus()
    }
  }

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus()
    }
  }

  const handleOtpPaste = (e) => {
    e.preventDefault()
    const pasteData = e.clipboardData.getData("text/plain").trim()
    
    // Check if pasted data contains only numbers
    if (!/^\d+$/.test(pasteData)) return 

    const pasteArray = pasteData.slice(0, 6).split("")
    const newOtp = [...otp]
    
    pasteArray.forEach((char, i) => {
      newOtp[i] = char
    })
    
    setOtp(newOtp)

    // Auto-focus the last filled input
    const focusIndex = pasteArray.length < 6 ? pasteArray.length : 5
    inputRefs.current[focusIndex].focus()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      {/* Login Card */}
      <div className="max-w-md w-full bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden">
        
        <div className="p-8 sm:p-10">
          {/* Header & Logo */}
          <div className="text-center mb-8">
            <img 
              src="/Images/logo.webp" 
              alt="Paper Boat Admin" 
              className="h-16 object-contain mx-auto mb-5"
              onError={(e) => { e.target.src = 'https://via.placeholder.com/150x60?text=Paper+Boat' }}
            />
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Admin Portal</h2>
            <p className="text-gray-500 mt-2 text-sm">
              {sendOtp ? "We've sent a code to your email" : "Please sign in to your account"}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={sendOtp ? handleOtpSubmit : handleSubmit} className="space-y-5">
            
            {/* Email Input */}
            <div className={sendOtp ? "hidden" : "block"}>
              <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="email">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required={!sendOtp}
                  disabled={isLoading || sendOtp}
                  value={formData.email}
                  onChange={handleChange}
                  className="block text-black w-full pl-11 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 sm:text-sm transition-all outline-none bg-gray-50/50 focus:bg-white disabled:opacity-60 disabled:cursor-not-allowed"
                  placeholder="admin@paperboat.com"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className={sendOtp ? "hidden" : "block"}>
              <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required={!sendOtp}
                  disabled={isLoading || sendOtp}
                  value={formData.password}
                  onChange={handleChange}
                  className="block text-black  w-full pl-11 pr-11 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 sm:text-sm transition-all outline-none bg-gray-50/50 focus:bg-white disabled:opacity-60 disabled:cursor-not-allowed"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  disabled={isLoading || sendOtp}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* OTP Section */}
            {sendOtp && (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
                  Enter 6-digit OTP
                </label>
                <div className="flex gap-2 justify-between">
                  {otp.map((data, index) => {
                    return (
                      <input
                        key={index}
                        type="text"
                        maxLength={1}
                        value={data}
                        disabled={isLoading}
                        ref={(el) => (inputRefs.current[index] = el)}
                        onChange={(e) => handleOtpChange(e, index)}
                        onKeyDown={(e) => handleOtpKeyDown(e, index)}
                        onPaste={handleOtpPaste}
                        className="w-12  h-14 text-center text-xl font-semibold text-gray-900 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all focus:bg-white focus:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
                      />
                    )
                  })}
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 flex justify-center items-center gap-2 py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:active:scale-100"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : sendOtp ? (
                <Lock className="h-5 w-5" />
              ) : (
                <LogIn className="h-5 w-5" />
              )}
              
              {isLoading 
                ? (sendOtp ? 'Verifying...' : 'Signing In...') 
                : (sendOtp ? 'Verify OTP' : 'Sign In')
              }
            </button>
            
          </form>
        </div>
        
        {/* Footer */}
        <div className="px-8 py-4 bg-gray-50/50 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-400 font-medium">
            &copy; {new Date().getFullYear()} Paper Boat. All rights reserved.
          </p>
        </div>

      </div>
    </div>
  )
}

export default LoginPage