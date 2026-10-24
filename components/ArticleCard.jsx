"use client";

import React from "react";
import { useRouter } from "next/navigation";

const ArticleCard = ({ article }) => {
  const router = useRouter();

  return (
    <div
      onClick={() =>
        router.push(`/articles/${article.slug}`)
      }
      className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 "
    >
      {/* Article Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={article.featuredImage}
          alt={article.title}
          className="h-full w-full object-cover transition-transform duration-500 "
        />

        {/* Category Badge */}
        <div className="absolute left-3 top-3">
          <span className="rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-gray-800 shadow-sm">
            {article.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        {/* Title */}
        <h3 className="line-clamp-2 text-lg font-bold leading-snug text-gray-900 transition-colors ">
          {article.title}
        </h3>

        {/* Description */}
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
          {article.description}
        </p>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between pt-5">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-xs font-bold uppercase text-blue-700">
              {article.editor?.name?.charAt(0) || "A"}
            </div>

            <div>
              <p className="text-xs font-semibold text-gray-800">
                {article.editor?.name || "Admin"}
              </p>

              <p className="text-[11px] text-gray-500">
                {article.createdAt
                  ? new Date(article.createdAt).toLocaleDateString(
                      "en-IN",
                      {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      }
                    )
                  : ""}
              </p>
            </div>
          </div>

          {/* Read More */}
          <span className="text-sm font-semibold text-blue-600 transition-transform group-hover:translate-x-1">
            Read →
          </span>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;