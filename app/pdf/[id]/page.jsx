"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { base_url } from "@/components/utils";
import {
  ArrowLeft,
  Calendar,
  Eye,
  FileText,
  User,
  ExternalLink,
  Share2,
} from "lucide-react";
import { toast } from "react-toastify";

// IMPORTANT
// react-pdf is loaded ONLY on browser
const PdfViewer = dynamic(
  () => import("./PdfViewer"),
  {
    ssr: false,
    loading: () => (
      <div className="flex min-h-[700px] items-center justify-center bg-gray-100">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-black" />

          <p className="text-sm text-gray-500">
            Loading PDF viewer...
          </p>
        </div>
      </div>
    ),
  }
);

const Page = () => {
  const { id } = useParams();
  const router = useRouter();

  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchNotesData = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${base_url}/get/notes/${id}`
      );

     

      if (response.data?.success) {
        setNote(response.data.notes);
      } else {
        toast.error("Notes not found");
      }
    } catch (error) {
      console.error("Fetch notes error:", error);

      toast.error(
        error?.response?.data?.message ||
          "Unable to load notes"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchNotesData();
    }
  }, [id]);

  // -------------------------
  // LOADING
  // -------------------------

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-black" />

          <p className="text-sm text-gray-500">
            Loading notes...
          </p>
        </div>
      </main>
    );
  }

  // -------------------------
  // NOT FOUND
  // -------------------------

  if (!note) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
          <div className="mb-4 text-5xl">
            📄
          </div>

          <h1 className="text-xl font-bold">
            Notes not found
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            The notes you are looking for may have been
            removed.
          </p>

          <button
            onClick={() => router.back()}
            className="mt-6 rounded-lg bg-black px-5 py-2.5 text-sm font-semibold text-white hover:bg-gray-800"
          >
            Go Back
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <header className="sticky top-0 z-40 border-b bg-white/95 backdrop-blur">
        <div className="mx-auto max-w-[1500px] px-4 py-4 md:px-6">
          <div className="flex items-center justify-between gap-4">
            
            {/* LEFT */}
            <div className="flex min-w-0 items-center gap-3">
              <button
                onClick={() => router.back()}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border hover:bg-gray-100"
              >
                <ArrowLeft size={19} />
              </button>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <FileText
                    size={18}
                    className="shrink-0"
                  />

                  <h1 className="truncate text-lg font-bold md:text-xl">
                    {note.title}
                  </h1>
                </div>

                <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-gray-500">
                  
                  <span className="flex items-center gap-1">
                    <Eye size={13} />
                    {note.view || 0} views
                  </span>

                  <span className="flex items-center gap-1">
                    <Calendar size={13} />

                    {note.createdAt
                      ? new Date(
                          note.createdAt
                        ).toLocaleDateString()
                      : ""}
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="hidden items-center gap-2 sm:flex">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(
                    window.location.href
                  );

                  toast.success(
                    "Link copied"
                  );
                }}
                className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium hover:bg-gray-100"
              >
                <Share2 size={16} />

                <span className="hidden md:block">
                  Share
                </span>
              </button>

             
            </div>
          </div>
        </div>
      </header>

      {/* ================================================= */}
      {/* MAIN CONTENT */}
      {/* ================================================= */}

      <div className="mx-auto max-w-[1500px] px-3 py-4 md:px-6 md:py-6">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
          
          {/* ================================================= */}
          {/* PDF SECTION */}
          {/* ================================================= */}

          <section className="min-w-0 overflow-hidden rounded-2xl border bg-white shadow-sm">
            
            <PdfViewer
              pdfUrl={note.pdflink}
            />

          </section>

          {/* ================================================= */}
          {/* RIGHT SIDEBAR */}
          {/* ================================================= */}

          <aside className="space-y-5">
            
            {/* ================= AD 1 ================= */}

            <div className="flex h-[250px] items-center justify-center rounded-2xl border bg-white">
              <div className="text-center">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">
                  Advertisement
                </p>

                <p className="mt-2 text-xs text-gray-300">
                  300 × 250
                </p>
              </div>
            </div>

            {/* ================= AUTHOR ================= */}

            <div className="rounded-2xl border bg-white p-5">
              <div className="mb-4 flex items-center gap-2">
                <User size={18} />

                <h2 className="font-bold">
                  Uploaded By
                </h2>
              </div>

              <div className="flex items-center gap-3">
                
                {/* IMAGE */}

                {note.user?.image ? (
                  <img
                    src={note.user.image}
                    alt={
                      note.user?.name ||
                      "User"
                    }
                    className="h-14 w-14 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-lg font-bold">
                    {note.user?.name
                      ?.charAt(0)
                      ?.toUpperCase() || "U"}
                  </div>
                )}

                {/* INFO */}

                <div className="min-w-0">
                  <h3 className="truncate font-semibold">
                    {note.user?.name ||
                      "Unknown User"}
                  </h3>

                  {note.user?.about && (
                    <p className="mt-1 line-clamp-2 text-xs text-gray-500">
                      {note.user.about}
                    </p>
                  )}
                </div>
              </div>

              {/* CONTACT LINKS */}

              {note.user?.contactlinks?.length >
                0 && (
                <div className="mt-5 border-t pt-4">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Contact
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {note.user.contactlinks.map(
                      (link, index) => (
                        <a
                          key={
                            link._id ||
                            index
                          }
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-lg border px-3 py-2 text-xs font-medium hover:bg-gray-50"
                        >
                          {link.icon ||
                            "Link"}
                        </a>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* ================= AD 2 ================= */}

            <div className="flex h-[400px] items-center justify-center rounded-2xl border bg-white">
              <div className="text-center">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">
                  Advertisement
                </p>

                <p className="mt-2 text-xs text-gray-300">
                  300 × 400
                </p>
              </div>
            </div>

            {/* ================= AD 3 ================= */}

            <div className="flex h-[250px] items-center justify-center rounded-2xl border bg-white">
              <div className="text-center">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">
                  Advertisement
                </p>

                <p className="mt-2 text-xs text-gray-300">
                  300 × 250
                </p>
              </div>
            </div>

          </aside>
        </div>
      </div>

      {/* ================================================= */}
      {/* MOBILE SHARE / OPEN */}
      {/* ================================================= */}

      <div className="fixed bottom-4 right-4 z-50 flex gap-2 sm:hidden">
        <button
          onClick={() => {
            navigator.clipboard.writeText(
              window.location.href
            );

            toast.success(
              "Link copied"
            );
          }}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-white shadow-lg"
        >
          <Share2 size={18} />
        </button>

        <a
          href={note.pdflink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-black shadow-lg ring-1 ring-gray-200"
        >
          <ExternalLink size={18} />
        </a>
      </div>
    </main>
  );
};

export default Page;