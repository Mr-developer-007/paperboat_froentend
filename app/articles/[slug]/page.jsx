"use client";

import { base_url } from "@/components/utils";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Calendar,
  Clock,
  Eye,
  Share2,
  Tag,
  User,
  Book,
} from "lucide-react";

const Page = () => {
  const { slug } = useParams();
  const router = useRouter();

  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCopied, setIsCopied] = useState(false);

  // ==============================
  // FETCH ARTICLE
  // ==============================

  const fetchArticle = async () => {
    try {
      const response = await axios.get(
        `${base_url}/get/article/${slug}`
      );

      setArticle(response.data.article);
    } catch (error) {
      console.error("Error fetching article:", error);
      toast.error("Unable to load article");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (slug) {
      fetchArticle();
    }
  }, [slug]);

  // ==============================
  // SHARE ARTICLE
  // ==============================

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: article.title,
          text: article.description,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(
          window.location.href
        );

        setIsCopied(true);
        toast.success("Article link copied!");

        setTimeout(() => setIsCopied(false), 2000);
      }
    } catch (error) {
      console.log("Share cancelled");
    }
  };

  // ==============================
  // LOADING
  // ==============================

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f8f9fb]">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <div className="animate-pulse space-y-8">
            <div className="h-6 w-32 rounded bg-gray-200" />
            <div className="h-12 max-w-3xl rounded bg-gray-200" />
            <div className="h-6 max-w-2xl rounded bg-gray-200" />
            <div className="h-[400px] rounded-3xl bg-gray-200" />
            <div className="space-y-4">
              <div className="h-5 rounded bg-gray-200" />
              <div className="h-5 rounded bg-gray-200" />
              <div className="h-5 w-3/4 rounded bg-gray-200" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==============================
  // EMPTY STATE
  // ==============================

  if (!article) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#f8f9fb] px-4 text-center">
        <BookOpen className="mb-5 text-5xl text-gray-300" />

        <h1 className="text-2xl font-bold text-gray-900">
          Article Not Found
        </h1>

        <p className="mt-2 text-gray-500">
          The article you're looking for is unavailable.
        </p>

        <button
          onClick={() => router.back()}
          className="mt-6 rounded-full bg-[#1f4d3b] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#163b2d]"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8f9fb]">

      {/* ==============================
          HERO SECTION
      ============================== */}

      <section className="relative overflow-hidden bg-[#142c24]">
        <div className="absolute -right-20 -top-32 h-96 w-96 rounded-full bg-[#426b57]/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">

          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="mb-10 flex items-center gap-2 text-sm font-medium text-gray-300 transition hover:text-white"
          >
            <ArrowLeft />
            Back to Articles
          </button>

          {/* Hero Content */}
          <div className="max-w-4xl">

            {/* Category */}
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-[#b5d6c3] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#183d2d]">
                {article.category}
              </span>

              <span className="flex items-center gap-1.5 text-sm text-gray-300">
                <BookOpen />
                Education & Learning
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-6xl">
              {article.title}
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-3xl text-base leading-8 text-gray-300 sm:text-lg">
              {article.description}
            </p>

            {/* Article Meta */}
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-white/10 pt-6">

              {/* Author */}
              <div className="flex items-center gap-3">
                {article.editor?.profile ? (
                  <img
                    src={article.editor.profile}
                    alt={article.editor.name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#b5d6c3] font-bold uppercase text-[#183d2d]">
                    {article.editor?.name?.charAt(0) || "A"}
                  </div>
                )}

                <div>
                  <p className="text-xs text-gray-400">
                    Written by
                  </p>

                  <p className="text-sm font-semibold text-white">
                    {article.editor?.name || "Admin"}
                  </p>
                </div>
              </div>

              {/* Date */}
              <div className="flex iteCalendarms-center gap-2 text-sm text-gray-300">
                <Calendar />
                {new Date(article.createdAt).toLocaleDateString(
                  "en-IN",
                  {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  }
                )}
              </div>

              {/* Reading Time */}
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Clock />
                {article.readingTime} min read
              </div>

              {/* Views */}
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Eye />
                {article.views || 0} views
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==============================
          MAIN CONTENT
      ============================== */}

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">

          {/* LEFT ARTICLE */}
          <article className="min-w-0">

            {/* Featured Image */}
            <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
              <img
                src={article.featuredImage}
                alt={article.title}
                className="h-auto max-h-[550px] w-full object-cover"
              />
            </div>

            {/* Article Intro */}
            <div className="mt-10 rounded-2xl border border-[#e4e8e5] bg-white p-6 sm:p-8">
              <div className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-[#2f6f5c]">
                <BookOpen />
                Overview
              </div>

              <p className="text-base leading-8 text-gray-600">
                {article.description}
              </p>
            </div>

            {/* Article Sections */}
            <div className="mt-10 space-y-10">

              {article.fulldis?.map((section, index) => (
                <section
                  key={section._id || index}
                  className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8"
                >

                  {/* Section Number */}
                  <div className="mb-5 flex items-center gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e6f0ea] text-sm font-bold text-[#2f6f5c]">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <h2 className="text-xl font-bold leading-snug text-[#1a2420] sm:text-2xl">
                      {section.title}
                    </h2>
                  </div>

                  {/* HTML Description */}
<div
  className="
    article-content
    min-w-0
    max-w-full
    overflow-hidden
    break-words
    [overflow-wrap:anywhere]

    text-[16px]
    leading-[1.9]
    text-gray-600

    [&_p]:mb-5
    [&_p:last-child]:mb-0

    [&_h1]:mb-5
    [&_h1]:mt-8
    [&_h1]:text-2xl
    [&_h1]:font-bold
    [&_h1]:text-[#1a2420]
    [&_h1]:break-words

    [&_h2]:mb-4
    [&_h2]:mt-8
    [&_h2]:text-xl
    [&_h2]:font-bold
    [&_h2]:text-[#1a2420]
    [&_h2]:break-words

    [&_h3]:mb-3
    [&_h3]:mt-6
    [&_h3]:font-bold
    [&_h3]:text-[#1a2420]
    [&_h3]:break-words

    [&_strong]:font-bold
    [&_strong]:text-gray-900

    [&_ul]:mb-5
    [&_ul]:list-disc
    [&_ul]:space-y-2
    [&_ul]:pl-6

    [&_ol]:mb-5
    [&_ol]:list-decimal
    [&_ol]:space-y-2
    [&_ol]:pl-6

    [&_li]:pl-1
    [&_li]:break-words

    [&_a]:font-semibold
    [&_a]:text-[#2f6f5c]
    [&_a]:underline
    [&_a]:break-all

    [&_img]:max-w-full
    [&_img]:h-auto
    [&_table]:block
    [&_table]:max-w-full
    [&_table]:overflow-x-auto

    [&_blockquote]:my-6
    [&_blockquote]:border-l-4
    [&_blockquote]:border-[#2f6f5c]
    [&_blockquote]:bg-[#f3f7f4]
    [&_blockquote]:px-5
    [&_blockquote]:py-4
    [&_blockquote]:italic
  "
  dangerouslySetInnerHTML={{
    __html: section.description || "",
  }}
/>

                </section>
              ))}

            </div>

            {/* Tags */}
            <div className="mt-10 rounded-2xl border border-gray-100 bg-white p-6 sm:p-8">
              <div className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-gray-800">
                <Tag />
                Article Tags
              </div>

              <div className="flex flex-wrap gap-2">
                {article.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-[#eef3ef] px-4 py-2 text-sm font-medium text-[#2f6f5c]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Share */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-[#1f4d3b] p-6 sm:p-8">
              <div>
                <h3 className="text-lg font-bold text-white">
                  Found this helpful?
                </h3>

                <p className="mt-1 text-sm text-gray-300">
                  Share this article with your community.
                </p>
              </div>

              <button
                onClick={handleShare}
                className="flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-[#1f4d3b] transition hover:bg-gray-100"
              >
                <Share2 />
                {isCopied ? "Copied!" : "Share Article"}
              </button>
            </div>

          </article>

          {/* ==============================
              SIDEBAR
          ============================== */}

          <aside className="lg:sticky lg:top-8 lg:self-start">

            <div className="space-y-6">

              {/* Article Information */}
              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">

                <h3 className="mb-6 text-lg font-bold text-[#1a2420]">
                  Article Information
                </h3>

                <div className="space-y-5">

                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-[#eef3ef] p-2.5 text-[#2f6f5c]">
                      <Clock />
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">
                        Reading Time
                      </p>

                      <p className="mt-1 text-sm font-semibold text-gray-900">
                        {article.readingTime} minutes
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-[#eef3ef] p-2.5 text-[#2f6f5c]">
                      <User />
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">
                        Author
                      </p>

                      <p className="mt-1 text-sm font-semibold text-gray-900">
                        {article.editor?.name || "Admin"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-[#eef3ef] p-2.5 text-[#2f6f5c]">
                      <Calendar />
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">
                        Published On
                      </p>

                      <p className="mt-1 text-sm font-semibold text-gray-900">
                        {new Date(article.createdAt).toLocaleDateString(
                          "en-IN",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          }
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-[#eef3ef] p-2.5 text-[#2f6f5c]">
                      <Eye />
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">
                        Views
                      </p>

                      <p className="mt-1 text-sm font-semibold text-gray-900">
                        {article.views || 0}
                      </p>
                    </div>
                  </div>

                </div>
              </div>

              {/* Category Card */}
              <div className="rounded-2xl bg-[#1f4d3b] p-6 text-white">
                <Book className="mb-4 text-3xl text-[#b5d6c3]" />

                <h3 className="text-lg font-bold">
                  Explore More Knowledge
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-300">
                  Discover more educational content, creative
                  learning techniques, and professional insights.
                </p>

                <button
                  onClick={() =>
                    router.push(`/writer/${article?.editor?.username}`)
                  }
                  className="mt-6 flex items-center gap-2 text-sm font-bold text-[#b5d6c3] transition hover:text-white"
                >
                  User
                  <ArrowRight />
                </button>
              </div>

              {/* Share Card */}
              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900">
                  Share This Article
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Help others discover useful learning resources.
                </p>

                <button
                  onClick={handleShare}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                >
                  <Share2 />
                  Share Article
                </button>
              </div>

            </div>
          </aside>

        </div>
      </section>

    </main>
  );
};

export default Page;