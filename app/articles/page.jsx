
"use client";

import ArticleCard from "@/components/ArticleCard";
import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { base_url } from "@/components/utils";
import axios from "axios";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

const Page = () => {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          Loading...
        </div>
      }
    >
      <TopArticles />
    </Suspense>
  );
};

export default Page;

// ==========================================
// MAIN ARTICLES COMPONENT
// ==========================================

const TopArticles = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;
  const searchQuery = searchParams.get("search") || "";

  const [articles, setArticles] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const [isLoading, setIsLoading] = useState(true);
  const [searchInput, setSearchInput] = useState(searchQuery);

  // ==========================================
  // FETCH ARTICLES
  // ==========================================

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setIsLoading(true);

        const params = new URLSearchParams();

        params.set("page", String(currentPage));

        if (searchQuery.trim()) {
          params.set("search", searchQuery.trim());
        }

        const response = await axios.get(
          `${base_url}/get/articles?${params.toString()}`
        );

        const data = response.data;

        setArticles(data.articles || data.papers || []);
        setTotal(data.total || 0);
        setTotalPages(data.totalPages || 1);
      } catch (error) {
        console.error("Error fetching articles:", error);

        setArticles([]);
        setTotal(0);
        setTotalPages(1);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, [currentPage, searchQuery]);

  // ==========================================
  // SEARCH
  // ==========================================

  const handleSearch = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();

    if (searchInput.trim()) {
      params.set("search", searchInput.trim());
    }

    params.set("page", "1");

    router.push(`/articles?${params.toString()}`);
  };

  // ==========================================
  // PAGINATION
  // ==========================================

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;

    const params = new URLSearchParams();

    params.set("page", String(page));

    if (searchQuery) {
      params.set("search", searchQuery);
    }

    router.push(`/articles?${params.toString()}`);
  };

  // ==========================================
  // LOADING STATE
  // ==========================================

  if (isLoading) {
    return (
      <section className="min-h-screen bg-[#F7F5F0] px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="h-96 animate-pulse rounded-2xl bg-white"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ==========================================
  // UI
  // ==========================================

  return (
    <section className="min-h-screen bg-[#F7F5F0] py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">

          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#2F6F5C]">
              Paper Boat Learning Hub
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-[#1A2420] sm:text-4xl">
              Explore Articles
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-7 text-[#68746E] sm:text-base">
              Discover knowledge, insights, and professional learning
              resources for knowledge.
            </p>
          </div>

          <div className="text-sm text-[#68746E]">
            Total Articles:{" "}
            <span className="font-semibold text-[#1A2420]">
              {total}
            </span>
          </div>
        </div>

        {/* SEARCH */}
        <form
          onSubmit={handleSearch}
          className="mb-10 flex w-full flex-col gap-3 sm:flex-row"
        >
          <div className="relative flex-1">
            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#68746E]"
            />

            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search by title, category or tags..."
              className="w-full rounded-xl border border-[#DDE2DC] bg-white py-4 pl-12 pr-4 text-sm text-[#1A2420] outline-none transition focus:border-[#2F6F5C] focus:ring-2 focus:ring-[#2F6F5C]/10"
            />
          </div>

          <button
            type="submit"
            className="rounded-xl bg-[#2F6F5C] px-7 py-4 text-sm font-semibold text-white transition hover:bg-[#245746]"
          >
            Search
          </button>

          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                setSearchInput("");
                router.push("/articles?page=1");
              }}
              className="rounded-xl border border-[#DDE2DC] bg-white px-5 py-4 text-sm font-semibold text-[#1A2420] hover:bg-[#F0F2ED]"
            >
              Clear
            </button>
          )}
        </form>

        {/* EMPTY STATE */}
        {articles.length === 0 ? (
          <div className="rounded-2xl border border-[#E1E5DF] bg-white px-6 py-20 text-center">
            <h2 className="text-xl font-semibold text-[#1A2420]">
              No articles found
            </h2>

            <p className="mt-2 text-sm text-[#68746E]">
              Try searching with a different keyword.
            </p>

            {searchQuery && (
              <button
                onClick={() => {
                  setSearchInput("");
                  router.push("/articles?page=1");
                }}
                className="mt-6 rounded-xl bg-[#2F6F5C] px-6 py-3 text-sm font-semibold text-white"
              >
                View All Articles
              </button>
            )}
          </div>
        ) : (
          <>
            {/* ARTICLES GRID */}
            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <ArticleCard
                  key={article._id}
                  article={article}
                />
              ))}
            </div>

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div className="mt-14 flex flex-col items-center justify-between gap-5 border-t border-[#DDE2DC] pt-8 sm:flex-row">

                <p className="text-sm text-[#68746E]">
                  Page{" "}
                  <span className="font-semibold text-[#1A2420]">
                    {currentPage}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-[#1A2420]">
                    {totalPages}
                  </span>
                </p>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="flex items-center gap-2 rounded-xl border border-[#DDE2DC] bg-white px-4 py-3 text-sm font-semibold text-[#1A2420] transition hover:bg-[#F0F2ED] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ChevronLeft size={17} />
                    Previous
                  </button>

                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-2 rounded-xl bg-[#2F6F5C] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#245746] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Next
                    <ChevronRight size={17} />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};