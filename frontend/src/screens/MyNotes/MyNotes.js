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

  const noteList = useSelector((state) => state.noteList);
  const { loading, error, notes } = noteList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const noteCreate = useSelector((state) => state.noteCreate);
  const { success: successCreate } = noteCreate;

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { success: successUpdate } = noteUpdate;

  const noteDelete = useSelector((state) => state.noteDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = noteDelete;

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

  const filteredNotes = notes
    ? notes.filter((note) =>
        note.title.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  return (
    <MainScreen
      title={`Welcome Back${userInfo ? ", " + userInfo.name : ""}!`}
      className="px-4 sm:px-6 lg:px-0"
    >
      <div className="flex justify-between items-center flex-wrap gap-4 mb-8">
        <Link to="/createnote" className="w-full sm:w-auto">
          <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 transition text-white font-semibold px-6 py-3 rounded shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400">
            Create New Note
          </button>
        </Link>
      </div>

      {errorDelete && (
        <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
      )}
      {loadingDelete && <Loading />}
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loading />}

      {filteredNotes.length === 0 && !loading && (
        <p className="text-gray-500 text-center text-base sm:text-lg mt-8">
          No notes found matching your search.
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNotes
          .slice()
          .reverse()
          .map((note) => (
            <div
              key={note._id}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col"
            >
              <div className="px-6 py-4 flex justify-between items-center border-b border-gray-200 cursor-pointer group">
                <h2
                  className="text-base sm:text-lg font-semibold text-gray-900 truncate max-w-[70%]"
                  title={note.title}
                >
                  {note.title}
                </h2>
                <span className="inline-block bg-indigo-600 text-white text-xs sm:text-sm font-bold px-3 py-1 rounded-full uppercase tracking-wider whitespace-nowrap">
                  {note.category}
                </span>
              </div>

              <div className="px-6 py-4 flex-grow">
                <p className="text-gray-700 whitespace-pre-wrap text-sm sm:text-base leading-relaxed break-words">
                  {note.content.length > 150
                    ? note.content.slice(0, 150) + "..."
                    : note.content}
                </p>
              </div>

              <footer className="px-6 py-3 border-t border-gray-200 text-gray-500 text-xs sm:text-sm italic flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
                <span className="whitespace-nowrap">
                  Created On{" "}
                  <time dateTime={note.createdAt}>
                    {note.createdAt.substring(0, 10)}
                  </time>
                </span>

                <div className="flex space-x-4">
                  <Link
                    to={`/note/${note._id}`}
                    className="text-blue-600 hover:text-blue-800 font-semibold transition focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
                    aria-label={`Edit note titled ${note.title}`}
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteHandler(note._id)}
                    className="text-red-600 hover:text-red-800 font-semibold transition focus:outline-none focus:ring-2 focus:ring-red-400 rounded"
                    aria-label={`Delete note titled ${note.title}`}
                  >
                    Delete
                  </button>
                </div>
              </footer>
            </div>
          ))}
      </div>
    </MainScreen>
  );
};

export default MyNotes;
