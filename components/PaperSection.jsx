"use client";

import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Calendar,
  MapPin,
  Building2,
  Eye,
  FileText,
  RefreshCw,
} from "lucide-react";

import { base_url } from "./utils";
import PaperCard from "./PaperCard";

const PaperSection = () => {
  const searchParams = useSearchParams();

  const [papers, setPapers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPapers = async () => {
    try {
      setIsLoading(true);
      setError("");

      const queryString = searchParams.toString();

      const response = await axios.get(
        `${base_url}/get/papers?${queryString}`
      );

      if (response.data.success) {
        setPapers(response.data.papers || []);
      } else {
        setError("Unable to load papers.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong while loading papers.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPapers();
  }, [searchParams]);

  /* ---------------- Loading ---------------- */

  if (isLoading) {
    return (
      <div className="w-full p-4 md:p-6">
        <div className="flex items-center justify-between mb-8">
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
          <div className="h-8 w-24 bg-gray-200 rounded-full animate-pulse" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {[...Array(9)].map((_, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden"
            >
              <div className="h-52 bg-gray-200 animate-pulse" />

              <div className="p-5 space-y-4">
                <div className="h-5 bg-gray-200 rounded animate-pulse" />

                <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse" />

                <div className="space-y-3 pt-3">
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* ---------------- Error ---------------- */

  if (error) {
    return (
      <div className="w-full flex justify-center p-8">
        <div className="max-w-lg w-full bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold text-red-600 mb-2">
            Failed to Load Papers
          </h3>

          <p className="text-red-500 mb-6">{error}</p>

          <button
            onClick={fetchPapers}
            className="inline-flex items-center gap-2 px-5 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition"
          >
            <RefreshCw size={18} />
            Retry
          </button>
        </div>
      </div>
    );
  }

  /* ---------------- Empty ---------------- */

  if (papers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center">
          <FileText size={48} className="text-gray-400" />
        </div>

        <h3 className="mt-6 text-2xl font-bold text-gray-800">
          No Papers Found
        </h3>

        <p className="mt-2 text-gray-500 max-w-md">
          We couldn't find any papers matching your current filters.
          Try selecting different options.
        </p>
      </div>
    );
  }

  /* ---------------- Data ---------------- */

  return (
    <section className="w-full p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">
            Available Papers
          </h2>

          <p className="text-gray-500 mt-1">
            Browse previous exam papers
          </p>
        </div>

        <div className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-full font-semibold">
          {papers.length} Results
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {papers.map((paper) => (
        <PaperCard  paper={paper} key={paper._id} />
        ))}
      </div>
    </section>
  );
};

export default PaperSection;