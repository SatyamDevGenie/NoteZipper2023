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
    if (!file) {
      setPicError("Please select an image.");
      return;
    }
    setPicError(null);

    if (file.type !== "image/jpeg" && file.type !== "image/png") {
      setPicError("Only JPEG and PNG images are supported.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "notezipper");
      formData.append("cloud_name", "drhama97q");

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/drhama97q/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();

      if (data.url) {
        setPic(data.url.toString());
      } else {
        setPicError("Failed to upload image. Please try again.");
      }
    } catch (error) {
      setPicError("An error occurred during image upload.");
      console.error("Image upload error:", error);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setPasswordError(null);

    if (password && password !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }

    dispatch(updateProfile({ name, email, password, pic }));
  };

  return (
    <MainScreen title="Edit Profile">
      <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Form Section */}
          <form
            onSubmit={submitHandler}
            aria-label="Update profile form"
            className="flex-1"
          >
            {loading && <Loading />}
            {error && (
              <div
                role="alert"
                className="mb-4 rounded bg-red-100 px-4 py-3 text-red-700"
              >
                {error}
              </div>
            )}
            {success && (
              <div
                role="alert"
                className="mb-4 rounded bg-green-100 px-4 py-3 text-green-700"
              >
                Profile updated successfully.
              </div>
            )}
            {passwordError && (
              <div
                role="alert"
                className="mb-4 rounded bg-red-100 px-4 py-3 text-red-700"
              >
                {passwordError}
              </div>
            )}
            {picError && (
              <div
                role="alert"
                className="mb-4 rounded bg-red-100 px-4 py-3 text-red-700"
              >
                {picError}
              </div>
            )}

            {/* Name */}
            <div className="mb-5">
              <label htmlFor="name" className="block mb-2 font-semibold text-gray-700">
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                aria-required="true"
                className="w-full rounded border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Email */}
            <div className="mb-5">
              <label htmlFor="email" className="block mb-2 font-semibold text-gray-700">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-required="true"
                className="w-full rounded border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Password */}
            <div className="mb-5">
              <label htmlFor="password" className="block mb-2 font-semibold text-gray-700">
                New Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter new password (optional)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-describedby="passwordHelpBlock"
                minLength={6}
                className="w-full rounded border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <p
                id="passwordHelpBlock"
                className="mt-1 text-sm text-gray-500"
              >
                Leave blank if you don't want to change the password.
              </p>
            </div>

            {/* Confirm Password */}
            <div className="mb-5">
              <label
                htmlFor="confirmPassword"
                className="block mb-2 font-semibold text-gray-700"
              >
                Confirm New Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                minLength={6}
                className="w-full rounded border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Profile Picture */}
            <div className="mb-5">
              <label
                htmlFor="pic"
                className="block mb-2 font-semibold text-gray-700"
              >
                Profile Picture
              </label>
              <input
                id="pic"
                type="file"
                accept="image/png, image/jpeg"
                onChange={(e) => uploadProfilePicture(e.target.files[0])}
                aria-describedby="picHelpBlock"
                className="block w-full cursor-pointer rounded border border-gray-300 bg-white px-3 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <p id="picHelpBlock" className="mt-1 text-sm text-gray-500">
                Allowed formats: JPG, PNG.
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              aria-disabled={loading}
              className={`w-full rounded bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-blue-400`}
            >
              {loading ? "Updating..." : "Update Profile"}
            </button>
          </form>

          {/* Profile Picture Preview */}
          <div
            className="flex flex-col items-center justify-center"
            aria-label="Current profile picture"
          >
            <img
              src={pic || "/default-profile.png"}
              alt={`${name}'s profile`}
              className="h-64 w-64 rounded-full object-cover shadow-md"
              loading="lazy"
            />
            <small className="mt-3 text-gray-500">Current Profile Picture</small>
          </div>
        </div>
      </div>
    </MainScreen>
  );
};

export default ProfileScreen;
