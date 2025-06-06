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

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { loading, error } = noteUpdate;

  const noteDelete = useSelector((state) => state.noteDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = noteDelete;

  useEffect(() => {
    const fetching = async () => {
      const { data } = await axios.get(`/api/notes/${id}`);

      setTitle(data.title);
      setContent(data.content);
      setCategory(data.category);
      setDate(data.updatedAt);
    };

    fetching();
  }, [id, date]);

  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
  };

  const deleteHandler = (id) => {
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
      <div className="max-w-3xl mx-auto px-4 py-6">
        <div className="bg-white shadow-md rounded-lg">
          <header className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Edit Your Note</h2>
          </header>

          <form
            onSubmit={updateHandler}
            className="px-6 py-6 space-y-6"
            noValidate
          >
            {/* Loading and Errors */}
            {loadingDelete && (
              <div className="mb-4">
                <Loading />
              </div>
            )}
            {errorDelete && (
              <ErrorMessage variant="danger" className="mb-4">
                {errorDelete}
              </ErrorMessage>
            )}
            {error && (
              <ErrorMessage variant="danger" className="mb-4">
                {error}
              </ErrorMessage>
            )}

            {/* Title Input */}
            <div>
              <label
                htmlFor="title"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                placeholder="Enter the title"
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>

            {/* Content Textarea */}
            <div>
              <label
                htmlFor="content"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Content
              </label>
              <textarea
                id="content"
                value={content}
                placeholder="Enter the content"
                rows={6}
                onChange={(e) => setContent(e.target.value)}
                className="w-full resize-none rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>

            {/* Markdown Preview */}
            {content && (
              <div className="border border-gray-300 rounded-md p-4 bg-gray-50">
                <h3 className="text-lg font-semibold mb-2 text-gray-800">
                  Note Preview
                </h3>
                <ReactMarkdown className="prose max-w-full">{content}</ReactMarkdown>
              </div>
            )}

            {/* Category Input */}
            <div>
              <label
                htmlFor="category"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Category
              </label>
              <input
                type="text"
                id="category"
                value={category}
                placeholder="Enter the category"
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>

            {/* Loading Spinner */}
            {loading && (
              <div className="flex justify-center">
                <Loading size={50} />
              </div>
            )}

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition"
              >
                Update Note
              </button>
              <button
                type="button"
                onClick={() => deleteHandler(id)}
                className="flex-1 bg-red-600 text-white font-semibold py-3 rounded-md hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 transition"
              >
                Delete Note
              </button>
            </div>
          </form>

          <footer className="px-6 py-4 border-t border-gray-200 text-center text-sm text-gray-500 italic">
            Updated on - {date ? date.substring(0, 10) : ""}
          </footer>
        </div>
      </div>
    </MainScreen>
  );
}

export default SingleNote;
