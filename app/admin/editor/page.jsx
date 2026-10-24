"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { AdminUrl } from "../compo/admin-utils";
import { toast } from "react-toastify";
import { Trash2, Eye } from "lucide-react";

const Page = () => {
  const [allEditors, setAllEditors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(null);

  const [editor, setEditor] = useState({
    name: "",
    email: "",
    password: "",
    number: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setEditor((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${AdminUrl}/editor/create`, editor);
      const data = response.data;
      if (data.success) {
        toast.success(data.message);
        setAllEditors((prev) => [...prev, data.data]);
        setEditor({
          name: "",
          email: "",
          password: "",
          number: "",
        });
      } else {
        toast.error(data.message || "Failed to create editor");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const fetchEditor = async () => {
    try {
      const response = await axios.get(`${AdminUrl}/editor/get`);
      const data = response.data;
      if (data.success) {
        setAllEditors(data.data);
      }
    } catch (error) {
      console.log(error);
      setAllEditors([]);
      toast.error("Failed to fetch editors");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this editor?")) {
      return;
    }
    setDeleteLoading(id);
    try {
      const response = await axios.delete(`${AdminUrl}/editor/delete/${id}`);
      const data = response.data;
      if (data.success) {
        toast.success(data.message || "Editor deleted successfully");
        setAllEditors((prev) => prev.filter((editor) => editor._id !== id));
      } else {
        toast.error(data.message || "Failed to delete editor");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Error deleting editor");
    } finally {
      setDeleteLoading(null);
    }
  };

  const handleWatch = (editor) => {
    toast.info(
      `📧 Name: ${editor.name}\n📧 Email: ${editor.email}\n📞 Number: ${editor.number}`,
      {
        position: "top-center",
        autoClose: 3000,
      }
    );
  };

  useEffect(() => {
    fetchEditor();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Editor Management</h1>

        {/* Form Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Editor</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name *
                </label>
                <input
                  required
                  type="text"
                  placeholder="Enter name"
                  name="name"
                  value={editor.name}
                  onChange={handleInput}
                  className="w-full px-3 text-black py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  required
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={editor.email}
                  onChange={handleInput}
                  className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password *
                </label>
                <input
                  required
                  type="password"
                  placeholder="Enter password"
                  name="password"
                  value={editor.password}
                  onChange={handleInput}
                  className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Number *
                </label>
                <input
                  required
                  type="text"
                  placeholder="Enter number"
                  name="number"
                  value={editor.number}
                  onChange={handleInput}
                  className="w-full px-3 text-black py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Creating..." : "Create Editor"}
            </button>
          </form>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">All Editors</h2>
            <p className="text-sm text-gray-600 mt-1">
              Total: {allEditors.length} editor(s)
            </p>
          </div>
          <div className="overflow-x-auto">
            {allEditors.length > 0 ? (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      S.No
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Number
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created At
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {allEditors.map((editor, index) => (
                    <tr key={editor._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {editor.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{editor.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{editor.number}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {new Date(editor.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleWatch(editor)}
                            className="inline-flex items-center px-3 py-1.5 bg-green-100 text-green-700 rounded-md hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            Watch
                          </button>
                          <button
                            onClick={() => handleDelete(editor._id)}
                            disabled={deleteLoading === editor._id}
                            className="inline-flex items-center px-3 py-1.5 bg-red-100 text-red-700 rounded-md hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            title="Delete Editor"
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            {deleteLoading === editor._id ? "Deleting..." : "Delete"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No editors found</p>
                <p className="text-gray-400 text-sm mt-1">
                  Create your first editor using the form above
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;