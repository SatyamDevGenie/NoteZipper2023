/**
 * Compress image file to reduce size while maintaining quality
 * @param {File} file - The image file to compress
 * @param {Object} options - Compression options
 * @returns {Promise<string>} - Base64 compressed image
 */
export const compressImage = (file, options = {}) => {
  return new Promise((resolve, reject) => {
    const {
      maxWidth = 800,
      maxHeight = 600,
      quality = 0.8,
      maxSizeKB = 500, // 500KB max
    } = options;

    // Validate file
    if (!file || !file.type.startsWith('image/')) {
      reject(new Error('Invalid file type'));
      return;
    }

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      // Calculate new dimensions
      let { width, height } = img;
      
      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width *= ratio;
        height *= ratio;
      }

      // Set canvas dimensions
      canvas.width = width;
      canvas.height = height;

      // Draw and compress
      ctx.drawImage(img, 0, 0, width, height);

      // Try different quality levels to meet size requirement
      let currentQuality = quality;
      let compressedDataUrl;

      const tryCompress = () => {
        compressedDataUrl = canvas.toDataURL('image/jpeg', currentQuality);
        
        // Check size (rough estimate: base64 length / 1.37)
        const sizeKB = (compressedDataUrl.length * 0.75) / 1024;
        
        if (sizeKB > maxSizeKB && currentQuality > 0.1) {
          currentQuality -= 0.1;
          tryCompress();
        } else {
          resolve(compressedDataUrl);
        }
      };

      tryCompress();
    };

    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };

    // Create object URL for the image
    img.src = URL.createObjectURL(file);
  });
};

/**
 * Convert file to base64 with compression
 * @param {File} file - The image file
 * @returns {Promise<string>} - Compressed base64 string
 */
export const fileToCompressedBase64 = async (file) => {
  try {
    // Compress the image
    const compressedBase64 = await compressImage(file, {
      maxWidth: 400,
      maxHeight: 400,
      quality: 0.7,
      maxSizeKB: 200, // 200KB max for profile pictures
    });

    return compressedBase64;
  } catch (error) {
    console.error('Compression failed:', error);
    throw error;
  }
};