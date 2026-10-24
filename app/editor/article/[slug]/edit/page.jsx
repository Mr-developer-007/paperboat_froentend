"use client";

import React, { useState, useEffect } from "react";
import { ImageUp, X, Plus, FileImage, Trash2, CircleDashed, ChevronLeft } from "lucide-react";
import { editor_url } from "@/components/utils";
import { toast } from "react-toastify";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import RichEditor from "@/app/editor/compo/RichEditor";

axios.defaults.withCredentials = true;

const EditArticleForm = () => {
  const { slug } = useParams();
  const router = useRouter();

  // State Management
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [tag, setTag] = useState("");

  const [articleData, setArticleData] = useState({
    _id: "",
    title: "",
    description: "",
    tags: [],
    status: "draft",
    readingTime: 0,
    category: "",
    sections: [], 
    featuredImage: null,
    newfeaturedImage:null,
  });

  const [sectionData, setSectionData] = useState({
    title: "",
    description: "",
    image: null,
  });

  // Fetch Existing Article
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${editor_url}/article/article/${slug}`);
        const data = response.data;
        
        if (data.success && data.article) {
          const article = data.article;
          setArticleData({
            _id: article._id,
            title: article.title || "",
            description: article.description || "",
            tags: article.tags || [],
            status: article.status || "draft",
            readingTime: article.readingTime || 0,
            category: article.category || "",
            sections: article.fulldis || [], // Map fulldis to sections
            featuredImage: article.featuredImage || null,
            newfeaturedImage:null
          });
        }
      } catch (error) {
        console.error("Error fetching article:", error);
        toast.error("Failed to load article data");
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) fetchArticle();
  }, [slug]);

  // Handlers
  const handleInput = (e) => {
    const { name, value } = e.target;
    setArticleData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTag = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const trimmedTag = tag.trim();
      if (!trimmedTag || articleData.tags.includes(trimmedTag)) return;

      setArticleData((prev) => ({ ...prev, tags: [...prev.tags, trimmedTag] }));
      setTag("");
    }
  };

  const removeTag = (tagToRemove) => {
    setArticleData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tagToRemove),
    }));
  };

  const handleAddDetails = () => {
    if (!sectionData.title.trim() && !sectionData.description.trim()) return;

    setArticleData((prev) => ({
      ...prev,
      sections: [...prev.sections, sectionData],
    }));
    
    // Reset section input
    setSectionData({ title: "", description: "", image: null });
  };

  const removeSection = (indexToRemove) => {
    setArticleData((prev) => ({
      ...prev,
      sections: prev.sections.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const formData = new FormData();

      // Append basic article fields
      formData.append("title", articleData.title);
      formData.append("description", articleData.description);
      formData.append("category", articleData.category);
      formData.append("readingTime", articleData.readingTime);
      formData.append("status", articleData.status);

      // Append tags as JSON
      formData.append("tags", JSON.stringify(articleData.tags));

      // Append featured image ONLY if it's a new File.
      // If it's a string, the backend already has it.
      if (articleData.featuredImage instanceof File) {
        formData.append("featuredImage", articleData.featuredImage);
      }

      let imgnumber = 0;
      const sectionsPayload = articleData.sections.map(
        ({ _id, title, description, image }) => {
          let countImg = null;
          
          // Check if the image is a newly uploaded File
          if (image instanceof File) {
            countImg = imgnumber;
            imgnumber++;
          }
            
          return {
            _id, // Keep original ID if editing an existing section
            title,
            description,
            countImg,
            // If the image is a string (URL), pass it back so the backend knows it wasn't deleted
            existingImage: typeof image === 'string' ? image : null 
          };
        }
      );

      formData.append("sections", JSON.stringify(sectionsPayload));

      // Append NEW section images separately
      articleData.sections.forEach((section) => {
        if (section.image instanceof File) {
          formData.append("sectionImages", section.image);
        }
      });

      if(articleData.newfeaturedImage){
        formData.append("newfeaturedImage",articleData.newfeaturedImage)
      }
      const response = await axios.put(`${editor_url}/article/update/${articleData._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Article updated successfully!");
      router.push('/editor/article'); // Redirect after success

    } catch (error) {
      console.error("Error updating article:", error);
      toast.error("Failed to update article");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh] text-gray-500">
        <CircleDashed className="animate-spin h-10 w-10 mb-4 text-blue-500" />
        <p>Loading article data...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto p-6 bg-white rounded-xl shadow-sm border border-gray-100 space-y-10 font-sans max-w-5xl w-full">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition">
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h2 className="text-2xl font-bold text-gray-800">Edit Article</h2>
        </div>
        
        {/* Status Dropdown */}
        <select
          name="status"
          value={articleData.status}
          onChange={handleInput}
          className="px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg outline-none font-medium focus:ring-2 focus:ring-blue-500"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      <form onSubmit={handleSubmit}>
        <section className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Article Title</label>
              <input
                type="text"
                name="title"
                placeholder="Enter article title"
                required
                value={articleData.title}
                onChange={handleInput}
                className="w-full px-4 text-black py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                placeholder="Brief summary of the article"
                required
                rows={3}
                value={articleData.description}
                onChange={handleInput}
                className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Category</label>
                <input
                  type="text"
                  name="category"
                  placeholder="e.g. Technology"
                  required
                  value={articleData.category}
                  onChange={handleInput}
                  className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Reading Time (mins)</label>
                <input
                  type="number"
                  name="readingTime"
                  min="0"
                  required
                  value={articleData.readingTime}
                  onChange={handleInput}
                  className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">Tags (Press Enter to add)</label>
              <div className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 bg-white">
                <div className="flex flex-wrap gap-2">
                  {articleData.tags.map((t, index) => (
                    <span key={index} className="flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-sm font-medium">
                      {t}
                      <X className="w-4 h-4 cursor-pointer hover:text-blue-900" onClick={() => removeTag(t)} />
                    </span>
                  ))}
                </div>
                <input
                  type="text"
                  name="tag"
                  placeholder={articleData.tags.length === 0 ? "Add a tag..." : ""}
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  onKeyDown={handleAddTag}
                  className="flex-1 text-black min-w-[120px] outline-none bg-transparent"
                />
              </div>
            </div>

            {/* Featured Image - Edit Mode */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Featured Image</label>
              
              <div className="flex gap-6">
              { articleData.featuredImage && (
                <div className="mb-2 relative w-48 h-32 rounded-lg overflow-hidden border border-gray-200">
                  <img src={articleData.featuredImage} alt="Featured" className="w-full h-full object-cover" />

                  {articleData.newfeaturedImage  && <div className="absolute top-0 left-0 w-full h-full bg-black/40"></div>}
                </div>
              )}
              { articleData.newfeaturedImage && (
                <div className="mb-2 relative w-48 h-32 rounded-lg overflow-hidden border border-gray-200 group">
                  <img src={URL.createObjectURL(articleData.newfeaturedImage)} alt="Featured" className="w-full h-full object-cover" />
                  
    <Trash2  size={20} className=" hidden group-hover:block group-hover:absolute top-3 right-3 text-red-600 cursor-pointer" onClick={()=>setArticleData(prev=>({...prev,newfeaturedImage:null}))} />

                </div>
              )}
              </div>


              <label
                htmlFor="newfeaturedImage"
                className="w-full border-2 border-dashed border-gray-300 rounded-xl h-32 flex flex-col items-center justify-center text-gray-500 hover:bg-gray-50 hover:border-blue-400 cursor-pointer transition-colors"
              >
                <ImageUp className="w-8 h-8 mb-2 text-gray-400" />
                <span className="font-medium text-sm">
                  {articleData.featuredImage instanceof File 
                    ? articleData.featuredImage.name 
                    : "Click to upload a new featured image (replaces old)"}
                </span>
              </label>
              <input
                type="file"
                hidden
                name="newfeaturedImage"
                id="newfeaturedImage"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files[0]) {
                    setArticleData((prev) => ({ ...prev, newfeaturedImage: e.target.files[0] }));
                  }
                }}
              />
            </div>
          </div>
        </section> 

        <section className="space-y-6 mt-10 bg-gray-50 p-6 rounded-xl border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 border-b border-gray-300 pb-2">Article Sections</h3>
          
          {/* Existing & Added Sections List */}
          {articleData.sections.length > 0 && (
            <div className="space-y-4 mb-6">
              {articleData.sections.map((sec, idx) => (
                <div key={idx} className="flex items-start justify-between bg-white p-4 rounded-lg border shadow-sm">
                  <div className="w-full">
                    <h4 className="font-bold text-gray-800">{sec.title || "Untitled Section"}</h4>
                    
                    {/* Render raw description text or fallback to rich text HTML indication */}
                    <p className="text-gray-500 text-sm mt-1 line-clamp-2" dangerouslySetInnerHTML={{__html:sec.description}}>
                      {/* {sec.description ? sec.description.replace(/<[^>]+>/g, '') : "No content"} */}
                    </p>

                  
                  </div>
                  
                  <div 
                    onClick={() => removeSection(idx)}
                    className="p-2 ml-4 text-red-500 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-5 h-5" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* New Section Input Form */}
          <div className="grid grid-cols-1 gap-4 bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="font-medium text-gray-700 mb-2">Add New Section</h4>
            <input
              type="text"
              placeholder="Section Subtitle"
              value={sectionData.title}
              onChange={(e) => setSectionData((prev) => ({ ...prev, title: e.target.value }))}
              className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />
            
            <RichEditor 
              content={sectionData.description}  
              setContent={(data) => setSectionData((prev) => ({ ...prev, description: data }))} 
            />
            
            <div className="flex items-center gap-4">
             

              <button
                type="button"
                onClick={handleAddDetails}
                className="flex items-center gap-2 px-6 py-2 h-20 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
              >
                <Plus className="w-5 h-5" />
                Add Section
              </button>
            </div>
          </div>
        </section>

        <button
          type="submit"
          disabled={isSaving}
          className={`w-full mt-10 bg-blue-600 text-white py-3 flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors ${isSaving ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'}`}
        >
          {isSaving && <CircleDashed className="animate-spin w-5 h-5" />}
          {isSaving ? "Updating Article..." : "Update Article"}
        </button>

      </form>
    </div>
  );
};

export default EditArticleForm;