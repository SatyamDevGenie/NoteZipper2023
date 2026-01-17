import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { updateUserProfile, clearError } from "../../store/slices/authSlice";
import { fileToCompressedBase64 } from "../../utils/imageCompression";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

const ProfileScreen = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [pic, setPic] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [picLoading, setPicLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo, loading, error, success } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      setFormData({
        name: userInfo.name,
        email: userInfo.email,
        password: "",
        confirmPassword: "",
      });
      setPic(userInfo.pic);
    }
  }, [navigate, userInfo]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }
    
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }
    
    if (formData.password && formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    
    if (formData.password && formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const uploadProfilePicture = async (file) => {
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setValidationErrors({ ...validationErrors, pic: "Only JPEG, PNG, and WebP images are supported." });
      toast.error('Only JPEG, PNG, and WebP images are supported');
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      setValidationErrors({ ...validationErrors, pic: "File size must be less than 5MB." });
      toast.error('File size must be less than 5MB');
      return;
    }

    try {
      setPicLoading(true);
      
      // Method 1: Try Cloudinary upload
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'notezipper');

      const response = await fetch(
        'https://api.cloudinary.com/v1_1/drhama97q/image/upload',
        {
          method: 'POST',
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.secure_url) {
          setPic(data.secure_url);
          setValidationErrors({ ...validationErrors, pic: undefined });
          toast.success('Image uploaded successfully!');
          return;
        }
      }

      // Method 2: Compress and use base64 as fallback
      const compressedBase64 = await fileToCompressedBase64(file);
      setPic(compressedBase64);
      setValidationErrors({ ...validationErrors, pic: undefined });
      toast.success('Image processed successfully!');

    } catch (err) {
      console.error('Upload error:', err);
      
      // Fallback to base64 on any error
      try {
        const reader = new FileReader();
        reader.onload = (event) => {
          setPic(event.target.result);
          setValidationErrors({ ...validationErrors, pic: undefined });
          toast.success('Image processed successfully!');
        };
        reader.onerror = () => {
          setValidationErrors({ ...validationErrors, pic: "Failed to process image." });
          toast.error('Failed to process image');
        };
        reader.readAsDataURL(file);
      } catch (fallbackErr) {
        setValidationErrors({ ...validationErrors, pic: "Failed to upload image." });
        toast.error('Failed to upload image');
      }
    } finally {
      setPicLoading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const updateData = {
        name: formData.name,
        email: formData.email,
        pic,
      };
      
      if (formData.password) {
        updateData.password = formData.password;
      }
      
      dispatch(updateUserProfile(updateData));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile Settings</h1>
            <p className="text-gray-600">Manage your account information</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Picture */}
            <div className="lg:col-span-1">
              <Card className="text-center">
                <div className="space-y-4">
                  <div className="relative inline-block">
                    <img
                      src={pic || "/default-profile.png"}
                      alt="Profile"
                      className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-gray-200 shadow-lg"
                    />
                    {picLoading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
                        <LoadingSpinner size="md" />
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{userInfo?.name}</h3>
                    <p className="text-gray-600">{userInfo?.email}</p>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Change Profile Picture
                    </label>
                    <input
                      type="file"
                      accept="image/png, image/jpeg"
                      onChange={(e) => uploadProfilePicture(e.target.files[0])}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                    />
                    {validationErrors.pic && (
                      <p className="text-sm text-red-600">{validationErrors.pic}</p>
                    )}
                    <p className="text-xs text-gray-500">JPG or PNG. Max size 5MB.</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Profile Form */}
            <div className="lg:col-span-2">
              <Card>
                <form onSubmit={submitHandler} className="space-y-6">
                  {/* Success/Error Messages */}
                  {success && (
                    <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                      Profile updated successfully!
                    </div>
                  )}
                  
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                      {error}
                    </div>
                  )}

                  {/* Name */}
                  <Input
                    label="Full Name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    error={validationErrors.name}
                    required
                  />

                  {/* Email */}
                  <Input
                    label="Email Address"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    error={validationErrors.email}
                    required
                  />

                  {/* Password */}
                  <Input
                    label="New Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Leave blank to keep current password"
                    error={validationErrors.password}
                  />

                  {/* Confirm Password */}
                  {formData.password && (
                    <Input
                      label="Confirm New Password"
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm your new password"
                      error={validationErrors.confirmPassword}
                      required
                    />
                  )}

                  {/* Submit Button */}
                  <div className="pt-6 border-t border-gray-200">
                    <Button
                      type="submit"
                      loading={loading}
                      size="lg"
                      className="w-full sm:w-auto"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Update Profile
                    </Button>
                  </div>
                </form>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfileScreen;