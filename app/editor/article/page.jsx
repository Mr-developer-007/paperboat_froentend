"use client"

import { editor_url } from '@/components/utils'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Eye, Edit, Trash2, Image as ImageIcon, CircleDashed, CheckCircle2, View, Delete } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'react-toastify'

axios.defaults.withCredentials = true



const ArticlesPage = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchArticles = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${editor_url}/article/articles`);
      const data = response.data;
      
      if (data.success) {
        setArticles(data.articles);
      } else {
        setError("Failed to load articles.");
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
      setError("An error occurred while fetching the data.");
    } finally {
      setIsLoading(false);
    }
  }

  const handelDelete = async(id)=>{
    setIsLoading(true)
    try {
  const response = await axios.delete(`${editor_url}/article/delete/${id}`);
  const data = await response.data;
  if(data.success){
    fetchArticles()
    toast.success("Article deleted")
  }else{
    toast.error(data.message)
  }

      
    } catch (error) {
         toast.error(error?.response?.data?.message)
 
    }finally{
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchArticles()
  }, [])

  return (
    <div className="p-6 max-w-7xl mx-auto w-full">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Articles Management</h1>
      </div>

      {/* States Handling */}
      {isLoading && (
        <div className="flex justify-center items-center py-20 text-gray-500">
          <CircleDashed className="animate-spin h-8 w-8 mr-2 text-blue-500" />
          Loading articles...
        </div>
      )}

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-200">
          {error}
        </div>
      )}

      {/* Data Table */}
      {!isLoading && !error && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full whitespace-nowrap">
              <thead className="bg-gray-50 border-b border-gray-200 text-left">
                <tr>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Cover</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Title & Slug</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Views</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-sm">
                {articles.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                      No articles found.
                    </td>
                  </tr>
                ) : (
                  articles.map((article) => (
                    <tr key={article._id} className="hover:bg-gray-50 transition-colors duration-200">
                      {/* Image Column */}
                      <td className="px-6 py-4">
                        {article.featuredImage ? (
                          <img 
                            src={article.featuredImage} 
                            alt={article.title} 
                            className="h-12 w-16 object-cover rounded-md border border-gray-200"
                          />
                        ) : (
                          <div className="h-12 w-16 bg-gray-100 rounded-md border border-gray-200 flex items-center justify-center text-gray-400">
                            <ImageIcon size={20} />
                          </div>
                        )}
                      </td>

                      {/* Title & Slug Column */}
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900 mb-1">{article.title}</div>
                        <div className="text-xs text-gray-500">/{article.slug}</div>
                      </td>

                      {/* Category Column */}
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                          {article.category}
                        </span>
                      </td>

                      {/* Status Column */}
                      <td className="px-6 py-4">
                        {article.status.toLowerCase() === 'draft' ? (
                          <span className="inline-flex items-center text-gray-600">
                            <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                            Draft
                          </span>
                        ) : (
                          <span className="inline-flex items-center text-green-600">
                            <CheckCircle2 size={16} className="mr-1.5" />
                            Published
                          </span>
                        )}
                      </td>

                      {/* Views Column */}
                      <td className="px-6 py-4 text-gray-600">
                        <div className="flex items-center">
                          <Eye size={16} className="mr-1.5 text-gray-400" />
                          {article.views}
                        </div>
                      </td>

                      {/* Actions Column */}
                      <td className="px-6 py-4 text-right space-x-3 text-gray-400 flex justify-center">
                        <Link href={`/editor/article/${article.slug}/edit`} className="hover:text-blue-600 transition-colors" title="Edit Article">
                          <Edit size={18} />
                        </Link>
                        <Link href={`/editor/article/${article.slug}`}  className="hover:text-red-600 transition-colors" title="Delete Article">
                          <View size={18} />
                        </Link>
                        <button onClick={()=>handelDelete(article._id)}  className="hover:text-yellow-600 transition-colors" title="Delete Article">
                          <Delete size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default ArticlesPage