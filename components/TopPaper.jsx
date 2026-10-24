"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { base_url } from './utils';

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Lucide Icons
import { Eye, Calendar, MapPin, Building2 } from 'lucide-react';
import Link from 'next/link';
import PaperCard from './PaperCard';

const TopPaper = () => {
  const [papers, setPapers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTopPaper = async () => {
    try {
      const response = await axios.get(`${base_url}/get/toppaper`);
      // Assuming your API returns the array directly or inside a data object
      setPapers(response.data.papers || response.data); 
    } catch (error) {
      console.error("Error fetching top papers:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTopPaper();
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-10 flex justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Trending Papers</h2>
            <p className="mt-2 text-sm text-gray-600">The most downloaded question papers right now.</p>
          </div>
        </div>

        {/* Swiper Carousel */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          className="pb-12" // Padding for pagination bullets
        >
          {papers.map((paper) => (
            <SwiperSlide key={paper._id} className="h-auto">
              
           <PaperCard paper={paper} />

            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TopPaper;