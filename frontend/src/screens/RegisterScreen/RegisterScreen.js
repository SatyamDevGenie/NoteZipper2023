import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { registerUser, clearError } from "../../store/slices/authSlice";
import { fileToCompressedBase64 } from "../../utils/imageCompression";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

const RegisterScreen = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [pic, setPic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [validationErrors, setValidationErrors] = useState({});
  const [picLoading, setPicLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/mynotes");
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
    
    if (!formData.password.trim()) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const postDetails = async (pics) => {
    if (!pics) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(pics.type)) {
      setValidationErrors({ ...validationErrors, pic: "Only JPEG, PNG, and WebP images are supported." });
      toast.error('Only JPEG, PNG, and WebP images are supported');
      return;
    }

    // Validate file size (max 10MB before compression)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (pics.size > maxSize) {
      setValidationErrors({ ...validationErrors, pic: "File size must be less than 10MB." });
      toast.error('File size must be less than 10MB');
      return;
    }

    try {
      setPicLoading(true);
      
      // Method 1: Try Cloudinary upload first (smaller file)
      try {
        const formData = new FormData();
        formData.append('file', pics);
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
      } catch (cloudinaryError) {
        console.log('Cloudinary upload failed, trying compression...');
      }

      // Method 2: Compress and use base64 as fallback
      const compressedBase64 = await fileToCompressedBase64(pics);
      setPic(compressedBase64);
      setValidationErrors({ ...validationErrors, pic: undefined });
      toast.success('Image processed successfully!');

    } catch (err) {
      console.error('Upload error:', err);
      setValidationErrors({ ...validationErrors, pic: "Failed to process image." });
      toast.error('Failed to process image. Please try a smaller image.');
    } finally {
      setPicLoading(false);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      dispatch(registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        pic,
      }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-blue-50 to-indigo-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg"
      >
        <Card className="shadow-xl">
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
              <p className="text-gray-600">Join NoteZipper today</p>
            </motion.div>
          </div>

          <form onSubmit={submitHandler} className="space-y-5">
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

            <Input
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              error={validationErrors.password}
              required
            />

            <Input
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              error={validationErrors.confirmPassword}
              required
            />

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Profile Picture
              </label>
              <div className="flex items-center space-x-4">
                <img
                  src={pic}
                  alt="Profile preview"
                  className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                />
                <div className="flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => postDetails(e.target.files[0])}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                  />
                  {picLoading && (
                    <div className="mt-2">
                      <LoadingSpinner size="sm" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <Button
              type="submit"
              loading={loading}
              className="w-full"
              size="lg"
            >
              Create Account
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default RegisterScreen;
