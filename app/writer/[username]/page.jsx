
"use client";

import ArticleCard from "@/components/ArticleCard";
import { base_url } from "@/components/utils";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  ArrowLeft,
  BookOpen,
  CalendarDays,
  Mail,
  UserRound,
} from "lucide-react";

const Page = () => {
  const { username } = useParams();

  const [editor, setEditor] = useState(null);
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchEditor = async () => {
    try {
      setIsLoading(true);

      const response = await axios.get(
        `${base_url}/get/editor/${username}`
      );

      const data = response.data;

      if (data.success) {
        setEditor(data.editor);
        setArticles(data.articles || []);
      }
    } catch (error) {
      console.error("Error fetching editor:", error);

      toast.error(
        error?.response?.data?.message || "Failed to load editor"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (username) {
      fetchEditor();
    }
  }, [username]);

  // ==========================================
  // LOADING
  // ==========================================

  if (isLoading) {
    return (
      <section className="min-h-screen bg-[#F7F5F0] px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="h-64 animate-pulse rounded-3xl bg-[#E6E8E1]" />

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
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

  // ==========================================
  // EMPTY EDITOR
  // ==========================================

  if (!editor) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-[#F7F5F0] px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#1A2420]">
            Editor not found
          </h2>

          <p className="mt-2 text-sm text-[#68746E]">
            The requested editor profile is unavailable.
          </p>
        </div>
      </section>
    );
  }

  // ==========================================
  // UI
  // ==========================================

  return (
    <main className="min-h-screen bg-[#F7F5F0]">

      {/* ==========================================
          PROFILE HERO
      ========================================== */}

      <section className="relative overflow-hidden bg-[#1A2420]">
        {/* Decorative Background */}
        <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#2F6F5C]/30 blur-3xl" />
        <div className="absolute -bottom-40 -left-32 h-80 w-80 rounded-full bg-[#B08D57]/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

          {/* Breadcrumb */}
          <div className="mb-10">
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 text-sm font-medium text-[#D6DED7] transition hover:text-white"
            >
              <ArrowLeft size={17} />
              Back
            </button>
          </div>

          <div className="flex flex-col items-center gap-8 text-center md:flex-row md:items-center md:text-left">

            {/* Profile Image */}
            <div className="flex h-32 w-32 shrink-0 items-center justify-center overflow-hidden rounded-full border-4 border-[#B08D57]/60 bg-[#2F6F5C] shadow-2xl sm:h-40 sm:w-40">
              {editor.profile ? (
                <img
                  src={editor.profile}
                  alt={editor.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <UserRound
                  size={64}
                  strokeWidth={1.3}
                  className="text-white"
                />
              )}
            </div>

            {/* Editor Info */}
            <div className="flex-1">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#B08D57]/30 bg-[#B08D57]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#DCC69D]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#B08D57]" />
                Editor Profile
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                {editor.name}
              </h1>

              <p className="mt-3 text-sm text-[#C5D0C8] sm:text-base">
                @{editor.username}
              </p>

              <div className="mt-6 flex flex-wrap justify-center gap-3 md:justify-start">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-[#D6DED7]">
                  <BookOpen size={16} className="text-[#B08D57]" />
                  {articles.length} Articles
                </div>

                {editor.createdAt && (
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-[#D6DED7]">
                    <CalendarDays size={16} className="text-[#B08D57]" />
                    Joined{" "}
                    {new Date(editor.createdAt).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        year: "numeric",
                      }
                    )}
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==========================================
          MAIN CONTENT
      ========================================== */}

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">

        <div className="grid gap-12 lg:grid-cols-[1fr_320px]">

          {/* ARTICLES */}
          <div>
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#2F6F5C]">
                  Published Knowledge
                </p>

                <h2 className="text-2xl font-bold text-[#1A2420] sm:text-3xl">
                  Articles by {editor.name}
                </h2>
              </div>

              <span className="shrink-0 text-sm text-[#68746E]">
                {articles.length} Results
              </span>
            </div>

            {articles.length === 0 ? (
              <div className="rounded-2xl border border-[#E1E5DF] bg-white px-6 py-20 text-center">
                <BookOpen
                  size={40}
                  className="mx-auto text-[#B08D57]"
                />

                <h3 className="mt-5 text-xl font-semibold text-[#1A2420]">
                  No articles yet
                </h3>

                <p className="mt-2 text-sm text-[#68746E]">
                  This editor has not published any articles.
                </p>
              </div>
            ) : (
              <div className="grid gap-7 sm:grid-cols-2">
                {articles.map((article) => (
                  <ArticleCard
                    key={article._id}
                    article={article}
                  />
                ))}
              </div>
            )}
          </div>

          {/* SIDEBAR */}
          <aside className="space-y-6">

            {/* ABOUT EDITOR */}
            <div className="rounded-2xl border border-[#E1E5DF] bg-white p-6">
              <h3 className="text-lg font-bold text-[#1A2420]">
                About the Editor
              </h3>

              <div className="mt-5 space-y-4">

                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-[#F0F3ED] p-2 text-[#2F6F5C]">
                    <UserRound size={18} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs text-[#68746E]">
                      Full Name
                    </p>

                    <p className="mt-1 break-words text-sm font-semibold text-[#1A2420]">
                      {editor.name}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-[#F0F3ED] p-2 text-[#2F6F5C]">
                    <Mail size={18} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs text-[#68746E]">
                      Email
                    </p>

                    <p className="mt-1 break-all text-sm font-semibold text-[#1A2420]">
                      {editor.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-[#F0F3ED] p-2 text-[#2F6F5C]">
                    <BookOpen size={18} />
                  </div>

                  <div>
                    <p className="text-xs text-[#68746E]">
                      Published Articles
                    </p>

                    <p className="mt-1 text-sm font-semibold text-[#1A2420]">
                      {articles.length}
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* DEVAN CARD */}
            <div className="rounded-2xl bg-[#2F6F5C] p-6 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#DCC69D]">
                DEVAN Community
              </p>

              <h3 className="mt-4 text-xl font-bold leading-snug">
                Learn. Share. Become a Sterilization Champion.
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#D6E2D9]">
                Explore professional insights and learning resources
                from our community.
              </p>
            </div>

          </aside>

        </div>
      </section>

    </main>
  );
};

export default Page;
