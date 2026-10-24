"use client"

import { editor_url } from '@/components/utils';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Eye, 
  Tag, 
  ChevronLeft, 
  Image as ImageIcon,
  CircleDashed,
  AlertCircle
} from 'lucide-react';





const ArticlePage = () => {
  const { slug } = useParams();
  const router = useRouter();
  
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchArticle = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${editor_url}/article/article/${slug}`);
      const data = response.data;
      
      if (data.success && data.article) {
        setArticle(data.article);
      } else {
        setError("Article not found.");
      }
    } catch (error) {
      console.error("Error fetching article:", error);
      setError("An error occurred while fetching the article.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (slug) {
      fetchArticle();
    }
  }, [slug]);

  // Format date helper
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh] text-gray-500">
        <CircleDashed className="animate-spin h-10 w-10 mb-4 text-blue-500" />
        <p>Loading article...</p>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="max-w-4xl mx-auto p-6 mt-10">
        <div className="bg-red-50 text-red-600 p-6 rounded-xl border border-red-200 flex flex-col items-center">
          <AlertCircle size={40} className="mb-3" />
          <h2 className="text-xl font-semibold mb-2">Oops!</h2>
          <p>{error || "Could not load the article."}</p>
          <button 
            onClick={() => router.back()}
            className="mt-6 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="max-w-4xl mx-auto p-6 pb-20 w-full">
      {/* Back Button */}
      <button 
        onClick={() => router.back()}
        className="flex items-center text-gray-500 hover:text-gray-900 transition-colors mb-8 group"
      >
        <ChevronLeft size={20} className="mr-1 group-hover:-translate-x-1 transition-transform" />
        Back to articles
      </button>

      <article className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Featured Image */}
        {article.featuredImage ? (
          <div className="w-full h-[400px] relative">
            <img 
              src={article.featuredImage} 
              alt={article.title} 
              className="w-full h-full object-cover"
            />
            {/* Status Badge Over Image */}
            <div className="absolute top-4 right-4">
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm ${
                article.status === 'published' ? 'bg-green-500 text-white' : 'bg-gray-800 text-white'
              }`}>
                {article.status}
              </span>
            </div>
          </div>
        ) : (
          <div className="w-full h-64 bg-gray-100 flex items-center justify-center text-gray-400">
            <ImageIcon size={48} />
          </div>
        )}

        <div className="p-8 md:p-12">
          {/* Header Metadata */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6 border-b border-gray-100 pb-6">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-600 font-medium text-xs">
              {article.category}
            </span>
            <div className="flex items-center gap-1.5">
              <Calendar size={16} />
              {formatDate(article.createdAt)}
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={16} />
              {article.readingTime} min read
            </div>
            <div className="flex items-center gap-1.5">
              <Eye size={16} />
              {article.views} views
            </div>
          </div>

          {/* Title & Main Description */}
          <h1 className="text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
            {article.title}
          </h1>
          <p className="text-xl text-gray-600 mb-10 leading-relaxed font-light">
            {article.description}
          </p>

          {/* Article Sections (fulldis) */}
          <div className="space-y-12">
            {article.fulldis?.map((section) => (
              <section key={section._id} className="prose prose-lg max-w-none prose-blue">
                {section.title && (
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">{section.title}</h3>
                )}
                
                {section.description && (
                  <p className="text-gray-700 whitespace-pre-line mb-6" dangerouslySetInnerHTML={{__html:section.description}}>
                
                  </p>
                )}

             
              </section>
            ))}
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-100">
              <div className="flex items-center gap-2 flex-wrap">
                <Tag size={18} className="text-gray-400 mr-2" />
                {article.tags.map((tag, index) => {
                  // Clean up potential trailing commas from the DB data like "sdm,"
                  const cleanTag = tag.replace(/,$/, '').trim();
                  return cleanTag ? (
                    <span 
                      key={index} 
                      className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-sm transition-colors cursor-default"
                    >
                      #{cleanTag}
                    </span>
                  ) : null;
                })}
              </div>
            </div>
          )}
        </div>
      </article>
    </main>
  );
}

export default ArticlePage;