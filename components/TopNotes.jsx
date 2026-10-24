"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { base_url } from "./utils";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import {
  Eye,
  Calendar,
  User,
  FileText,
  BookOpen,
} from "lucide-react";
import NotesCard from "./NotesCard";



const TopNotes = () => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

 

  // ==============================
  // FETCH NOTES
  // ==============================

  const fetchTopPaper = async () => {
    try {
      const response = await axios.get(`${base_url}/get/notes`);

      setNotes(response.data.notes || response.data || []);
    } catch (error) {
      console.error("Error fetching top papers:", error);
      setNotes([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTopPaper();
  }, []);

  // ==============================
  // OPEN PDF PAGE
  // ==============================

  

  // ==============================
  // LOADING
  // ==============================

  if (isLoading) {
    return (
      <section className="bg-gray-50 py-16">
        <div className="flex justify-center items-center">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin" />
        </div>
      </section>
    );
  }

  // ==============================
  // MAIN
  // ==============================

  return (
    <section className="bg-gray-50 py-14">
      <div className="container mx-auto px-4">

        {/* ================= HEADING ================= */}

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">

          <div>
            <div className="flex items-center gap-2 text-blue-600 mb-2">
              <BookOpen size={18} />

              <span className="text-sm font-semibold uppercase tracking-wider">
                Study Material
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Top Notes
            </h2>

            <p className="text-gray-500 mt-2">
              Read important study notes directly on our website.
            </p>
          </div>

        </div>

        {/* ================= NO NOTES ================= */}

        {notes.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-2xl py-16 text-center">

            <FileText
              size={45}
              className="mx-auto text-gray-300 mb-4"
            />

            <h3 className="text-lg font-semibold text-gray-700">
              No notes available
            </h3>

            <p className="text-gray-400 mt-1">
              New study material will appear here.
            </p>

          </div>
        ) : (

          /* ================= SWIPER ================= */

          <Swiper
            modules={[
              Navigation,
              Pagination,
              Autoplay,
            ]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{
              clickable: true,
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },

              768: {
                slidesPerView: 2,
              },

              1024: {
                slidesPerView: 3,
              },

              1280: {
                slidesPerView: 4,
              },
            }}
            className="pb-12"
          >

            {notes.map((note) => (

              <SwiperSlide key={note._id}>
<NotesCard notes={note} />
                

              </SwiperSlide>

            ))}

          </Swiper>

        )}

      </div>
    </section>
  );
};

export default TopNotes;