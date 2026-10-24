"use client"
import {  AdminUrl } from '@/app/admin/compo/admin-utils'
import axios from 'axios'
import { Award, CalendarDays, MapPin, X, UploadCloud, Image as ImageIcon, Layers, Save } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import {
  DndContext,
  closestCenter,
} from "@dnd-kit/core";

import {
  arrayMove,
  SortableContext,
  useSortable,
  rectSortingStrategy, // <-- Changed to rectSortingStrategy for Grid layouts
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";
import { base_url } from '@/components/utils'

// --- New Component for Sortable Item ---
const SortableImage = ({ url, index, onDelete }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: url }); // Using the URL string as the unique ID

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      {...attributes} 
      {...listeners} 
      className='relative aspect-[3/4] rounded-xl overflow-hidden border border-gray-200 bg-gray-50 shadow-sm cursor-grab active:cursor-grabbing group'
    >
      {/* pointer-events-none prevents the image from interfering with the drag */}
      <img src={url} alt={`Page ${index + 1}`} className="w-full h-full object-cover pointer-events-none" />
      
      <button 
        type="button"
        // Prevent the drag event from firing when trying to click the delete button
        onPointerDown={(e) => e.stopPropagation()} 
        className='absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full shadow-md hover:bg-red-600 transition-colors' 
        onClick={() => onDelete(index)}
        title="Mark for deletion"
      >
        <X size={16} />
      </button>
    </div>
  );
};


const EditCompo = ({ slug }) => {
  const [allYear, setAllyear] = useState([])
  const [allStates, setAllStates] = useState([])
  const [allExam, setAllExam] = useState([])
  const [fetching, setFetching] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const route = useRouter()
  const [paper, setPaper] = useState({
    name: "",
    description: "",
    agency: "",
    state: "",
    year: "",
    thumbnail: "",
    images: [],
    deleteimage: [],
    newimage: [],
    newthumbnail: null
  })

  const fetchData = async () => {
    try {
      const [yearRes, stateRes, examRes, paperRes] = await Promise.all([
        axios.get(`${AdminUrl}/year/get`).catch(() => ({ data: { years: [] } })),
        axios.get(`${AdminUrl}/state/get`).catch(() => ({ data: { states: [] } })),
        axios.get(`${AdminUrl}/exam/get`).catch(() => ({ data: { exam: [] } })),
        axios.get(`${AdminUrl}/paper/edit/${slug}`).catch(() => ({ data: { data: {} } }))
      ])

      setAllyear(yearRes.data.years || [])
      setAllStates(stateRes.data.states || [])
      setAllExam(examRes.data.exam || [])
      
      const fetchedPaper = paperRes.data.data || {};
      
      setPaper({
        ...fetchedPaper,
        images: fetchedPaper.images || [],
        deleteimage: [],
        newimage: [],
        newthumbnail: null
      })
    } catch (error) {
      toast.error("Failed to load form data")
    } finally {
      setFetching(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [slug])

 
  const handelDeleteImage = (index) => {
    const removedImage = paper.images[index];
    const newImgArray = paper.images.filter((_, ind) => ind !== index);

    setPaper(prev => ({
      ...prev,
      images: newImgArray,
      deleteimage: prev.deleteimage ? [...prev.deleteimage, removedImage] : [removedImage]
    }));
  }

  const handelDeleteNewImage = (index) => {
    const newImgArray = paper.newimage.filter((_, ind) => ind !== index);
    setPaper(prev => ({
      ...prev,
      newimage: newImgArray,
    }));
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSubmitting(true);
  
    try {
      const formdata = new FormData();
      formdata.append("name", paper.name)
      formdata.append("description", paper.description)
      formdata.append("agency", paper.agency)
      formdata.append("state", paper.state)
      formdata.append("year", paper.year)

      // Assuming API needs to know the new order of images
      // You may need to adjust this depending on how your backend expects sorted images
      formdata.append("images", JSON.stringify(paper.images))

      if (paper.newthumbnail) {
        formdata.append("newthumbnail", paper.newthumbnail)
      }
      
      if (paper.deleteimage && paper.deleteimage.length > 0) {
        paper.deleteimage.forEach((item) => {
          formdata.append("deleteimage[]", item)
        })
      }

      if (paper.newimage && paper.newimage.length > 0) {
        paper.newimage.forEach((item) => {
          formdata.append("newimage", item)
        })
      }
      
      const response = await axios.put(`${AdminUrl}/paper/edit/${slug}`, formdata);
      const data = await response.data;

      if (data.success) {
        toast.success(data.message)
        fetchData() // Refresh instead of immediately routing, or just route
        route.push("/admin/paper")
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong")
    } finally {
      setSubmitting(false);
    }
  }

  // --- Fixed Drag End Logic ---
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    setPaper((prev) => {
      // images are strings, so we can use indexOf based on the ID we passed (the URL string)
      const oldIndex = prev.images.indexOf(active.id);
      const newIndex = prev.images.indexOf(over.id);

      return {
        ...prev,
        images: arrayMove(prev.images, oldIndex, newIndex)
      };
    });
  };

const handelsaveDrage = async()=>{
      setSubmitting(true);

  try {
    const response = await axios.put(`${AdminUrl}/paper/drageimage/${slug}`,{images:paper.images})
    const data = await response.data;
    if(data.success){
      toast.success(data.message);
      setPaper(prev=>({...prev,images:data.data.images}))
    }else{
      toast.error(data.message)
    }
    
  } catch (error) {
          toast.error(error.response.data.message)

  } finally {
      setSubmitting(false);
    }
}


  if (fetching) {
    return <div className="p-8 text-center text-gray-500 animate-pulse">Loading paper details...</div>
  }

  return (
    <div className='max-w-6xl mx-auto p-4 md:p-6 lg:p-8'>
      
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Edit Question Paper</h1>
          <p className="text-gray-500 mt-2">Update details, thumbnail, or pages for this paper.</p>
        </div>
      </div>

      <form onSubmit={handleUpdate} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- LEFT COLUMN: DETAILS --- */}
        <div className="lg:col-span-2 space-y-6 bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Paper Details</h2>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Paper Title</label>
            <input 
              type="text" 
              required 
              value={paper.name || ""}   
              onChange={(e) => setPaper(prev => ({ ...prev, name: e.target.value }))}
              className='w-full text-black px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all'
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
            <textarea 
              required 
              rows="4"
              value={paper.description || ""}   
              onChange={(e) => setPaper(prev => ({ ...prev, description: e.target.value }))}
              className='w-full text-black px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none'
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Award size={16} className="text-amber-500"/> Agency
              </label>
              <select 
                required 
                value={paper.agency || ""} 
                onChange={(e) => setPaper(prev => ({ ...prev, agency: e.target.value }))}
                className='w-full  text-black px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none uppercase'
              >
                <option value="" disabled>Select Agency</option>
                {allExam.map((item) => <option value={item._id} key={item._id}>{item.name}</option>)}
              </select>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <MapPin size={16} className="text-blue-500"/> State
              </label>
              <select 
                required 
                value={paper.state || ""} 
                onChange={(e) => setPaper(prev => ({ ...prev, state: e.target.value }))}
                className='w-full text-black  px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none capitalize'
              >
                <option value="" disabled>Select State</option>
                {allStates.map((item) => <option value={item._id} key={item._id}>{item.state}</option>)}
              </select>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <CalendarDays size={16} className="text-emerald-500"/> Year
              </label>
              <select 
                required 
                value={paper.year || ""} 
                onChange={(e) => setPaper(prev => ({ ...prev, year: e.target.value }))}
                className='w-full text-black px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none'
              >
                <option value="" disabled>Select Year</option>
                {allYear.map((item) => <option value={item._id} key={item._id}>{item.year}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* --- RIGHT COLUMN: THUMBNAIL & SUBMIT --- */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <ImageIcon size={20} className="text-indigo-600"/> Cover Thumbnail
            </h3>
            
            <div className="relative w-full aspect-[3/4] bg-gray-100 rounded-xl overflow-hidden border border-gray-200">
              <img 
                src={paper.newthumbnail ? URL.createObjectURL(paper.newthumbnail) : `${paper.thumbnail}`} 
                alt="Thumbnail" 
                className="w-full h-full object-cover"
                onError={(e) => { e.target.src = 'https://via.placeholder.com/150?text=No+Thumbnail' }}
              />

              {paper.newthumbnail ? (
                <button 
                  type="button"
                  onClick={() => setPaper(prev => ({ ...prev, newthumbnail: null }))}
                  className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-full shadow-md transition-colors"
                  title="Undo new thumbnail"
                >
                  <X size={18} />
                </button>
              ) : (
                <label 
                  htmlFor="newthumbnail" 
                  className="absolute bottom-3 right-3 bg-white/90 hover:bg-white text-indigo-600 p-2 rounded-lg shadow-md cursor-pointer text-sm font-bold flex items-center gap-2 backdrop-blur-sm transition-all"
                >
                  <UploadCloud size={16} /> Change
                </label>
              )}
            </div>
            
            <input 
              hidden 
              type="file" 
              accept="image/*" 
              id="newthumbnail" 
              onChange={(e) => setPaper(prev => ({ ...prev, newthumbnail: e.target.files[0] }))}  
            />
          </div>

          <button 
            type='submit'
            disabled={submitting}
            className={`w-full py-4 rounded-xl font-bold text-lg shadow-md transition-all flex items-center justify-center gap-2 ${
              submitting 
                ? 'bg-indigo-400 cursor-not-allowed text-white' 
                : 'bg-indigo-600 hover:bg-indigo-700 hover:-translate-y-1 text-white active:scale-95'
            }`}
          >
            <Save size={20} />
            {submitting ? 'Saving Changes...' : 'Save Changes'}
          </button>
        </div>

        {/* --- BOTTOM SECTION: PAPER PAGES (IMAGES) --- */}
        <div className="lg:col-span-3 bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 mt-2">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2 border-b pb-2">
            <Layers size={22} className="text-indigo-600"/> Paper Pages
          </h2>

          <div className='grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
            
        {paper?.images  && paper.images.length > 0   &&   
            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              {/* Note: Items array must match the IDs provided to the Sortable items. Here we just use the url strings. */}
              <SortableContext items={paper.images} strategy={rectSortingStrategy}>
                  {paper?.images?.map((url, index) => (
                    <SortableImage 
                      key={url} 
                      url={url} 
                      index={index} 
                      onDelete={handelDeleteImage} 
                    />
                  ))}
              </SortableContext>
            </DndContext>
}

            {/* Newly Added Images (Pending Save - Not draggable until saved) */}
            {paper.newimage?.map((item, index) => (
              <div className='relative group aspect-[3/4] rounded-xl overflow-hidden border-2 border-green-400 bg-green-50 shadow-sm' key={`new-${index}`}>
                <img src={URL.createObjectURL(item)} alt={`New Page ${index + 1}`} className="w-full h-full object-cover pointer-events-none" />
                <div className="absolute top-2 left-2 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-md z-10">NEW</div>
                <button 
                  type="button"
                  className='absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-red-600 z-10' 
                  onClick={() => handelDeleteNewImage(index)}
                  title="Remove"
                >
                  <X size={16} />
                </button>
              </div>
            ))}

            {/* Add More Images Button */}
            <label htmlFor="newimages" className='flex flex-col items-center justify-center aspect-[3/4] rounded-xl border-2 border-dashed border-gray-300 hover:border-indigo-400 hover:bg-gray-50 cursor-pointer transition-colors group'>
              <UploadCloud size={32} className="text-gray-400 group-hover:text-indigo-500 mb-2" />
              <span className="text-sm font-semibold text-gray-500 group-hover:text-indigo-600">Add Pages</span>
            </label>
            <input 
              type="file" 
              multiple 
              accept="image/*"
              id="newimages" 
              hidden  
              onChange={(e) => {
                const files = Array.from(e.target.files);
                setPaper(prev => ({
                  ...prev,
                  newimage: prev.newimage ? [...prev.newimage, ...files] : [...files]
                }));
              }} 
            />

          </div>
          <div className=' flex justify-center mt-4'>
          <button type='button' onClick={handelsaveDrage}  className='cursor-pointer p-2 bg-red-200 text-red-800'>Save Drag</button>
        
        
        </div></div>



      </form>
    </div>
  )
}

export default EditCompo