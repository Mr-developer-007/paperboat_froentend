"use client"
import { base_url } from '@/components/utils';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { 
  Calendar, Building2, MapPin, Eye, FileText, 
  ShieldAlert, Share2, Check, ArrowUp 
} from 'lucide-react';

const PaperCompo = ({ slug }) => {
  const [paperData, setPaperData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCopied, setIsCopied] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const fetchPaper = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${base_url}/get/getpaper/${slug}`);
      setPaperData(response.data.paper);
    } catch (error) {
      console.error("Failed to fetch paper:", error);
      setError("Failed to load the paper. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPaper();
    
    // Scroll to top listener
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [slug]);

  // --- Feature: Share Functionality ---
  const handleShare = async () => {
    const shareData = {
      title: paperData?.name,
      text: paperData?.description,
      url: window.location.href,
    };

    if (navigator.share) {
      // Native share sheet on mobile
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      // Fallback: Copy to clipboard on desktop
      navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- Conditional Renders ---
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-t-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="rounded-lg bg-red-50 p-4 text-lg text-red-600 border border-red-200">{error}</p>
      </div>
    );
  }

  if (!paperData) return null;

  return (
    <div className="relative min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto  px-4">
        
        {/* Header Section */}
        <div className="mb-8 overflow-hidden rounded-2xl bg-white p-6 shadow-sm border border-gray-100 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            
            {/* Title & Description */}
            <div className="flex-1">
              <div className="flex items-start justify-between gap-4">
                <h1 className="text-2xl font-bold capitalize text-gray-900 sm:text-3xl">
                  {paperData.name}
                </h1>
                
                {/* Desktop Share Button */}
                <button 
                  onClick={handleShare}
                  className="hidden md:flex flex-shrink-0 items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
                >
                  {isCopied ? <Check className="h-4 w-4 text-green-600" /> : <Share2 className="h-4 w-4" />}
                  {isCopied ? "Copied!" : "Share"}
                </button>
              </div>

              <p className="mt-2 text-gray-600">
                {paperData.description || 'Official question paper for practice and review.'}
              </p>
              
              {/* Meta Tags */}
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 border border-blue-100">
                  <Calendar className="h-4 w-4" />
                  {paperData.year?.year}
                </span>
                {paperData.agency?.name && (
                  <span className="flex items-center gap-1.5 rounded-full bg-purple-50 px-3 py-1 text-sm font-medium text-purple-700 border border-purple-100">
                    <Building2 className="h-4 w-4" />
                    <span className="uppercase">{paperData.agency.name}</span>
                  </span>
                )}
                {paperData.state?.state && (
                  <span className="flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-green-700 border border-green-100">
                    <MapPin className="h-4 w-4" />
                    <span className="capitalize">{paperData.state.state}</span>
                  </span>
                )}
                <span className="flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 border border-gray-200">
                  <Eye className="h-4 w-4" />
                  {paperData.view} Views
                </span>
              </div>

              {/* Mobile Share Button */}
              <button 
                onClick={handleShare}
                className="mt-6 flex w-full md:hidden items-center justify-center gap-2 rounded-lg bg-gray-100 px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
              >
                {isCopied ? <Check className="h-4 w-4 text-green-600" /> : <Share2 className="h-4 w-4" />}
                {isCopied ? "Link Copied!" : "Share Paper"}
              </button>
            </div>

            {/* Thumbnail/Logo */}
            {paperData.agency?.logo && (
              <div className="hidden md:block h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border border-gray-100 bg-white p-2 shadow-sm">
                <img 
                  src={`${paperData.agency.logo}`} 
                  alt={paperData.agency.name}
                  className="h-full w-full object-contain"
                />
              </div>
            )}
          </div>
        </div>

        {/* Protection Warning */}
        <div className="mb-6 flex items-center justify-center gap-2 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800 border border-amber-200">
          <ShieldAlert className="h-4 w-4 flex-shrink-0" />
          <p>This document is protected. Downloading and copying are disabled.</p>
        </div>

        {/* Images Container */}
        <div className="space-y-6 grid gap-4 md:grid-cols-2">
          {paperData.images?.map((imgSrc, index) => (
            <div 
              key={index} 
              className="relative overflow-hidden rounded-xl bg-white shadow-sm border border-gray-200"
            >
              <div className="absolute hidden   top-4 left-4 z-10 md:flex items-center gap-1 rounded-md bg-black/70 px-2 py-1 text-xs font-semibold text-white backdrop-blur-md">
                <FileText className="h-3 w-3" />
                Page {index + 1}
              </div>
              
              <img
                src={`${imgSrc}`}
                alt={`Page ${index + 1} of ${paperData.name}`}
                className="w-full h-auto object-contain pointer-events-none select-none"
                draggable="false"
                onContextMenu={(e) => e.preventDefault()} 
              />
              
              <div className="absolute inset-0 z-20" onContextMenu={(e) => e.preventDefault()}></div>
            </div>
          ))}
        </div>

      </div>

      {/* Floating Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition-all hover:bg-blue-700 hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};

export default PaperCompo;