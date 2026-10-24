import { BookOpen, Calendar, Eye, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react'

const NotesCard = ({notes}) => {
 const router = useRouter();
    const openNote = (note) => {
    router.push(`/pdf/${note._id}`);
  };
  return (
   <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300">

                  {/* ================= THUMBNAIL ================= */}

                  <div
                    className="relative h-52 bg-gray-100 overflow-hidden cursor-pointer group"
                    onClick={() => openNote(notes)}
                  >

                    <img
                      src={notes.thumbnail}
                      alt={notes.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Overlay */}

                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">

                      <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white text-gray-900 px-5 py-3 rounded-full font-semibold flex items-center gap-2">

                        <BookOpen size={18} />

                        Read Note

                      </div>

                    </div>

                    {/* PDF Badge */}

                    <div className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow">

                      PDF

                    </div>

                  </div>

                  {/* ================= CONTENT ================= */}

                  <div className="p-5">

                    {/* Title */}

                    <h3 className="text-lg font-bold text-gray-900 line-clamp-2 min-h-[56px]">

                      {notes.title}

                    </h3>

                    {/* Stats */}

                    <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">

                      <div className="flex items-center gap-1">

                        <Eye size={16} />

                        <span>
                          {notes.view || 0}
                        </span>

                      </div>

                      <div className="flex items-center gap-1">

                        <Calendar size={16} />

                        <span>
                          {new Date(
                            notes.createdAt
                          ).toLocaleDateString(
                            "en-IN",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </span>

                      </div>

                    </div>

                    {/* User */}

                    {notes.user?.name && (

                      <div className="flex items-center gap-2 mt-3 text-sm text-gray-500">

                        <User size={15} />

                        <span>
                          By {notes.user.name}
                        </span>

                      </div>

                    )}

                    {/* Read Button */}

                    <button
                      type="button"
                      onClick={() => openNote(notes)}
                      className="w-full mt-5 bg-gray-900 hover:bg-blue-600 text-white py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                    >

                      <BookOpen size={18} />

                      Read Note

                    </button>

                  </div>

                </div>
  )
}

export default NotesCard
