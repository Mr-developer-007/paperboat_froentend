"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { base_url } from "./utils";
import ArticleCard from "./ArticleCard";

const TopArticles = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // ==============================
  // FETCH TOP ARTICLES
  // ==============================

  const fetchTopArticles = async () => {
    try {
      const response = await axios.get(
        `${base_url}/get/toparticles`
      );

      setArticles(
        response.data.articles ||
          response.data ||
          []
      );
    } catch (error) {
      console.error("Error fetching top articles:", error);
      setArticles([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTopArticles();
  }, []);

  // ==============================
  // LOADING
  // ==============================

  if (isLoading) {
    return (
      <div className="flex justify-center py-16">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  // ==============================
  // EMPTY STATE
  // ==============================

  if (!articles.length) {
    return (
      <div className="py-16 text-center text-gray-500">
        No articles found.
      </div>
    );
  }

  return (
    <section className="bg-gray-50 py-14">
      <div className="container mx-auto px-4">

        {/* Section Header */}
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-blue-600">
              Explore Knowledge
            </p>

            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Trending Articles
            </h2>

            <p className="mt-2 text-sm text-gray-600">
              Discover the latest insights, education, and
              creative learning resources.
            </p>
          </div>
        </div>

        {/* Swiper */}
        <Swiper
          modules={[
            Navigation,
            Pagination,
            Autoplay,
          ]}
          spaceBetween={24}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
          className="pb-14"
        >
          {articles.map((article) => (
            <SwiperSlide
              key={article._id}
              className="h-auto"
            >
              <ArticleCard article={article} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TopArticles;