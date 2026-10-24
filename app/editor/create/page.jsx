"use client";

import React, { useState } from "react";
import {
  ImageUp,
  X,
  Plus,
  FileImage,
  Trash2,
  Upload,
  Loader2,
  CheckCircle2,
  FileText,
  Tag,
  Clock3,
  FolderOpen,
  Eye,
  Sparkles,
} from "lucide-react";
import { editor_url } from "@/components/utils";
import { toast } from "react-toastify";
import axios from "axios";
import RichEditor from "../compo/RichEditor";

const ArticleForm = () => {
  const [articleData, setArticleData] = useState({
    title: "",
    description: "",
    tags: [],
    status: "draft",
    readingTime: 0,
    category: "",
    sections: [],
    featuredImage: null,
  });

  const [tag, setTag] = useState("");

  const [sectionData, setSectionData] = useState({
    title: "",
    description: "",
    image: null,
  });

  const [isLoading, setIsLoading] = useState(false);

  /* =========================================================
     ARTICLE INPUT
  ========================================================= */

  const handleInput = (e) => {
    const { name, value } = e.target;

    setArticleData((prev) => ({
      ...prev,
      [name]: name === "readingTime" ? Number(value) : value,
    }));
  };

  /* =========================================================
     TAGS
  ========================================================= */

  const handleAddTag = (e) => {
    if (e.key !== "Enter") return;

    e.preventDefault();

    const trimmedTag = tag.trim();

    if (!trimmedTag) return;

    if (
      articleData.tags.some(
        (item) => item.toLowerCase() === trimmedTag.toLowerCase()
      )
    ) {
      toast.info("Tag already added");
      return;
    }

    setArticleData((prev) => ({
      ...prev,
      tags: [...prev.tags, trimmedTag],
    }));

    setTag("");
  };

  const removeTag = (tagToRemove) => {
    setArticleData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tagToRemove),
    }));
  };

  /* =========================================================
     FEATURED IMAGE
  ========================================================= */

  const handleFeaturedImage = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    setArticleData((prev) => ({
      ...prev,
      featuredImage: file,
    }));
  };

  const removeFeaturedImage = () => {
    setArticleData((prev) => ({
      ...prev,
      featuredImage: null,
    }));
  };

  /* =========================================================
     SECTION
  ========================================================= */

  const handleSectionImage = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    setSectionData((prev) => ({
      ...prev,
      image: file,
    }));
  };

  const handleAddDetails = () => {
    const title = sectionData.title.trim();
    const description = sectionData.description.trim();

    if (!title && !description) {
      toast.warning("Add section title or content first");
      return;
    }

    setArticleData((prev) => ({
      ...prev,
      sections: [
        ...prev.sections,
        {
          ...sectionData,
        },
      ],
    }));

    setSectionData({
      title: "",
      description: "",
      image: null,
    });

    toast.success("Section added");
  };

  const removeSection = (indexToRemove) => {
    setArticleData((prev) => ({
      ...prev,
      sections: prev.sections.filter(
        (_, index) => index !== indexToRemove
      ),
    }));
  };

  /* =========================================================
     RESET FORM
  ========================================================= */

  const resetForm = () => {
    setArticleData({
      title: "",
      description: "",
      tags: [],
      status: "draft",
      readingTime: 0,
      category: "",
      sections: [],
      featuredImage: null,
    });

    setTag("");

    setSectionData({
      title: "",
      description: "",
      image: null,
    });
  };

  /* =========================================================
     SUBMIT
  ========================================================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLoading) return;

    if (!articleData.title.trim()) {
      toast.error("Article title is required");
      return;
    }

    if (!articleData.description.trim()) {
      toast.error("Article description is required");
      return;
    }

    if (!articleData.category.trim()) {
      toast.error("Category is required");
      return;
    }

    try {
      setIsLoading(true);

      const formData = new FormData();

      /* Basic fields */
      formData.append("title", articleData.title);
      formData.append("description", articleData.description);
      formData.append("category", articleData.category);
      formData.append(
        "readingTime",
        String(articleData.readingTime)
      );
      formData.append("status", articleData.status);

      /* Tags */
      formData.append(
        "tags",
        JSON.stringify(articleData.tags)
      );

      /* Featured image */
      if (articleData.featuredImage) {
        formData.append(
          "featuredImage",
          articleData.featuredImage
        );
      }

      /* =====================================================
         SECTION DATA
      ===================================================== */

      let imageNumber = 0;

      const sectionsWithoutImages = articleData.sections.map(
        ({ title, description, image }) => {
          let countImg = null;

          if (image) {
            countImg = imageNumber;
            imageNumber++;
          }

          return {
            title,
            description,
            countImg,
          };
        }
      );

      formData.append(
        "sections",
        JSON.stringify(sectionsWithoutImages)
      );

      /* Section images */
      articleData.sections.forEach((section) => {
        if (section.image) {
          formData.append(
            "sectionImages",
            section.image
          );
        }
      });

      /* =====================================================
         API
      ===================================================== */

      const response = await axios.post(
        `${editor_url}/article/create`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

     

      toast.success("Article created successfully!");

      resetForm();
    } catch (error) {
      console.error("Error creating article:", error);

      toast.error(
        error?.response?.data?.message ||
          "Failed to create article"
      );
    } finally {
      setIsLoading(false);
    }
  };

  /* =========================================================
     UI
  ========================================================= */

  return (
    <div className="relative min-h-screen ">

      {/* =====================================================
          LOADING OVERLAY
      ===================================================== */}

      {isLoading && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-950/50 backdrop-blur-sm">

          <div className="w-[90%] max-w-sm rounded-2xl bg-white p-7 shadow-2xl">

            <div className="flex flex-col items-center text-center">

              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              </div>

              <h3 className="text-lg font-bold text-slate-900">
                Publishing Article
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Uploading your article and images.
                Please don't close this window.
              </p>

              <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                <div className="h-full w-1/2 animate-pulse rounded-full bg-blue-600" />
              </div>

            </div>

          </div>

        </div>
      )}

      {/* =====================================================
          MAIN CONTAINER
      ===================================================== */}

      <div className="mx-auto w-full  px-4 py-6 sm:px-6 lg:px-8">

        {/* ===================================================
            HEADER
        =================================================== */}

        <div className="mb-7">

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

            <div>
              <div className="mb-2 flex items-center gap-2 text-sm font-medium text-blue-600">
                <Sparkles className="h-4 w-4" />
                Content Management
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Create New Article
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Write, organize and publish your article.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 shadow-sm">

              <div
                className={`h-2.5 w-2.5 rounded-full ${
                  articleData.status === "draft"
                    ? "bg-amber-400"
                    : "bg-green-500"
                }`}
              />

              <span className="text-sm font-medium capitalize text-slate-700">
                {articleData.status}
              </span>

            </div>

          </div>

        </div>

        <form onSubmit={handleSubmit}>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_340px]">

            {/* =================================================
                LEFT CONTENT
            ================================================= */}

            <div className="space-y-6">

              {/* =================================================
                  BASIC INFORMATION
              ================================================= */}

              <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">

                <div className="border-b border-slate-100 px-5 py-4 sm:px-6">

                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                      <FileText className="h-5 w-5 text-blue-600" />
                    </div>

                    <div>
                      <h2 className="font-semibold text-slate-900">
                        Article Information
                      </h2>

                      <p className="text-xs text-slate-500">
                        Basic information about your article
                      </p>
                    </div>

                  </div>

                </div>

                <div className="space-y-5 p-5 sm:p-6">

                  {/* Title */}

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Article Title
                      <span className="ml-1 text-red-500">*</span>
                    </label>

                    <input
                      type="text"
                      name="title"
                      placeholder="Enter a compelling article title..."
                      required
                      value={articleData.title}
                      onChange={handleInput}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                    />
                  </div>

                  {/* Description */}

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Description
                      <span className="ml-1 text-red-500">*</span>
                    </label>

                    <textarea
                      name="description"
                      placeholder="Write a short summary of your article..."
                      required
                      rows={4}
                      value={articleData.description}
                      onChange={handleInput}
                      className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                    />
                  </div>

                  {/* Category + Reading */}

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                    <div>
                      <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                        <FolderOpen className="h-4 w-4 text-slate-400" />
                        Category
                        <span className="text-red-500">*</span>
                      </label>

                      <input
                        type="text"
                        name="category"
                        placeholder="Technology"
                        required
                        value={articleData.category}
                        onChange={handleInput}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                      />
                    </div>

                    <div>
                      <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                        <Clock3 className="h-4 w-4 text-slate-400" />
                        Reading Time
                      </label>

                      <div className="relative">

                        <input
                          type="number"
                          name="readingTime"
                          min="0"
                          required
                          value={articleData.readingTime}
                          onChange={handleInput}
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pr-16 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                        />

                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400">
                          minutes
                        </span>

                      </div>

                    </div>

                  </div>

                  {/* Tags */}

                  <div>
                    <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                      <Tag className="h-4 w-4 text-slate-400" />
                      Tags
                    </label>

                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-2 transition focus-within:border-blue-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-500/10">

                      <div className="flex flex-wrap items-center gap-2">

                        {articleData.tags.map((t, index) => (
                          <span
                            key={`${t}-${index}`}
                            className="group flex items-center gap-1.5 rounded-lg border border-blue-100 bg-blue-50 px-2.5 py-1.5 text-xs font-semibold text-blue-700"
                          >
                            #{t}

                            <button
                              type="button"
                              onClick={() => removeTag(t)}
                              className="rounded-md p-0.5 transition hover:bg-blue-100 hover:text-blue-900"
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>

                          </span>
                        ))}

                        <input
                          type="text"
                          placeholder={
                            articleData.tags.length === 0
                              ? "Type a tag and press Enter..."
                              : "Add another tag..."
                          }
                          value={tag}
                          onChange={(e) =>
                            setTag(e.target.value)
                          }
                          onKeyDown={handleAddTag}
                          className="min-w-[180px] flex-1 bg-transparent px-2 py-2 text-sm text-slate-900 outline-none placeholder:text-slate-400"
                        />

                      </div>

                    </div>

                    <p className="mt-2 text-xs text-slate-400">
                      Press Enter after each tag.
                    </p>

                  </div>

                </div>

              </section>

              {/* =================================================
                  CONTENT SECTIONS
              ================================================= */}

              <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">

                <div className="border-b border-slate-100 px-5 py-4 sm:px-6">

                  <div className="flex items-center justify-between gap-4">

                    <div className="flex items-center gap-3">

                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50">
                        <FileText className="h-5 w-5 text-purple-600" />
                      </div>

                      <div>
                        <h2 className="font-semibold text-slate-900">
                          Article Content
                        </h2>

                        <p className="text-xs text-slate-500">
                          Build your article section by section
                        </p>
                      </div>

                    </div>

                    <div className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
                      {articleData.sections.length}{" "}
                      {articleData.sections.length === 1
                        ? "Section"
                        : "Sections"}
                    </div>

                  </div>

                </div>

                <div className="space-y-5 p-5 sm:p-6">

                  {/* Existing Sections */}

                  {articleData.sections.length > 0 && (
                    <div className="space-y-4">

                      {articleData.sections.map((sec, idx) => (
                        <div
                          key={idx}
                          className="group relative overflow-hidden rounded-xl border border-slate-200 bg-slate-50 transition hover:border-slate-300 hover:shadow-sm"
                        >

                          {/* Section number */}

                          <div className="absolute left-0 top-0 flex h-full w-1 bg-blue-500" />

                          <div className="p-4 sm:p-5">

                            <div className="flex items-start gap-4">

                              <div className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-xs font-bold text-slate-500 shadow-sm sm:flex">
                                {String(idx + 1).padStart(2, "0")}
                              </div>

                              <div className="min-w-0 flex-1">

                                <div className="flex items-start justify-between gap-3">

                                  <div>
                                    <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-blue-600">
                                      Section {idx + 1}
                                    </span>

                                    <h3 className="break-words font-bold text-slate-900">
                                      {sec.title ||
                                        "Untitled Section"}
                                    </h3>
                                  </div>

                                  <button
                                    type="button"
                                    onClick={() =>
                                      removeSection(idx)
                                    }
                                    className="shrink-0 rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-500"
                                    title="Remove section"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </button>

                                </div>

                                {sec.description && (
                                  <div
                                    className="prose prose-sm mt-3 max-w-none text-slate-600"
                                    dangerouslySetInnerHTML={{
                                      __html: sec.description,
                                    }}
                                  />
                                )}

                             

                              </div>

                            </div>

                          </div>

                        </div>
                      ))}

                    </div>
                  )}

                  {/* Empty state */}

                  {articleData.sections.length === 0 && (
                    <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-5 py-10 text-center">

                      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm">
                        <FileText className="h-5 w-5 text-slate-400" />
                      </div>

                      <h3 className="text-sm font-semibold text-slate-700">
                        No sections yet
                      </h3>

                      <p className="mx-auto mt-1 max-w-sm text-xs text-slate-400">
                        Add your first content section below.
                      </p>

                    </div>
                  )}

                  {/* =================================================
                      ADD SECTION FORM
                  ================================================= */}

                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 sm:p-5">

                    <div className="mb-4 flex items-center gap-2">

                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-900 text-white">
                        <Plus className="h-4 w-4" />
                      </div>

                      <h3 className="text-sm font-bold text-slate-800">
                        Add New Section
                      </h3>

                    </div>

                    <div className="space-y-4">

                      {/* Section title */}

                      <input
                        type="text"
                        placeholder="Section title / subtitle"
                        value={sectionData.title}
                        onChange={(e) =>
                          setSectionData((prev) => ({
                            ...prev,
                            title: e.target.value,
                          }))
                        }
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                      />

                      {/* Rich editor */}

                      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                        <RichEditor
                          content={sectionData.description}
                          setContent={(data) =>
                            setSectionData((prev) => ({
                              ...prev,
                              description: data,
                            }))
                          }
                        />
                      </div>

                      {/* Image + add */}

                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto]">

                       

                        <button
                          type="button"
                          onClick={handleAddDetails}
                          className="flex min-h-[72px] items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 text-sm font-semibold text-white transition hover:bg-slate-800 active:scale-[0.98]"
                        >
                          <Plus className="h-4 w-4" />
                          Add Section
                        </button>

                      </div>

                    </div>

                  </div>

                </div>

              </section>

            </div>

            {/* =================================================
                RIGHT SIDEBAR
            ================================================= */}

            <aside className="space-y-6">

              {/* Featured Image */}

              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

                <div className="mb-4">

                  <div className="flex items-center gap-2">
                    <ImageUp className="h-4 w-4 text-slate-500" />

                    <h3 className="text-sm font-bold text-slate-800">
                      Featured Image
                    </h3>
                  </div>

                  <p className="mt-1 text-xs text-slate-400">
                    Main image shown with your article.
                  </p>

                </div>

                {articleData.featuredImage ? (
                  <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-slate-100">

                    <img
                      src={URL.createObjectURL(
                        articleData.featuredImage
                      )}
                      alt="Featured preview"
                      className="h-52 w-full object-cover"
                    />

                    <button
                      type="button"
                      onClick={removeFeaturedImage}
                      className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg bg-black/60 text-white backdrop-blur-sm transition hover:bg-red-500"
                    >
                      <X className="h-4 w-4" />
                    </button>

                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 pt-8">

                      <p className="truncate text-xs font-medium text-white">
                        {articleData.featuredImage.name}
                      </p>

                    </div>

                  </div>
                ) : (
                  <label
                    htmlFor="featuredImage"
                    className="group flex h-52 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 transition hover:border-blue-400 hover:bg-blue-50/30"
                  >

                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm transition group-hover:scale-105">
                      <ImageUp className="h-6 w-6 text-slate-400 group-hover:text-blue-500" />
                    </div>

                    <p className="text-sm font-semibold text-slate-700">
                      Upload image
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      PNG, JPG or WEBP
                    </p>

                  </label>
                )}

                <input
                  type="file"
                  hidden
                  id="featuredImage"
                  name="featuredImage"
                  accept="image/*"
                  onChange={handleFeaturedImage}
                />

              </section>

              {/* Article Status */}

              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

                <div className="mb-4">

                  <h3 className="text-sm font-bold text-slate-800">
                    Publishing
                  </h3>

                  <p className="mt-1 text-xs text-slate-400">
                    Choose article status.
                  </p>

                </div>

                <div className="grid grid-cols-2 gap-2">

                  <button
                    type="button"
                    onClick={() =>
                      setArticleData((prev) => ({
                        ...prev,
                        status: "draft",
                      }))
                    }
                    className={`rounded-xl border px-3 py-3 text-left transition ${
                      articleData.status === "draft"
                        ? "border-amber-200 bg-amber-50"
                        : "border-slate-200 bg-white hover:bg-slate-50"
                    }`}
                  >

                    <div className="flex items-center gap-2">

                      <div
                        className={`h-2.5 w-2.5 rounded-full ${
                          articleData.status === "draft"
                            ? "bg-amber-400"
                            : "bg-slate-300"
                        }`}
                      />

                      <span className="text-xs font-bold text-slate-700">
                        Draft
                      </span>

                    </div>

                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setArticleData((prev) => ({
                        ...prev,
                        status: "published",
                      }))
                    }
                    className={`rounded-xl border px-3 py-3 text-left transition ${
                      articleData.status === "published"
                        ? "border-green-200 bg-green-50"
                        : "border-slate-200 bg-white hover:bg-slate-50"
                    }`}
                  >

                    <div className="flex items-center gap-2">

                      <div
                        className={`h-2.5 w-2.5 rounded-full ${
                          articleData.status === "published"
                            ? "bg-green-500"
                            : "bg-slate-300"
                        }`}
                      />

                      <span className="text-xs font-bold text-slate-700">
                        Published
                      </span>

                    </div>

                  </button>

                </div>

              </section>

              {/* Article Summary */}

              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

                <div className="mb-4 flex items-center gap-2">
                  <Eye className="h-4 w-4 text-slate-500" />

                  <h3 className="text-sm font-bold text-slate-800">
                    Article Summary
                  </h3>
                </div>

                <div className="space-y-3">

                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <span className="text-xs text-slate-500">
                      Sections
                    </span>

                    <span className="text-sm font-bold text-slate-800">
                      {articleData.sections.length}
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <span className="text-xs text-slate-500">
                      Tags
                    </span>

                    <span className="text-sm font-bold text-slate-800">
                      {articleData.tags.length}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">
                      Reading time
                    </span>

                    <span className="text-sm font-bold text-slate-800">
                      {articleData.readingTime || 0} min
                    </span>
                  </div>

                </div>

              </section>

            </aside>

          </div>

          {/* ===================================================
              SUBMIT BAR
          =================================================== */}

          <div className="sticky bottom-4 mt-6">

            <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white/95 p-3 shadow-xl shadow-slate-900/10 backdrop-blur sm:flex-row sm:items-center sm:justify-between sm:p-4">

              <div className="hidden items-center gap-3 sm:flex">

                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin text-blue-600" />

                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        Uploading article...
                      </p>

                      <p className="text-xs text-slate-400">
                        Please wait
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-50">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        Ready to publish
                      </p>

                      <p className="text-xs text-slate-400">
                        Review your article before submitting
                      </p>
                    </div>
                  </>
                )}

              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >

                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Publishing...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4" />
                    Create Article
                  </>
                )}

              </button>

            </div>

          </div>

        </form>

      </div>

     

    </div>
  );
};

export default ArticleForm;
