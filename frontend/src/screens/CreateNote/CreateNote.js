import React, { useState } from "react";
import MainScreen from "../../components/MainScreen";
import { useDispatch, useSelector } from "react-redux";
import { createNoteAction } from "../../actions/notesActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";

function CreateNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.noteCreate);

  const resetHandler = () => {
    setTitle("");
    setContent("");
    setCategory("");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!title || !content || !category) return;
    dispatch(createNoteAction(title, content, category));
    resetHandler();
    navigate("/mynotes");
  };

  return (
    <MainScreen title="Create a New Note">
      <div className="max-w-3xl mx-auto p-4 sm:p-6 md:p-8 bg-white shadow-lg rounded-xl">
        <form
          onSubmit={submitHandler}
          className="space-y-6"
          noValidate
        >
          {error && (
            <ErrorMessage variant="danger">{error}</ErrorMessage>
          )}

          {/* Title */}
          <div>
            <label htmlFor="title" className="block mb-2 text-sm font-semibold text-gray-700">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              value={title}
              placeholder="Enter note title"
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
          </div>

          {/* Content */}
          <div>
            <label htmlFor="content" className="block mb-2 text-sm font-semibold text-gray-700">
              Content <span className="text-red-500">*</span>
            </label>
            <textarea
              id="content"
              rows={6}
              value={content}
              placeholder="Enter note content"
              onChange={(e) => setContent(e.target.value)}
              className="w-full resize-none px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
          </div>

          {/* Markdown Preview */}
          {content && (
            <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
              <h3 className="text-md font-semibold mb-2 text-gray-700">📄 Markdown Preview</h3>
              <ReactMarkdown className="prose">{content}</ReactMarkdown>
            </div>
          )}

          {/* Category */}
          <div>
            <label htmlFor="category" className="block mb-2 text-sm font-semibold text-gray-700">
              Category <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="category"
              value={category}
              placeholder="Enter note category"
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
          </div>

          {/* Loader */}
          {loading && (
            <div className="flex justify-center">
              <Loading size={40} />
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Save Note
            </button>
            <button
              type="button"
              onClick={resetHandler}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 rounded-md transition focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              Clear Fields
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-500 italic">
          Creating on - {new Date().toLocaleDateString()}
        </div>
      </div>
    </MainScreen>
  );
}

export default CreateNote;
