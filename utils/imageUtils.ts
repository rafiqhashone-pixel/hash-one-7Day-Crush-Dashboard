// utils/imageUtils.ts
export const getImageUrl = (imagePath?: string): string => {
  if (!imagePath) return "";
  
  // If imagePath already starts with http:// or https://, use it as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // If imagePath starts with /uploads or /, prepend the backend URL
  if (imagePath.startsWith('/uploads') || imagePath.startsWith('/')) {
    return `https://backend.7daycrush.com${imagePath}`;
  }
  
  // Default fallback
  return imagePath;
};