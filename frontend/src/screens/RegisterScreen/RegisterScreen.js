import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../actions/userActions";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import MainScreen from "../../components/MainScreen";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pic, setPic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [picMessage, setPicMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(register(name, email, password, pic));
    }
  };

  const postDetails = (pics) => {
    if (!pics) {
      return setPicMessage("Please select an image");
    }
    setPicMessage(null);

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "notezipper");
      data.append("cloud_name", "deli6jgkk");
      fetch("https://api.cloudinary.com/v1_1/deli6jgkk/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setPic(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setPicMessage("Please select a valid image format");
    }
  };

  return (
    <MainScreen title="REGISTER">
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
          {loading && <Loading />}
          {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
          {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
          <form onSubmit={submitHandler} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-gray-700 font-semibold mb-1"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                placeholder="Enter your full name"
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 font-semibold mb-1"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                placeholder="email@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-gray-700 font-semibold mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                placeholder="******"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-gray-700 font-semibold mb-1"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                placeholder="******"
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {picMessage && (
              <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
            )}
            <div className="mt-3">
              <label
                htmlFor="formFile"
                className="block text-gray-700 font-semibold mb-1"
              >
                Upload your Profile Picture
              </label>
              <input
                type="file"
                id="formFile"
                onChange={(e) => postDetails(e.target.files[0])}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Register
            </button>
          </form>
          <div className="text-center py-4">
            <p className="text-gray-600 font-medium">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 hover:underline">
                Login Here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </MainScreen>
  );
};

export default RegisterScreen;
