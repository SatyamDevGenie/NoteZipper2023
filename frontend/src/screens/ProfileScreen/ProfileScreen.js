import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../../actions/userActions";
import Loading from "../../components/Loading";
import MainScreen from "../../components/MainScreen";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pic, setPic] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [picError, setPicError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.userLogin);
  const { loading, error, success } = useSelector((state) => state.userUpdate);

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
      setPic(userInfo.pic);
    }
  }, [navigate, userInfo]);

  const uploadProfilePicture = async (file) => {
    if (!file) return setPicError("Please select an image.");
    setPicError(null);

    if (!["image/jpeg", "image/png"].includes(file.type)) {
      return setPicError("Only JPEG and PNG images are supported.");
    }

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "notezipper");
      formData.append("cloud_name", "drhama97q");

      const res = await fetch("https://api.cloudinary.com/v1_1/drhama97q/image/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.url) setPic(data.url.toString());
      else setPicError("Failed to upload image.");
    } catch (err) {
      console.error(err);
      setPicError("An error occurred during upload.");
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setPasswordError(null);
    if (password && password !== confirmPassword) {
      return setPasswordError("Passwords do not match.");
    }
    dispatch(updateProfile({ name, email, password, pic }));
  };

  return (
    <MainScreen title="Edit Profile">
      <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="bg-white shadow-md rounded-lg p-6 sm:p-8 flex flex-col lg:flex-row gap-10">
          {/* Form */}
          <form
            onSubmit={submitHandler}
            className="w-full lg:w-2/3 space-y-5"
            aria-label="Profile Form"
          >
            {/* Alerts */}
            {loading && <Loading />}
            {error && (
              <div role="alert" className="bg-red-100 text-red-700 p-3 rounded">
                {error}
              </div>
            )}
            {success && (
              <div role="alert" className="bg-green-100 text-green-700 p-3 rounded">
                Profile updated successfully.
              </div>
            )}
            {passwordError && (
              <div role="alert" className="bg-red-100 text-red-700 p-3 rounded">
                {passwordError}
              </div>
            )}
            {picError && (
              <div role="alert" className="bg-red-100 text-red-700 p-3 rounded">
                {picError}
              </div>
            )}

            {/* Name */}
            <div>
              <label htmlFor="name" className="block font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter full name"
                className="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                className="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block font-medium text-gray-700 mb-1">
                New Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password (optional)"
                minLength={6}
                className="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                Leave blank if you don’t want to change it.
              </p>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block font-medium text-gray-700 mb-1">
                Confirm New Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                minLength={6}
                className="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Upload Picture */}
            <div>
              <label htmlFor="pic" className="block font-medium text-gray-700 mb-1">
                Profile Picture
              </label>
              <input
                id="pic"
                type="file"
                accept="image/png, image/jpeg"
                onChange={(e) => uploadProfilePicture(e.target.files[0])}
                className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
              />
              <p className="text-xs text-gray-500 mt-1">Allowed formats: JPG, PNG.</p>
            </div>

            {/* Submit */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-30 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md transition"
              >
                {loading ? "Updating..." : "Update Profile"}
              </button>
            </div>
          </form>

          {/* Profile Picture Preview */}
          <div className="w-full lg:w-1/3 flex flex-col items-center justify-center">
            <img
              src={pic || "/default-profile.png"}
              alt={`${name}'s profile`}
              className="w-48 h-48 rounded-full object-cover shadow-md"
            />
            <span className="mt-4 text-gray-600 text-sm">Current Profile Picture</span>
          </div>
        </div>
      </div>
    </MainScreen>
  );
};

export default ProfileScreen;
