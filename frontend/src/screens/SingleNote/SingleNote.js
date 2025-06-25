import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { deleteNoteAction, updateNoteAction } from "../../actions/notesActions";
import ReactMarkdown from "react-markdown";
import { useParams, useNavigate } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";

function SingleNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { loading, error } = useSelector((state) => state.noteUpdate);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = useSelector((state) => state.noteDelete);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const { data } = await axios.get(`/api/notes/${id}`);
        setTitle(data.title);
        setContent(data.content);
        setCategory(data.category);
        setDate(data.updatedAt);
      } catch (err) {
        console.error("Failed to fetch note:", err);
      }
    };

    fetchNote();
  }, [id, successDelete]);

  const resetHandler = () => {
    setTitle("");
    setContent("");
    setCategory("");
  };

  const deleteHandler = () => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      dispatch(deleteNoteAction(id));
      navigate("/mynotes");
    }
  };

  const updateHandler = (e) => {
    e.preventDefault();
    if (!title || !content || !category) return;
    dispatch(updateNoteAction(id, title, content, category));
    resetHandler();
    navigate("/mynotes");
  };

  return (
    <MainScreen title="Edit Note">
      <div className="max-w-3xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {/* Header */}
          <header className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
              Edit Your Note
            </h2>
          </header>

          {/* Form */}
          <form
            onSubmit={updateHandler}
            className="px-6 py-6 space-y-6"
            noValidate
          >
            {/* Loading and Errors */}
            {loadingDelete && <Loading />}
            {errorDelete && <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>}
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}

            {/* Title Input */}
            <div>
              <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-700">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter the title"
                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Content Textarea */}
            <div>
              <label htmlFor="content" className="block mb-2 text-sm font-medium text-gray-700">
                Content <span className="text-red-500">*</span>
              </label>
              <textarea
                id="content"
                rows={6}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your content..."
                className="w-full resize-none rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Markdown Preview */}
            {content && (
              <div className="bg-gray-50 border border-gray-300 rounded-md p-4">
                <h3 className="text-md font-semibold mb-2 text-gray-700">
                  📄 Markdown Preview
                </h3>
                <ReactMarkdown className="prose max-w-none text-sm sm:text-base">
                  {content}
                </ReactMarkdown>
              </div>
            )}

            {/* Category Input */}
            <div>
              <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-700">
                Category <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Enter category"
                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Loading Indicator */}
            {loading && (
              <div className="flex justify-center">
                <Loading size={50} />
              </div>
            )}

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="submit"
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md transition focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Update Note
              </button>
              <button
                type="button"
                onClick={deleteHandler}
                className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-md transition focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                Delete Note
              </button>
            </div>
          </form>

          {/* Footer */}
          <footer className="px-6 py-4 border-t border-gray-200 text-center text-sm text-gray-500 italic">
            Last updated on – {date ? date.substring(0, 10) : "N/A"}
          </footer>
        </div>
      </div>
    </MainScreen>
  );
}

export default SingleNote;
