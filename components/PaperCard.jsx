import { Building2, Calendar, Eye, MapPin } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

const PaperCard = ({paper}) => {
  return (
      <Link
            key={paper._id}
            href={`/paper/${paper.slug}`}
            className="
              group
              bg-white
              rounded-2xl
              border
              border-gray-200
              overflow-hidden
              hover:border-blue-400
              hover:shadow-xl
              transition-all
              duration-300
              flex
              flex-col
            "
          >
            {/* Thumbnail */}
            <div className="relative h-56 bg-gray-50 border-b border-gray-100 overflow-hidden">
              <img
                src={paper.thumbnail}
                alt={paper.name}
                className="
                  w-full
                  h-full
                  object-contain
                  p-3
                  transition-transform
                  duration-500
                  group-hover:scale-105
                "
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/400x300?text=No+Preview";
                }}
              />

              <div
                className="
                  absolute
                  top-4
                  right-4
                  bg-white
                  shadow-md
                  rounded-full
                  px-3
                  py-1.5
                  flex
                  items-center
                  gap-1
                  text-xs
                  font-semibold
                "
              >
                <Eye size={14} className="text-blue-600" />
                {paper.view || 0}
              </div>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-grow">
              <h3
                className="
                  text-lg
                  font-bold
                  text-gray-800
                  line-clamp-2
                  group-hover:text-blue-600
                  transition-colors
                "
              >
                {paper.name}
              </h3>

              <div className="mt-5 space-y-3">
                {paper.agency && (
                  <div className="flex items-center gap-3 text-gray-600 text-sm">
                    <Building2
                      size={16}
                      className="text-gray-400 flex-shrink-0"
                    />
                    <span>{paper.agency.name}</span>
                  </div>
                )}

                {paper.year && (
                  <div className="flex items-center gap-3 text-gray-600 text-sm">
                    <Calendar
                      size={16}
                      className="text-gray-400 flex-shrink-0"
                    />
                    <span>{paper.year.year}</span>
                  </div>
                )}

                {paper.state && (
                  <div className="flex items-center gap-3 text-gray-600 text-sm">
                    <MapPin
                      size={16}
                      className="text-gray-400 flex-shrink-0"
                    />
                    <span className="capitalize">
                      {paper.state.state}
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-auto pt-6">
                <div
                  className="
                    w-full
                    py-3
                    rounded-xl
                    bg-blue-50
                    text-blue-700
                    text-center
                    font-semibold
                    group-hover:bg-blue-600
                    group-hover:text-white
                    transition-all
                  "
                >
                  View Paper
                </div>
              </div>
            </div>
          </Link>
  )
}

export default PaperCard
