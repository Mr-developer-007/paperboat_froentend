"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AdminUrl } from "../compo/admin-utils";

import {
  FileText,
  Image as ImageIcon,
  Upload,
  Plus,
  Search,
  Pencil,
  Trash2,
  Eye,
  ExternalLink,
  X,
  Save,
  Loader2,
  User,
  CalendarDays,
  FileDown,
  RefreshCw,
  Users,
  BookOpen,
  AlertTriangle,
} from "lucide-react";

axios.defaults.withCredentials = true;

const initialForm = {
  title: "",
  user: "",
  thumbnail: null,
  pdffile: null,
};

const Page = () => {
  const [noteData, setNoteData] = useState(initialForm);
  const [notes, setNotes] = useState([]);
  const [usersList, setUsersList] = useState([]);

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  const [search, setSearch] = useState("");

  const [editingNote, setEditingNote] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // =========================================================
  // FETCH USERS
  // =========================================================

  const fetchUser = async () => {
    try {
      const response = await axios.get(`${AdminUrl}/notes/users/get`);

      if (response.data?.success) {
        setUsersList(response.data.users || []);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching users");
    }
  };

  // =========================================================
  // FETCH NOTES
  // =========================================================

  const fetchNotes = async () => {
    try {
      setFetching(true);

      const response = await axios.get(`${AdminUrl}/notes/get`);

      if (response.data?.success) {
        setNotes(response.data.notes || []);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching notes");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchNotes();
  }, []);

  // =========================================================
  // FILE HANDLER
  // =========================================================

  const handleFileChange = (e, type) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (type === "thumbnail") {
      if (!file.type.startsWith("image/")) {
        toast.error("Please select a valid image");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        toast.error("Thumbnail must be less than 5MB");
        return;
      }
    }

    if (type === "pdffile") {
      if (file.type !== "application/pdf") {
        toast.error("Please select a PDF file");
        return;
      }

      if (file.size > 20 * 1024 * 1024) {
        toast.error("PDF must be less than 20MB");
        return;
      }
    }

    setNoteData((prev) => ({
      ...prev,
      [type]: file,
    }));
  };

  // =========================================================
  // CREATE NOTE
  // =========================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!noteData.title.trim()) {
      toast.error("Please enter note title");
      return;
    }

    if (!noteData.user) {
      toast.error("Please select user");
      return;
    }

    if (!noteData.thumbnail) {
      toast.error("Please select thumbnail");
      return;
    }

    if (!noteData.pdffile) {
      toast.error("Please select PDF");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("title", noteData.title.trim());
      formData.append("user", noteData.user);
      formData.append("thumbnail", noteData.thumbnail);
      formData.append("pdffile", noteData.pdffile);

      const response = await axios.post(
        `${AdminUrl}/notes/create`,
        formData
      );

      if (response.data?.success) {
        toast.success(response.data.message || "Note added successfully");

        setNotes((prev) => [response.data.note, ...prev]);

        setNoteData(initialForm);
      } else {
        toast.error(response.data?.message || "Failed to create note");
      }
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // DELETE NOTE
  // =========================================================

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      setDeleting(true);

      const response = await axios.delete(
        `${AdminUrl}/notes/delete/${deleteId}`
      );

      if (response.data?.success) {
        toast.success(
          response.data.message || "Note deleted successfully"
        );

        setNotes((prev) =>
          prev.filter((item) => item._id !== deleteId)
        );

        setDeleteId(null);
      } else {
        toast.error(
          response.data?.message || "Failed to delete note"
        );
      }
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ||
          "Error deleting note"
      );
    } finally {
      setDeleting(false);
    }
  };

  // =========================================================
  // EDIT
  // =========================================================

  const openEdit = (note) => {
    setEditingNote({
      ...note,
      newThumbnail: null,
      newPdf: null,
    });

    setShowEditModal(true);
  };

  // =========================================================
  // FILTER
  // =========================================================

  const filteredNotes = notes.filter((note) => {
    const value = search.toLowerCase();

    return (
      note.title?.toLowerCase().includes(value) ||
      note.user?.name?.toLowerCase().includes(value)
    );
  });

  // =========================================================
  // DATE
  // =========================================================

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-3">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#153497] text-white shadow-lg shadow-blue-900/20">
              <BookOpen size={23} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Notes Management
              </h1>

              <p className="text-sm text-slate-500">
                Create and manage study notes
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={fetchNotes}
            disabled={fetching}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:opacity-60"
          >
            <RefreshCw
              size={17}
              className={fetching ? "animate-spin" : ""}
            />
            Refresh
          </button>

        </div>

        {/* =====================================================
            STAT CARDS_c0de_runner

        ====================================================== */}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

          <StatCard
            icon={<FileText size={20} />}
            title="Total Notes"
            value={notes.length}
          />

          <StatCard
            icon={<Users size={20} />}
            title="Users"
            value={usersList.length}
          />

          <StatCard
            icon={<Eye size={20} />}
            title="Total Views"
            value={notes.reduce(
              (total, item) => total + (item.view || 0),
              0
            )}
          />

        </div>

        {/* =====================================================
            CREATE NOTE
        ====================================================== */}

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="border-b border-slate-100 px-5 py-4 md:px-6">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#153497]">
                <Plus size={20} />
              </div>

              <div>
                <h2 className="font-semibold text-slate-900">
                  Add New Note
                </h2>

                <p className="text-xs text-slate-500">
                  Upload note thumbnail and PDF
                </p>
              </div>

            </div>

          </div>

          <form
            onSubmit={handleSubmit}
            className="p-5 md:p-6"
          >

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">

              {/* TITLE */}

              <div className="lg:col-span-2">

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Note Title
                </label>

                <div className="relative">

                  <FileText
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="text"
                    value={noteData.title}
                    placeholder="Enter note title..."
                    onChange={(e) =>
                      setNoteData((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#153497] focus:bg-white focus:ring-4 focus:ring-blue-100"
                  />

                </div>

              </div>

              {/* USER */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  User
                </label>

                <div className="relative">

                  <User
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <select
                    value={noteData.user}
                    onChange={(e) =>
                      setNoteData((prev) => ({
                        ...prev,
                        user: e.target.value,
                      }))
                    }
                    className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#153497] focus:bg-white focus:ring-4 focus:ring-blue-100"
                  >

                    <option value="" disabled>
                      -- Select User --
                    </option>

                    {usersList.map((item) => (
                      <option
                        key={item._id}
                        value={item._id}
                      >
                        {item.name}
                      </option>
                    ))}

                  </select>

                </div>

              </div>

              {/* THUMBNAIL */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Thumbnail
                </label>

                <label className="group flex min-h-[115px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 px-4 transition hover:border-[#153497] hover:bg-blue-50/40">

                  <ImageIcon
                    size={27}
                    className="mb-2 text-slate-400 group-hover:text-[#153497]"
                  />

                  <span className="max-w-full truncate text-sm font-medium text-slate-600">
                    {noteData.thumbnail
                      ? noteData.thumbnail.name
                      : "Choose thumbnail"}
                  </span>

                  <span className="mt-1 text-xs text-slate-400">
                    JPG, PNG, WEBP • Max 5MB
                  </span>

                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(e) =>
                      handleFileChange(e, "thumbnail")
                    }
                  />

                </label>

              </div>

              {/* PDF */}

              <div className="lg:col-span-2">

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  PDF Document
                </label>

                <label className="group flex min-h-[120px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 px-4 transition hover:border-red-400 hover:bg-red-50/30">

                  <FileDown
                    size={29}
                    className="mb-2 text-slate-400 group-hover:text-red-500"
                  />

                  <span className="max-w-full truncate text-sm font-medium text-slate-600">
                    {noteData.pdffile
                      ? noteData.pdffile.name
                      : "Choose PDF document"}
                  </span>

                  <span className="mt-1 text-xs text-slate-400">
                    PDF only • Max 20MB
                  </span>

                  <input
                    type="file"
                    hidden
                    accept="application/pdf"
                    onChange={(e) =>
                      handleFileChange(e, "pdffile")
                    }
                  />

                </label>

              </div>

            </div>

            {/* SUBMIT */}

            <div className="mt-6 flex justify-end">

              <button
                type="submit"
                disabled={loading}
                className="inline-flex min-w-[150px] items-center justify-center gap-2 rounded-xl bg-[#153497] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-900/20 transition hover:bg-[#102878] disabled:cursor-not-allowed disabled:opacity-60"
              >

                {loading ? (
                  <>
                    <Loader2
                      size={18}
                      className="animate-spin"
                    />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload size={18} />
                    Add Note
                  </>
                )}

              </button>

            </div>

          </form>

        </div>

        {/* =====================================================
            NOTES TABLE
        ====================================================== */}

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          {/* HEADER */}

          <div className="flex flex-col gap-4 border-b border-slate-100 p-5 md:flex-row md:items-center md:justify-between md:px-6">

            <div>
              <h2 className="font-semibold text-slate-900">
                All Notes
              </h2>

              <p className="text-sm text-slate-500">
                {filteredNotes.length} notes found
              </p>
            </div>

            <div className="relative w-full md:w-80">

              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search notes..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-[#153497] focus:bg-white focus:ring-4 focus:ring-blue-100"
              />

            </div>

          </div>

          {/* DESKTOP */}

          <div className="hidden overflow-x-auto lg:block">

            <table className="w-full">

              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                    Note
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                    User
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                    Views
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                    Created
                  </th>

                  <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-slate-500">
                    Actions
                  </th>

                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">

                {fetching ? (

                  <tr>
                    <td colSpan="5">
                      <LoadingState />
                    </td>
                  </tr>

                ) : filteredNotes.length === 0 ? (

                  <tr>
                    <td colSpan="5">
                      <EmptyState />
                    </td>
                  </tr>

                ) : (

                  filteredNotes.map((note) => (

                    <tr
                      key={note._id}
                      className="group transition hover:bg-slate-50"
                    >

                      {/* NOTE */}

                      <td className="px-6 py-4">

                        <div className="flex min-w-[280px] items-center gap-4">

                          <div className="h-16 w-20 flex-shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-100">

                            {note.thumbnail ? (
                              <img
                                src={note.thumbnail}
                                alt={note.title}
                                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                              />
                            ) : (
                              <div className="flex h-full items-center justify-center">
                                <ImageIcon
                                  size={22}
                                  className="text-slate-400"
                                />
                              </div>
                            )}

                          </div>

                          <div className="min-w-0">

                            <h3 className="truncate font-semibold text-slate-900">
                              {note.title}
                            </h3>

                            <div className="mt-1 flex items-center gap-2 text-xs text-slate-400">
                              <FileText size={13} />
                              PDF Document
                            </div>

                          </div>

                        </div>

                      </td>

                      {/* USER */}

                      <td className="px-6 py-4">

                        <div className="flex items-center gap-2">

                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-[#153497]">
                            <User size={15} />
                          </div>

                          <span className="text-sm font-medium text-slate-700">
                            {note.user?.name || "User"}
                          </span>

                        </div>

                      </td>

                      {/* VIEWS */}

                      <td className="px-6 py-4">

                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Eye size={16} />
                          {note.view || 0}
                        </div>

                      </td>

                      {/* DATE */}

                      <td className="px-6 py-4">

                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          <CalendarDays size={15} />
                          {formatDate(note.createdAt)}
                        </div>

                      </td>

                      {/* ACTIONS */}

                      <td className="px-6 py-4">

                        <div className="flex justify-end gap-2">

                          <a
                            href={note.pdflink}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="View PDF"
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-blue-200 hover:bg-blue-50 hover:text-[#153497]"
                          >
                            <ExternalLink size={17} />
                          </a>

                          <button
                            type="button"
                            onClick={() => openEdit(note)}
                            title="Edit"
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-blue-200 hover:bg-blue-50 hover:text-[#153497]"
                          >
                            <Pencil size={17} />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              setDeleteId(note._id)
                            }
                            title="Delete"
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                          >
                            <Trash2 size={17} />
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

          {/* MOBILE */}

          <div className="divide-y divide-slate-100 lg:hidden">

            {fetching ? (

              <LoadingState />

            ) : filteredNotes.length === 0 ? (

              <EmptyState />

            ) : (

              filteredNotes.map((note) => (

                <div
                  key={note._id}
                  className="p-4 sm:p-5"
                >

                  <div className="flex gap-4">

                    <div className="h-20 w-24 flex-shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-100">

                      {note.thumbnail ? (
                        <img
                          src={note.thumbnail}
                          alt={note.title}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <ImageIcon
                            size={24}
                            className="text-slate-400"
                          />
                        </div>
                      )}

                    </div>

                    <div className="min-w-0 flex-1">

                      <h3 className="font-semibold text-slate-900">
                        {note.title}
                      </h3>

                      <div className="mt-2 flex flex-wrap gap-3 text-xs text-slate-500">

                        <span className="flex items-center gap-1">
                          <User size={13} />
                          {note.user?.name || "User"}
                        </span>

                        <span className="flex items-center gap-1">
                          <Eye size={13} />
                          {note.view || 0}
                        </span>

                        <span className="flex items-center gap-1">
                          <CalendarDays size={13} />
                          {formatDate(note.createdAt)}
                        </span>

                      </div>

                    </div>

                  </div>

                  <div className="mt-4 flex gap-2">

                    <a
                      href={note.pdflink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-50 px-3 py-2.5 text-sm font-semibold text-[#153497]"
                    >
                      <ExternalLink size={16} />
                      View PDF
                    </a>

                    <button
                      type="button"
                      onClick={() => openEdit(note)}
                      className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-blue-50 hover:text-[#153497]"
                    >
                      <Pencil size={17} />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setDeleteId(note._id)
                      }
                      className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 size={17} />
                    </button>

                  </div>

                </div>

              ))

            )}

          </div>

        </div>

      </div>

      {/* =====================================================
          EDIT MODAL
      ====================================================== */}

      {showEditModal && editingNote && (
        <EditModal
          note={editingNote}
          users={usersList}
          onClose={() => {
            setShowEditModal(false);
            setEditingNote(null);
          }}
          onUpdated={(updatedNote) => {
            setNotes((prev) =>
              prev.map((item) =>
                item._id === updatedNote._id
                  ? updatedNote
                  : item
              )
            );

            setShowEditModal(false);
            setEditingNote(null);
          }}
        />
      )}

      {/* =====================================================
          DELETE MODAL
      ====================================================== */}

      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">

          <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">

            <div className="p-6">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600">
                <AlertTriangle size={25} />
              </div>

              <div className="mt-4 text-center">

                <h3 className="text-lg font-bold text-slate-900">
                  Delete Note?
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  This action cannot be undone. The note,
                  thumbnail and PDF may be permanently deleted.
                </p>

              </div>

              <div className="mt-6 flex gap-3">

                <button
                  type="button"
                  disabled={deleting}
                  onClick={() => setDeleteId(null)}
                  className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  disabled={deleting}
                  onClick={handleDelete}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-60"
                >

                  {deleting ? (
                    <>
                      <Loader2
                        size={17}
                        className="animate-spin"
                      />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 size={17} />
                      Delete
                    </>
                  )}

                </button>

              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

// =========================================================
// STAT CARD
// =========================================================

const StatCard = ({ icon, title, value }) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <p className="mt-1 text-2xl font-bold text-slate-900">
            {value}
          </p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[#153497]">
          {icon}
        </div>

      </div>

    </div>
  );
};

// =========================================================
// LOADING
// =========================================================

const LoadingState = () => {
  return (
    <div className="flex min-h-[220px] items-center justify-center">

      <Loader2
        size={30}
        className="animate-spin text-[#153497]"
      />

    </div>
  );
};

// =========================================================
// EMPTY
// =========================================================

const EmptyState = () => {
  return (
    <div className="flex min-h-[220px] flex-col items-center justify-center px-5 text-center">

      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
        <FileText size={25} />
      </div>

      <h3 className="mt-4 font-semibold text-slate-800">
        No notes found
      </h3>

      <p className="mt-1 text-sm text-slate-500">
        Create a new note or try another search.
      </p>

    </div>
  );
};

// =========================================================
// EDIT MODAL
// =========================================================

const EditModal = ({
  note,
  users,
  onClose,
  onUpdated,
}) => {
  const [form, setForm] = useState({
    title: note.title || "",
    user: note.user?._id || "",
    newThumbnail: null,
    newPdf: null,
  });

  const [saving, setSaving] = useState(false);

  // =========================================================
  // FILE
  // =========================================================

  const handleFile = (e, type) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (type === "newThumbnail") {
      if (!file.type.startsWith("image/")) {
        toast.error("Please select a valid image");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        toast.error("Thumbnail must be less than 5MB");
        return;
      }
    }

    if (type === "newPdf") {
      if (file.type !== "application/pdf") {
        toast.error("Only PDF files are allowed");
        return;
      }

      if (file.size > 20 * 1024 * 1024) {
        toast.error("PDF must be less than 20MB");
        return;
      }
    }

    setForm((prev) => ({
      ...prev,
      [type]: file,
    }));
  };

  // =========================================================
  // UPDATE
  // =========================================================

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      toast.error("Title is required");
      return;
    }

    if (!form.user) {
      toast.error("User is required");
      return;
    }

    try {
      setSaving(true);

      const formData = new FormData();

      formData.append("title", form.title.trim());
      formData.append("user", form.user);

      if (form.newThumbnail) {
        formData.append(
          "thumbnail",
          form.newThumbnail
        );
      }

      if (form.newPdf) {
        formData.append(
          "pdffile",
          form.newPdf
        );
      }

      const response = await axios.put(
        `${AdminUrl}/notes/update/${note._id}`,
        formData
      );

      if (response.data?.success) {
        toast.success(
          response.data.message ||
            "Note updated successfully"
        );

        onUpdated(response.data.note);
      } else {
        toast.error(
          response.data?.message ||
            "Failed to update note"
        );
      }
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ||
          "Error updating note"
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">

      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">

        {/* HEADER */}

        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white px-5 py-4 md:px-6">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#153497]">
              <Pencil size={19} />
            </div>

            <div>
              <h2 className="font-semibold text-slate-900">
                Edit Note
              </h2>

              <p className="text-xs text-slate-500">
                Update note information
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={20} />
          </button>

        </div>

        {/* FORM */}

        <form
          onSubmit={handleUpdate}
          className="space-y-5 p-5 md:p-6"
        >

          {/* TITLE */}

          <div>

            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Note Title
            </label>

            <input
              type="text"
              value={form.title}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  title: e.target.value,
                }))
              }
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#153497] focus:bg-white focus:ring-4 focus:ring-blue-100"
            />

          </div>

          {/* USER */}

          <div>

            <label className="mb-2 block text-sm font-semibold text-slate-700">
              User
            </label>

            <select
              value={form.user}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  user: e.target.value,
                }))
              }
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#153497] focus:bg-white focus:ring-4 focus:ring-blue-100"
            >

              <option value="" disabled>
                -- Select User --
              </option>

              {users.map((item) => (
                <option
                  key={item._id}
                  value={item._id}
                >
                  {item.name}
                </option>
              ))}

            </select>

          </div>

          {/* CURRENT FILES */}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

            {/* CURRENT THUMB */}

            <div className="rounded-xl border border-slate-200 p-3">

              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Current Thumbnail
              </p>

              <div className="h-32 overflow-hidden rounded-lg bg-slate-100">

                {note.thumbnail ? (
                  <img
                    src={note.thumbnail}
                    alt={note.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <ImageIcon className="text-slate-400" />
                  </div>
                )}

              </div>

            </div>

            {/* PDF */}

            <div className="rounded-xl border border-slate-200 p-3">

              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Current PDF
              </p>

              <a
                href={note.pdflink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-32 flex-col items-center justify-center rounded-lg bg-red-50 text-red-500 transition hover:bg-red-100"
              >
                <FileText size={32} />

                <span className="mt-2 text-sm font-semibold">
                  Open PDF
                </span>
              </a>

            </div>

          </div>

          {/* NEW FILES */}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

            {/* NEW THUMB */}

            <label className="cursor-pointer rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 p-5 text-center transition hover:border-[#153497]">

              <ImageIcon
                size={25}
                className="mx-auto mb-2 text-slate-400"
              />

              <p className="text-sm font-semibold text-slate-700">
                Replace Thumbnail
              </p>

              <p className="mt-1 truncate text-xs text-slate-400">
                {form.newThumbnail
                  ? form.newThumbnail.name
                  : "Optional"}
              </p>

              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) =>
                  handleFile(e, "newThumbnail")
                }
              />

            </label>

            {/* NEW PDF */}

            <label className="cursor-pointer rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 p-5 text-center transition hover:border-red-400">

              <FileDown
                size={25}
                className="mx-auto mb-2 text-slate-400"
              />

              <p className="text-sm font-semibold text-slate-700">
                Replace PDF
              </p>

              <p className="mt-1 truncate text-xs text-slate-400">
                {form.newPdf
                  ? form.newPdf.name
                  : "Optional"}
              </p>

              <input
                type="file"
                hidden
                accept="application/pdf"
                onChange={(e) =>
                  handleFile(e, "newPdf")
                }
              />

            </label>

          </div>

          {/* BUTTONS */}

          <div className="flex gap-3 border-t border-slate-100 pt-5">

            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#153497] px-4 py-3 text-sm font-semibold text-white hover:bg-[#102878] disabled:opacity-60"
            >

              {saving ? (
                <>
                  <Loader2
                    size={17}
                    className="animate-spin"
                  />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={17} />
                  Save Changes
                </>
              )}

            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default Page;