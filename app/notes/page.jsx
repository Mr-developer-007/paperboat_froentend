
"use client";

import NotesCard from "@/components/NotesCard";
import { base_url } from "@/components/utils";
import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";

const Page = () => {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#F7F5F0]">
          Loading...
        </div>
      }
    >
      <Notes />
    </Suspense>
  );
};

export default Page;

// ==========================================
// NOTES COMPONENT
// ==========================================

const Notes = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentPage = Number(searchParams.get("page")) || 1;
  const searchQuery = searchParams.get("search") || "";

  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const [searchInput, setSearchInput] = useState(searchQuery);

  // ==========================================
  // FETCH NOTES
  // ==========================================

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setIsLoading(true);

        const params = new URLSearchParams();

        params.set("page", String(currentPage));

        if (searchQuery.trim()) {
          params.set("search", searchQuery.trim());
        }

        const response = await axios.get(
          `${base_url}/get/allnotes?${params.toString()}`
        );

        const data = response.data;


        setNotes(data.notes || []);
        setTotal(data.total || 0);
        setTotalPages(data.totalPages || 1);
      } catch (error) {
        console.error("Error fetching notes:", error);

        setNotes([]);
        setTotal(0);
        setTotalPages(1);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotes();
  }, [currentPage, searchQuery]);

  // ==========================================
  // SEARCH
  // ==========================================

  const handleSearch = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();

    params.set("page", "1");

    if (searchInput.trim()) {
      params.set("search", searchInput.trim());
    }

    router.push(`/notes?${params.toString()}`);
  };

  // ==========================================
  // CLEAR SEARCH
  // ==========================================

  const clearSearch = () => {
    setSearchInput("");
    router.push("/notes?page=1");
  };

  // ==========================================
  // PAGINATION
  // ==========================================

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;

    const params = new URLSearchParams();

    params.set("page", String(page));

    if (searchQuery.trim()) {
      params.set("search", searchQuery.trim());
    }

    router.push(`/notes?${params.toString()}`);
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (isLoading) {
    return (
      <section className="min-h-screen bg-[#F7F5F0] px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="h-80 animate-pulse rounded-2xl bg-white"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#F7F5F0] py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="mb-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#2F6F5C]">
            Paper Boat Learning Hub
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-[#1A2420] sm:text-4xl">
            Study Notes
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-7 text-[#68746E] sm:text-base">
            Explore useful study materials and professional learning
            resources for Level Up.
          </p>

          <p className="mt-4 text-sm text-[#68746E]">
            Total Notes:{" "}
            <span className="font-semibold text-[#1A2420]">
              {total}
            </span>
          </p>
        </div>

        {/* SEARCH */}
        <form
          onSubmit={handleSearch}
          className="mb-10 flex flex-col gap-3 sm:flex-row"
        >
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search notes by title..."
            className="w-full flex-1 rounded-xl border border-[#DDE2DC] bg-white px-5 py-4 text-sm text-[#1A2420] outline-none transition focus:border-[#2F6F5C] focus:ring-2 focus:ring-[#2F6F5C]/10"
          />

          <button
            type="submit"
            className="rounded-xl bg-[#2F6F5C] px-7 py-4 text-sm font-semibold text-white transition hover:bg-[#245746]"
          >
            Search
          </button>

          {searchQuery && (
            <button
              type="button"
              onClick={clearSearch}
              className="rounded-xl border border-[#DDE2DC] bg-white px-6 py-4 text-sm font-semibold text-[#1A2420] transition hover:bg-[#F0F2ED]"
            >
              Clear
            </button>
          )}
        </form>

        {/* NOTES */}
        {notes.length === 0 ? (
          <div className="rounded-2xl border border-[#E1E5DF] bg-white px-6 py-20 text-center">
            <h2 className="text-xl font-semibold text-[#1A2420]">
              No notes found
            </h2>

            <p className="mt-2 text-sm text-[#68746E]">
              Try searching with a different title.
            </p>

            {searchQuery && (
              <button
                onClick={clearSearch}
                className="mt-6 rounded-xl bg-[#2F6F5C] px-6 py-3 text-sm font-semibold text-white"
              >
                View All Notes
              </button>
            )}
          </div>
        ) : (
          <>
            {/* NOTES GRID */}
            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {notes.map((note) => (
                <NotesCard
                  key={note._id}
                  notes={note}
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
                    disabled={currentPage === 1}
                    onClick={() => goToPage(currentPage - 1)}
                    className="rounded-xl border border-[#DDE2DC] bg-white px-5 py-3 text-sm font-semibold text-[#1A2420] transition hover:bg-[#F0F2ED] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Previous
                  </button>

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => goToPage(currentPage + 1)}
                    className="rounded-xl bg-[#2F6F5C] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#245746] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Next
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