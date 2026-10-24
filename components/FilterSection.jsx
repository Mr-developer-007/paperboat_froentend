"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import {
  Filter,
  Calendar,
  MapPin,
  X,
  RotateCcw,
  ChevronRight,
} from "lucide-react";

const FilterSection = () => {
  const yearData = useSelector((state) => state.year);
  const stateData = useSelector((state) => state.state);

  const searchParams = useSearchParams();

  const stateParam = searchParams.get("state");
  const yearParam = searchParams.get("year");

  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileOpen]);

  const createQueryString = (name, value) => {
    const params = new URLSearchParams(searchParams.toString());

    if (params.get(name) === value) {
      params.delete(name);
    } else {
      params.set(name, value);
    }

    return params.toString();
  };

  const activeCount =
    (stateParam ? 1 : 0) +
    (yearParam ? 1 : 0);

  return (
    <>
      {/* Mobile Filter Button */}

      <button
        onClick={() => setIsMobileOpen(true)}
        className="
        md:hidden
        fixed
        bottom-6
        right-6
        z-40
        h-14
        w-14
        rounded-full
        bg-blue-600
        text-white
        shadow-xl
        hover:scale-110
        active:scale-95
        transition-all
        flex
        items-center
        justify-center
        "
      >
        <div className="relative">
          <Filter size={24} />

          {activeCount > 0 && (
            <span
              className="
              absolute
              -top-2
              -right-2
              bg-red-500
              text-white
              text-[10px]
              min-w-[18px]
              h-[18px]
              rounded-full
              flex
              items-center
              justify-center
              font-bold
              "
            >
              {activeCount}
            </span>
          )}
        </div>
      </button>

      {/* Overlay */}

      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="
          fixed
          inset-0
          bg-black/30
          backdrop-blur-sm
          z-40
          md:hidden
          "
        />
      )}

      {/* Sidebar */}

      <aside
        className={`
          fixed
          left-0
          top-0
          z-50
          h-screen
          w-[20rem]
          bg-white
          border-r
          border-gray-200
          shadow-2xl
          transition-transform
          duration-300
          md:sticky
          md:translate-x-0
          md:shadow-none
          scrolbar
          md:z-10
          ${
            isMobileOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        <div className="h-full scrolbar overflow-y-auto flex flex-col">
          {/* Header */}

          <div className="sticky top-0 bg-white z-10 border-b border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  Filters
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Refine your search
                </p>
              </div>

              <button
                onClick={() => setIsMobileOpen(false)}
                className="
                md:hidden
                p-2
                rounded-lg
                hover:bg-gray-100
                transition
                "
              >
                <X size={20} />
              </button>
            </div>

            {/* Active Filters */}

            {activeCount > 0 && (
              <div className="mt-4 flex items-center justify-between">
                <span
                  className="
                  px-3
                  py-1
                  rounded-full
                  bg-blue-50
                  text-blue-700
                  text-sm
                  font-medium
                  "
                >
                  {activeCount} Active Filter
                  {activeCount > 1 ? "s" : ""}
                </span>

                <Link
                  href="/paper"
                  onClick={() =>
                    setIsMobileOpen(false)
                  }
                  className="
                  flex
                  items-center
                  gap-1
                  text-red-500
                  text-sm
                  font-medium
                  hover:text-red-600
                  "
                >
                  <RotateCcw size={14} />
                  Clear
                </Link>
              </div>
            )}
          </div>

          {/* Content */}

          <div className="flex-1 p-6 space-y-8">
            {/* Year Filter */}

            <div
              className="
              bg-gray-50
              border
              border-gray-100
              rounded-2xl
              p-4
              "
            >
              <div className="flex items-center gap-2 mb-4">
                <Calendar
                  size={18}
                  className="text-blue-600"
                />

                <h3 className="font-semibold text-gray-800">
                  Exam Year
                </h3>
              </div>

              <div className="space-y-2">
                {yearData?.info?.length > 0 ? (
                  yearData.info.map((item) => {
                    const isActive =
                      yearParam === item._id;

                    return (
                      <Link
                        key={item._id}
                        href={`/paper?${createQueryString(
                          "year",
                          item._id
                        )}`}
                        onClick={() =>
                          setIsMobileOpen(false)
                        }
                        className={`
                          flex
                          items-center
                          justify-between
                          px-4
                          py-3
                          rounded-xl
                          transition-all
                          duration-200
                          ${
                            isActive
                              ? `
                                bg-blue-600
                                text-white
                                shadow-md
                              `
                              : `
                                bg-white
                                text-gray-700
                                hover:bg-blue-50
                                hover:text-blue-700
                              `
                          }
                        `}
                      >
                        <span>{item.year}</span>

                        <ChevronRight size={16} />
                      </Link>
                    );
                  })
                ) : (
                  [...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="
                      h-10
                      rounded-xl
                      bg-gray-200
                      animate-pulse
                      "
                    />
                  ))
                )}
              </div>
            </div>

            {/* State Filter */}

            <div
              className="
              bg-gray-50
              border
              border-gray-100
              rounded-2xl
              p-4
              "
            >
              <div className="flex items-center gap-2 mb-4">
                <MapPin
                  size={18}
                  className="text-blue-600"
                />

                <h3 className="font-semibold text-gray-800">
                  State / Region
                </h3>
              </div>

              <div className="space-y-2 max-h-[500px] overflow-y-auto">
                {stateData?.info?.length > 0 ? (
                  stateData.info.map((item) => {
                    const isActive =
                      stateParam === item._id;

                    return (
                      <Link
                        key={item._id}
                        href={`/paper?${createQueryString(
                          "state",
                          item._id
                        )}`}
                        onClick={() =>
                          setIsMobileOpen(false)
                        }
                        className={`
                          flex
                          items-center
                          justify-between
                          px-4
                          py-3
                          rounded-xl
                          transition-all
                          duration-200
                          ${
                            isActive
                              ? `
                                bg-blue-600
                                text-white
                                shadow-md
                              `
                              : `
                                bg-white
                                text-gray-700
                                hover:bg-blue-50
                                hover:text-blue-700
                              `
                          }
                        `}
                      >
                        <span>{item.state}</span>

                        <ChevronRight size={16} />
                      </Link>
                    );
                  })
                ) : (
                  [...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="
                      h-10
                      rounded-xl
                      bg-gray-200
                      animate-pulse
                      "
                    />
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Footer */}

          <div className="border-t border-gray-100 p-5">
            <div
              className="
              bg-gradient-to-r
              from-blue-50
              to-indigo-50
              rounded-xl
              p-4
              "
            >
              <div className="flex items-center gap-2 mb-2">
                <Filter
                  size={18}
                  className="text-blue-600"
                />

                <h4 className="font-semibold text-gray-800">
                  Smart Filters
                </h4>
              </div>

              <p className="text-sm text-gray-600">
                Select year and state filters to
                quickly find the paper you're
                looking for.
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default FilterSection;