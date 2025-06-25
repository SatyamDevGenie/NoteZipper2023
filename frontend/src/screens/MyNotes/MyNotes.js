import React, { useEffect } from "react";
import MainScreen from "../../components/MainScreen";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteNoteAction, listNotes } from "../../actions/notesActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

const MyNotes = ({ search }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, notes } = useSelector((state) => state.noteList);
  const { userInfo } = useSelector((state) => state.userLogin);
  const { success: successCreate } = useSelector((state) => state.noteCreate);
  const { success: successUpdate } = useSelector((state) => state.noteUpdate);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = useSelector((state) => state.noteDelete);

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      dispatch(listNotes());
    }
  }, [dispatch, successCreate, successUpdate, successDelete, navigate, userInfo]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      dispatch(deleteNoteAction(id));
    }
  };

  const filteredNotes = notes?.filter((note) =>
    note.title.toLowerCase().includes(search.toLowerCase())
  ) || [];

  return (
    <MainScreen title={`Welcome back${userInfo ? ", " + userInfo.name : ""}!`}>
      {/* Create Note CTA */}
      <div className="flex justify-end mb-6 px-2 sm:px-0">
        <Link to="/createnote">
          <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400">
            + Create New Note
          </button>
        </Link>
      </div>

      {/* Messages */}
      {errorDelete && <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>}
      {loadingDelete && <Loading />}
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loading />}

      {/* No Notes */}
      {!loading && filteredNotes.length === 0 && (
        <p className="text-center text-gray-500 text-base sm:text-lg mt-10">
          📭 No notes found matching your search.
        </p>
      )}

      {/* Notes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-2 sm:px-0">
        {filteredNotes
          .slice()
          .reverse()
          .map((note) => (
            <div
              key={note._id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 flex flex-col overflow-hidden"
            >
              {/* Note Header */}
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h2
                  className="text-lg font-semibold text-gray-800 truncate max-w-[70%]"
                  title={note.title}
                >
                  {note.title}
                </h2>
                <span className="bg-indigo-600 text-white text-xs font-medium px-3 py-1 rounded-full uppercase tracking-wide">
                  {note.category}
                </span>
              </div>

              {/* Note Content */}
              <div className="px-6 py-4 flex-grow">
                <p className="text-gray-700 text-sm whitespace-pre-wrap break-words leading-relaxed">
                  {note.content.length > 180
                    ? `${note.content.slice(0, 180)}...`
                    : note.content}
                </p>
              </div>

              {/* Note Footer */}
              <div className="px-6 py-3 border-t border-gray-200 text-xs sm:text-sm text-gray-500 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
                <span className="italic">
                  Created on{" "}
                  <time dateTime={note.createdAt}>
                    {note.createdAt.substring(0, 10)}
                  </time>
                </span>
                <div className="flex gap-4 text-sm font-medium">
                  <Link
                    to={`/note/${note._id}`}
                    className="text-blue-600 hover:text-blue-800 transition"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteHandler(note._id)}
                    className="text-red-600 hover:text-red-800 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </MainScreen>
  );
};

export default MyNotes;
