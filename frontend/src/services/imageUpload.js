import toast from 'react-hot-toast';

// Cloudinary configuration
const CLOUDINARY_CLOUD_NAME = 'drhama97q';
const UPLOAD_PRESET = 'notezipper'; // You need to create this in Cloudinary dashboard

// Alternative upload method using a different approach
export const uploadImageToCloudinary = async (file) => {
  if (!file) {
    throw new Error('No file provided');
  }

  // Validate file type
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    throw new Error('Only JPEG, PNG, and WebP images are supported');
  }

  // Validate file size (max 5MB)
  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    throw new Error('File size must be less than 5MB');
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', UPLOAD_PRESET);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Upload failed');
    }

    const data = await response.json();
    
    if (data.secure_url) {
      return data.secure_url;
    } else {
      throw new Error('No secure URL returned from Cloudinary');
    }
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    
    // Handle specific error types
    if (error.message.includes('fetch')) {
      throw new Error('Network error. Please check your internet connection.');
    } else if (error.message.includes('preset')) {
      throw new Error('Upload configuration error. Please try again later.');
    } else {
      throw new Error(error.message || 'Failed to upload image');
    }
  }
};

// Alternative method using base64 (fallback)
export const uploadImageAsBase64 = async (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('No file provided'));
      return;
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      reject(new Error('Only JPEG and PNG images are supported'));
      return;
    }

    // Validate file size (max 2MB for base64)
    const maxSize = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSize) {
      reject(new Error('File size must be less than 2MB'));
      return;
    }

    const reader = new FileReader();
    
    reader.onload = (event) => {
      resolve(event.target.result);
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    
    reader.readAsDataURL(file);
  });
};