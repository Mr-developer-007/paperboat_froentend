"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import {
  ArrowLeft,
  User,
  Calendar,
  FileText,
  Link as LinkIcon,
  ExternalLink,

  MessageCircle,

  Cable,
  Globe,
  BookOpen,
  Clock,
  Hash,
} from "lucide-react";
import { FaInstagramSquare,FaFacebook } from "react-icons/fa";

import { AdminUrl } from "../../compo/admin-utils";



const Page = () => {
  const { id } = useParams();
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${AdminUrl}/notes/user/get/${id}`,
        {
          withCredentials: true,
        }
      );

      if (response.data?.success) {
        setUser(response.data.user);
      } else {
        toast.error(response.data?.message || "User not found");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.message || "Error fetching user"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchUser();
    }
  }, [id]);

  const getSocialIcon = (icon) => {
    const value = icon?.toLowerCase();

    if (value === "instagram") {
      return <FaInstagramSquare size={18} />;
    }

    if (value === "whatsapp") {
      return <MessageCircle size={18} />;
    }

    if (value === "facebook") {
      return <FaFacebook size={18} />;
    }

    if (value === "linkedin") {
      return <Cable size={18} />;
    }

    return <Globe size={18} />;
  };


  const handelDeleteUser = async()=>{
    try {
      const response = await axios.delete(`${AdminUrl}/notes/user/${id}`)
      const data = await response.data;
      if(data.success){
        toast.success(data.message)
        router.back()
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }





  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="mx-auto max-w-7xl animate-pulse space-y-6">
          <div className="h-10 w-32 rounded-lg bg-slate-200" />

          <div className="h-72 rounded-2xl bg-white shadow-sm" />

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="h-48 rounded-2xl bg-white" />
            <div className="h-48 rounded-2xl bg-white lg:col-span-2" />
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center p-6">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
            <User className="text-slate-400" size={30} />
          </div>

          <h2 className="text-xl font-semibold text-slate-900">
            User not found
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            The requested user could not be found.
          </p>

          <button
            onClick={() => router.back()}
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#153497] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#102b80]"
          >
            <ArrowLeft size={17} />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <button
              onClick={() => router.back()}
              className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-[#153497]"
            >
              <ArrowLeft size={17} />
              Back
            </button>

            <h1 className="text-2xl font-bold text-slate-900">
              User Details
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              View profile information and notes
            </p>
          </div>

          <div onClick={handelDeleteUser} className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 shadow-sm">
            <Hash size={16} />
            
            <span className="max-w-[180px] truncate">Delete</span>
          </div>
        </div>

        {/* Profile Card */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          {/* Cover */}
          <div className="h-32 bg-gradient-to-r from-[#153497] via-[#2548b5] to-indigo-400" />

          <div className="px-5 pb-6 md:px-8">

            {/* Profile Image */}
            <div className="-mt-16 mb-5">
              <div className="h-28 w-28 overflow-hidden rounded-2xl border-4 border-white bg-slate-100 shadow-lg">
                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <User size={42} className="text-slate-400" />
                  </div>
                )}
              </div>
            </div>

            {/* User Information */}
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">

              <div className="max-w-2xl">
                <h2 className="text-2xl font-bold text-slate-900">
                  {user.name}
                </h2>

                <p className="mt-2 leading-6 text-slate-500">
                  {user.about || "No description available."}
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">

                <div className="rounded-xl border border-slate-200 bg-slate-50 px-5 py-4 text-center">
                  <FileText
                    size={20}
                    className="mx-auto mb-2 text-[#153497]"
                  />
                  <p className="text-xl font-bold text-slate-900">
                    {user.notes?.length || 0}
                  </p>
                  <p className="text-xs text-slate-500">
                    Notes
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 px-5 py-4 text-center">
                  <LinkIcon
                    size={20}
                    className="mx-auto mb-2 text-[#153497]"
                  />
                  <p className="text-xl font-bold text-slate-900">
                    {user.contactlinks?.length || 0}
                  </p>
                  <p className="text-xs text-slate-500">
                    Links
                  </p>
                </div>

                <div className="hidden rounded-xl border border-slate-200 bg-slate-50 px-5 py-4 text-center sm:block">
                  <Calendar
                    size={20}
                    className="mx-auto mb-2 text-[#153497]"
                  />
                  <p className="text-sm font-bold text-slate-900">
                    {formatDate(user.createdAt)}
                  </p>
                  <p className="text-xs text-slate-500">
                    Joined
                  </p>
                </div>

              </div>
            </div>

            {/* Social Links */}
            {user.contactlinks?.length > 0 && (
              <div className="mt-6 border-t border-slate-100 pt-5">
                <p className="mb-3 text-sm font-semibold text-slate-700">
                  Contact & Social Links
                </p>

                <div className="flex flex-wrap gap-2">
                  {user.contactlinks.map((link) => (
                    <a
                      key={link._id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 transition hover:border-[#153497] hover:bg-slate-50 hover:text-[#153497]"
                    >
                      {getSocialIcon(link.icon)}

                      <span className="capitalize">
                        {link.icon}
                      </span>

                      <ExternalLink size={14} />
                    </a>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Lower Section */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">

          {/* Account Information */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#153497]">
                <User size={20} />
              </div>

              <div>
                <h3 className="font-semibold text-slate-900">
                  Account Information
                </h3>

                <p className="text-xs text-slate-500">
                  Profile details
                </p>
              </div>
            </div>

            <div className="space-y-4">

              <div>
                <p className="mb-1 text-xs font-medium uppercase tracking-wide text-slate-400">
                  User ID
                </p>

                <p className="break-all text-sm font-medium text-slate-700">
                  {user._id}
                </p>
              </div>

              <div>
                <p className="mb-1 text-xs font-medium uppercase tracking-wide text-slate-400">
                  Created
                </p>

                <div className="flex items-center gap-2 text-sm text-slate-700">
                  <Calendar size={15} />
                  {formatDate(user.createdAt)}
                </div>
              </div>

              <div>
                <p className="mb-1 text-xs font-medium uppercase tracking-wide text-slate-400">
                  Last Updated
                </p>

                <div className="flex items-center gap-2 text-sm text-slate-700">
                  <Clock size={15} />
                  {formatDate(user.updatedAt)}
                </div>
              </div>

            </div>
          </div>

          {/* Notes */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2">

            <div className="mb-5 flex items-center justify-between">

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#153497]">
                  <BookOpen size={20} />
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900">
                    Notes
                  </h3>

                  <p className="text-xs text-slate-500">
                    Notes uploaded by this user
                  </p>
                </div>
              </div>

              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-[#153497]">
                {user.notes?.length || 0}
              </span>

            </div>

            {user.notes?.length === 0 ? (
              <div className="flex min-h-[180px] flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 text-center">

                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white">
                  <FileText
                    size={23}
                    className="text-slate-400"
                  />
                </div>

                <p className="font-medium text-slate-700">
                  No notes available
                </p>

                <p className="mt-1 text-sm text-slate-400">
                  This user hasn't uploaded any notes yet.
                </p>

              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                {user.notes.map((note) => (
                  <div
                    key={note._id}
                    className="rounded-xl border border-slate-200 p-4 transition hover:border-[#153497]/30 hover:shadow-sm"
                  >
                    <div className="flex items-start gap-3">

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-500">
                        <FileText size={20} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <h4 className="truncate font-semibold text-slate-800">
                          {note.title || "Untitled Note"}
                        </h4>

                        {note.description && (
                          <p className="mt-1 line-clamp-2 text-xs text-slate-500">
                            {note.description}
                          </p>
                        )}

                        {note.createdAt && (
                          <p className="mt-2 text-xs text-slate-400">
                            {formatDate(note.createdAt)}
                          </p>
                        )}
                      </div>

                      {note.pdf && (
                        <a
                          href={note.pdf}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-lg p-2 text-slate-400 transition hover:bg-blue-50 hover:text-[#153497]"
                          title="Open PDF"
                        >
                          <ExternalLink size={17} />
                        </a>
                      )}

                    </div>
                  </div>
                ))}

              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};

export default Page;