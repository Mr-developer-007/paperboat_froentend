"use client"
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay,Pagination } from 'swiper/modules';


import React from 'react'

const HeroSection = () => {
const banners=[
  "d1.webp",
  "d2.webp",
  "d3.webp",
]
const banners2=[
  "m1.webp",
  "m2.webp",
  "m3.webp",
]

  return (
    <div>
<div className='hidden md:block'>


       <Swiper
        spaceBetween={30}
        centeredSlides={true}
         loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay,Pagination]}
        className="mySwiper"
      >
{
  banners.map((item,index)=>  <SwiperSlide key={index}>
    <img src={`/Banners/${item}`} alt="" className='h-[40rem] w-full bg-contain' />
    </SwiperSlide>)
}


      </Swiper>
      </div>

<div className=' md:hidden block'>


       <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay,Pagination]}
        className="mySwiper"
      >
{
  banners2.map((item,index)=>  <SwiperSlide key={index}>
    <img src={`/Banners/${item}`} alt="" className='h-[40rem] w-full bg-contain' />
    </SwiperSlide>)
}


      </Swiper>
      </div>

    </div>
  )
}

export default HeroSection
