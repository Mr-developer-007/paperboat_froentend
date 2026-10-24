"use client"
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { 
  Plus, 
  Trash2, 
 
  Link as LinkIcon, 
  Image as ImageIcon,
  User,
  AlignLeft,
  Save,
  ArrowLeft,
  View
} from 'lucide-react'
import { FaInstagramSquare ,FaFacebook} from "react-icons/fa";

import axios from 'axios'
import { AdminUrl } from '../compo/admin-utils'
import Link from 'next/link'

const ProfileFormPage = () => {
  const [data, setData] = useState({
    name: "",
    about: "",
    image: null,
    contactlinks: []
  })

  const [link, setLink] = useState({
    url: "",
    icon: "FaInstagramSquare",
  })

  const [creatNew, setCreateNew] = useState(false)
  const [usersList, setUsersList] = useState([]) // State to hold fetched users

  // Handle adding a new link
  const handleAddLink = () => {
    if (!link.url || !link.icon) {
      toast.error("Please select an icon and provide a URL.")
      return
    }
    
    setData((prev) => ({
      ...prev,
      contactlinks: [...prev.contactlinks, link]
    }))
    
    setLink({ url: "", icon: "FaInstagramSquare" })
    toast.success("Link added!")
  }

  // Handle removing a link
  const handleRemoveLink = (indexToRemove) => {
    setData((prev) => ({
      ...prev,
      contactlinks: prev.contactlinks.filter((_, index) => index !== indexToRemove)
    }))
  }

  // Handle final form submission
  const handleSubmit = async () => {
    // Basic validation
    if (!data.name.trim()) {
      toast.error("Please enter your full name.")
      return
    }

    try {
      const formData = new FormData()
      formData.append("name", data.name)
      formData.append("about", data.about)
      formData.append("image", data.image)
      formData.append("contactlinks", JSON.stringify(data.contactlinks))

      const response = await axios.post(`${AdminUrl}/notes/user/create`, formData)
      toast.success("Profile created successfully!")
      setCreateNew(false)
      fetchUser() // Refresh list after creation
    } catch (error) {
      toast.error("Failed to create profile.")
    }
  }

  // Helper function to render the correct Lucide icon in the list
  const renderIcon = (iconName) => {
    switch (iconName) {
      case 'instagram': return <FaInstagramSquare className="w-5 h-5 text-pink-600" />
      case 'facebook': return <FaFacebook className="w-5 h-5 text-blue-600" />
      default: return <LinkIcon className="w-5 h-5 text-gray-500" />
    }
  }

  const fetchUser = async () => {
    try {
      const response = await axios.get(`${AdminUrl}/notes/users/get`)
      if (response.data && response.data.success) {
        setUsersList(response.data.users)
      }
    } catch (error) {
      console.error("Error fetching users:", error)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <>
      {!creatNew && (
        <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Table Header Section */}
            <div className="bg-gray-900 px-6 py-4 flex justify-between items-center">
              <h1 className="text-xl font-semibold text-white">Users Directory</h1>
              <button
                onClick={() => setCreateNew(true)}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Add New User
              </button>
            </div>

            {/* Table Data Section */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 text-sm uppercase tracking-wider">
                    <th className="px-6 py-4 font-medium">Profile</th>
                    <th className="px-6 py-4 font-medium">Name</th>
                    <th className="px-6 py-4 font-medium">About</th>
                    <th className="px-6 py-4 font-medium">Social Links</th>
                    <th className="px-6 py-4 font-medium">Created At</th>
                    <th className="px-6 py-4 font-medium">View</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {usersList.length > 0 ? (
                    usersList.map((user) => (
                      <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <img 
                            src={user.image} 
                            alt={user.name} 
                            className="w-12 h-12 rounded-full object-cover border border-gray-200"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {user.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                          {user.about || "-"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex gap-2">
                            {user.contactlinks.length > 0 ? (
                              user.contactlinks.map((link) => (
                                <a 
                                  key={link._id} 
                                  href={link.url} 
                                  target="_blank" 
                                  rel="noreferrer"
                                  className="p-1.5 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                                >
                                  {renderIcon(link.icon)}
                                </a>
                              ))
                            ) : (
                              <span className="text-gray-400 text-sm">-</span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <Link href={`/admin/notes-users/${user._id}`}>
                      <View />
                      </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                        No users found. Click "Add New User" to create one.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {creatNew && (
        <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="bg-gray-900 px-6 py-4 flex items-center justify-between">
              <h1 className="text-xl font-semibold text-white">Create Profile</h1>
              <button 
                onClick={() => setCreateNew(false)}
                className="text-gray-300 hover:text-white flex items-center gap-1 text-sm transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" /> Back to List
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Name Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                  <User className="w-4 h-4" /> Full Name
                </label>
                <input
                  type="text"
                  placeholder="e.g., John Doe"
                  value={data.name}
                  onChange={(e) => setData((prev) => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>

              {/* About Textarea */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                  <AlignLeft className="w-4 h-4" /> About You
                </label>
                <textarea
                  rows="4"
                  placeholder="Write a little bit about yourself..."
                  value={data.about}
                  onChange={(e) => setData((prev) => ({ ...prev, about: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-y"
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" /> Profile Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setData((prev) => ({ ...prev, image: e.target.files[0] }))}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all border border-gray-300 rounded-lg"
                />
              </div>

              <hr className="border-gray-100" />

              {/* Add Links Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <LinkIcon className="w-4 h-4" /> Social Links
                </label>

                <div className="flex flex-col sm:flex-row gap-3">
                  <select
                    value={link.icon}
                    onChange={(e) => setLink((prev) => ({ ...prev, icon: e.target.value }))}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                  >
                    <option value="FaInstagramSquare">Instagram</option>
                    <option value="FaFacebook">Facebook</option>
                  </select>

                  <input
                    type="url"
                    placeholder="https://..."
                    value={link.url}
                    onChange={(e) => setLink((prev) => ({ ...prev, url: e.target.value }))}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />

                  <button
                    onClick={handleAddLink}
                    className="flex items-center justify-center gap-2 px-6 py-2 bg-blue-100 text-blue-700 font-medium rounded-lg hover:bg-blue-200 transition-colors cursor-pointer"
                  >
                    <Plus className="w-5 h-5" />
                    Add
                  </button>
                </div>
              </div>

              {/* Display Added Links */}
              {data.contactlinks.length > 0 && (
                <div className="bg-gray-50 rounded-xl border border-gray-200 p-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Added Links</h3>
                  <ul className="space-y-2">
                    {data.contactlinks.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-200 shadow-sm"
                      >
                        <div className="flex items-center gap-3 overflow-hidden">
                          {renderIcon(item.icon)}
                          <span className="text-sm text-gray-600 truncate">{item.url}</span>
                        </div>
                        <button
                          onClick={() => handleRemoveLink(index)}
                          className="text-gray-400 hover:text-red-500 transition-colors p-1 cursor-pointer"
                          title="Remove link"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <hr className="border-gray-100" />

              {/* Submit Action */}
              <div className="pt-2">
                <button
                  onClick={handleSubmit}
                  className="w-full cursor-pointer flex items-center justify-center gap-2 bg-gray-900 text-white font-semibold py-3 px-4 rounded-lg hover:bg-gray-800 focus:ring-4 focus:ring-gray-200 transition-all"
                >
                  <Save className="w-5 h-5" />
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ProfileFormPage